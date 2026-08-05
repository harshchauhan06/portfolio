/**
 * HeatmapLegend.jsx
 *
 * Bottom editorial caption bar:
 * - Small editorial ribbon for stats (Submissions, Active Days, Streaks, Solved)
 * - Clean Less □ □ □ □ □ More legend
 * - Integrated seamlessly into paper aesthetic
 */

import { HEAT_LEVELS } from "./utils";

export default function HeatmapLegend({
  totalCount,
  totalActiveDays,
  currentStreak,
  longestStreak,
  totalSolved,
}) {
  const stats = [
    { label: "Submissions", value: totalCount.toLocaleString() },
    { label: "Active Days", value: totalActiveDays },
    { label: "Current Streak", value: `${currentStreak} ${currentStreak === 1 ? "day" : "days"}` },
    { label: "Longest Streak", value: `${longestStreak} ${longestStreak === 1 ? "day" : "days"}` },
    { label: "Total Solved", value: totalSolved },
  ];

  return (
    <div className="mt-6 w-full max-w-[900px] mx-auto space-y-4">
      {/* Editorial Statistics Ribbon */}
      <div className="
        flex items-center justify-center flex-wrap gap-x-6 gap-y-2
        py-2.5 px-4
        rounded-full
        bg-[#FFF8EC]/80
        border border-[#A36A1F]/15
        shadow-sm
        text-[11.5px] sm:text-[12px]
        font-medium text-[#5A4030]
      ">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="text-[#A36A1F] uppercase text-[9.5px] tracking-widest font-semibold">{s.label}:</span>
            <span className="font-serif font-bold text-[#3D2B1A] text-[13px]">{s.value}</span>
            {i < stats.length - 1 && (
              <span className="ml-4 text-[#A36A1F]/30 select-none">•</span>
            )}
          </div>
        ))}
      </div>

      {/* Legend & Submissions Summary */}
      <div className="flex items-center justify-between flex-wrap gap-y-2 px-2 pt-2">
        <p className="text-[11px] font-mono text-[#6B4A32]/80 tracking-wide">
          {totalCount.toLocaleString()} submission{totalCount !== 1 ? "s" : ""} recorded in the past year
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#A36A1F]/70 select-none">
            Less
          </span>
          <div className="flex items-center gap-[3px]">
            {HEAT_LEVELS.map(({ level, bg, border, label }) => (
              <div
                key={level}
                title={label}
                aria-label={label}
                className="w-[11px] h-[11px] rounded-[2.5px] shadow-sm transition-transform hover:scale-125"
                style={{
                  backgroundColor: bg,
                  border: `1px solid ${border}`,
                }}
              />
            ))}
          </div>
          <span className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#A36A1F]/70 select-none">
            More
          </span>
        </div>
      </div>
    </div>
  );
}
