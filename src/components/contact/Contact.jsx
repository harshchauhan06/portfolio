/*
 * Contact.jsx — Editorial closing section. "Find Me."
 *
 * Closing-page feel: magazine closing colophon, concise spacing,
 * sparkle ornament, contact icons close to the heading.
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../../config/socialLinks";

/* ─── Sparkle ─────────────────────────────────────────────────────────────── */
function Sparkle({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path d="M20 2 C20 2 21.5 14 20 20 C18.5 26 20 38 20 38"
        stroke="#A36A1F" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M2 20 C2 20 14 18.5 20 20 C26 21.5 38 20 38 20"
        stroke="#A36A1F" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      <path d="M7 7 C7 7 15 15 20 20 C25 25 33 33 33 33"
        stroke="#A36A1F" strokeWidth="0.7" strokeLinecap="round" opacity="0.2" />
      <path d="M33 7 C33 7 25 15 20 20 C15 25 7 33 7 33"
        stroke="#A36A1F" strokeWidth="0.7" strokeLinecap="round" opacity="0.2" />
      <circle cx="20" cy="20" r="1.8" fill="#A36A1F" opacity="0.32" />
    </svg>
  );
}

// Helper to construct pre-filled mailto URL cleanly
function buildMailtoUrl(rawEmail) {
  if (!rawEmail || typeof rawEmail !== "string" || !rawEmail.trim()) {
    return "";
  }
  const email = rawEmail.trim();
  const subject = encodeURIComponent("Portfolio Inquiry");
  const body = encodeURIComponent("Hi Harsh,\n\n");

  if (email.startsWith("mailto:")) {
    if (!email.includes("subject=")) {
      const sep = email.includes("?") ? "&" : "?";
      return `${email}${sep}subject=${subject}&body=${body}`;
    }
    return email;
  }
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Map configuration to contact buttons
  const contactButtons = [
    {
      key: "github",
      label: "GitHub",
      ariaLabel: "GitHub Profile",
      href: SOCIAL_LINKS.github || "",
      isRoute: false,
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-transform duration-250 ease-out group-hover:scale-110">
          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      ariaLabel: "LinkedIn Profile",
      href: SOCIAL_LINKS.linkedin || "",
      isRoute: false,
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-transform duration-250 ease-out group-hover:scale-110">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      key: "email",
      label: "Email",
      ariaLabel: "Send Email",
      href: buildMailtoUrl(SOCIAL_LINKS.email),
      isRoute: false,
      target: undefined,
      rel: undefined,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-250 ease-out group-hover:scale-110">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 7l10 7 10-7" />
        </svg>
      ),
    },
    {
      key: "resume",
      label: "Résumé",
      ariaLabel: "View Resume Page",
      href: SOCIAL_LINKS.resume || "/resume",
      isRoute: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-250 ease-out group-hover:scale-110">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className={`
        relative flex flex-col items-center text-center
        px-6
        pt-8 pb-10 sm:pt-10 sm:pb-12
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
    >
      {/* Sparkle ornament */}
      <Sparkle className="w-8 h-8 mb-4 opacity-70" />

      {/* Editorial label */}
      <p className="
        text-[10.5px] font-semibold uppercase
        tracking-[0.48em]
        text-[#A36A1F] opacity-80
        mb-3
      ">
        LET&rsquo;S BUILD SOMETHING TOGETHER
      </p>

      {/* Heading */}
      <h2 className="
        font-serif font-bold
        text-[#3D2B1A]
        text-[36px] sm:text-[44px]
        leading-[1.0]
        tracking-[-0.02em]
        mb-3
      ">
        Find Me
      </h2>

      {/* Tagline */}
      <p className="
        text-[14.5px] font-normal
        text-[#5A3E20]
        mb-6
        tracking-[0.01em]
        max-w-[400px]
        leading-[1.7]
      ">
        Interested in building something together?<br className="hidden sm:block" />
        I&rsquo;d love to hear from you.
      </p>

      {/* Social icon buttons — compact & centered */}
      <div className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap sm:flex-nowrap">
        {contactButtons.map(({ key, label, ariaLabel, href, isRoute, target, rel, download, icon }, i) => {
          const isValid = Boolean(href && typeof href === "string" && href.trim().length > 0);

          const buttonClasses = `
            flex items-center justify-center
            w-[50px] h-[50px]
            rounded-full
            bg-[#FFF8EC]
            border border-[#A36A1F]/18
            text-[#3D2B1A]
            shadow-[0_2px_10px_rgba(61,43,26,.10),inset_0_1px_0_rgba(255,255,255,.8)]
            transition-all duration-250 ease-out
            cursor-pointer
            hover:bg-white
            hover:border-[#A36A1F]/40
            hover:shadow-[0_8px_20px_rgba(61,43,26,.18)]
            hover:-translate-y-[3px]
            active:translate-y-0 active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A36A1F] focus-visible:ring-offset-2
            anim-fade-in
          `;

          return (
            <div key={key} className="relative group">
              {/* Tooltip */}
              <div
                className="
                  absolute -top-10 left-1/2 -translate-x-1/2
                  px-2.5 py-1
                  bg-[#3D2B1A] text-[#FFF8EC]
                  text-[11px] font-medium
                  rounded shadow-md
                  whitespace-nowrap
                  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                  transition-opacity duration-200 ease-out
                  pointer-events-none z-20
                "
                role="tooltip"
              >
                {isValid ? label : "Coming Soon"}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#3D2B1A]" />
              </div>

              {!isValid ? (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  aria-label={`${ariaLabel} (Coming Soon)`}
                  className="
                    flex items-center justify-center
                    w-[50px] h-[50px]
                    rounded-full
                    bg-[#FFF8EC]
                    border border-[#A36A1F]/18
                    text-[#3D2B1A]
                    shadow-[0_2px_10px_rgba(61,43,26,.10),inset_0_1px_0_rgba(255,255,255,.8)]
                    transition-all duration-250 ease-out
                    opacity-50 cursor-not-allowed
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A36A1F] focus-visible:ring-offset-2
                    anim-fade-in
                  "
                  style={{
                    animationDelay: visible ? `${i * 80}ms` : "0ms",
                    opacity: visible ? 0.5 : 0,
                  }}
                >
                  {icon}
                </button>
              ) : isRoute ? (
                <Link
                  to={href}
                  aria-label={ariaLabel}
                  className={buttonClasses}
                  style={{
                    animationDelay: visible ? `${i * 80}ms` : "0ms",
                    opacity: visible ? undefined : 0,
                  }}
                >
                  {icon}
                </Link>
              ) : (
                <a
                  href={href}
                  target={target}
                  rel={rel}
                  download={download}
                  aria-label={ariaLabel}
                  className={buttonClasses}
                  style={{
                    animationDelay: visible ? `${i * 80}ms` : "0ms",
                    opacity: visible ? undefined : 0,
                  }}
                >
                  {icon}
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Closing thin rule */}
      <div className="mt-8 w-full max-w-[200px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#A36A1F]/15" />
          <div className="w-1 h-1 rounded-full bg-[#A36A1F]/30" />
          <div className="flex-1 h-px bg-[#A36A1F]/15" />
        </div>
      </div>
    </section>
  );
}