/**
 * server.mjs — LeetCode API proxy server.
 *
 * Run alongside Vite dev server:
 *   node server/server.mjs
 *
 * Exposes: GET http://localhost:3001/api/leetcode?username=harshchauhan06
 *
 * Fallback chain:
 *   1. Live LeetCode GraphQL API
 *   2. src/data/leetcode.json cache (auto-written on success)
 *   3. The frontend always has the bundled cache, so it never shows an error
 *
 * To change username:
 *   LC_USERNAME=yourname node server/server.mjs
 */

import fs from "node:fs/promises";
import http from "node:http";
import https from "node:https";

const PORT = 3001;
const USERNAME =
  process.env.LC_USERNAME ??
  process.env.VITE_LEETCODE_USERNAME ??
  "harshchauhan06";
const CACHE_FILE = new URL("../src/data/leetcode.json", import.meta.url);

/* ─── LeetCode GraphQL query ─────────────────────────────────────────────── */
const GRAPHQL_QUERY = `
  query userProfileCalendar($username: String!, $year: Int) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar(year: $year) {
        submissionCalendar
      }
    }
  }
`;

function normalizeCalendar(obj) {
  const out = {};
  if (!obj || typeof obj !== "object") return out;
  for (const k of Object.keys(obj)) {
    const v = obj[k] || 0;
    if (/^[0-9]{9,}$/.test(k)) {
      const ts = parseInt(k, 10) * 1000;
      const d = new Date(ts);
      // Format to YYYY-MM-DD
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      out[`${yyyy}-${mm}-${dd}`] = Number(v);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(k)) {
      out[k] = Number(v);
    } else {
      const n = Number(k);
      if (!Number.isNaN(n) && n > 1000000000) {
        const d = new Date(n * 1000);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        out[`${yyyy}-${mm}-${dd}`] = Number(v);
      } else {
        out[k] = Number(v);
      }
    }
  }
  return out;
}

async function loadCache() {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function saveCache(payload) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(payload, null, 2));
    console.log("[server] LeetCode cache updated.");
  } catch (err) {
    console.warn("[server] Failed to write LeetCode cache:", err.message);
  }
}

/**
 * Calls the LeetCode public GraphQL endpoint.
 * Returns cleaned JSON or throws on failure.
 */
async function fetchLeetCodeData(username) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      query: GRAPHQL_QUERY,
      variables: { username, year: new Date().getFullYear() },
    });

    const options = {
      hostname: "leetcode.com",
      path: "/graphql/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://leetcode.com",
        Referer: "https://leetcode.com/",
        "x-csrftoken": "csrftoken",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Cookie: "csrftoken=csrftoken",
      },
    };

    const req = https.request(options, (res) => {
      let raw = "";
      res.on("data", (chunk) => {
        raw += chunk;
      });
      res.on("end", () => {
        try {
          if (res.statusCode !== 200) {
            reject(
              new Error(
                `LeetCode returned HTTP ${res.statusCode}. Body: ${raw.slice(0, 200)}`
              )
            );
            return;
          }

          const json = JSON.parse(raw);
          const user = json?.data?.matchedUser;

          if (!user) {
            reject(
              new Error(
                json?.errors?.[0]?.message ??
                  "LeetCode user not found or API schema changed"
              )
            );
            return;
          }

          const calRaw = user.userCalendar?.submissionCalendar ?? "{}";
          let submissionCalendar;
          try {
            submissionCalendar = JSON.parse(calRaw);
          } catch {
            submissionCalendar = {};
          }

          const normalizedCalendar = normalizeCalendar(submissionCalendar);

          const stats = user.submitStats?.acSubmissionNum ?? [];
          const getCount = (diff) =>
            stats.find((s) => s.difficulty === diff)?.count ?? 0;

          resolve({
            submissionCalendar: normalizedCalendar,
            totalSolved: getCount("All"),
            easySolved: getCount("Easy"),
            mediumSolved: getCount("Medium"),
            hardSolved: getCount("Hard"),
          });
        } catch (e) {
          reject(new Error(`Failed to parse LeetCode response: ${e.message}`));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/* ─── HTTP server ─────────────────────────────────────────────────────────── */
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/api/leetcode") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const username = url.searchParams.get("username") ?? USERNAME;
  const cache = await loadCache();

  try {
    const data = await fetchLeetCodeData(username);

    const hasData =
      data.submissionCalendar &&
      Object.keys(data.submissionCalendar).length > 0;

    if (!hasData) {
      throw new Error("LeetCode returned empty calendar data.");
    }

    const payload = {
      ...data,
      source: "live",
      cachedAt: new Date().toISOString(),
    };

    await saveCache(payload);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload));
  } catch (err) {
    console.error("[server] LeetCode fetch failed:", err.message);

    // Return cached data if available (even if stale — better than nothing)
    if (
      cache?.submissionCalendar &&
      Object.keys(cache.submissionCalendar).length > 0
    ) {
      console.log("[server] Returning cached LeetCode data.");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ...cache, source: "cache" }));
      return;
    }

    // No cache and no live data — tell the client to use its bundled fallback
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: err.message,
        hint: "The frontend will use its bundled leetcode.json cache.",
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(
    `✦ LeetCode API server running at http://localhost:${PORT}/api/leetcode`
  );
  console.log(`  Default username : ${USERNAME}`);
  console.log(
    `  Override via env : LC_USERNAME=yourname node server/server.mjs`
  );
});
