/**
 * server.mjs — Minimal LeetCode API proxy server.
 *
 * Run alongside Vite:
 *   node server/server.mjs
 *
 * Exposes:  GET http://localhost:3001/api/leetcode?username=harshchauhan06
 *
 * Uses only Node built-ins (node:http, node:https) — zero npm dependencies.
 * The Vite dev server proxies /api/* → http://localhost:3001 so the frontend
 * calls fetch("/api/leetcode") cleanly.
 */

import fs from "node:fs/promises";
import http from "node:http";
import https from "node:https";

const PORT = 3001;
const USERNAME = process.env.LC_USERNAME ?? process.env.VITE_LEETCODE_USERNAME ?? "harshchauhan06";
const CACHE_FILE = new URL("../src/data/leetcode.json", import.meta.url);

/* ─── LeetCode GraphQL query ─────────────────────────────────────────────── */
const GRAPHQL_QUERY = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar(year: ${new Date().getFullYear()}) {
        submissionCalendar
      }
    }
  }
`;

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
      variables: { username },
    });

    const options = {
      hostname: "leetcode.com",
      path: "/graphql",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-heatmap/1.0)",
      },
    };

    const req = https.request(options, (res) => {
      let raw = "";
      res.on("data", (chunk) => {
        raw += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(raw);
          const user = json?.data?.matchedUser;

          if (!user) {
            reject(new Error(json?.errors?.[0]?.message ?? "LeetCode user not found or API changed"));
            return;
          }

          const calRaw = user.userCalendar?.submissionCalendar ?? "{}";
          let submissionCalendar;
          try {
            submissionCalendar = JSON.parse(calRaw);
          } catch {
            submissionCalendar = {};
          }

          const stats = user.submitStats?.acSubmissionNum ?? [];
          const getCount = (diff) => stats.find((s) => s.difficulty === diff)?.count ?? 0;
          const totalSolved = getCount("All");
          const easySolved = getCount("Easy");
          const mediumSolved = getCount("Medium");
          const hardSolved = getCount("Hard");

          resolve({ submissionCalendar, totalSolved, easySolved, mediumSolved, hardSolved });
        } catch (e) {
          reject(e);
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
    if (!data.submissionCalendar || Object.keys(data.submissionCalendar).length === 0) {
      throw new Error("LeetCode calendar data unavailable.");
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
    if (cache?.submissionCalendar && Object.keys(cache.submissionCalendar).length > 0) {
      console.log("[server] Returning cached LeetCode data.");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ...cache, source: "cache" }));
      return;
    }

    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`✦ LeetCode API server running at http://localhost:${PORT}/api/leetcode`);
  console.log(`  Default username: ${USERNAME}`);
  console.log(`  Override with: LC_USERNAME=yourname node server/server.mjs`);
});
