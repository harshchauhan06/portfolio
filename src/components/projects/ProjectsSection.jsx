import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "../../data/projects";

/* ─── Bookmark ornament ──────────────────────────────────────────────────── */
function Bookmark({ className }) {
  return (
    <svg viewBox="0 0 20 32" className={className} fill="none" aria-hidden="true">
      <rect x="2" y="1" width="16" height="28" rx="2" fill="#A36A1F" opacity="0.25" stroke="#A36A1F" strokeWidth="1" />
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
        hover:-translate-y-1.5
        hover:shadow-[0_32px_96px_-36px_rgba(15,23,42,0.28)]
        stagger-child
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(246,185,74,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(183,118,29,0.12),_transparent_30%)] pointer-events-none" />

      <div className="relative flex flex-col h-full justify-between">
        <div>
          {/* Tagline */}
          <div className="mb-4 flex items-center gap-2 text-[10.5px] uppercase font-semibold tracking-[0.25em] text-[#8E6F25]">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#D69F39]" />
            <span className="truncate">{project.tagline}</span>
          </div>

          {/* Screenshot Image Container */}
          <div className="overflow-hidden rounded-[22px] border border-[#A36A1F]/15 bg-white shadow-md mb-5 group">
            <div className="flex items-center gap-1.5 bg-[#FFF8EC] border-b border-[#A36A1F]/12 px-3.5 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E57373]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFB74D]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#81C784]" />
              <span className="ml-2 text-[10.5px] font-mono text-[#7C6448] opacity-75 truncate">
                {project.demoUrl ? project.demoUrl.replace("https://", "") : "github.com"}
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2.5">
            <h3 className="font-serif text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#3D2B1A] transition-colors duration-300 group-hover:text-[#7A4E04]">
              {project.title}
            </h3>
            <p className="text-[13.5px] leading-[1.75] text-[#5A4030] font-normal">
              {project.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-3 border-t border-[#A36A1F]/10">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-1.5
                rounded-full
                border border-[#B88D39]/30 bg-[#3D2B1A] text-[#FFF8EC]
                px-4 py-2 text-xs font-semibold
                shadow-sm transition-all duration-200
                hover:bg-[#5A3E20] hover:shadow-md hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              <span>Live Demo</span>
              <svg className="w-3 h-3 opacity-80" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ) : null}

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-1.5
                rounded-full
                border border-[#B88D39]/25 bg-white/90 text-[#3D2B1A]
                px-4 py-2 text-xs font-semibold
                shadow-sm transition-all duration-200
                hover:border-[#B88D39]/50 hover:bg-[#FFFBF1] hover:-translate-y-0.5
                active:translate-y-0
              "
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#3D2B1A]">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              <span>GitHub Repo</span>
            </a>
          ) : null}
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

          <h2 className="font-serif text-[40px] sm:text-[50px] md:text-[56px] font-bold leading-[0.96] tracking-[-0.02em] text-[#3D2B1A]">
            Projects Brought<br className="hidden sm:block" /> To Life
          </h2>

          <p className="mt-5 max-w-xl text-[15px] leading-[1.8] text-[#5A4030] font-normal">
            A selection of products crafted with clarity, performance, and editorial polish.
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
