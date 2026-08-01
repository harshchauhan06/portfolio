import React, { useEffect, useState } from 'react';
import fallbackData from '../data/leetcode-graph.json';

// Heatmap component that renders a 53x7 calendar similar to GitHub/LeetCode contribution view
// Fetches data from /api/leetcode when available, falls back to committed JSON
export default function LeetCodeHeatmap({ weeks = 53, cellSize = 12, gap = 4 }) {
  const [data, setData] = useState(fallbackData || {});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/leetcode');
        if (!res.ok) throw new Error('no data');
        const json = await res.json();
        if (mounted) setData(json);
      } catch (e) {
        // keep fallback
      }
    })();
    return () => (mounted = false);
  }, []);

  const calendar = data.submissionCalendar || {};
  const counts = new Map(Object.entries(calendar));

  // Compute start date: align to previous Sunday so columns represent weeks (Sunday->Saturday)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const totalDays = weeks * 7;
  const rawStart = new Date(today);
  rawStart.setDate(rawStart.getDate() - (totalDays - 1));
  // move back to previous Sunday
  const dayOfWeek = rawStart.getDay();
  const startDate = new Date(rawStart);
  startDate.setDate(rawStart.getDate() - ((dayOfWeek + 7) % 7));

  // helper to format date
  function fmt(d) {
    return d.toISOString().slice(0, 10);
  }

  // Build grid [week][day] where day 0 = Sunday
  const grid = [];
  for (let w = 0; w < weeks; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const dayIndex = w * 7 + d;
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + dayIndex);
      const key = fmt(date);
      const val = Number(counts.get(key) || 0);
      col.push({ date: key, count: val });
    }
    grid.push(col);
  }

  // Determine color scale based on max count
  let max = 0;
  for (const col of grid) for (const cell of col) if (cell.count > max) max = cell.count;

  function colorFor(count) {
    if (!count) return '#ebedf0'; // empty
    if (max === 0) return '#9be9a8';
    const p = count / max;
    if (p < 0.25) return '#9be9a8';
    if (p < 0.5) return '#40c463';
    if (p < 0.75) return '#30a14e';
    return '#216e39';
  }

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${weeks}, ${cellSize}px)`,
    gridTemplateRows: `repeat(7, ${cellSize}px)`,
    gap: `${gap}px`,
    alignItems: 'start',
    justifyContent: 'start',
    // place items by column so DOM order can be simple row-major if needed
    gridAutoFlow: 'column',
  };

  // Flatten grid in column-major order so each column is a week (Sunday->Saturday)
  const cells = [];
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < 7; day++) {
      cells.push(grid[week][day]);
    }
  }

  // compute stats safely
  const totalSolved = data.totalSolved || fallbackData.totalSolved || 0;
  const easySolved = data.easySolved || fallbackData.easySolved || 0;
  const mediumSolved = data.mediumSolved || fallbackData.mediumSolved || 0;
  const hardSolved = data.hardSolved || fallbackData.hardSolved || 0;

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <p className="uppercase tracking-[0.35em] text-[12px] text-[#B67A2D] mb-3 font-semibold">Consistency</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3D2B1A]">Days I Code</h2>
          <p className="mt-3 max-w-2xl mx-auto text-[#6B4A32] leading-7">Every solved problem is another step toward becoming a better engineer. This heatmap shows my coding consistency over the past year.</p>
        </div>

        <div className="bg-[#FFFDF8] rounded-[36px] border border-[#E8D6B7] shadow-lg p-6 md:p-10">
          <div style={{ overflowX: 'auto', paddingTop: 12 }}>
            <div style={containerStyle}>
              {cells.map((c) => (
                <div
                  key={c.date}
                  title={`${c.date}: ${c.count} submission${c.count === 1 ? '' : 's'}`}
                  aria-label={`${c.date}: ${c.count} submissions`}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    background: colorFor(c.count),
                    borderRadius: 3,
                    boxSizing: 'border-box',
                    border: '1px solid rgba(0,0,0,0.04)'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 text-sm text-[#6b7280]">
            <span>Less</span>
            <div className="flex gap-2">
              <div style={{ width: 12, height: 12, background: '#ebedf0', borderRadius: 3, border: '1px solid rgba(0,0,0,0.04)' }} />
              <div style={{ width: 12, height: 12, background: '#9be9a8', borderRadius: 3 }} />
              <div style={{ width: 12, height: 12, background: '#40c463', borderRadius: 3 }} />
              <div style={{ width: 12, height: 12, background: '#30a14e', borderRadius: 3 }} />
              <div style={{ width: 12, height: 12, background: '#216e39', borderRadius: 3 }} />
            </div>
            <span>More</span>

            <div className="ml-auto text-[#6b7280]">{totalSolved} solved • Easy {easySolved} • Medium {mediumSolved} • Hard {hardSolved}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
