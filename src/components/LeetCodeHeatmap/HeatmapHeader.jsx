/**
 * HeatmapHeader.jsx — Editorial section header for "Days I Code".
 *
 * Small uppercase label → large serif heading → one-line supporting text.
 * Includes a subtle pencil-sketch ornament on desktop.
 */

export default function HeatmapHeader() {
  return (
    <div className="relative text-center mb-12">

      {/* Pencil ornament — desktop only */}
      <svg
        viewBox="0 0 32 120"
        className="hidden lg:block absolute right-0 top-0 w-6 opacity-20"
        fill="none"
        aria-hidden="true"
      >
        {/* Pencil body */}
        <rect x="10" y="8" width="12" height="88" rx="2" fill="#A36A1F" />
        {/* Eraser */}
        <rect x="10" y="8" width="12" height="10" rx="2" fill="#C89A5A" />
        {/* Tip */}
        <polygon points="10,96 22,96 16,108" fill="#6B4020" />
        {/* Centre line */}
        <line x1="16" y1="18" x2="16" y2="94" stroke="#FDF8EE" strokeWidth="1.5" opacity="0.4" />
        {/* Side lines */}
        <line x1="10" y1="18" x2="10" y2="96" stroke="#8A5A22" strokeWidth="0.6" opacity="0.3" />
        <line x1="22" y1="18" x2="22" y2="96" stroke="#8A5A22" strokeWidth="0.6" opacity="0.3" />
      </svg>

      {/* Label */}
      <p className="
        text-[11px] font-semibold uppercase
        tracking-[0.44em]
        text-[#A36A1F]
        mb-4
        opacity-85
      ">
        Consistency
      </p>

      {/* Heading */}
      <h2 className="
        font-serif font-bold
        text-[#3D2B1A]
        text-[44px] sm:text-[52px] md:text-[58px]
        leading-[0.95]
        tracking-[-0.02em]
      ">
        Days I Code
      </h2>

      {/* Supporting text */}
      <p className="
        mt-5
        max-w-[460px]
        mx-auto
        text-[15px]
        text-[#6B4A32]
        leading-[1.8]
        font-normal
      ">
        Every solved problem is another step toward becoming a better engineer.
      </p>

    </div>
  );
}
