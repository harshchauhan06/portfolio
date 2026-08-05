import { useEffect, useRef, useState } from "react";
import { paperEdgePath } from "../../utils/paperEdge";

/* ─── Paper background factory ────────────────────────────────────────────── */
function makePaperBg(edgePath, id) {
  return function PaperBg() {
    return (
      <>
        <svg viewBox="0 0 1000 560" preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full translate-y-7 scale-[1.03] blur-[52px] opacity-[0.20]"
          aria-hidden="true"><path d={edgePath} fill="#6B3A10" /></svg>

        <svg viewBox="0 0 1000 560" preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full translate-y-3 blur-[18px] opacity-[0.16]"
          aria-hidden="true"><path d={edgePath} fill="#7A4A1A" /></svg>

        <svg viewBox="0 0 1000 560" preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full translate-y-[5px] translate-x-[2px] blur-[5px] opacity-[0.09]"
          aria-hidden="true"><path d={edgePath} fill="#4A2A08" /></svg>

        <svg viewBox="0 0 1000 560" preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`pb-${id}`} x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%"   stopColor="#FFFDF7" />
              <stop offset="60%"  stopColor="#FDF8EE" />
              <stop offset="100%" stopColor="#F7EFE0" />
            </linearGradient>
            <linearGradient id={`th-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`iv-${id}`} cx="50%" cy="50%" r="70%">
              <stop offset="0%"   stopColor="#FFFDF7" stopOpacity="0" />
              <stop offset="100%" stopColor="#C89A5A" stopOpacity="0.05" />
            </radialGradient>
          </defs>
          <path d={edgePath} fill={`url(#pb-${id})`} />
          <path d={edgePath} fill={`url(#th-${id})`} />
          <path d={edgePath} fill={`url(#iv-${id})`} />
          <path d={edgePath} fill="none" stroke="#A36A1F" strokeWidth="1.4" opacity="0.16" />
        </svg>

        <div className="pointer-events-none absolute inset-0 opacity-[0.030]"
          style={{ backgroundImage: "radial-gradient(#7A4A1A 1px, transparent 1px)", backgroundSize: "3px 3px" }}
          aria-hidden="true" />
      </>
    );
  };
}

/* ─── Edge paths ──────────────────────────────────────────────────────────── */
const ABOUT_PATH  = paperEdgePath(1000, 560, 52, 10, 9);
const SKILLS_PATH = paperEdgePath(1000, 560, 48, 11, 7);
const AboutPaper  = makePaperBg(ABOUT_PATH,  "about");
const SkillsPaper = makePaperBg(SKILLS_PATH, "skills");

/* ─── Content ─────────────────────────────────────────────────────────────── */
const BACKGROUND_CONTENT = `Computer Science student focused on full-stack development, problem solving, and building practical applications that people can actually use.`;

const EXTRA_CONTENT = `I started programming because I was curious about how websites worked. That curiosity turned into a habit of building projects, learning new tools, and constantly improving my skills.

I enjoy backend development just as much as creating clean and responsive user interfaces. My goal is to build software that is simple, reliable, and helpful.`;

const LEFT_SKILLS = [
  { category: "Languages",        items: ["C", "C++", "Python", "JavaScript"] },
  { category: "Frontend",         items: ["React", "HTML", "CSS", "Tailwind CSS"] },
  { category: "Computer Science", items: ["Data Structures", "Algorithms"] },
];

const RIGHT_SKILLS = [
  { category: "Backend",  items: ["Node.js", "Express.js"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB"] },
  { category: "Tools",    items: ["VS Code", "Git / GitHub", "Postman", "Jupyter Notebook"] },
];

function SkillGroup({ category, items, isLast }) {
  return (
    <div>
      <h3 className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#3D2B1A] mb-1.5 sm:mb-2">
        {category}
      </h3>
      <ul className="space-y-[3px] sm:space-y-[4px]">
        {items.map(item => (
          <li key={item} className="text-[12.5px] sm:text-[13px] leading-[1.5] text-[#6B503A]">{item}</li>
        ))}
      </ul>
      {!isLast && (
        <hr className="mt-[10px] sm:mt-[12px] border-none h-px bg-gradient-to-r from-[#C89A5A]/30 via-[#C89A5A]/15 to-transparent" />
      )}
    </div>
  );
}

/* ─── About Card ──────────────────────────────────────────────────────────── */
function AboutCard({ expanded, onToggle }) {
  return (
    <div className="relative w-full">
      <AboutPaper />
      <div className="relative px-6 pt-6 pb-5 sm:px-10 sm:pt-9 sm:pb-8">
        <h3 className="font-serif font-bold text-[#3D2B1A] text-[24px] sm:text-[30px] leading-none mb-3 sm:mb-5">
          Background
        </h3>

        <div className="max-w-[96%] sm:max-w-[92%]">
          <p className="text-[13.5px] sm:text-[14.5px] leading-[1.7] sm:leading-[1.85] text-[#5A4030]">
            {BACKGROUND_CONTENT}
          </p>

          <div
            className="grid transition-all duration-500 ease-in-out"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="text-[13.5px] sm:text-[14.5px] leading-[1.7] sm:leading-[1.85] text-[#5A4030] whitespace-pre-line pt-3 sm:pt-4">
                {EXTRA_CONTENT}
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="mt-4 sm:mt-6 inline-flex items-center gap-1.5 text-[11.5px] sm:text-[12px] font-semibold tracking-[0.02em] text-[#A36A1F] hover:text-[#7A4A0A] transition-colors duration-200 cursor-pointer"
            aria-expanded={expanded}
          >
            {expanded ? "Read Less" : "Read More"}
            <svg viewBox="0 0 12 12" fill="none"
              className={`w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] transition-transform duration-300 ${expanded ? "rotate-90" : "rotate-0"}`}
              aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Tech Stack Card ─────────────────────────────────────────────────────── */
function WorkingWithCard() {
  return (
    <div className="relative w-full">
      <SkillsPaper />
      <div className="relative px-6 pt-6 pb-5 sm:px-9 sm:pt-9 sm:pb-8">
        <p className="text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-[0.40em] sm:tracking-[0.42em] text-[#A36A1F] opacity-75 mb-3.5 sm:mb-5">
          TECH STACK
        </p>

        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6">
          <div className="space-y-[10px] sm:space-y-[12px]">
            {LEFT_SKILLS.map((group, i) => (
              <SkillGroup
                key={group.category}
                category={group.category}
                items={group.items}
                isLast={i === LEFT_SKILLS.length - 1}
              />
            ))}
          </div>
          <div className="space-y-[10px] sm:space-y-[12px]">
            {RIGHT_SKILLS.map((group, i) => (
              <SkillGroup
                key={group.category}
                category={group.category}
                items={group.items}
                isLast={i === RIGHT_SKILLS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Section Wrapper ─────────────────────────────────────────────────────── */
export default function AboutSection() {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className={`
        relative w-full max-w-[1140px] mx-auto
        px-4 sm:px-8
        my-6 sm:my-10 md:my-16
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
    >
      {/* Left-Aligned Heading */}
      <div className="relative text-left mb-6 sm:mb-10 max-w-2xl">
        <div className="w-12 sm:w-16 h-px bg-[#A36A1F]/30 mb-3 sm:mb-4" />
        <h2 className="font-serif text-[28px] sm:text-[38px] font-bold leading-tight text-[#3D2B1A] mb-2 sm:mb-4 tracking-[-0.01em]">
          A Little About Me
        </h2>
        <p className="text-[13px] sm:text-[14.5px] text-[#5A4030] leading-[1.65] sm:leading-[1.75] max-w-xl">
          I started programming because I was curious about how websites worked. That curiosity turned into a habit of building projects, learning new tools, and constantly improving my skills. I enjoy backend development just as much as creating clean and responsive user interfaces.
        </p>
      </div>

      {/* Connected Composition Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-5 md:gap-8 items-start">
        <AboutCard expanded={expanded} onToggle={() => setExpanded(e => !e)} />
        <WorkingWithCard />
      </div>
    </section>
  );
}