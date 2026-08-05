/**
 * HeatmapHeader.jsx — Editorial section header for "Days I Code".
 *
 * Center aligned (Rhythm Alignment: Center)
 * Includes a subtle pencil sketch ornament with opacity < 15%.
 */

export default function HeatmapHeader() {
  return (
    <div className="relative text-center mb-10 max-w-2xl mx-auto">
      {/* Unique Section Decoration: Pencil Sketch (Opacity < 15%) */}
      <svg
        viewBox="0 0 32 120"
        className="hidden sm:block absolute -top-4 right-0 w-5 opacity-12 pointer-events-none"
        fill="none"
        aria-hidden="true"
      >
        <rect x="10" y="8" width="12" height="88" rx="2" fill="#A36A1F" />
        <rect x="10" y="8" width="12" height="10" rx="2" fill="#C89A5A" />
        <polygon points="10,96 22,96 16,108" fill="#6B4020" />
        <line x1="16" y1="18" x2="16" y2="94" stroke="#FDF8EE" strokeWidth="1.5" />
      </svg>

      {/* Chapter & Category Label */}
      <p className="
        text-[10.5px] font-semibold uppercase
        tracking-[0.44em]
        text-[#A36A1F]
        mb-3
        opacity-85
      ">
        CHAPTER 02 • LEETCODE
      </p>

      {/* Large Heading */}
      <h2 className="
        font-serif font-bold
        text-[#3D2B1A]
        text-[40px] sm:text-[48px]
        leading-[1.0]
        tracking-[-0.02em]
      ">
        Days I Code
      </h2>

      {/* Short Description */}
      <p className="
        mt-4
        max-w-[460px]
        mx-auto
        text-[14.5px]
        text-[#6B4A32]
        leading-[1.75]
        font-normal
      ">
        Every solved problem is another step toward becoming a better engineer.
      </p>
    </div>
  );
}
