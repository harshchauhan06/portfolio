export default function HeroButtons() {
  return (
    <div className="flex items-center justify-center gap-6">

      {/* Primary CTA — ~12% larger padding than before */}
      <button
        className="
          inline-flex items-center gap-2
          rounded-xl
          bg-[#3D2B1A]
          px-10 py-[17px]
          text-[15px] font-semibold
          text-[#FFF8EC]
          shadow-[0_8px_24px_rgba(61,43,26,.20)]
          transition-all duration-200
          hover:bg-[#2C1A0E]
          hover:-translate-y-[1px]
          hover:shadow-[0_10px_28px_rgba(61,43,26,.28)]
          active:translate-y-0
        "
      >
        Explore Projects
        <svg className="w-[13px] h-[13px] opacity-60" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M2 6.5h9M7.5 3l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Secondary CTA — ghost, visually lighter */}
      <button
        className="
          rounded-xl
          border border-[#A36A1F]/35
          bg-transparent
          px-10 py-[16px]
          text-[15px] font-medium
          text-[#3D2B1A]
          transition-all duration-200
          hover:border-[#A36A1F]/60
          hover:bg-[#A36A1F]/[0.05]
          hover:-translate-y-[1px]
          active:translate-y-0
        "
      >
        Download Résumé
      </button>

    </div>
  );
}