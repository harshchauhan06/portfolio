import HeroButtons from "./HeroButtons";
import ScrollIndicator from "./ScrollIndicator";
import PaperCard from "../background/PaperCard";

/*
 * Hero layout — clean document flow throughout.
 * PaperCard now stretches to fit this content, so every margin/gap here
 * behaves exactly as expected with no constrained-container surprises.
 *
 * Rhythm targets:
 *   Profession label
 *   ↓ 44px  (mb-11)
 *   Name
 *   ↓ 44px  (mt-11)
 *   Headline
 *   ↓ 36px  (mt-9)
 *   Paragraph
 *   ↓ 44px  (mt-11)
 *   Buttons
 *   ↓ 52px  (mt-13 / mt-[52px])
 *   Scroll indicator
 */

export default function Hero() {
  return (
    <section
      className="flex justify-center px-6 pb-24"
      style={{ marginTop: "108px" }}
    >
      <PaperCard>
        <div className="flex flex-col items-center text-center w-full">

          {/* ── Profession label ── */}
          <p className="
            text-[10px] font-semibold uppercase
            tracking-[0.44em]
            text-[#A36A1F] opacity-80
          ">
            Full Stack Developer
          </p>

          {/* ── Name ── */}
          <h1 className="
            mt-11
            font-serif font-bold
            text-[#3D2B1A]
            leading-[0.88] tracking-[-0.03em]
            text-[64px] md:text-[78px]
          ">
            <span className="block">Harsh</span>
            <span className="block">Chauhan</span>
          </h1>

          {/* ── Thin editorial rule ── */}
          <div className="flex items-center gap-3 mt-11 mb-0">
            <div className="h-px w-10 bg-[#A36A1F]/22" />
            <div className="w-[4px] h-[4px] rounded-full bg-[#A36A1F]/35" />
            <div className="h-px w-10 bg-[#A36A1F]/22" />
          </div>

          {/* ── Main headline ── */}
          <h2 className="
            mt-9
            max-w-[520px]
            text-[19px] leading-[1.5] font-normal
            text-[#5A4632]
          ">
            Building AI-powered products with modern web technologies.
          </h2>

          {/* ── Body paragraph ── */}
          <p className="
            mt-9
            max-w-[480px]
            text-[14.5px] leading-[1.95]
            text-[#7C6448] font-normal
          ">
            I craft scalable backend systems, modern web applications,
            and AI-powered experiences — with a focus on clarity,
            performance, and lasting craft.
          </p>

          {/* ── Buttons ── */}
          <div className="mt-11">
            <HeroButtons />
          </div>

          {/* ── Scroll indicator ── */}
          <div className="mt-[52px]">
            <ScrollIndicator />
          </div>

        </div>
      </PaperCard>
    </section>
  );
}