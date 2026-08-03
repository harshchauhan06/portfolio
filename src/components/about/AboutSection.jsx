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
        <div className="pointer-events-none absolute inset-0 opacity-[0.016]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.4) 3px, rgba(255,255,255,0.4) 4px)" }}
          aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.013]"
          style={{ backgroundImage: "repeating-linear-gradient(60deg, transparent, transparent 5px, rgba(120,80,30,0.3) 5px, rgba(120,80,30,0.3) 6px)" }}
          aria-hidden="true" />
      </>
    );
  };
}

/* ─── Paper-pin ornament ──────────────────────────────────────────────────── */
function PaperPin({ className }) {
  return (
    <svg viewBox="0 0 24 48" className={className} fill="none" aria-hidden="true">
      {/* Pin head */}
      <circle cx="12" cy="10" r="7" fill="#A36A1F" opacity="0.55" />
      <circle cx="12" cy="10" r="4" fill="#C89A5A" opacity="0.6" />
      <circle cx="10" cy="8"  r="1.5" fill="#FDF8EE" opacity="0.5" />
      {/* Pin shaft */}
      <line x1="12" y1="17" x2="12" y2="42" stroke="#8A5A22" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Tip */}
      <path d="M10 40 L12 44 L14 40" fill="#7A4A1A" opacity="0.35" />
    </svg>
  );
}

/* ─── Edge paths ──────────────────────────────────────────────────────────── */
const ABOUT_PATH  = paperEdgePath(1000, 560, 52, 10, 9);
const SKILLS_PATH = paperEdgePath(1000, 560, 48, 11, 7);
const AboutPaper  = makePaperBg(ABOUT_PATH,  "about");
const SkillsPaper = makePaperBg(SKILLS_PATH, "skills");

/* ─── Content ─────────────────────────────────────────────────────────────── */
const PREVIEW = `I'm a full-stack developer who enjoys turning ideas into products that are fast, reliable, and thoughtfully designed.`;

const EXTRA = `From scalable backend systems to polished frontend experiences, I focus on building software that's clean, maintainable, and genuinely useful.

Over the years I've worked across the full stack — from designing REST and GraphQL APIs to building polished React interfaces that feel fast and intuitive.

I care deeply about code quality, developer experience, and shipping things that actually work in production. When I'm not writing code, I'm exploring new AI tooling or reading about system design and product craft.

I'm currently open to full-time opportunities and interesting freelance projects. If you think we'd work well together, I'd love to chat.`;

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
      <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#3D2B1A] mb-2">
        {category}
      </h3>
      <ul className="space-y-[5px]">
        {items.map(item => (
          <li key={item} className="text-[13.5px] leading-[1.6] text-[#6B503A]">{item}</li>
        ))}
      </ul>
      {!isLast && (
        <hr className="mt-[14px] border-none h-px bg-gradient-to-r from-[#C89A5A]/30 via-[#C89A5A]/15 to-transparent" />
      )}
    </div>
  );
}

/* ─── About card ──────────────────────────────────────────────────────────── */
function AboutCard({ expanded, onToggle }) {
  return (
    <div className="relative w-full">
      <AboutPaper />
      {/* Paper-pin decoration */}
      <div className="absolute -top-5 left-[38%] z-10">
        <PaperPin className="w-5 h-10 opacity-70" />
      </div>
      <div className="relative px-9 pt-9 pb-8 sm:px-11 sm:pt-10 sm:pb-9">

        <h2 className="font-serif font-bold text-[#3D2B1A] text-[28px] sm:text-[32px] leading-none mb-6">
          About Me
        </h2>

        <div className="max-w-[88%]">
          <p className="text-[14.5px] sm:text-[15px] leading-[1.9] text-[#5A4030]">
            {PREVIEW}
          </p>

          <div
            className="grid transition-all duration-500 ease-in-out"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="text-[14.5px] sm:text-[15px] leading-[1.9] text-[#5A4030] whitespace-pre-line pt-5">
                {EXTRA}
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="mt-7 inline-flex items-center gap-1.5 text-[12.5px] font-semibold tracking-[0.02em] text-[#A36A1F] hover:text-[#7A4A0A] transition-colors duration-200"
            aria-expanded={expanded}
          >
            {expanded ? "Read Less" : "Read My Story"}
            <svg viewBox="0 0 12 12" fill="none"
              className={`w-[11px] h-[11px] transition-transform duration-300 ${expanded ? "rotate-90" : "rotate-0"}`}
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

/* ─── Working With card ───────────────────────────────────────────────────── */
function WorkingWithCard() {
  return (
    <div className="relative w-full">
      <SkillsPaper />
      <div className="relative px-9 pt-9 pb-8 sm:px-10 sm:pt-10 sm:pb-9">

        <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#A36A1F] opacity-75 mb-6">
          Working With
        </p>

        <div className="grid grid-cols-2 gap-x-8">
          <div className="space-y-[14px]">
            {LEFT_SKILLS.map((group, i) => (
              <SkillGroup
                key={group.category}
                category={group.category}
                items={group.items}
                isLast={i === LEFT_SKILLS.length - 1}
              />
            ))}
          </div>
          <div className="space-y-[14px]">
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

/* ─── Section wrapper ─────────────────────────────────────────────────────── */
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
        w-full max-w-[1180px] mx-auto
        px-5 sm:px-8
        mt-10 mb-6
        grid grid-cols-1 md:grid-cols-[55fr_45fr]
        gap-9 md:gap-10
        items-start
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
    >
      <AboutCard expanded={expanded} onToggle={() => setExpanded(e => !e)} />
      <WorkingWithCard />
    </section>
  );
}