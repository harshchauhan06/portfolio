/**
 * HeatmapGrid.jsx — The contribution grid, printed directly onto the page.
 *
 * No card wrapper. Cells appear with a staggered reveal animation when
 * the section scrolls into view. Warm yellow palette only — no GitHub blue.
 */

import { useEffect, useRef, useState } from "react";
import { getHeatLevel, formatTooltip } from "./utils";

/* ─── Month label row ────────────────────────────────────────────────────── */
function MonthRow({ columns, monthLabels }) {
  if (!columns.length) return null;
  const n = columns.length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
        gap: "3px",
        marginBottom: "6px",
      }}
    >
      {columns.map((_, ci) => {
        const m = monthLabels.find((ml) => ml.colIndex === ci);
        return (
          <span
            key={ci}
            style={{
              fontSize: "10px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.24em",
              color: "rgba(163,106,31,0.72)",
              lineHeight: 1,
              overflow: "hidden",
              textOverflow: "clip",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {m ? m.label : ""}
          </span>
        );
      })}
    </div>
  );
}

/* ─── Single cell ────────────────────────────────────────────────────────── */
function HeatCell({ day, revealed, delay }) {
  const [hovered, setHovered] = useState(false);

  if (!day) {
    return (
      <div style={{ aspectRatio: "1", borderRadius: 4, background: "transparent" }} />
    );
  }

  const { bg, border } = getHeatLevel(day.count);
  const tooltip = formatTooltip(day);

  return (
    <div
      className="relative heat-cell"
      style={{
        aspectRatio: "1",
        transitionDelay: `${delay}ms`,
        ...(revealed ? { opacity: 1, transform: "translateY(0)" } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cell */}
      <div
        aria-label={tooltip}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 4,
          backgroundColor: bg,
          border: `1px solid ${border}`,
          transform: hovered ? "scale(1.3)" : "scale(1)",
          boxShadow: hovered
            ? "0 3px 10px rgba(122,66,16,0.28)"
            : "0 1px 2px rgba(122,66,16,0.07)",
          filter: hovered ? "brightness(1.1)" : "brightness(1)",
          transition: "transform 140ms ease, box-shadow 140ms ease, filter 140ms ease",
          cursor: "default",
          position: "relative",
          zIndex: hovered ? 10 : 1,
        }}
      />

      {/* Tooltip */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#2C1A0E",
            color: "#FDF8EE",
            fontSize: "10.5px",
            fontWeight: 500,
            letterSpacing: "0.01em",
            lineHeight: 1.45,
            padding: "5px 9px",
            borderRadius: 6,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 50,
            boxShadow: "0 4px 14px rgba(44,26,14,0.28)",
          }}
        >
          {tooltip}
          {/* Caret */}
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
              borderTop: "4px solid #2C1A0E",
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Grid ───────────────────────────────────────────────────────────────── */
export default function HeatmapGrid({ columns, monthLabels, revealed }) {
  if (!columns.length) return null;

  const flatCells = columns.flatMap((col) => col);
  const n = columns.length;

  return (
    <div className="w-full overflow-x-auto pb-1">
      <div style={{ minWidth: `${n * 14}px` }}>
        {/* Month labels */}
        <MonthRow columns={columns} monthLabels={monthLabels} />

        {/* Cell grid */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(7, 1fr)",
            gridAutoFlow: "column",
            gridAutoColumns: `calc((100% - ${(n - 1) * 3}px) / ${n})`,
            gap: "3px",
            width: "100%",
          }}
        >
          {flatCells.map((day, i) => (
            <HeatCell
              key={i}
              day={day}
              revealed={revealed}
              delay={Math.min(600, Math.floor(i / 7) * 14)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
