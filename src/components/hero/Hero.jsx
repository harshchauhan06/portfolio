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
    const id = requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="home"
      className="flex justify-center px-3 sm:px-6 pb-1 mt-[92px] sm:mt-[110px] md:mt-[120px]"
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
            <SunOrnament className="w-6 h-6 sm:w-9 sm:h-9 mb-2 sm:mb-4 opacity-80" />

            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.40em] sm:tracking-[0.44em] text-[#A36A1F] opacity-80">
              FULL STACK DEVELOPER
            </p>

            <h1 className="
              mt-2 sm:mt-5 font-serif font-bold text-[#3D2B1A]
              leading-[0.92] tracking-[-0.03em]
              text-[34px] sm:text-[52px] md:text-[68px]
            ">
              <span className="inline sm:inline md:block">Harsh </span>
              <span className="inline sm:inline md:block">Chauhan</span>
            </h1>

            <div className="flex items-center gap-2.5 mt-2.5 sm:mt-5">
              <div className="h-px w-5 sm:w-10 bg-[#A36A1F]/22" />
              <div className="w-[3px] h-[3px] sm:w-[4px] sm:h-[4px] rounded-full bg-[#A36A1F]/35" />
              <div className="h-px w-5 sm:w-10 bg-[#A36A1F]/22" />
            </div>

            <h2 className="mt-2.5 sm:mt-4 max-w-[98%] sm:max-w-[500px] text-[13.5px] sm:text-[17px] leading-[1.4] font-normal text-[#5A4632]">
              I enjoy building web applications that solve real problems.
            </h2>

            <p className="mt-1.5 sm:mt-3 max-w-[98%] sm:max-w-[480px] text-[12px] sm:text-[13.5px] leading-[1.65] sm:leading-[1.85] text-[#7C6448] font-normal">
              I'm a Computer Science student who enjoys turning ideas into working products. Most of my time goes into building full-stack applications, learning new technologies, and improving as a developer one project at a time.
            </p>

            <div className="mt-4 sm:mt-6 w-full sm:w-auto">
              <HeroButtons />
            </div>

            <div className="mt-3 sm:mt-5">
              <ScrollIndicator />
            </div>

          </div>
        </PaperCard>
      </div>
    </section>
  );
}