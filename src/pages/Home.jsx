import Background from "../components/background/Background";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import AboutSection from "../components/about/AboutSection";
import ProjectsSection from "../components/projects/ProjectsSection";
import ContributionsSection from "../components/contributions/ContributionsSection";
import Contact from "../components/contact/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
      <Hero />
      <AboutSection />
      <ContributionsSection />
      <ProjectsSection />
      <Contact />
      <Footer />
    </Background>
  );
}