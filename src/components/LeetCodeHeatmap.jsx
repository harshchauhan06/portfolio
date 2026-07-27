import React from 'react';
import data from '../data/leetcode-graph.json';

// Simple heatmap component that renders a 53x7 calendar similar to GitHub/LeetCode contribution view
export default function LeetCodeHeatmap({ weeks = 53, cellSize = 12, gap = 4 }) {
  const calendar = data.submissionCalendar || {};

  // Build a map of YYYY-MM-DD -> count
  const counts = new Map(Object.entries(calendar));

  // Compute start date (weeks * 7 days ago, starting at beginning of week)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const totalDays = weeks * 7;
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (totalDays - 1));

  // helper to format date
  function fmt(d) {
    return d.toISOString().slice(0, 10);
  }

  // Build 2D array [week][day]
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
    // interpolate between light green and dark green
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
  };

  // Flatten grid preserving column-major order so DOM order matches visual layout
  const cells = [];
  for (let day = 0; day < 7; day++) {
    for (let week = 0; week < weeks; week++) {
      cells.push(grid[week][day]);
    }
  }

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h3 style={{ margin: 0 }}>LeetCode activity</h3>
        <div style={{ color: '#6b7280', fontSize: 12 }}>
          {data.totalSolved} solved • Easy {data.easySolved} • Medium {data.mediumSolved} • Hard {data.hardSolved}
        </div>
      </div>

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

      <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', fontSize: 12 }}>
        <span style={{ color: '#6b7280' }}>Less</span>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 12, height: 12, background: '#ebedf0', borderRadius: 3, border: '1px solid rgba(0,0,0,0.04)' }} />
          <div style={{ width: 12, height: 12, background: '#9be9a8', borderRadius: 3 }} />
          <div style={{ width: 12, height: 12, background: '#40c463', borderRadius: 3 }} />
          <div style={{ width: 12, height: 12, background: '#30a14e', borderRadius: 3 }} />
          <div style={{ width: 12, height: 12, background: '#216e39', borderRadius: 3 }} />
        </div>
        <span style={{ color: '#6b7280' }}>More</span>
      </div>
    </div>
  );
}
