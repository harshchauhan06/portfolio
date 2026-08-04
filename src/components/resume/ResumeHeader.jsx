/*
 * ResumeHeader.jsx — Minimal editorial header for the Resume section.
 */

export default function ResumeHeader() {
  return (
    <header className="flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
      {/* Small RESUME label */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-[#A36A1F] opacity-90 mb-2">
        RESUME
      </p>

      {/* Large Harsh Chauhan heading */}
      <h1 className="font-serif font-bold text-[#3D2B1A] text-[34px] sm:text-[44px] leading-[1.1] tracking-[-0.02em] mb-2.5">
        Harsh Chauhan
      </h1>

      {/* Short subtitle */}
      <p className="text-[14px] sm:text-[15px] font-normal text-[#5A3E20] leading-[1.6] tracking-[0.01em]">
        A concise overview of my experience, projects and technical skills.
      </p>
    </header>
  );
}
