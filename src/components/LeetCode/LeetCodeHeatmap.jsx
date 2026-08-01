import { useEffect, useState } from "react";

import HeatmapGrid from "./HeatmapGrid";
import HeatmapLegend from "./HeatmapLegend";
import HeatmapStats from "./HeatmapStats";
import MonthLabels from "./MonthLabels";

import {
  buildCalendar,
  calculateStreaks,
} from "../../utils/heatmap";

const USERNAME = "harshchauhan06";

export default function LeetCodeHeatmap() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [calendarData, setCalendarData] = useState({
    columns: [],
    monthLabels: [],
    totalCount: 0,
    totalActiveDays: 0,
  });

  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalSolved: 0,
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/leetcode?username=${USERNAME}`
        );

        if (!res.ok) {
          throw new Error("Failed to load LeetCode data");
        }

        const data = await res.json();

        const calendar = buildCalendar(
          data.submissionCalendar
        );

        const streaks = calculateStreaks(
          data.submissionCalendar
        );

        setCalendarData(calendar);

        setStats({
          currentStreak: streaks.currentStreak,
          longestStreak: streaks.longestStreak,
          totalSolved: data.totalSolved,
        });

        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load LeetCode data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <section
      id="leetcode"
      className="py-28 px-6"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-[12px]
              text-[#B67A2D]
              mb-3
              font-semibold
            "
          >
            Consistency
          </p>

          <h2
            className="
              text-5xl
              md:text-6xl
              font-serif
              text-[#3D2B1A]
            "
          >
            Days I Code
          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              mx-auto
              text-[#6B4A32]
              leading-8
            "
          >
            Every solved problem is another step toward
            becoming a better engineer. This heatmap shows
            my coding consistency over the past year.
          </p>

        </div>

        <div
          className="
            bg-[#FFFDF8]
            rounded-[36px]
            border
            border-[#E8D6B7]
            shadow-lg
            p-8
            md:p-10
          "
        >

          {loading && (
            <div className="py-24 text-center text-[#8B6B4A]">
              Loading LeetCode activity...
            </div>
          )}

          {!loading && error && (
            <div className="py-24 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              <MonthLabels
                columns={calendarData.columns}
                monthLabels={calendarData.monthLabels}
              />

              <HeatmapGrid
                columns={calendarData.columns}
              />

              <HeatmapLegend
                totalCount={calendarData.totalCount}
              />

              <HeatmapStats
                currentStreak={stats.currentStreak}
                longestStreak={stats.longestStreak}
                totalActiveDays={
                  calendarData.totalActiveDays
                }
                totalSolved={stats.totalSolved}
              />
            </>
          )}

        </div>

      </div>
    </section>
  );
}