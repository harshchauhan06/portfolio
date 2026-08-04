/*
 * Resume.jsx — Plain, minimal document viewer page.
 */

import { useEffect, useRef } from "react";
import Background from "../components/background/Background";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ResumeHeader from "../components/resume/ResumeHeader";
import ResumeActions from "../components/resume/ResumeActions";
import ResumeViewer from "../components/resume/ResumeViewer";

export default function Resume() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Background>
      <Navbar />

      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 max-w-[1100px] mx-auto min-h-screen flex flex-col items-center">
        {/* Header */}
        <ResumeHeader />

        {/* Download Button Only */}
        <ResumeActions />

        {/* Plain Document Viewer */}
        <ResumeViewer containerRef={containerRef} />
      </main>

      <Footer />
    </Background>
  );
}
