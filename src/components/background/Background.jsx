import BackgroundPattern from "./BackgroundPattern";
import DecorativeShapes from "./DecorativeShapes";

export default function Background({ children }) {
  return (
    <>
      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(150deg,#F6C945_0%,#F4D35E_32%,#EFC24A_55%,#E59F22_78%,#C97A3C_100%)]" />

        {/* Top Light */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_18%_12%,rgba(255,252,235,0.35),transparent_60%)]" />

        {/* Bottom Right Shadow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_85%_92%,rgba(163,106,31,0.25),transparent_65%)]" />

        <BackgroundPattern />
        <DecorativeShapes />
      </div>

      {/* Page Content */}
      <main className="relative min-h-screen">
        {children}
      </main>
    </>
  );
}