import Background from "../components/background/Background";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import AboutSection from "../components/about/AboutSection";
import LeetCodeHeatmap from "../components/LeetCode/LeetCodeHeatmap";
import ContributionsSection from "../components/contributions/ContributionsSection";
import ProjectsSection from "../components/projects/ProjectsSection";
import Contact from "../components/contact/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
      <Hero />
      <AboutSection />
      <LeetCodeHeatmap />
      <ContributionsSection />
      <ProjectsSection />
      <Contact />
      <Footer />
    </Background>
  );
}