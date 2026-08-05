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
        w-full max-w-[1140px] mx-auto
        px-4 sm:px-8
        my-8 sm:my-12
        flex flex-col items-center text-center
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
