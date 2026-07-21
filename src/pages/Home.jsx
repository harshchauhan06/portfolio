import Background from "../components/background/Background";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";
import AboutCard from "../components/about/AboutCard";
import Contact from "../components/contact/Contact";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <Background>
      <Navbar />
      <Hero />
      <AboutCard />
      <Contact />
      <Footer />
    </Background>
  );
}