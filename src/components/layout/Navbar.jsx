import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import { SOCIAL_LINKS } from "../../config/socialLinks";

const links = [
  { label: "Home", href: "#home", targetId: "home" },
  { label: "Projects", href: "#projects", targetId: "projects" },
  { label: "About", href: "#about", targetId: "about" },
  { label: "Resume", href: SOCIAL_LINKS.resume || "/resume", targetId: null },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (link) => {
    setMenuOpen(false);

    if (link.targetId) {
      if (location.pathname === "/") {
        if (link.targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(link.targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else {
        navigate("/");
        setTimeout(() => {
          if (link.targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            const el = document.getElementById(link.targetId);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }
        }, 120);
      }
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative flex h-14 sm:h-16 w-full max-w-[1100px] items-center justify-between rounded-[18px] sm:rounded-[22px] border border-[#A36A1F]/15 bg-[#FFF8EC] shadow-[0_12px_28px_rgba(61,43,26,.12)] px-4 sm:px-6">
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border border-[#A36A1F]/20 bg-[#FFF8EC] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <span className="font-semibold text-[#3D2B1A] text-sm">HC</span>
          </div>
          <span className="hidden sm:inline text-sm font-semibold text-[#5A4732] group-hover:text-[#3D2B1A]">Harsh Chauhan</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden sm:flex flex-1 justify-center">
          <div className="flex items-center gap-10">
            {links.map((link) => {
              const isResume = link.label === "Resume";
              const isActive = isResume ? location.pathname === "/resume" : location.pathname === "/";

              return (
                <NavLink
                  key={link.label}
                  href={isResume ? "/resume" : `/#${link.targetId}`}
                  active={isResume ? location.pathname === "/resume" : location.pathname === "/" && link.label === "Home"}
                  onClick={(e) => {
                    if (!isResume) {
                      e.preventDefault();
                      handleNavClick(link);
                    }
                  }}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((state) => !state)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#A36A1F]/15 bg-white/90 text-[#5A4732] shadow-sm transition hover:border-[#A36A1F]/25 hover:bg-[#FFFBF1] sm:hidden cursor-pointer"
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
              {links.map((link) => {
                const isResume = link.label === "Resume";
                return (
                  <NavLink
                    key={link.label}
                    href={isResume ? "/resume" : `/#${link.targetId}`}
                    onClick={(e) => {
                      if (!isResume) {
                        e.preventDefault();
                        handleNavClick(link);
                      } else {
                        setMenuOpen(false);
                      }
                    }}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
