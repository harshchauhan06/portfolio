import { useState } from "react";
import NavLink from "./NavLink";

const links = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "/resume.pdf" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative flex h-14 sm:h-16 w-full max-w-[1100px] items-center justify-between rounded-[18px] sm:rounded-[22px] border border-[#A36A1F]/15 bg-[#FFF8EC] shadow-[0_12px_28px_rgba(61,43,26,.12)] px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border border-[#A36A1F]/20 bg-[#FFF8EC] shadow-sm">
            <span className="font-semibold text-[#3D2B1A] text-sm">HC</span>
          </div>
          <span className="hidden sm:inline text-sm font-semibold text-[#5A4732]">Harsh Chauhan</span>
        </div>

        <nav aria-label="Primary navigation" className="hidden sm:flex flex-1 justify-center">
          <div className="flex items-center gap-10">
            {links.map((link, i) => (
              <NavLink key={link.label} href={link.href} active={i === 0}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((state) => !state)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#A36A1F]/15 bg-white/90 text-[#5A4732] shadow-sm transition hover:border-[#A36A1F]/25 hover:bg-[#FFFBF1] sm:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>

        <div className="hidden sm:block w-10" aria-hidden="true" />

        {menuOpen && (
          <div className="absolute inset-x-4 top-full mt-3 rounded-[20px] border border-[#A36A1F]/15 bg-[#FFF8EC] p-4 shadow-[0_18px_48px_rgba(61,43,26,.12)] sm:hidden">
            <div className="flex flex-col gap-3">
              {links.map((link, i) => (
                <NavLink key={link.label} href={link.href} active={i === 0} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
