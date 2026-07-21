import { useState } from "react";
import { paperEdgePath } from "../../utils/paperEdge";

/*
 * AboutCard — handcrafted paper card with expand/collapse on "Read More".
 *
 * Uses slightly different paperEdgePath params (perSide=10, amplitude=9)
 * so this card has a subtly different organic silhouette from the hero card.
 *
 * Architecture identical to PaperCard: SVG paper as absolute background,
 * content in normal flow — so the card height grows naturally when expanded.
 *
 * Smooth height transition is achieved with CSS grid-template-rows trick:
 *   collapsed: grid-rows-[0fr]  → overflow:hidden inner div = 0 height
 *   expanded:  grid-rows-[1fr]  → inner div takes natural height
 * This animates without needing to measure pixel heights in JS.
 */

const VW = 1000;
const VH = 560;
/* Different shape from hero card */
const EDGE_PATH = paperEdgePath(VW, VH, 52, 10, 9);

const PREVIEW = `Hi, I'm Harsh Chauhan, a Full Stack Developer.

I build scalable, high-performance web applications, reliable backend
systems, and thoughtful AI-powered solutions. My passion lies in
crafting clear and impactful digital experiences.`;

const EXPANDED = `Hi, I'm Harsh Chauhan, a Full Stack Developer.

I build scalable, high-performance web applications, reliable backend
systems, and thoughtful AI-powered solutions. My passion lies in
crafting clear and impactful digital experiences.

Over the years I've worked across the full stack — from designing REST
and GraphQL APIs to building polished React interfaces that feel fast and
intuitive. I care deeply about code quality, developer experience, and
shipping things that actually work in production.

When I'm not writing code, I'm exploring new AI tooling, contributing to
open source, or reading about system design and product craft.

I'm currently open to full-time opportunities and interesting freelance
projects. If you think we'd work well together, I'd love to chat.`;

function PaperBackground() {
  return (
    <>
      {/* Shadow 1 — ambient */}
      <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full translate-y-7 scale-[1.03] blur-[52px] opacity-[0.20]"
        aria-hidden="true">
        <path d={EDGE_PATH} fill="#6B3A10" />
      </svg>

      {/* Shadow 2 — contact */}
      <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full translate-y-3 blur-[18px] opacity-[0.16]"
        aria-hidden="true">
        <path d={EDGE_PATH} fill="#7A4A1A" />
      </svg>

      {/* Shadow 3 — sharp */}
      <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full translate-y-[5px] translate-x-[2px] blur-[5px] opacity-[0.09]"
        aria-hidden="true">
        <path d={EDGE_PATH} fill="#4A2A08" />
      </svg>

      {/* Paper surface */}
      <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="paperBase2" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%"   stopColor="#FFFDF7" />
            <stop offset="60%"  stopColor="#FDF8EE" />
            <stop offset="100%" stopColor="#F7EFE0" />
          </linearGradient>
          <linearGradient id="topHighlight2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="innerVignette2" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="#FFFDF7" stopOpacity="0" />
            <stop offset="100%" stopColor="#C89A5A" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <path d={EDGE_PATH} fill="url(#paperBase2)" />
        <path d={EDGE_PATH} fill="url(#topHighlight2)" />
        <path d={EDGE_PATH} fill="url(#innerVignette2)" />
        <path d={EDGE_PATH} fill="none" stroke="#A36A1F" strokeWidth="1.4" opacity="0.16" />
      </svg>

      {/* Grain 1 — dots */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.030]"
        style={{ backgroundImage: "radial-gradient(#7A4A1A 1px, transparent 1px)", backgroundSize: "3px 3px" }}
        aria-hidden="true" />

      {/* Grain 2 — fibres */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.016]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.4) 3px, rgba(255,255,255,0.4) 4px)" }}
        aria-hidden="true" />

      {/* Grain 3 — weave */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.013]"
        style={{ backgroundImage: "repeating-linear-gradient(60deg, transparent, transparent 5px, rgba(120,80,30,0.3) 5px, rgba(120,80,30,0.3) 6px)" }}
        aria-hidden="true" />
    </>
  );
}

export default function AboutCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="flex justify-center px-6 pb-16 mt-8">
      <div className="relative w-full max-w-[480px]">

        <PaperBackground />

        {/* Content — normal flow, no clip, no aspect-ratio */}
        <div className="relative px-10 pt-9 pb-8 md:px-12 md:pt-10 md:pb-9">

          {/* Heading */}
          <h2 className="
            font-serif font-bold
            text-[#3D2B1A]
            text-[22px] leading-[1.2]
            mb-3
          ">
            About Me
          </h2>

          {/* Preview text — always visible */}
          <p className="text-[14px] leading-[1.8] text-[#5A4030] whitespace-pre-line">
            {PREVIEW}
          </p>

          {/*
            Expanded content — uses grid-template-rows trick for smooth
            height animation without measuring pixel heights.
          */}
          <div
            className="grid transition-all duration-500 ease-in-out"
            style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="
                text-[14px] leading-[1.8] text-[#5A4030]
                whitespace-pre-line
                pt-4
              ">
                {/* Strip the first paragraph (already shown in preview) */}
                {EXPANDED.split("\n\n").slice(2).join("\n\n")}
              </p>
            </div>
          </div>

          {/* Read More / Read Less button */}
          <button
            onClick={() => setExpanded(e => !e)}
            className="
              mt-4
              inline-flex items-center gap-1
              text-[13px] font-medium
              text-[#A36A1F]
              hover:text-[#7A4A0A]
              transition-colors duration-200
              group
            "
            aria-expanded={expanded}
          >
            {expanded ? "Read Less" : "Read More"}
            <svg
              viewBox="0 0 12 12" fill="none"
              className={`w-3 h-3 transition-transform duration-300 ${expanded ? "-rotate-90" : "rotate-90"}`}
              aria-hidden="true"
            >
              <path d="M3 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}