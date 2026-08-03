/**
 * HeatmapService.js — 3-tier data fetching for LeetCode activity.
 *
 * Priority:
 *   1. Live API  →  GET /api/leetcode?username=...
 *   2. Bundled cache  →  src/data/leetcode.json (always available)
 *   3. Sample data  →  synthetic pattern (last resort, never shown as error)
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TO CHANGE USERNAME
 *   Edit the USERNAME constant below, or set VITE_LEETCODE_USERNAME in .env
 * ────────────────────────────────────────────────────────────────────────────
 */

import bundledCache from "../../data/leetcode.json";

export const USERNAME =
  import.meta.env.VITE_LEETCODE_USERNAME ?? "harshchauhan06";

const API_URL = "/api/leetcode";

/* ─── Synthetic sample calendar ──────────────────────────────────────────── */
function buildSampleCalendar() {
  const pattern = [3,0,1,0,0,2,1, 0,0,4,2,0,1,0, 0,3,0,2,1,0,0,
                   5,2,1,0,3,0,1, 0,0,2,1,4,0,0, 1,0,0,3,2,1,0,
                   0,6,1,2,0,0,3, 0,1,4,0,2,1,0, 3,0,0,1,5,2,0];
  const cal = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 365; i++) {
    const d = new Date(today.getTime() - (364 - i) * 86400000);
    const key = d.toISOString().slice(0, 10);
    const count = pattern[i % pattern.length];
    if (count > 0) cal[key] = count;
  }
  return cal;
}

const SAMPLE_DATA = {
  submissionCalendar: buildSampleCalendar(),
  totalSolved: 128,
  easySolved: 53,
  mediumSolved: 57,
  hardSolved: 18,
  source: "sample",
};

/* ─── Cache check ─────────────────────────────────────────────────────────── */
function isCacheValid(cache) {
  return (
    cache?.submissionCalendar &&
    Object.keys(cache.submissionCalendar).length > 0
  );
}

/* ─── Fetch ───────────────────────────────────────────────────────────────── */
/**
 * Fetches LeetCode data with automatic fallback.
 * Always resolves — never rejects.
 */
export async function fetchLeetCodeData(username = USERNAME) {
  // Tier 1 — Live API
  try {
    const res = await fetch(
      `${API_URL}?username=${encodeURIComponent(username)}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (res.ok) {
      const json = await res.json();
      if (isCacheValid(json)) {
        console.info("[LeetCode] Live data loaded.");
        return { ...json, source: "live" };
      }
    }
    // Server returned error status or empty calendar — fall through
    console.warn("[LeetCode] Live API returned no usable data, using cache.");
  } catch (err) {
    console.warn("[LeetCode] Live API unreachable:", err.message);
  }

  // Tier 2 — Bundled cache
  if (isCacheValid(bundledCache)) {
    console.info("[LeetCode] Using bundled cache.");
    return { ...bundledCache, source: "cache" };
  }

  // Tier 3 — Sample (always works)
  console.info("[LeetCode] Using sample data.");
  return SAMPLE_DATA;
}
