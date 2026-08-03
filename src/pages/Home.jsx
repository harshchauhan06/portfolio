import Background from "../components/background/Background";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import AboutSection from "../components/about/AboutSection";
import LeetCodeHeatmap from "../components/LeetCodeHeatmap/index";
import ProjectsSection from "../components/projects/ProjectsSection";
import Contact from "../components/contact/Contact";
import Footer from "../components/layout/Footer";
import SectionDivider from "../components/ui/SectionDivider";

/**
 * Home page — one continuous editorial story.
 *
 * Layout:
 *   Navbar
 *   Hero              ← fade-up on mount, sun ornament
 *     ↓ hero-about divider (registration cross)
 *   About             ← scroll-reveal, paper-pin ornament
 *     ↓ about-code divider (double rule + diamond)
 *   Days I Code       ← heatmap printed on page, stagger cells
 *     ↓ code-projects divider (three dots)
 *   Projects          ← staggered cards, bookmark ornament
 *     ↓ projects-contact divider (star + compass)
 *   Contact           ← closing page, sparkle, icon fade
 *   Footer
 *
 * ContributionsSection is replaced by the new LeetCodeHeatmap which uses
 * the 3-tier data service (live → cache → sample) and never shows an error.
 */
export default function Home() {
  return (
    <Background>
      <Navbar />

      <Hero />

      <SectionDivider variant="hero-about" className="mt-8 mb-8" />

      <AboutSection />

      <SectionDivider variant="about-code" className="mt-10 mb-10" />

      <LeetCodeHeatmap />

      <SectionDivider variant="code-projects" className="mt-6 mb-6" />

      <ProjectsSection />

      <SectionDivider variant="projects-contact" className="mt-2 mb-2" />

      <Contact />

      <Footer />
    </Background>
  );
}