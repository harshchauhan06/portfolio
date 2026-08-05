/**
 * SectionDivider.jsx
 *
 * Handcrafted editorial separators between sections:
 * - Low opacity brown linework (#A36A1F)
 * - Decorative stars, diamonds, flourishes, and registration marks
 * - Drawn smoothly on scroll
 */

import { useEffect, useRef } from "react";

const INK = "#A36A1F";
const INK_FAINT = "#C89A5A";

/** Diamond ornament */
function Diamond({ x = 0, y = 0, size = 5, opacity = 0.5 }) {
  return (
    <rect
      x={x - size / 2}
      y={y - size / 2}
      width={size}
      height={size}
      fill={INK}
      opacity={opacity}
      transform={`rotate(45 ${x} ${y})`}
    />
  );
}

/** Star ornament */
function Star({ cx, cy, size = 6, opacity = 0.45 }) {
  const pts = Array.from({ length: 4 }, (_, i) => {
    const angle = (i / 4) * Math.PI * 2 - Math.PI / 4;
    const inner = size * 0.35;
    const outer = size;
    const ax = cx + outer * Math.cos(angle);
    const ay = cy + outer * Math.sin(angle);
    const bx = cx + inner * Math.cos(angle + Math.PI / 4);
    const by = cy + inner * Math.sin(angle + Math.PI / 4);
    return `${ax},${ay} ${bx},${by}`;
  });
  return <polygon points={pts.join(" ")} fill={INK} opacity={opacity} />;
}

/** 1. Hero → About Divider: Double line + Star + Registration marks */
function HeroAboutDivider() {
  const W = 640;
  const CX = W / 2;
  const CY = 20;

  return (
    <svg viewBox={`0 0 ${W} 40`} className="w-full max-w-[520px] mx-auto" fill="none" aria-hidden="true">
      <line x1={20} y1={CY} x2={CX - 28} y2={CY} stroke={INK_FAINT} strokeWidth="0.8" opacity="0.45" />
      <Star cx={CX} cy={CY} size={7} opacity={0.6} />
      <line x1={CX + 28} y1={CY} x2={W - 20} y2={CY} stroke={INK_FAINT} strokeWidth="0.8" opacity="0.45" />
      <circle cx={CX - 85} cy={CY} r="1.5" fill={INK} opacity="0.35" />
      <circle cx={CX + 85} cy={CY} r="1.5" fill={INK} opacity="0.35" />
    </svg>
  );
}

/** 2. About → LeetCode Divider: Vintage flourish + Diamond line */
function AboutCodeDivider() {
  const W = 700;
  const CX = W / 2;
  const CY = 20;

  return (
    <svg viewBox={`0 0 ${W} 40`} className="w-full max-w-[580px] mx-auto" fill="none" aria-hidden="true">
      <line x1={15} y1={CY - 3} x2={CX - 32} y2={CY - 3} stroke={INK_FAINT} strokeWidth="0.7" opacity="0.4" />
      <line x1={30} y1={CY + 3} x2={CX - 20} y2={CY + 3} stroke={INK_FAINT} strokeWidth="0.5" opacity="0.25" />
      <Diamond x={CX} y={CY} size={7} opacity={0.65} />
      <line x1={CX + 20} y1={CY + 3} x2={W - 30} y2={CY + 3} stroke={INK_FAINT} strokeWidth="0.5" opacity="0.25" />
      <line x1={CX + 32} y1={CY - 3} x2={W - 15} y2={CY - 3} stroke={INK_FAINT} strokeWidth="0.7" opacity="0.4" />
    </svg>
  );
}

/** 3. LeetCode → Projects Divider: Ink flourish stroke + paper tab ornament */
function CodeProjectsDivider() {
  const W = 720;
  const CX = W / 2;
  const CY = 22;

  return (
    <svg viewBox={`0 0 ${W} 44`} className="w-full max-w-[620px] mx-auto" fill="none" aria-hidden="true">
      <line x1={20} y1={CY} x2={CX - 42} y2={CY} stroke={INK_FAINT} strokeWidth="0.8" opacity="0.4" />
      {/* Paper tab / flourish element */}
      <path
        d={`M ${CX - 14} ${CY - 6} C ${CX - 4} ${CY - 12}, ${CX + 4} ${CY + 12}, ${CX + 14} ${CY + 6}`}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
      <circle cx={CX} cy={CY} r="2" fill={INK} opacity="0.6" />
      <line x1={CX + 42} y1={CY} x2={W - 20} y2={CY} stroke={INK_FAINT} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

/** 4. Projects → Contact Divider: Vintage ink script + paper fold flourish */
function ProjectsContactDivider() {
  const W = 600;
  const CX = W / 2;
  const CY = 22;

  return (
    <svg viewBox={`0 0 ${W} 44`} className="w-full max-w-[500px] mx-auto" fill="none" aria-hidden="true">
      <line x1={20} y1={CY} x2={CX - 35} y2={CY} stroke={INK_FAINT} strokeWidth="0.8" opacity="0.4" />
      {/* Editorial paper scroll tab */}
      <rect x={CX - 9} y={CY - 9} width="18" height="18" rx="4" fill="#FFF8EC" stroke={INK} strokeWidth="1" opacity="0.6" />
      <path d={`M ${CX - 4} ${CY - 3} L ${CX + 4} ${CY - 3} M ${CX - 4} ${CY + 1} L ${CX + 2} ${CY + 1}`} stroke={INK} strokeWidth="1" opacity="0.5" />
      <line x1={CX + 35} y1={CY} x2={W - 20} y2={CY} stroke={INK_FAINT} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

const VARIANTS = {
  "hero-about": HeroAboutDivider,
  "about-code": AboutCodeDivider,
  "code-projects": CodeProjectsDivider,
  "projects-contact": ProjectsContactDivider,
};

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
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Inner = VARIANTS[variant] ?? HeroAboutDivider;

  return (
    <div ref={ref} className={`w-full px-4 my-8 sm:my-10 ${className}`} aria-hidden="true">
      <Inner />
    </div>
  );
}
