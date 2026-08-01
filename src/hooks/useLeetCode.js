/**
 * useLeetCode.js — Data-fetching hook for the "Days I Code" section.
 *
 * Calls GET /api/leetcode (proxied by Vite to the Node backend on port 3001).
 * Falls back to rich mock data if the endpoint is unreachable so the UI
 * always renders during development without the server running.
 */

import { useEffect, useState } from "react";

/* ─── Mock fallback data ────────────────────────────────────────────────────
   Generated to resemble a realistic LC submission calendar:
   object keys are Unix second timestamps.                                     */

function buildMockCalendar() {
  const cal = {};
  const today = new Date();

  // Seed a realistic but sparse activity pattern over the last 365 days.
  const seed = [
    3,0,1,0,0,2,1, 0,0,4,2,0,1,0,
    0,3,0,2,1,0,0, 5,2,1,0,3,0,1,
    0,0,2,1,4,0,0, 1,0,0,3,2,1,0,
    0,6,1,2,0,0,3, 0,1,4,0,2,1,0,
    3,0,0,1,5,2,0, 0,1,0,3,1,0,2,
  ];

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (364 - i));
    const ts = Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000);
    // Use UTC midnight to match LeetCode's format.
    const utcTs = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 1000);
    const count = seed[i % seed.length];
    if (count > 0) {
      cal[String(utcTs)] = count;
    }
  }
  return cal;
}

const MOCK_DATA = {
  submissionCalendar: buildMockCalendar(),
  totalSolved: 103,
  easySolved: 52,
  mediumSolved: 40,
  hardSolved: 11,
};

/* ─── Hook ──────────────────────────────────────────────────────────────────
   Returns { data, loading, error }
   data shape: { submissionCalendar, totalSolved, easySolved, mediumSolved, hardSolved } */

export function useLeetCode(username = "harshchauhan06") {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(`/api/leetcode?username=${encodeURIComponent(username)}`);
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          // Silently fall back to mock data — the UI should always render.
          console.warn("[useLeetCode] Backend unavailable, using mock data.", err.message);
          setData(MOCK_DATA);
          setLoading(false);
          setError(err);
        }
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [username]);

  return { data, loading, error };
}
