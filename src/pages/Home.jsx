import Background from "../components/background/Background";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import AboutSection from "../components/about/AboutSection";
import LeetCodeHeatmap from "../components/LeetCodeHeatmap/index";
import ProjectsSection from "../components/projects/ProjectsSection";
import Contact from "../components/contact/Contact";
import Footer from "../components/layout/Footer";
import SectionDivider from "../components/ui/SectionDivider";

export default function Home() {
  return (
    <Background>
      <Navbar />

      <Hero />

      <SectionDivider variant="hero-about" className="mt-4 mb-4 sm:mt-8 sm:mb-8" />

      {/* About Section includes the 2 paper cards + LeetCode heatmap directly below */}
      <AboutSection />

      <div className="mt-3 sm:mt-6">
        <LeetCodeHeatmap />
      </div>

      <SectionDivider variant="code-projects" className="mt-5 mb-5 sm:mt-10 sm:mb-10" />

      <ProjectsSection />

      <SectionDivider variant="projects-contact" className="mt-5 mb-5 sm:mt-10 sm:mb-10" />

      <Contact />

      <Footer />
    </Background>
  );
}