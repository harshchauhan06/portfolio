export default function ScrollIndicator() {
  const handleScroll = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      className="flex flex-col items-center gap-[8px] cursor-pointer group focus-visible:outline-none"
      aria-label="Scroll to About section"
    >
      {/* Animated descending light segment */}
      <div
        className="relative h-9 w-px overflow-hidden rounded-full transition-transform duration-200 group-hover:scale-y-110"
        style={{ background: "rgba(163,106,31,0.13)" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "52%",
            borderRadius: "9999px",
            background: "linear-gradient(to bottom, rgba(163,106,31,0.65), transparent)",
            animation: "scrollDrop 2.4s ease-in-out infinite",
          }}
        />
      </div>

      <span
        style={{
          fontSize: "9px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.32em",
          color: "rgba(163,106,31,0.50)",
        }}
        className="group-hover:text-[#A36A1F] transition-colors"
      >
        Scroll
      </span>

      <style>{`
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(210%); opacity: 0; }
        }
      `}</style>
    </button>
  );
}