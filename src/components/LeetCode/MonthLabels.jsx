/**
 * MonthLabels.jsx — Month header labels for the heatmap grid.
 *
 * Uses the same CSS Grid geometry as HeatmapGrid (auto-columns, 3px gap)
 * so each label aligns exactly with its first week column.
 * Typography matches the existing site label style.
 */

export default function MonthLabels({ columns, monthLabels }) {
  if (!columns.length) return null;

  const numCols = columns.length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, calc((100% - ${(numCols - 1) * 3}px) / ${numCols}))`,
        gap: "3px",
        width: "100%",
        marginBottom: "5px",
      }}
    >
      {Array.from({ length: numCols }).map((_, ci) => {
        const monthEntry = monthLabels.find((m) => m.colIndex === ci);
        return (
          <span
            key={ci}
            className="
              text-[10px] font-semibold uppercase tracking-[0.26em]
              text-[#A36A1F]/70 select-none leading-none
              truncate
            "
          >
            {monthEntry ? monthEntry.label : ""}
          </span>
        );
      })}
    </div>
  );
}
