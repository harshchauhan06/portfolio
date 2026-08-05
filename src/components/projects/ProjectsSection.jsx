import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "../../data/projects";

/* ─── Project Card (App Store Showcase style on Mobile, Fits 100%) ───────── */
function ProjectCard({ project, index, visible }) {
  return (
    <article
      className={`
        group relative flex flex-col justify-between
        w-full max-w-full min-w-0 box-border overflow-hidden
        rounded-[20px] sm:rounded-[28px]
        border border-[#A36A1F]/20
        bg-[#FFF8EC]
        p-3.5 sm:p-7
        shadow-[0_12px_36px_rgba(61,43,26,.10)]
        transition-all duration-300 ease-out
        hover:-translate-y-1.5
        hover:shadow-[0_20px_52px_rgba(61,43,26,.16)]
        hover:border-[#A36A1F]/40
        stagger-child
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
    >
      {/* Background paper texture & subtle radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(246,185,74,0.12),_transparent_35%)] pointer-events-none rounded-[20px] sm:rounded-[28px]" />

      <div className="relative flex flex-col h-full justify-between w-full min-w-0 box-border overflow-hidden">
        <div className="w-full min-w-0">
          {/* Tech Tagline */}
          <div className="mb-2 sm:mb-4 flex flex-wrap items-center gap-1.5 text-[8.5px] sm:text-[10px] uppercase font-semibold tracking-wide text-[#8E6F25] w-full min-w-0 overflow-hidden">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#D69F39] flex-shrink-0" />
            <span className="break-all leading-tight min-w-0">{project.tagline}</span>
          </div>

          {/* Screenshot Image Frame */}
          <div className="overflow-hidden rounded-[14px] sm:rounded-[20px] border border-[#A36A1F]/16 bg-white shadow-sm mb-3 sm:mb-5 group-hover:shadow-md transition-shadow w-full min-w-0">
            <div className="flex items-center gap-1.5 bg-[#FFF3DF] border-b border-[#A36A1F]/12 px-2.5 py-1.5 sm:px-3.5 sm:py-2 w-full min-w-0 overflow-hidden">
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#E57373] flex-shrink-0" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#FFB74D] flex-shrink-0" />
              <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#81C784] flex-shrink-0" />
              <span className="ml-1 text-[8.5px] sm:text-[10px] font-mono text-[#7C6448] opacity-75 truncate min-w-0 flex-1">
                {project.demoUrl ? project.demoUrl.replace("https://", "") : "github.com"}
              </span>
            </div>
            <div className="relative aspect-[16/9.5] sm:aspect-[16/10] overflow-hidden bg-slate-100 w-full min-w-0">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Title & Concise Description */}
          <div className="space-y-1 sm:space-y-2 w-full min-w-0">
            <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight tracking-[-0.02em] text-[#3D2B1A] transition-colors duration-300 group-hover:text-[#7A4E04] break-words">
              {project.title}
            </h3>
            <p className="text-[12px] sm:text-[13.5px] leading-relaxed sm:leading-[1.75] text-[#5A4030] font-normal break-words">
              {project.description}
            </p>
          </div>
        </div>

        {/* Action Buttons — Full Width on Mobile */}
        <div className="mt-3.5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2.5 sm:pt-3 border-t border-[#A36A1F]/12 w-full min-w-0">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full sm:w-auto
                inline-flex items-center justify-center gap-1.5
                rounded-xl sm:rounded-full
                border border-[#3D2B1A] bg-[#3D2B1A] text-[#FFF8EC]
                px-4 py-2 text-xs font-semibold
                shadow-sm transition-all duration-200
                hover:bg-[#5A3E20] hover:shadow-md hover:-translate-y-0.5
                active:translate-y-0 cursor-pointer
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
                w-full sm:w-auto
                inline-flex items-center justify-center gap-1.5
                rounded-xl sm:rounded-full
                border border-[#A36A1F]/25 bg-white/90 text-[#3D2B1A]
                px-4 py-2 text-xs font-semibold
                shadow-sm transition-all duration-200
                hover:border-[#A36A1F]/50 hover:bg-[#FFFBF1] hover:-translate-y-0.5
                active:translate-y-0 cursor-pointer
              "
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#3D2B1A]">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              <span>GitHub Repository</span>
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
  const [showAllMobile, setShowAllMobile] = useState(false);

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
        px-3.5 sm:px-8 lg:px-10
        my-6 sm:my-10 md:my-16
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
    >
      <div className="relative mx-auto max-w-6xl w-full max-w-full overflow-hidden">
        {/* Left-Aligned Section Introduction */}
        <div className="relative text-left mb-6 sm:mb-10 max-w-2xl">
          <p className="text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.38em] sm:tracking-[0.45em] text-[#A36A1F] opacity-85 mb-2 sm:mb-3">
            FEATURED CREATIONS
          </p>

          <div className="w-12 sm:w-16 h-px bg-[#A36A1F]/30 mb-3 sm:mb-4" />

          <h2 className="font-serif text-[28px] sm:text-[38px] font-bold leading-tight tracking-[-0.01em] text-[#3D2B1A]">
            Projects I've Built
          </h2>

          <p className="mt-2.5 sm:mt-4 max-w-xl text-[13px] sm:text-[14.5px] leading-[1.65] sm:leading-[1.75] text-[#5A4030] font-normal">
            These projects helped me learn by building. Each one taught me something new, from designing better interfaces to writing cleaner backend code.
          </p>
        </div>

        {/* Cards Grid — On mobile: toggle extension */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 w-full max-w-full">
          {featuredProjects.map((project, i) => {
            const isHiddenOnMobile = !showAllMobile && i > 0;
            return (
              <div key={project.title} className={isHiddenOnMobile ? "hidden sm:block" : "block"}>
                <ProjectCard
                  project={project}
                  index={i}
                  visible={visible}
                />
              </div>
            );
          })}
        </div>

        {/* Extension / Unextension Toggle Button on Mobile */}
        <div className="mt-4 sm:hidden flex justify-center">
          <button
            type="button"
            onClick={() => setShowAllMobile((prev) => !prev)}
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-[#A36A1F]/35 bg-[#FFF8EC]
              px-5 py-2.5 text-xs font-semibold
              text-[#3D2B1A]
              shadow-[0_4px_16px_rgba(61,43,26,.10)]
              transition-all duration-200
              hover:bg-white hover:border-[#A36A1F]/50 hover:shadow-md
              active:scale-95 cursor-pointer
            "
          >
            <span>
              {showAllMobile
                ? "Show Less Projects"
                : `View All Projects (${featuredProjects.length - 1} more)`}
            </span>
            <svg
              className={`w-4 h-4 text-[#A36A1F] transition-transform duration-300 ${
                showAllMobile ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
