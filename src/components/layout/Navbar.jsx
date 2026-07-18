import NavLink from "./NavLink";

const links = ["Home", "Projects", "About", "Resume"];

export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <div className="relative flex h-16 w-full max-w-[1100px] items-center justify-center rounded-[22px] border border-[#A36A1F]/15 bg-[#FFF8EC] shadow-[0_12px_28px_rgba(61,43,26,.12)]">

        <div className="absolute left-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#A36A1F]/20 bg-[#FFF8EC] shadow-sm">
          <span className="font-semibold text-[#3D2B1A]">HC</span>
        </div>

        <div className="flex gap-16">
          {links.map((link, i) => (
            <NavLink key={link} active={i === 0}>
              {link}
            </NavLink>
          ))}
        </div>

      </div>
    </header>
  );
}