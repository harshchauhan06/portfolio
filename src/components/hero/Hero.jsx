import { useEffect, useRef } from "react";
import HeroButtons from "./HeroButtons";
import ScrollIndicator from "./ScrollIndicator";
import PaperCard from "../background/PaperCard";

/* ─── Small editorial sun ornament ─────────────────────────────────────── */
function SunOrnament({ className }) {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const r1 = 18, r2 = 24;
    return (
      <line
        key={i}
        x1={30 + r1 * Math.cos(a)} y1={30 + r1 * Math.sin(a)}
        x2={30 + r2 * Math.cos(a)} y2={30 + r2 * Math.sin(a)}
        stroke="#A36A1F" strokeWidth="1" opacity="0.5"
      />
    );
  });
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden="true">
      <circle cx="30" cy="30" r="10" stroke="#A36A1F" strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="30" r="5"  fill="#A36A1F" opacity="0.22" />
      {ticks}
    </svg>
  );
}

export default function Hero() {
  const ref = useRef(null);

  // Fade-up on mount
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // small delay so CSS paint is done
    const id = requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="home"
      className="flex justify-center px-4 sm:px-6 pb-4 mt-[90px] sm:mt-[120px]"
    >
      {/* Fade-up wrapper */}
      <div
        ref={ref}
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          transitionDelay: "80ms",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PaperCard>
          <div className="flex flex-col items-center text-center w-full">

            {/* Editorial sun ornament */}
            <SunOrnament className="w-9 h-9 mb-4 opacity-80" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.44em] text-[#A36A1F] opacity-80">
              Full Stack Developer
            </p>

            <h1 className="
              mt-5 font-serif font-bold text-[#3D2B1A]
              leading-[0.88] tracking-[-0.03em]
              text-[44px] sm:text-[58px] md:text-[68px]
            ">
              <span className="block">Harsh</span>
              <span className="block">Chauhan</span>
            </h1>

            <div className="flex items-center gap-3 mt-5">
              <div className="h-px w-8 sm:w-10 bg-[#A36A1F]/22" />
              <div className="w-[4px] h-[4px] rounded-full bg-[#A36A1F]/35" />
              <div className="h-px w-8 sm:w-10 bg-[#A36A1F]/22" />
            </div>

            <h2 className="mt-4 max-w-[90%] sm:max-w-[480px] text-[15px] sm:text-[17px] leading-[1.5] font-normal text-[#5A4632]">
              Building AI-powered products with modern web technologies.
            </h2>

            <p className="mt-3 max-w-[90%] sm:max-w-[460px] text-[13px] sm:text-[13.5px] leading-[1.85] text-[#7C6448] font-normal">
              I craft scalable backend systems, modern web applications,
              and AI-powered experiences — focused on clarity,
              performance, and lasting craft.
            </p>

            <div className="mt-6">
              <HeroButtons />
            </div>

            <div className="mt-5">
              <ScrollIndicator />
            </div>

          </div>
        </PaperCard>
      </div>
    </section>
  );
}