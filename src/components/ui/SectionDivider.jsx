/**
 * SectionDivider.jsx
 *
 * Elegant editorial separators between page sections.
 * Inspired by Kinfolk, Aesop, and Monograph magazine editorial design.
 *
 * Each variant draws itself in when scrolled into view via IntersectionObserver.
 * Never uses large cards or boxes — pure ornamental line-work.
 *
 * Usage:
 *   <SectionDivider variant="hero-about" />
 *   <SectionDivider variant="about-code" />
 *   <SectionDivider variant="code-projects" />
 *   <SectionDivider variant="projects-contact" />
 */

import { useEffect, useRef } from "react";

const INK = "#A36A1F";
const INK_FAINT = "#C89A5A";

/* ─── Ornament primitives ────────────────────────────────────────────────── */

/** Tiny rotated diamond */
function Diamond({ x = 0, y = 0, size = 4, opacity = 0.5, className = "" }) {
  return (
    <rect
      x={x - size / 2}
      y={y - size / 2}
      width={size}
      height={size}
      fill={INK}
      opacity={opacity}
      transform={`rotate(45 ${x} ${y})`}
      className={className}
    />
  );
}

/** Registration cross mark */
function RegMark({ cx, cy, r = 7, opacity = 0.3 }) {
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="0.8" />
      <line x1={cx - r - 3} y1={cy} x2={cx + r + 3} y2={cy} stroke={INK} strokeWidth="0.7" />
      <line x1={cx} y1={cy - r - 3} x2={cx} y2={cy + r + 3} stroke={INK} strokeWidth="0.7" />
    </g>
  );
}

/** Row of three tiny dots */
function DotRow({ cx, cy, gap = 8, opacity = 0.35 }) {
  return (
    <g opacity={opacity}>
      {[-1, 0, 1].map((i) => (
        <circle key={i} cx={cx + i * gap} cy={cy} r={1.5} fill={INK} />
      ))}
    </g>
  );
}

/** Compass arc mark */
function CompassMark({ cx, cy, r = 10, opacity = 0.28 }) {
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth="0.8" strokeDasharray="2 3" />
      <circle cx={cx} cy={cy} r={2} fill={INK} />
    </g>
  );
}

/** Small editorial star */
function Star({ cx, cy, size = 6, opacity = 0.4 }) {
  const pts = Array.from({ length: 4 }, (_, i) => {
    const angle = (i / 4) * Math.PI * 2 - Math.PI / 4;
    const inner = size * 0.38;
    const outer = size;
    const ax = cx + outer * Math.cos(angle);
    const ay = cy + outer * Math.sin(angle);
    const bx = cx + inner * Math.cos(angle + Math.PI / 4);
    const by = cy + inner * Math.sin(angle + Math.PI / 4);
    return `${ax},${ay} ${bx},${by}`;
  });
  return (
    <polygon
      points={pts.join(" ")}
      fill={INK}
      opacity={opacity}
    />
  );
}

/* ─── Divider variants ───────────────────────────────────────────────────── */

/**
 * Hero → About
 * Thin centred rule with a small registration cross in the middle.
 * Reads like a colophon separator.
 */
function HeroAboutDivider() {
  const W = 600;
  const CX = W / 2;
  const CY = 20;
  return (
    <svg
      viewBox={`0 0 ${W} 40`}
      className="w-full max-w-[480px] mx-auto"
      fill="none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Left rule */}
      <line
        className="divider-line"
        x1={10} y1={CY} x2={CX - 20} y2={CY}
        stroke={INK_FAINT} strokeWidth="0.8" opacity="0.55"
        pathLength="1"
      />
      {/* Right rule */}
      <line
        className="divider-line"
        x1={CX + 20} y1={CY} x2={W - 10} y2={CY}
        stroke={INK_FAINT} strokeWidth="0.8" opacity="0.55"
        pathLength="1"
      />
      {/* Centre ornament */}
      <RegMark cx={CX} cy={CY} r={7} opacity={0.38} />
    </svg>
  );
}

/**
 * About → Days I Code
 * Double rule with a pencil-tip diamond — suggests a writing/coding motif.
 */
function AboutCodeDivider() {
  const W = 700;
  const CX = W / 2;
  const CY = 22;
  return (
    <svg
      viewBox={`0 0 ${W} 44`}
      className="w-full max-w-[560px] mx-auto"
      fill="none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Outer left */}
      <line
        className="divider-line"
        x1={10} y1={CY - 4} x2={CX - 28} y2={CY - 4}
        stroke={INK_FAINT} strokeWidth="0.7" opacity="0.4"
        pathLength="1"
      />
      {/* Inner left */}
      <line
        className="divider-line"
        x1={24} y1={CY + 4} x2={CX - 16} y2={CY + 4}
        stroke={INK_FAINT} strokeWidth="0.5" opacity="0.25"
        pathLength="1"
      />
      {/* Centre diamond */}
      <Diamond x={CX} y={CY} size={7} opacity={0.55} className="divider-ornament" />
      <Diamond x={CX} y={CY} size={4} opacity={0.3} className="divider-ornament" />
      {/* Inner right */}
      <line
        className="divider-line"
        x1={CX + 16} y1={CY + 4} x2={W - 24} y2={CY + 4}
        stroke={INK_FAINT} strokeWidth="0.5" opacity="0.25"
        pathLength="1"
      />
      {/* Outer right */}
      <line
        className="divider-line"
        x1={CX + 28} y1={CY - 4} x2={W - 10} y2={CY - 4}
        stroke={INK_FAINT} strokeWidth="0.7" opacity="0.4"
        pathLength="1"
      />
    </svg>
  );
}

/**
 * Days I Code → Projects
 * Wider ornamental rule with three dots flanked by thin lines.
 * Feels like a page break in a magazine layout.
 */
function CodeProjectsDivider() {
  const W = 800;
  const CX = W / 2;
  const CY = 20;
  return (
    <svg
      viewBox={`0 0 ${W} 40`}
      className="w-full max-w-[640px] mx-auto"
      fill="none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Left thick rule */}
      <line
        className="divider-line"
        x1={10} y1={CY} x2={CX - 40} y2={CY}
        stroke={INK_FAINT} strokeWidth="0.9" opacity="0.5"
        pathLength="1"
      />
      {/* Left accent mark */}
      <line
        className="divider-line"
        x1={10} y1={CY - 5} x2={10} y2={CY + 5}
        stroke={INK} strokeWidth="1.2" opacity="0.35"
        pathLength="1"
      />
      {/* Centre three dots */}
      <DotRow cx={CX} cy={CY} gap={9} opacity={0.5} />
      {/* Right thick rule */}
      <line
        className="divider-line"
        x1={CX + 40} y1={CY} x2={W - 10} y2={CY}
        stroke={INK_FAINT} strokeWidth="0.9" opacity="0.5"
        pathLength="1"
      />
      {/* Right accent mark */}
      <line
        className="divider-line"
        x1={W - 10} y1={CY - 5} x2={W - 10} y2={CY + 5}
        stroke={INK} strokeWidth="1.2" opacity="0.35"
        pathLength="1"
      />
    </svg>
  );
}

/**
 * Projects → Contact
 * A compass arc with a star, suggesting "find me" / destination.
 * Closing-chapter feel.
 */
function ProjectsContactDivider() {
  const W = 600;
  const CX = W / 2;
  const CY = 24;
  return (
    <svg
      viewBox={`0 0 ${W} 48`}
      className="w-full max-w-[480px] mx-auto"
      fill="none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* Left arm — tapers to nothing */}
      <line
        className="divider-line"
        x1={10} y1={CY} x2={CX - 32} y2={CY}
        stroke={INK_FAINT} strokeWidth="0.8" opacity="0.45"
        pathLength="1"
      />
      {/* Star centre */}
      <Star cx={CX} cy={CY} size={8} opacity={0.5} />
      {/* Right arm */}
      <line
        className="divider-line"
        x1={CX + 32} y1={CY} x2={W - 10} y2={CY}
        stroke={INK_FAINT} strokeWidth="0.8" opacity="0.45"
        pathLength="1"
      />
      {/* Flanking compass marks */}
      <CompassMark cx={CX - 72} cy={CY} r={8} opacity={0.22} />
      <CompassMark cx={CX + 72} cy={CY} r={8} opacity={0.22} />
    </svg>
  );
}

/* ─── Variant map ─────────────────────────────────────────────────────────── */
const VARIANTS = {
  "hero-about":       HeroAboutDivider,
  "about-code":       AboutCodeDivider,
  "code-projects":    CodeProjectsDivider,
  "projects-contact": ProjectsContactDivider,
};

/* ─── SectionDivider ─────────────────────────────────────────────────────── */
export default function SectionDivider({ variant = "hero-about", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("divider-draw");
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Inner = VARIANTS[variant] ?? HeroAboutDivider;

  return (
    <div
      ref={ref}
      className={`w-full px-6 ${className}`}
      aria-hidden="true"
    >
      <Inner />
    </div>
  );
}
