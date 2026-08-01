import React from "react";

import { featuredProjects } from "../../data/projects";

const projectActions = [
  { label: "Live preview", href: "#contact" },
  { label: "View repo", href: "https://github.com/harshchauhan", external: true },
];

function ProjectCard({ project }) {
  return (
    <article className="group relative overflow-hidden rounded-[32px] border border-[#C69F5E]/20 bg-[#FFF5DF] p-6 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_96px_-36px_rgba(15,23,42,0.24)]">
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
          {projectActions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center rounded-full border border-[#B88D39]/20 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-300 hover:border-[#B88D39]/40 hover:bg-[#FFFBF1]"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden px-5 pb-20 pt-12 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,215,153,0.15),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(181,117,26,0.09),_transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#9B7F24]">Featured creations</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Projects I brought to life
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-700 sm:text-base">
            A carefully chosen selection of recent projects that blends thoughtful interaction with editorial polish.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
