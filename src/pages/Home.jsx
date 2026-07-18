import Background from "../components/background/Background";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/hero/Hero";

export default function Home() {
  return (
    <Background>
      <Navbar />
      <Hero />
    </Background>
  );
}