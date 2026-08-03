import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "../../data/projects";

/* ─── Bookmark ornament ──────────────────────────────────────────────────── */
function Bookmark({ className }) {
  return (
    <svg viewBox="0 0 20 32" className={className} fill="none" aria-hidden="true">
      <rect x="2" y="1" width="16" height="28" rx="2" fill="#A36A1F" opacity="0.25" stroke="#A36A1F" strokeWidth="1" opacity2="0.4" />
      <path d="M2 22 L10 28 L18 22" fill="#A36A1F" opacity="0.55" />
      <line x1="6" y1="7" x2="14" y2="7" stroke="#FDF8EE" strokeWidth="1.2" opacity="0.5" />
      <line x1="6" y1="11" x2="14" y2="11" stroke="#FDF8EE" strokeWidth="1" opacity="0.35" />
      <line x1="6" y1="15" x2="11" y2="15" stroke="#FDF8EE" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

/* ─── Project card ───────────────────────────────────────────────────────── */
function ProjectCard({ project, index, visible }) {
  return (
    <article
      className={`
        group relative overflow-hidden
        rounded-[32px]
        border border-[#C69F5E]/20
        bg-[#FFF5DF]
        p-6
        shadow-[0_24px_80px_-42px_rgba(15,23,42,0.24)]
        transition duration-300
        hover:-translate-y-1
        hover:shadow-[0_32px_96px_-36px_rgba(15,23,42,0.24)]
        stagger-child
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
      style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(246,185,74,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(183,118,29,0.12),_transparent_30%)] pointer-events-none" />
      <div className="relative">
        <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#8E6F25]">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#D69F39]" />
          {project.tagline}
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/40 bg-[#F8E4B6] p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.24)]">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_0_4px_rgba(255,255,255,0.75)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FCD34D] shadow-[0_0_0_4px_rgba(255,255,255,0.75)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24] shadow-[0_0_0_4px_rgba(255,255,255,0.75)]" />
          </div>
          <div className="space-y-3 rounded-[22px] bg-slate-950/95 p-4 text-slate-50 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35)]">
            <div className="h-3.5 rounded-full bg-white/15" />
            <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
            <div className="grid gap-2 pt-4 sm:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <div className="h-2.5 w-4/5 rounded-full bg-white/15" />
                <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
                <div className="h-2.5 w-2/5 rounded-full bg-white/10" />
              </div>
              <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-3xl bg-white/8 text-sm font-semibold text-white/85">AI</div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="font-serif text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-950 transition-colors duration-300 group-hover:text-[#7A4E04]">
            {project.title}
          </h3>
          <p className="text-sm leading-7 text-slate-700">{project.description}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-[#B88D39]/20 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-300 hover:border-[#B88D39]/40 hover:bg-[#FFFBF1]"
          >
            Live preview
          </a>
          <a
            href="https://github.com/harshchauhan06"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-[#B88D39]/20 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-300 hover:border-[#B88D39]/40 hover:bg-[#FFFBF1]"
          >
            View repo
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={ref}
      className={`
        relative overflow-hidden
        px-5 sm:px-8 lg:px-10
        pb-20 pt-12
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,215,153,0.15),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(181,117,26,0.09),_transparent_28%)]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Editorial header */}
        <div className="mb-14 max-w-2xl">

          {/* Bookmark ornament */}
          <Bookmark className="w-4 h-7 mb-5 opacity-80" />

          <p className="text-[11px] font-semibold uppercase tracking-[0.44em] text-[#A36A1F] opacity-85 mb-4">
            Featured Creations
          </p>

          <h2 className="font-serif text-[40px] sm:text-[50px] md:text-[56px] font-bold leading-[0.96] tracking-[-0.02em] text-slate-950">
            Projects Brought<br className="hidden sm:block" /> To Life
          </h2>

          <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-[#5A4030] font-normal">
            A selection of products crafted with clarity and editorial polish.
          </p>

          {/* Inline quote */}
          <p className="mt-4 text-[13.5px] italic text-[#8A6A40]/80 leading-[1.7]">
            &ldquo;A selection of products crafted with thoughtful interaction and editorial attention to detail.&rdquo;
          </p>
        </div>

        {/* Cards — staggered */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
