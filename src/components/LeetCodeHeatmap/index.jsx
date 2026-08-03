/**
 * LeetCodeHeatmap/index.jsx
 *
 * "Days I Code" section — the heatmap printed directly onto the page.
 * No card wrapper. No error message. Always renders.
 *
 * Data priority: live API → bundled cache → sample data  (see HeatmapService.js)
 * Username: edit USERNAME in HeatmapService.js or set VITE_LEETCODE_USERNAME
 */

import { useEffect, useRef, useState } from "react";
import { useLeetCode }   from "./useLeetCode";
import HeatmapHeader     from "./HeatmapHeader";
import HeatmapGrid       from "./HeatmapGrid";
import HeatmapLegend     from "./HeatmapLegend";

export default function LeetCodeHeatmap() {
  const { data } = useLeetCode();
  const { calendar, streaks, totalSolved } = data;

  // Scroll-reveal for the whole section
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="leetcode"
      ref={sectionRef}
      className={`
        w-full max-w-[1180px] mx-auto
        px-5 sm:px-8
        py-16 sm:py-20
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
    >
      <HeatmapHeader />

      <HeatmapGrid
        columns={calendar.columns}
        monthLabels={calendar.monthLabels}
        revealed={visible}
      />

      <HeatmapLegend
        totalCount={calendar.totalCount}
        totalActiveDays={calendar.totalActiveDays}
        currentStreak={streaks.currentStreak}
        longestStreak={streaks.longestStreak}
        totalSolved={totalSolved}
      />
    </section>
  );
}
