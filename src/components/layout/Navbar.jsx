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
    <header className="fixed top-3 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 lg:px-8">
      <div className="relative flex h-13 sm:h-16 w-full max-w-[1100px] items-center justify-between rounded-[18px] sm:rounded-[22px] border border-[#A36A1F]/15 bg-[#FFF8EC] shadow-[0_12px_28px_rgba(61,43,26,.12)] px-3.5 sm:px-6">
        
        {/* Left: Logo & Brand */}
        <Link
          to="/"
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="flex h-9 sm:h-11 w-9 sm:w-11 items-center justify-center rounded-full border border-[#A36A1F]/20 bg-[#FFF8EC] shadow-sm transition-transform duration-200 group-hover:scale-105">
            <span className="font-semibold text-[#3D2B1A] text-xs sm:text-sm">HC</span>
          </div>
          <span className="hidden sm:inline text-sm font-semibold text-[#5A4732] group-hover:text-[#3D2B1A]">Harsh Chauhan</span>
        </Link>

        {/* Center: Desktop Navigation Links */}
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

        {/* Right: Social Quick Links (Desktop) */}
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
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.48 1.48 0 1 0 0 2.96 1.48 1.48 0 0 0 0-2.96z" />
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
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#A36A1F]/15 bg-white/90 text-[#5A4732] shadow-sm transition hover:border-[#A36A1F]/25 hover:bg-[#FFFBF1] sm:hidden cursor-pointer"
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

        {/* Mobile Dropdown Menu with Smooth Animation */}
        {menuOpen && (
          <div className="absolute inset-x-2 top-full mt-2 rounded-[20px] border border-[#A36A1F]/20 bg-[#FFF8EC] p-4 shadow-[0_18px_48px_rgba(61,43,26,.16)] sm:hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2.5">
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
