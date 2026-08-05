/*
 * SectionDivider.jsx — Handcrafted Editorial Chapter Dividers.
 *
 * Compact vertical margins on mobile (30-40% reduction): my-7 sm:my-12 md:my-16
 */

import { useEffect, useRef, useState } from "react";

const CHAPTER_CONFIGS = {
  "hero-about": {
    chapter: "CHAPTER 01",
    title: "ABOUT",
    ornament: (
      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A36A1F]">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
  "code-projects": {
    chapter: "CHAPTER 02",
    title: "PROJECTS",
    ornament: (
      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A36A1F]">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.3" opacity="0.5" />
        <polygon points="12,5 14,10 19,10 15,13 17,18 12,15 7,18 9,13 5,10 10,10" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  "projects-contact": {
    chapter: "CHAPTER 03",
    title: "CONTACT",
    ornament: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A36A1F]">
        <rect x="3" y="5" width="18" height="14" rx="2" opacity="0.6" />
        <path d="M3 7l9 6 9-6" opacity="0.6" />
      </svg>
    ),
  },
};

export default function SectionDivider({ variant = "hero-about", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const config = CHAPTER_CONFIGS[variant] || CHAPTER_CONFIGS["hero-about"];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        w-full flex flex-col items-center justify-center text-center
        my-7 sm:my-12 md:my-16 px-4
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        ${className}
      `}
      aria-hidden="true"
    >
      {/* Editorial line with center ornament */}
      <div className="flex items-center justify-center w-full max-w-[320px] sm:max-w-[440px] gap-3 sm:gap-4 mb-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#A36A1F]/25 to-[#A36A1F]/40" />
        <div className="flex items-center justify-center p-1 sm:p-1.5 rounded-full bg-[#FFF8EC] border border-[#A36A1F]/20 shadow-sm">
          {config.ornament}
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#A36A1F]/25 to-[#A36A1F]/40" />
      </div>

      {/* Chapter Marker Label */}
      {config.chapter && (
        <div className="flex items-center gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.38em] sm:tracking-[0.45em] text-[#A36A1F] opacity-80 mt-0.5">
          <span>{config.chapter}</span>
          <span className="opacity-35">•</span>
          <span>{config.title}</span>
        </div>
      )}
    </div>
  );
}
