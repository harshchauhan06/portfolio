/*
 * Contact.jsx — refined "Find Me" section.
 * Polished spacing, hierarchy and decorative elements only.
 * No layout or style changes.
 */

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/harshchauhan",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/harshchauhan",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:harsh@example.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    label: "Résumé",
    href: "/resume.pdf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

/* Sparkle — slightly smaller, more subtle */
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

export default function Contact() {
  return (
    <section id="contact" className="relative flex flex-col items-center text-center px-6 pt-14 pb-10">

      {/*
        Sparkle: moved higher (top-[18%]) and farther left from right edge
        (right-[14%]) so it doesn't overlap the decorative circles on the far right.
        Slightly smaller: w-8 h-8 (was w-10 h-10).
      */}
      <Sparkle className="absolute right-[14%] top-[18%] w-8 h-8 opacity-65" />

      {/* FIND ME label — 10% larger, slightly more tracking */}
      <p className="
        text-[10.5px] font-semibold uppercase
        tracking-[0.48em]
        text-[#A36A1F] opacity-80
        mb-3
      ">
        Find Me
      </p>

      {/* Tagline — 2px larger, tighter gap to icons */}
      <p className="
        text-[16px] font-normal
        text-[#5A3E20]
        mb-5
        tracking-[0.01em]
        max-w-[500px]
      ">
        Interested in building something together? I'd love to hear from you.
      </p>

      {/* Social icon buttons — 52px cream circles, centered */}
      <div className="flex items-center justify-center gap-4">
        {LINKS.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="
              flex items-center justify-center
              w-[52px] h-[52px]
              rounded-full
              bg-[#FFF8EC]
              border border-[#A36A1F]/18
              text-[#3D2B1A]
              shadow-[0_2px_10px_rgba(61,43,26,.10),inset_0_1px_0_rgba(255,255,255,.8)]
              transition-all duration-200
              hover:border-[#A36A1F]/40
              hover:shadow-[0_4px_16px_rgba(61,43,26,.16)]
              hover:-translate-y-[1px]
              active:translate-y-0
            "
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Divider — slightly more visible */}
      <div className="absolute bottom-0 left-[5%] right-[5%] h-px bg-[#A36A1F]/20" />

    </section>
  );
}