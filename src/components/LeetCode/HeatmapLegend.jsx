/**
 * HeatmapLegend.jsx — Bottom row of the heatmap section.
 *
 * Left:   "103 submissions in the last year"
 * Right:  Less □ □ □ □ □ More
 *
 * Typography and colours follow the existing editorial design system.
 */

import { HEAT_LEVELS } from "../../utils/heatmap";

export default function HeatmapLegend({ totalCount }) {
  return (
    <div className="flex items-center justify-between mt-4 flex-wrap gap-y-3">

      {/* Left — submission count */}
      <p
        className="
          font-mono text-[12px] font-normal
          text-[#5A4030]/80 tracking-[0.02em]
          select-none
        "
      >
        {totalCount.toLocaleString()} submission{totalCount !== 1 ? "s" : ""} in the last year
      </p>

      {/* Right — legend swatches */}
      <div className="flex items-center gap-2">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#A36A1F]/65 select-none">
          Less
        </span>

        <div className="flex items-center gap-[4px]">
          {HEAT_LEVELS.map(({ level, bg, border, label }) => (
            <div
              key={level}
              title={label}
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                backgroundColor: bg,
                border: `1px solid ${border}`,
                boxShadow: "0 1px 2px rgba(122,66,16,0.10)",
              }}
              aria-label={label}
            />
          ))}
        </div>

        <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#A36A1F]/65 select-none">
          More
        </span>
      </div>

    </div>
  );
}
