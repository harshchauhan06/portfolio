import { useEffect, useMemo, useRef, useState } from "react";
import leetcodeCache from "../../data/leetcode.json";

const MONTH_MARKERS = [
  { label: "Aug", week: 0 },
  { label: "Sep", week: 4 },
  { label: "Oct", week: 9 },
  { label: "Nov", week: 13 },
  { label: "Dec", week: 18 },
  { label: "Jan", week: 23 },
  { label: "Feb", week: 27 },
  { label: "Mar", week: 31 },
  { label: "Apr", week: 36 },
  { label: "May", week: 41 },
  { label: "Jun", week: 45 },
  { label: "Jul", week: 49 },
];

const LEVEL_CLASSES = [
  "bg-amber-50 border-amber-100",
  "bg-amber-200/70 border-amber-200",
  "bg-amber-300/80 border-amber-300",
  "bg-amber-400/90 border-amber-400",
  "bg-amber-500 border-amber-500",
];

const LEETCODE_USERNAME = import.meta.env.VITE_LEETCODE_USERNAME ?? "harshchauhan06";
const LEETCODE_API = import.meta.env.VITE_LEETCODE_API_URL ?? "/api/leetcode";

function normalizeDate(date) {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized.toISOString().slice(0, 10);
}

function createCalendarGrid(activityMap) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastSunday = new Date(today);
  lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());

  const startSunday = new Date(lastSunday);
  startSunday.setDate(startSunday.getDate() - 7 * 51);

  return Array.from({ length: 52 }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(startSunday);
      date.setDate(date.getDate() + weekIndex * 7 + dayIndex);
      const dateKey = normalizeDate(date);
      const count = Number(activityMap[dateKey] ?? 0);
      return { date, count, dateKey, isFuture: date > today };
    });
  });
}

function countLevels(weeks) {
  const rawCells = weeks.flat();
  const maxCount = Math.max(1, ...rawCells.map(cell => cell.count));
  const cells = rawCells.map((cell) => ({
    ...cell,
    level: cell.count === 0 ? 0 : Math.min(4, Math.max(1, Math.ceil((cell.count / maxCount) * 4))),
  }));

  return {
    cells,
    total: rawCells.reduce((sum, cell) => sum + cell.count, 0),
  };
}

function getInitialActivity() {
  return leetcodeCache.submissionCalendar ?? {};
}

export default function ContributionsSection() {
  const [activityMap, setActivityMap] = useState(getInitialActivity);
  const [showUnavailable, setShowUnavailable] = useState(false);
  const [reveal, setReveal] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        if (entries[0]?.isIntersecting) {
          setReveal(true);
          observerInstance.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function loadLeetCode() {
      try {
        const response = await fetch(`${LEETCODE_API}?username=${LEETCODE_USERNAME}`);

        if (!response.ok) {
          throw new Error(`LeetCode API responded with ${response.status}`);
        }

        const result = await response.json();
        const calendar = result?.submissionCalendar;

        if (!calendar || Object.keys(calendar).length === 0) {
          throw new Error("LeetCode calendar is unavailable.");
        }

        setActivityMap(calendar);
        console.info("[LeetCode] Loaded live data from API.");
      } catch (err) {
        console.warn("[LeetCode] Live API fetch failed, falling back to cache.", err);

        if (!leetcodeCache?.submissionCalendar || Object.keys(leetcodeCache.submissionCalendar).length === 0) {
          setShowUnavailable(true);
          return;
        }

        setActivityMap(leetcodeCache.submissionCalendar);
      }
    }

    loadLeetCode();
  }, []);

  const weeks = useMemo(() => createCalendarGrid(activityMap), [activityMap]);
  const { cells, total } = useMemo(() => countLevels(weeks), [weeks]);
  const summaryText = showUnavailable ? "Live data unavailable" : `${total} submissions this year`;

  return (
    <section
      ref={sectionRef}
      className={`w-full max-w-[1180px] mx-auto px-5 sm:px-8 mt-10 mb-6 transition-all duration-700 ease-out ${reveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(245, 158, 11, 0.12), transparent 28%), radial-gradient(circle at top right, rgba(245, 158, 11, 0.08), transparent 20%)",
          }}
          aria-hidden="true"
        />

        <div className="relative space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-block h-px w-12 bg-slate-300/70" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#7A4A05]">
                Days I Code
              </p>
            </div>

            <h2 className="max-w-[15ch] text-4xl font-serif font-bold tracking-tight text-slate-950 sm:text-[3rem]">
              LeetCode activity
            </h2>

            <p className="max-w-2xl text-sm leading-7 text-slate-700">
              A visual record of my consistency and problem-solving journey.
            </p>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="min-w-[860px] sm:min-w-[1020px]">
              <div className="grid grid-cols-[repeat(52,minmax(0,1fr))] gap-1.5 text-[10px] uppercase tracking-[0.28em] text-slate-600">
                {Array.from({ length: 52 }, (_, week) => {
                  const month = MONTH_MARKERS.find(marker => marker.week === week);
                  return (
                    <div key={week} className="h-4 leading-4 text-left">
                      {month?.label ?? ""}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-[repeat(52,minmax(0,14px))] gap-1.5">
                {cells.map((cell, index) => (
                  <div
                    key={cell.dateKey}
                    className={`relative h-[14px] w-[14px] rounded-[5px] border ${LEVEL_CLASSES[cell.level]} transition-all duration-500 ease-out hover:scale-[1.08] hover:shadow-[0_6px_16px_rgba(15,23,42,0.12)] hover:brightness-110 ${reveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                    title={`${cell.count} submissions on ${cell.dateKey}`}
                    aria-label={`${cell.count} submissions on ${cell.dateKey}`}
                    style={{ transitionDelay: `${Math.min(300, Math.floor(index / 7) * 18)}ms` }}
                  >
                    <span className="pointer-events-none absolute inset-auto block h-full w-full rounded-[5px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-300/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-950">{summaryText}</p>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-slate-600">
              <span>Less</span>
              <div className="grid grid-cols-5 gap-1">
                {LEVEL_CLASSES.map((cls, index) => (
                  <span key={index} className={`block h-4 w-4 rounded-sm border ${cls}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
