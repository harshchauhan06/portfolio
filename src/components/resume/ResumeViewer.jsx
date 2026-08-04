/*
 * ResumeViewer.jsx — Plain document preview fitting exact A4 aspect ratio.
 */

import { SOCIAL_LINKS } from "../../config/socialLinks";

export default function ResumeViewer({ containerRef }) {
  const pdfUrl = SOCIAL_LINKS.resumePdf || "/resume.pdf";

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[820px] mx-auto px-2 sm:px-4 mt-2 mb-12"
    >
      {/* 
        A4 Aspect Ratio (1:1.414) wrapper with overflow-hidden to fit 
        the full resume document cleanly.
      */}
      <div className="relative w-full aspect-[1/1.414] min-h-[600px] sm:min-h-[900px] bg-white overflow-hidden shadow-sm border-0 rounded-sm">
        <div className="absolute inset-0 overflow-hidden border-0 bg-white">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title="Harsh Chauhan Resume"
            frameBorder="0"
            scrolling="no"
            style={{
              border: "none",
              outline: "none",
              width: "calc(100% + 46px)",
              height: "calc(100% + 14px)",
              marginTop: "-8px",
              marginLeft: "-18px",
            }}
            className="border-0 outline-none block bg-white pointer-events-none"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
