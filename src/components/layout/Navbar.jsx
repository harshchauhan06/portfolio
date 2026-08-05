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
        
        {/* Left: Logo & Brand */}
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
          <div className="flex h-10 sm:h-11 w-10 sm:w-11 items-center justify-center rounded-full border border-[#A36A1F]/20 bg-[#FFF8EC] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <span className="font-semibold text-[#3D2B1A] text-sm">HC</span>
          </div>
          <span className="hidden sm:inline text-sm font-semibold text-[#5A4732] group-hover:text-[#3D2B1A]">Harsh Chauhan</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden sm:flex flex-1 justify-center">
          <div className="flex items-center gap-10">
            {links.map((link) => {
              const isResume = link.label === "Resume";
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

        {/* Right: Social Quick Links */}
        <div className="hidden sm:flex items-center gap-3.5">
          {SOCIAL_LINKS.github && (
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-[#7C6448] hover:text-[#3D2B1A] transition-colors duration-200 p-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
            </a>
          )}
          {SOCIAL_LINKS.linkedin && (
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-[#7C6448] hover:text-[#3D2B1A] transition-colors duration-200 p-1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
        </div>

        {/* Mobile Hamburger Button */}
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

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="absolute inset-x-4 top-full mt-3 rounded-[20px] border border-[#A36A1F]/15 bg-[#FFF8EC] p-4 shadow-[0_18px_48px_rgba(61,43,26,.12)] sm:hidden z-50">
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
