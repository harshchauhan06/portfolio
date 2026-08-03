/**
 * useLeetCode.js — React hook wrapping HeatmapService.
 *
 * Immediately renders bundled cache data (zero-flash), then silently
 * upgrades to live API data in the background if available.
 */

import { useEffect, useState } from "react";
import { fetchLeetCodeData, USERNAME } from "./HeatmapService";
import { buildCalendar, calculateStreaks } from "./utils";
import bundledCache from "../../data/leetcode.json";

function processData(raw) {
  const calendar = buildCalendar(raw.submissionCalendar ?? {});
  const streaks = calculateStreaks(raw.submissionCalendar ?? {});
  return {
    calendar,
    streaks,
    totalSolved: raw.totalSolved ?? 0,
    easySolved: raw.easySolved ?? 0,
    mediumSolved: raw.mediumSolved ?? 0,
    hardSolved: raw.hardSolved ?? 0,
    source: raw.source ?? "unknown",
  };
}

export function useLeetCode(username = USERNAME) {
  // Start with bundled cache so the grid renders immediately
  const [state, setState] = useState(() => ({
    data: processData(bundledCache),
    loading: true, // still true — background fetch running
  }));

  useEffect(() => {
    let cancelled = false;

    fetchLeetCodeData(username).then((raw) => {
      if (!cancelled) {
        setState({ data: processData(raw), loading: false });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
