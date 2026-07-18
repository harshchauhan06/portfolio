/**
 * PaperCard — fixed architecture.
 *
 * ROOT CAUSE OF CLIPPING:
 *   clip-path:path() uses fixed SVG coordinates (1000×620).
 *   When the outer div grows taller than that ratio, the clip cuts content off.
 *
 * SOLUTION:
 *   Remove clip-path from the content wrapper entirely.
 *   Use an <svg> that fills the outer div (width:100% height:100%) as a pure
 *   decorative underlay. The SVG path scales via preserveAspectRatio="none"
 *   so it always fills whatever height the content needs.
 *   Content sits in a plain relative div — no clipping, no aspect ratio lock.
 */

import { paperEdgePath } from "../../utils/paperEdge";

const VW = 1000;
const VH = 620;
const EDGE_PATH = paperEdgePath(VW, VH, 48, 11, 8);

export default function PaperCard({ children }) {
  return (
    /*
     * Outer shell — height driven entirely by children.
     * All absolute layers inside stretch to fill it.
     */
    <div className="relative w-full max-w-[720px] xl:max-w-[780px]">

      {/* ── Shadow 1: large ambient ── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full translate-y-8 scale-[1.03] blur-[56px] opacity-[0.22]"
        aria-hidden="true"
      >
        <path d={EDGE_PATH} fill="#6B3A10" />
      </svg>

      {/* ── Shadow 2: medium contact ── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full translate-y-4 blur-[22px] opacity-[0.18]"
        aria-hidden="true"
      >
        <path d={EDGE_PATH} fill="#7A4A1A" />
      </svg>

      {/* ── Shadow 3: tight sharp ── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full translate-y-[6px] translate-x-[2px] blur-[6px] opacity-[0.10]"
        aria-hidden="true"
      >
        <path d={EDGE_PATH} fill="#4A2A08" />
      </svg>

      {/*
       * ── Paper surface SVG ──
       * Absolutely fills the outer div (inset-0, h-full w-full).
       * preserveAspectRatio="none" → path stretches to any height.
       * NO clip-path here — the SVG shape IS the visible boundary.
       * Content is NOT inside this element.
       */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="paperBase" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%"   stopColor="#FFFDF7" />
            <stop offset="60%"  stopColor="#FDF8EE" />
            <stop offset="100%" stopColor="#F7EFE0" />
          </linearGradient>
          <linearGradient id="topHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"    />
          </linearGradient>
          <radialGradient id="innerVignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="#FFFDF7" stopOpacity="0"    />
            <stop offset="100%" stopColor="#C89A5A" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <path d={EDGE_PATH} fill="url(#paperBase)" />
        <path d={EDGE_PATH} fill="url(#topHighlight)" />
        <path d={EDGE_PATH} fill="url(#innerVignette)" />
        <path d={EDGE_PATH} fill="none" stroke="#A36A1F" strokeWidth="1.4" opacity="0.18" />
      </svg>

      {/* ── Grain pass 1: coarse dots ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: "radial-gradient(#7A4A1A 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
        aria-hidden="true"
      />

      {/* ── Grain pass 2: horizontal fibres ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.4) 3px, rgba(255,255,255,0.4) 4px)",
        }}
        aria-hidden="true"
      />

      {/* ── Grain pass 3: diagonal micro-weave ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(60deg, transparent, transparent 5px, rgba(120,80,30,0.3) 5px, rgba(120,80,30,0.3) 6px)",
        }}
        aria-hidden="true"
      />

      {/*
       * ── Content wrapper ──
       * position:relative → sits above all absolute layers.
       * No clip-path. No aspect-ratio. Pure normal flow.
       * Padding creates the inset from the paper edges.
       */}
      <div className="relative px-16 pt-14 pb-12 md:px-24 md:pt-16 md:pb-14">
        {children}
      </div>

    </div>
  );
}