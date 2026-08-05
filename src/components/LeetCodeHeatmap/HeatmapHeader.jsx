/**
 * HeatmapHeader.jsx — Clean title & description for the contribution graph.
 */

export default function HeatmapHeader() {
  return (
    <div className="relative text-center max-w-2xl mx-auto mb-6">
      {/* Decorative center line */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="h-px w-8 bg-[#A36A1F]/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#A36A1F]/40" />
        <div className="h-px w-8 bg-[#A36A1F]/30" />
      </div>

      <h2 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight tracking-[-0.01em] text-[#3D2B1A]">
        Days I Code
      </h2>

      <p className="mt-2 text-[13px] sm:text-[14.5px] leading-[1.65] text-[#5A4030] max-w-lg mx-auto">
        Most of my learning happens by solving problems consistently. This heatmap reflects the time I've spent practicing and improving throughout the year.
      </p>
    </div>
  );
}
