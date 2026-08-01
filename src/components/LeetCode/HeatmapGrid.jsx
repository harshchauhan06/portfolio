/**
 * HeatmapGrid.jsx — The contribution grid for "Days I Code".
 *
 * Renders 53 week-columns × 7 day-rows. Each cell is a rounded square
 * that maps submission count to the portfolio's warm yellow palette.
 *
 * Layout strategy:
 *   CSS Grid with `grid-auto-flow: column` and 7 fixed rows.
 *   This fills top-to-bottom first (Sun→Sat) then left-to-right (week→week),
 *   matching the GitHub/LeetCode contribution-graph convention.
 *
 * Hover: scale, brightness lift, and a floating tooltip.
 */

import { useState } from "react";
import { getColor, formatTooltip } from "../../utils/heatmap";

/* ─── Single cell ────────────────────────────────────────────────────────── */

function HeatCell({ day }) {
  const [hovered, setHovered] = useState(false);

  /* Empty padding cell (null day at start/end of first/last week). */
  if (!day) {
    return (
      <div
        style={{
          aspectRatio: "1",
          borderRadius: 4,
          backgroundColor: "transparent",
        }}
      />
    );
  }

  const { bg, border } = getColor(day.count);
  const tooltip = formatTooltip(day);

  return (
    <div
      className="relative"
      style={{ aspectRatio: "1" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* The cell square */}
      <div
        aria-label={tooltip}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 4,
          backgroundColor: bg,
          border: `1px solid ${border}`,
          boxShadow: hovered
            ? "0 2px 8px rgba(122,66,16,0.24)"
            : "0 1px 2px rgba(122,66,16,0.08)",
          transform: hovered ? "scale(1.25)" : "scale(1)",
          transition: "transform 150ms ease, box-shadow 150ms ease, filter 150ms ease",
          filter: hovered ? "brightness(1.09)" : "brightness(1)",
          cursor: "default",
          position: "relative",
          zIndex: hovered ? 10 : 1,
        }}
      />

      {/* Floating tooltip */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 7px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#3D2B1A",
            color: "#FDF8EE",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.01em",
            lineHeight: 1.4,
            padding: "4px 8px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 50,
            boxShadow: "0 4px 12px rgba(61,43,26,0.24)",
          }}
        >
          {tooltip}
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "4px solid #3D2B1A",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Grid ───────────────────────────────────────────────────────────────── */

export default function HeatmapGrid({ columns }) {
  if (!columns.length) return null;

  /*
   * Flatten columns into a 1-D array for CSS Grid with grid-auto-flow:column.
   * Each column has exactly 7 cells (padded with null). The grid has 7 rows
   * and auto-adds columns, filling top-to-bottom then left-to-right.
   */
  const flatCells = columns.flatMap((col) => col);
  const numCols   = columns.length;

  return (
    <div className="w-full overflow-x-auto pb-1">
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(7, 1fr)",
          gridAutoFlow: "column",
          gridAutoColumns: `calc((100% - ${(numCols - 1) * 3}px) / ${numCols})`,
          gap: "3px",
          width: "100%",
          minWidth: `${numCols * 10}px`,
        }}
      >
        {flatCells.map((day, i) => (
          <HeatCell key={i} day={day} />
        ))}
      </div>
    </div>
  );
}
