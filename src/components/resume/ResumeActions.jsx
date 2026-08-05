/*
 * ResumeActions.jsx — Single Download PDF button.
 */

import { SOCIAL_LINKS } from "../../config/socialLinks";

export default function ResumeActions() {
  const pdfUrl = SOCIAL_LINKS.resumePdf || "/resume.pdf";

  return (
    <div className="flex items-center justify-center my-4 w-full max-w-[850px] mx-auto px-4">
      <a
        href={pdfUrl}
        download="Harsh_Chauhan_Resume.pdf"
        aria-label="Download Resume PDF"
        className="
          group
          inline-flex items-center justify-center gap-2.5
          px-6 py-3
          rounded-full
          bg-[#3D2B1A] text-[#FFF8EC]
          font-medium text-[14px]
          shadow-[0_4px_16px_rgba(61,43,26,.18)]
          border border-[#3D2B1A]
          transition-all duration-200 ease-out
          hover:bg-[#5A3E20] hover:shadow-[0_6px_20px_rgba(61,43,26,.26)] hover:-translate-y-[2px]
          active:translate-y-0 active:scale-95
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A36A1F] focus-visible:ring-offset-2
          cursor-pointer
        "
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-y-0.5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>Download PDF</span>
      </a>
    </div>
  );
}
