/**
 * HeatmapStats.jsx — Editorial stat chips below the heatmap.
 *
 * Renders four understated stats:
 *   Current Streak / Longest Streak / Total Active Days / Problems Solved
 *
 * Designed to feel like running editorial text, not dashboard widgets.
 * Separated by thin amber dividers matching the portfolio's ornamental style.
 */

function Stat({ label, value, unit }) {
  return (
    <div className="flex flex-col items-center gap-[3px] px-5 first:pl-0 last:pr-0">
      <span
        className="
          font-serif font-bold text-[#3D2B1A]
          text-[22px] sm:text-[26px]
          leading-none tabular-nums
        "
      >
        {value}
      </span>
      <span
        className="
          text-[9.5px] font-semibold uppercase tracking-[0.30em]
          text-[#A36A1F]/65 leading-none
          whitespace-nowrap
        "
      >
        {label}
        {unit && (
          <span className="ml-1 normal-case tracking-normal opacity-75">
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
        height: 32,
        background: "linear-gradient(to bottom, transparent, rgba(163,106,31,0.25) 30%, rgba(163,106,31,0.25) 70%, transparent)",
        flexShrink: 0,
      }}
    />
  );
}

export default function HeatmapStats({ currentStreak, longestStreak, totalActiveDays, totalSolved }) {
  const stats = [
    { label: "Current Streak", value: currentStreak, unit: currentStreak === 1 ? "day" : "days" },
    { label: "Longest Streak", value: longestStreak, unit: longestStreak === 1 ? "day" : "days" },
    { label: "Active Days",    value: totalActiveDays, unit: null },
    { label: "Problems Solved",value: totalSolved,    unit: null },
  ];

  return (
    <div className="flex items-center justify-center mt-8 flex-wrap gap-y-4">
      {stats.map((s, i) => (
        <div key={s.label} className="flex items-center">
          <Stat label={s.label} value={s.value} unit={s.unit} />
          {i < stats.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}
