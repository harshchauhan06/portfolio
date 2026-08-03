/**
 * LeetCodeHeatmap/utils.js
 *
 * Calendar building and streak calculation helpers.
 * Accepts the submissionCalendar from the API, which uses date strings
 * (YYYY-MM-DD) as keys — matching the format in src/data/leetcode.json.
 *
 * To change username, edit HeatmapService.js.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/* ─── Colour levels — warm yellow editorial palette ──────────────────────── */
export const HEAT_LEVELS = [
  { level: 0, bg: "#F0E8D8", border: "#E2D5BE", label: "No submissions" },
  { level: 1, bg: "#F7DE9C", border: "#DFC56A", label: "1–2 submissions" },
  { level: 2, bg: "#F0C35A", border: "#D4A038", label: "3–5 submissions" },
  { level: 3, bg: "#D99A32", border: "#BC7C18", label: "6–9 submissions" },
  { level: 4, bg: "#A96A16", border: "#8C540C", label: "10+ submissions" },
];

export function getHeatLevel(count) {
  if (count >= 10) return HEAT_LEVELS[4];
  if (count >= 6)  return HEAT_LEVELS[3];
  if (count >= 3)  return HEAT_LEVELS[2];
  if (count >= 1)  return HEAT_LEVELS[1];
  return HEAT_LEVELS[0];
}

export function formatTooltip(day) {
  const d = new Date(day.date);
  const label = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (day.count === 0) return `No submissions — ${label}`;
  return `${day.count} submission${day.count === 1 ? "" : "s"} — ${label}`;
}

/**
 * Normalizes input calendar keys.
 * LeetCode's live GraphQL API uses Unix timestamp seconds as keys (e.g. "1722038400"),
 * while the local cache file uses date strings (e.g. "2026-08-03").
 * This function translates all key formats to local-timezone YYYY-MM-DD.
 */
export function normalizeCalendar(calendarObject = {}) {
  const normalized = {};
  if (!calendarObject || typeof calendarObject !== "object") return normalized;

  for (const key of Object.keys(calendarObject)) {
    const val = Number(calendarObject[key] ?? 0);
    if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
      normalized[key] = val;
    } else {
      // Try to parse key as a Unix timestamp
      const n = Number(key);
      if (!Number.isNaN(n) && n > 0) {
        // If n looks like seconds (e.g., 10 digits), scale to ms. Otherwise assume ms.
        const isSeconds = n < 99999999999;
        const dateObj = new Date(isSeconds ? n * 1000 : n);
        
        // Convert to local YYYY-MM-DD key representation
        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
        const dd = String(dateObj.getDate()).padStart(2, "0");
        const localKey = `${yyyy}-${mm}-${dd}`;
        normalized[localKey] = val;
      } else {
        normalized[key] = val;
      }
    }
  }
  return normalized;
}

/**
 * Converts the submissionCalendar object (Unix timestamp or YYYY-MM-DD → count)
 * into 53 week-columns of 7 cells each, suitable for a CSS Grid.
 * Also extracts month label positions.
 */
export function buildCalendar(calendarObject = {}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today.getTime() - 364 * DAY_MS);
  const normalizedCalendar = normalizeCalendar(calendarObject);

  // Build flat day array
  const days = [];
  for (let d = new Date(start); d <= today; d = new Date(d.getTime() + DAY_MS)) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const key = `${yyyy}-${mm}-${dd}`;
    days.push({
      date: new Date(d),
      count: Number(normalizedCalendar[key] ?? 0),
    });
  }

  // Pad front to start on Sunday
  const padBefore = start.getDay(); // 0=Sun
  const padded = [
    ...Array(padBefore).fill(null),
    ...days,
  ];
  // Pad end to fill last column
  while (padded.length % 7 !== 0) padded.push(null);

  // Split into week-columns
  const columns = [];
  for (let i = 0; i < padded.length; i += 7) {
    columns.push(padded.slice(i, i + 7));
  }

  // Month labels — one per new month, at the first column that shows that month
  const monthLabels = [];
  let prevMonth = -1;
  columns.forEach((col, ci) => {
    const first = col.find(Boolean);
    if (!first) return;
    const m = first.date.getMonth();
    if (m !== prevMonth) {
      prevMonth = m;
      monthLabels.push({
        colIndex: ci,
        label: first.date.toLocaleDateString("en-US", { month: "short" }),
      });
    }
  });

  const totalCount = days.reduce((s, d) => s + d.count, 0);
  const totalActiveDays = days.filter((d) => d.count > 0).length;

  return { columns, monthLabels, totalCount, totalActiveDays };
}

/** Current and longest streak (consecutive days with submissions). */
export function calculateStreaks(calendarObject = {}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today.getTime() - 364 * DAY_MS);
  const normalizedCalendar = normalizeCalendar(calendarObject);
  const values = [];

  for (let d = new Date(start); d <= today; d = new Date(d.getTime() + DAY_MS)) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const key = `${yyyy}-${mm}-${dd}`;
    values.push(Number(normalizedCalendar[key] ?? 0));
  }

  let longest = 0;
  let run = 0;
  for (const v of values) {
    run = v > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }

  let current = 0;
  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] > 0) current++;
    else break;
  }

  return { currentStreak: current, longestStreak: longest };
}
