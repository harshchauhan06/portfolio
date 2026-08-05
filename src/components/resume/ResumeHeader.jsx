/*
 * ResumeHeader.jsx — Clean header for the Resume section.
 */

export default function ResumeHeader() {
  return (
    <header className="flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
      {/* Large Resume heading */}
      <h1 className="font-serif font-bold text-[#3D2B1A] text-[34px] sm:text-[44px] leading-[1.1] tracking-[-0.02em] mb-2.5">
        Resume
      </h1>

      {/* Subtitle */}
      <p className="text-[14px] sm:text-[15px] font-normal text-[#5A3E20] leading-[1.6] tracking-[0.01em]">
        A quick overview of my education, skills, projects, and experience.
      </p>
    </header>
  );
}
