/**
 * utils/heatmap.js
 *
 * Converts the LeetCode submission calendar returned by the backend into
 * data structures consumed by:
 *
 *   HeatmapGrid
 *   MonthLabels
 *   HeatmapLegend
 *   HeatmapStats
 */

const DAY = 24 * 60 * 60 * 1000;

/* -------------------------------------------------------------------------- */
/* Heat levels                                                                 */
/* -------------------------------------------------------------------------- */

export const HEAT_LEVELS = [{
        level: 0,
        min: 0,
        bg: "#F7F0DF",
        border: "#E9DFC8",
        label: "No submissions",
    },
    {
        level: 1,
        min: 1,
        bg: "#F7DE9C",
        border: "#E2C670",
        label: "1+ submissions",
    },
    {
        level: 2,
        min: 3,
        bg: "#F0C35A",
        border: "#D7A640",
        label: "3+ submissions",
    },
    {
        level: 3,
        min: 6,
        bg: "#D99A32",
        border: "#BE7D1E",
        label: "6+ submissions",
    },
    {
        level: 4,
        min: 10,
        bg: "#A96A16",
        border: "#8D560D",
        label: "10+ submissions",
    },
];

/* -------------------------------------------------------------------------- */
/* Cell colours                                                                */
/* -------------------------------------------------------------------------- */

export function getColor(count) {
    if (count >= 10) return HEAT_LEVELS[4];
    if (count >= 6) return HEAT_LEVELS[3];
    if (count >= 3) return HEAT_LEVELS[2];
    if (count >= 1) return HEAT_LEVELS[1];
    return HEAT_LEVELS[0];
}

/* -------------------------------------------------------------------------- */

export function formatTooltip(day) {
    const date = new Date(day.date);

    const formatted = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    if (day.count === 0) {
        return `No submissions on ${formatted}`;
    }

    return `${day.count} submission${day.count === 1 ? "" : "s"} on ${formatted}`;
}

/* -------------------------------------------------------------------------- */
/* Build calendar                                                               */
/* -------------------------------------------------------------------------- */

export function buildCalendar(calendarObject) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(today.getTime() - 364 * DAY);

    const days = [];

    for (let d = new Date(start); d <= today; d = new Date(d.getTime() + DAY)) {
        const ts = Math.floor(d.getTime() / 1000);

        days.push({
            date: new Date(d),
            count: Number(calendarObject?.[ts] ?? 0),
        });
    }

    const firstWeekday = start.getDay();

    const padded = [];

    for (let i = 0; i < firstWeekday; i++) {
        padded.push(null);
    }

    padded.push(...days);

    while (padded.length % 7 !== 0) {
        padded.push(null);
    }

    const columns = [];

    for (let i = 0; i < padded.length; i += 7) {
        columns.push(padded.slice(i, i + 7));
    }

    const monthLabels = [];

    let previousMonth = -1;

    columns.forEach((column, colIndex) => {
        const firstDay = column.find(Boolean);

        if (!firstDay) return;

        const month = firstDay.date.getMonth();

        if (month !== previousMonth) {
            previousMonth = month;

            monthLabels.push({
                colIndex,
                label: firstDay.date.toLocaleDateString("en-US", {
                    month: "short",
                }),
            });
        }
    });

    return {
        columns,
        monthLabels,
        totalCount: days.reduce((sum, d) => sum + d.count, 0),
        totalActiveDays: days.filter((d) => d.count > 0).length,
    };
}

/* -------------------------------------------------------------------------- */
/* Streaks                                                                      */
/* -------------------------------------------------------------------------- */

export function calculateStreaks(calendarObject) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(today.getTime() - 364 * DAY);

    const values = [];

    for (let d = new Date(start); d <= today; d = new Date(d.getTime() + DAY)) {
        const ts = Math.floor(d.getTime() / 1000);

        values.push(Number(calendarObject?.[ts] ?? 0));
    }

    let longest = 0;
    let current = 0;
    let running = 0;

    for (const value of values) {
        if (value > 0) {
            running++;
            longest = Math.max(longest, running);
        } else {
            running = 0;
        }
    }

    for (let i = values.length - 1; i >= 0; i--) {
        if (values[i] > 0) {
            current++;
        } else {
            break;
        }
    }

    return {
        currentStreak: current,
        longestStreak: longest,
    };
}