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

/* ─── Unique Section Decoration: Paper Pin (opacity < 15%) ──────────────── */
function PaperPin({ className }) {
  return (
    <svg viewBox="0 0 24 48" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="10" r="7" fill="#A36A1F" opacity="0.14" />
      <circle cx="12" cy="10" r="4" fill="#C89A5A" opacity="0.14" />
      <line x1="12" y1="17" x2="12" y2="42" stroke="#8A5A22" strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
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
      <h3 className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#3D2B1A] mb-2">
        {category}
      </h3>
      <ul className="space-y-[4px]">
        {items.map(item => (
          <li key={item} className="text-[13px] leading-[1.6] text-[#6B503A]">{item}</li>
        ))}
      </ul>
      {!isLast && (
        <hr className="mt-[12px] border-none h-px bg-gradient-to-r from-[#C89A5A]/30 via-[#C89A5A]/15 to-transparent" />
      )}
    </div>
  );
}

/* ─── About Card ──────────────────────────────────────────────────────────── */
function AboutCard({ expanded, onToggle }) {
  return (
    <div className="relative w-full">
      <AboutPaper />
      <div className="relative px-8 pt-8 pb-7 sm:px-10 sm:pt-9 sm:pb-8">
        <h3 className="font-serif font-bold text-[#3D2B1A] text-[28px] sm:text-[32px] leading-none mb-5">
          Background
        </h3>

        <div className="max-w-[92%]">
          <p className="text-[14px] sm:text-[14.5px] leading-[1.85] text-[#5A4030]">
            {PREVIEW}
          </p>

          <div
            className="grid transition-all duration-500 ease-in-out"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="text-[14px] sm:text-[14.5px] leading-[1.85] text-[#5A4030] whitespace-pre-line pt-4">
                {EXTRA}
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.02em] text-[#A36A1F] hover:text-[#7A4A0A] transition-colors duration-200 cursor-pointer"
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

/* ─── Working With Card ───────────────────────────────────────────────────── */
function WorkingWithCard() {
  return (
    <div className="relative w-full">
      <SkillsPaper />
      <div className="relative px-8 pt-8 pb-7 sm:px-9 sm:pt-9 sm:pb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#A36A1F] opacity-75 mb-5">
          WORKING WITH
        </p>

        <div className="grid grid-cols-2 gap-x-6">
          <div className="space-y-[12px]">
            {LEFT_SKILLS.map((group, i) => (
              <SkillGroup
                key={group.category}
                category={group.category}
                items={group.items}
                isLast={i === LEFT_SKILLS.length - 1}
              />
            ))}
          </div>
          <div className="space-y-[12px]">
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
        px-5 sm:px-8
        my-12 sm:my-16
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
    >
      {/* Background Lighting Variation for Chapter 01 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,_rgba(255,245,223,0.5),_transparent_65%)] pointer-events-none" />

      {/* Left-Aligned Section Introduction (Rhythm Alignment) */}
      <div className="relative text-left mb-8 max-w-2xl">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.44em] text-[#A36A1F] opacity-85 mb-2">
          CHAPTER 01 • ABOUT
        </p>
        <h2 className="font-serif text-[38px] sm:text-[46px] font-bold leading-[1.0] text-[#3D2B1A] mb-3">
          Handcrafted Craft &amp; Engineering
        </h2>
        <p className="text-[14.5px] text-[#5A4030] leading-[1.7]">
          Turning ideas into fast, reliable software with editorial clarity and lasting attention to detail.
        </p>
      </div>

      {/* Unique Section Decoration (Paper Pin - Opacity < 15%) */}
      <div className="absolute -top-8 right-12 hidden sm:block pointer-events-none">
        <PaperPin className="w-6 h-12" />
      </div>

      {/* Connected Composition Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-6 md:gap-8 items-start">
        <AboutCard expanded={expanded} onToggle={() => setExpanded(e => !e)} />
        <WorkingWithCard />

        {/* Connecting decorative flourish on desktop */}
        <div className="hidden md:block absolute left-[54.5%] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-1 opacity-35">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A36A1F]" />
            <div className="w-px h-12 bg-gradient-to-b from-[#A36A1F]/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}