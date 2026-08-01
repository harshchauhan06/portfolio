import HeroButtons from "./HeroButtons";
import ScrollIndicator from "./ScrollIndicator";
import PaperCard from "../background/PaperCard";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex justify-center px-4 sm:px-6 pb-4 mt-[90px] sm:mt-[120px]"
    >
      <PaperCard>
        <div className="flex flex-col items-center text-center w-full">

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
    </section>
  );
}