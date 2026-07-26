import Background from "../components/background/Background";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import AboutSection from "../components/about/AboutSection";
import Contact from "../components/contact/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
      <Hero />
      <AboutSection />
      <Contact />
      <Footer />
    </Background>
  );
}