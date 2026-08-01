export default function NavLink({ children, href, active = false, onClick }) {
  const baseClasses = `relative pb-1 font-medium transition-colors duration-300 ${
    active ? "text-[#3D2B1A]" : "text-[#5A4732] hover:text-[#A36A1F]"
  }`;
  const sizeClasses = "text-sm sm:text-[17px]";

  return (
    <a href={href ?? "#"} onClick={onClick} className={`${baseClasses} ${sizeClasses}`}>
      {children}

      {active && (
        <span className="absolute left-0 -bottom-[2px] h-[2px] w-full rounded-full bg-[#A36A1F]" />
      )}
    </a>
  );
}