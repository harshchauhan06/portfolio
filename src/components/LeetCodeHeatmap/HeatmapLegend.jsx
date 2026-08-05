/**
 * HeatmapLegend.jsx
 *
 * Responsive statistics & legend:
 * - 2-column grid on mobile screens
 * - Flex row on tablet/desktop
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
  ];

  return (
    <div className="mt-5 w-full max-w-[900px] mx-auto space-y-4">
      {/* 2-Column Grid on Mobile, Flex Ribbon on Desktop */}
      <div className="
        grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-x-6 sm:gap-y-2
        py-3 px-4
        rounded-2xl sm:rounded-full
        bg-[#FFF8EC]/90
        border border-[#A36A1F]/15
        shadow-sm
        text-[11px] sm:text-[12px]
        font-medium text-[#5A4030]
      ">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center justify-between sm:justify-start gap-1.5 p-1 sm:p-0">
            <span className="text-[#A36A1F] uppercase text-[9px] sm:text-[9.5px] tracking-wider font-semibold truncate">{s.label}:</span>
            <span className="font-serif font-bold text-[#3D2B1A] text-[12.5px] sm:text-[13px]">{s.value}</span>
            {i < stats.length - 1 && (
              <span className="hidden sm:inline ml-4 text-[#A36A1F]/30 select-none">•</span>
            )}
          </div>
        ))}
      </div>

      {/* Legend & Submissions Summary */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-1 pt-1 text-center sm:text-left">
        <p className="text-[10.5px] sm:text-[11px] font-mono text-[#6B4A32]/80 tracking-wide mx-auto sm:mx-0">
          Coding activity over the last year
        </p>

        <div className="flex items-center justify-center gap-1.5 mx-auto sm:mx-0">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A36A1F]/70 select-none">
            Less
          </span>
          <div className="flex items-center gap-[2.5px]">
            {HEAT_LEVELS.map(({ level, bg, border, label }) => (
              <div
                key={level}
                title={label}
                aria-label={label}
                className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] shadow-sm transition-transform hover:scale-125"
                style={{
                  backgroundColor: bg,
                  border: `1px solid ${border}`,
                }}
              />
            ))}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A36A1F]/70 select-none">
            More
          </span>
        </div>
      </div>
    </div>
  );
}
