import NavLink from "./NavLink";

const links = ["Home", "Projects", "About", "Resume"];

export default function Navbar() {
  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
      <div className="
        relative flex h-14 sm:h-16 w-full max-w-[1100px]
        items-center justify-center
        rounded-[18px] sm:rounded-[22px]
        border border-[#A36A1F]/15
        bg-[#FFF8EC]
        shadow-[0_12px_28px_rgba(61,43,26,.12)]
      ">
        {/* Logo */}
        <div className="absolute left-4 sm:left-6 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border border-[#A36A1F]/20 bg-[#FFF8EC] shadow-sm">
          <span className="font-semibold text-[#3D2B1A] text-sm">HC</span>
        </div>

        {/* Nav links — hidden on very small screens */}
        <div className="hidden xs:flex sm:flex gap-6 sm:gap-10 md:gap-16">
          {links.map((link, i) => (
            <NavLink key={link} active={i === 0}>
              {link}
            </NavLink>
          ))}
        </div>

        {/* Mobile: show all links smaller */}
        <div className="flex xs:hidden gap-5">
          {links.map((link, i) => (
            <NavLink key={link} active={i === 0} small>
              {link}
            </NavLink>
          ))}
        </div>

      </div>
    </header>
  );
}