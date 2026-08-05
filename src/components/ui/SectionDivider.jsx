/*
 * SectionDivider.jsx — Handcrafted Editorial Chapter Dividers.
 *
 * Creates clear chapter breaks between sections:
 * - Hero → About (CHAPTER 01 · ABOUT with ✦ star)
 * - About → LeetCode (CHAPTER 02 · LEETCODE with ✎ pencil)
 * - LeetCode → Projects (CHAPTER 03 · PROJECTS with ★ star/stamp)
 * - Projects → Contact (CHAPTER 04 · CONTACT with ✉ letter)
 */

import { useEffect, useRef, useState } from "react";

const CHAPTER_CONFIGS = {
  "hero-about": {
    chapter: "CHAPTER 01",
    title: "ABOUT",
    ornament: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#A36A1F]">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" opacity="0.75" />
      </svg>
    ),
  },
  "about-code": {
    chapter: "CHAPTER 02",
    title: "LEETCODE",
    ornament: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 text-[#A36A1F]">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" opacity="0.75" />
      </svg>
    ),
  },
  "code-projects": {
    chapter: "CHAPTER 03",
    title: "PROJECTS",
    ornament: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#A36A1F]">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
        <polygon points="12,5 14,10 19,10 15,13 17,18 12,15 7,18 9,13 5,10 10,10" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  "projects-contact": {
    chapter: "CHAPTER 04",
    title: "CONTACT",
    ornament: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 text-[#A36A1F]">
        <rect x="3" y="5" width="18" height="14" rx="2" opacity="0.65" />
        <path d="M3 7l9 6 9-6" opacity="0.65" />
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
        my-16 sm:my-20 px-4
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        ${className}
      `}
      aria-hidden="true"
    >
      {/* Top rule & center ornament */}
      <div className="flex items-center justify-center w-full max-w-[420px] gap-4 mb-3">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#A36A1F]/30 to-[#A36A1F]/45" />
        <div className="flex items-center justify-center p-1.5 rounded-full bg-[#FFF8EC] border border-[#A36A1F]/20 shadow-sm">
          {config.ornament}
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#A36A1F]/30 to-[#A36A1F]/45" />
      </div>

      {/* Chapter Label & Title */}
      <div className="flex items-center gap-2 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.42em] text-[#A36A1F] opacity-85">
        <span>{config.chapter}</span>
        <span className="opacity-40">•</span>
        <span>{config.title}</span>
      </div>

      {/* Subtle bottom accent line */}
      <div className="w-10 h-px bg-[#A36A1F]/25 mt-2" />
    </div>
  );
}
