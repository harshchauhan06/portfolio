// Shared ink colors - warm browns/accents instead of pure black, used across
// every decorative element so the palette stays consistent.
const INK = "#8A5A22";
const TEAL = "#2B6660";
const TERRACOTTA = "#B5651D";

/**
 * Nested thin arches, inspired by Talavera ceramic/textile motifs.
 * Pure line work - no fill - so it frames the composition without
 * competing with the paper card.
 */
function NestedArches({ className }) {
  const radii = [70, 52, 34];
  return (
    <svg viewBox="0 0 160 160" className={className} fill="none" aria-hidden="true">
      {radii.map((r, i) => (
        <path
          key={r}
          d={`M 10 150 A ${r} ${r} 0 0 1 ${10 + r * 2} 150`}
          stroke={i === 1 ? TEAL : INK}
          strokeWidth="1.4"
          opacity={0.4 - i * 0.08}
        />
      ))}
    </svg>
  );
}

/**
 * Abstract sun motif - concentric rings with short radiating ticks.
 * A quiet nod to the "energetic" brief without literal sun rays or cartoon styling.
 */
function SunMedallion({ className }) {
  const ticks = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    const r1 = 30;
    const r2 = 37;
    return (
      <line
        key={i}
        x1={50 + r1 * Math.cos(angle)}
        y1={50 + r1 * Math.sin(angle)}
        x2={50 + r2 * Math.cos(angle)}
        y2={50 + r2 * Math.sin(angle)}
        stroke={INK}
        strokeWidth="1.2"
        opacity="0.35"
      />
    );
  });

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="22" stroke={INK} strokeWidth="1.4" opacity="0.4" />
      <circle cx="50" cy="50" r="14" stroke={TERRACOTTA} strokeWidth="1.4" opacity="0.45" />
      {ticks}
    </svg>
  );
}

/**
 * All decorative accents composed together: a thin gallery frame,
 * corner arches, one sun medallion, and two sparse accent dots.
 * These frame the composition and never sit in the center hero zone.
 */
export default function DecorativeShapes() {
  return (
    <>
      <div
        className="absolute inset-4 sm:inset-8 border border-[#8A5A22]/25 rounded-sm pointer-events-none"
        aria-hidden="true"
      />

      <NestedArches className="absolute top-6 left-6 w-24 sm:w-32 opacity-80" />
      <NestedArches className="absolute bottom-6 right-6 w-24 sm:w-32 opacity-80 rotate-180" />

      <SunMedallion className="absolute top-8 right-8 w-16 sm:w-20" />

      <span
        className="absolute left-[9%] bottom-[14%] h-2 w-2 rounded-full bg-[#2B6660] opacity-[0.55]"
        aria-hidden="true"
      />
      <span
        className="absolute right-[12%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#B5651D] opacity-50"
        aria-hidden="true"
      />
    </>
  );
}