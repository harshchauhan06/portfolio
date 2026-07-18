export default function NavLink({ children, active = false }) {
  return (
    <button
      className={`relative pb-1 text-[17px] font-medium transition-colors duration-300 ${
        active
          ? "text-[#3D2B1A]"
          : "text-[#5A4732] hover:text-[#A36A1F]"
      }`}
    >
      {children}

      {active && (
        <span className="absolute left-0 -bottom-[2px] h-[2px] w-full rounded-full bg-[#A36A1F]" />
      )}
    </button>
  );
}