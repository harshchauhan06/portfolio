/**
 * HeatmapLegend.jsx
 *
 * Bottom legend row:
 *   Left:  "{N} submissions this year"  (or streak stats)
 *   Right: Less □ □ □ □ □ More
 *
 * Styled as editorial running text — no dashboard widgets.
 */

import { HEAT_LEVELS } from "./utils";

function Stat({ label, value, unit }) {
  return (
    <div className="flex flex-col items-center gap-[3px]">
      <span
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontWeight: 700,
          color: "#3D2B1A",
          fontSize: "clamp(18px, 2.4vw, 24px)",
          lineHeight: 1,
          tabularNums: "normal",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "9px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.30em",
          color: "rgba(163,106,31,0.65)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {label}
        {unit && (
          <span style={{ marginLeft: "3px", opacity: 0.75, textTransform: "none", letterSpacing: 0 }}>
            {unit}
          </span>
        )}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 1,
        height: 30,
        background:
          "linear-gradient(to bottom, transparent, rgba(163,106,31,0.22) 30%, rgba(163,106,31,0.22) 70%, transparent)",
        flexShrink: 0,
      }}
    />
  );
}

export default function HeatmapLegend({
  totalCount,
  totalActiveDays,
  currentStreak,
  longestStreak,
  totalSolved,
}) {
  const stats = [
    { label: "Submissions", value: totalCount.toLocaleString(), unit: null },
    { label: "Active Days",  value: totalActiveDays, unit: null },
    { label: "Current Streak", value: currentStreak, unit: currentStreak === 1 ? "day" : "days" },
    { label: "Longest Streak", value: longestStreak, unit: longestStreak === 1 ? "day" : "days" },
    { label: "Solved", value: totalSolved, unit: null },
  ];

  return (
    <div className="mt-8 space-y-6">

      {/* Stat row */}
      <div className="flex items-center justify-center gap-0 flex-wrap">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="px-4 sm:px-6 first:pl-0 last:pr-0">
              <Stat label={s.label} value={s.value} unit={s.unit} />
            </div>
            {i < stats.length - 1 && <Divider />}
          </div>
        ))}
      </div>

      {/* Legend row */}
      <div
        className="flex items-center justify-between flex-wrap gap-y-2"
        style={{
          borderTop: "1px solid rgba(163,106,31,0.14)",
          paddingTop: "16px",
        }}
      >
        <p
          style={{
            fontSize: "11.5px",
            fontFamily: "monospace",
            color: "rgba(90,64,48,0.72)",
            letterSpacing: "0.02em",
            userSelect: "none",
          }}
        >
          {totalCount.toLocaleString()} submission{totalCount !== 1 ? "s" : ""} in the last year
        </p>

        <div className="flex items-center gap-2.5">
          <span
            style={{
              fontSize: "9.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "rgba(163,106,31,0.60)",
              userSelect: "none",
            }}
          >
            Less
          </span>
          <div className="flex items-center gap-[4px]">
            {HEAT_LEVELS.map(({ level, bg, border, label }) => (
              <div
                key={level}
                title={label}
                aria-label={label}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  backgroundColor: bg,
                  border: `1px solid ${border}`,
                  boxShadow: "0 1px 2px rgba(122,66,16,0.10)",
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: "9.5px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "rgba(163,106,31,0.60)",
              userSelect: "none",
            }}
          >
            More
          </span>
        </div>
      </div>

    </div>
  );
}
