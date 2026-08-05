import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../../config/socialLinks";

export default function Contact() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const copyEmailToClipboard = async () => {
    const emailToCopy = SOCIAL_LINKS.email || "chauhanharsh.gh1@gmail.com";
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = emailToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setToastMessage("Email copied to clipboard.");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    const emailAddr = SOCIAL_LINKS.email || "chauhanharsh.gh1@gmail.com";
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddr)}`;

    try {
      const win = window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        copyEmailToClipboard();
      }
    } catch (err) {
      copyEmailToClipboard();
    }
  };

  const contactButtons = [
    {
      key: "github",
      label: "GitHub Profile",
      ariaLabel: "Visit GitHub profile",
      href: SOCIAL_LINKS.github,
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
        </svg>
      ),
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      ariaLabel: "Connect on LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.48 1.48 0 1 0 0 2.96 1.48 1.48 0 0 0 0-2.96z" />
        </svg>
      ),
    },
    {
      key: "email",
      label: "Send an Email",
      ariaLabel: "Send Email",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SOCIAL_LINKS.email || "chauhanharsh.gh1@gmail.com")}`,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: handleEmailClick,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      ),
    },
    {
      key: "resume",
      label: "Download Resume",
      ariaLabel: "Download Resume PDF",
      href: SOCIAL_LINKS.resumePdf || "/resume.pdf",
      download: "Harsh_Chauhan_Resume.pdf",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px]">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="12" y1="18" x2="12" y2="12" />
          <polyline points="9 15 12 18 15 15" />
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
        px-4 sm:px-6
        my-6 sm:my-10 md:my-16
        section-hidden
        ${visible ? "section-visible" : ""}
      `}
    >
      {/* Decorative Top Line */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="h-px w-8 sm:w-12 bg-[#A36A1F]/25" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#A36A1F]/35" />
        <div className="h-px w-8 sm:w-12 bg-[#A36A1F]/25" />
      </div>

      {/* Heading */}
      <h2 className="
        font-serif font-bold
        text-[#3D2B1A]
        text-[32px] sm:text-[42px]
        leading-[1.0]
        tracking-[-0.02em]
        mb-3
      ">
        Let's Connect
      </h2>

      {/* Tagline */}
      <p className="
        text-[13.5px] sm:text-[15px] font-normal
        text-[#5A3E20]
        mb-6
        tracking-[0.01em]
        max-w-[460px]
        leading-[1.7]
      ">
        Whether it's a project, an internship opportunity, or just a conversation about technology, I'd be happy to hear from you.
      </p>

      {/* Social icon buttons */}
      <div className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap sm:flex-nowrap">
        {contactButtons.map(({ key, label, ariaLabel, href, isRoute, target, rel, download, onClick, icon }, i) => {
          const isValid = Boolean(href && typeof href === "string" && href.trim().length > 0);

          const buttonClasses = `
            flex items-center justify-center
            w-[48px] h-[48px] sm:w-[50px] sm:h-[50px]
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
                    w-[48px] h-[48px] sm:w-[50px] sm:h-[50px]
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
                  onClick={onClick}
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

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-[#A36A1F]/30 bg-[#3D2B1A] px-5 py-2.5 text-xs font-semibold text-[#FFF8EC] shadow-[0_8px_24px_rgba(61,43,26,.3)] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <svg className="w-4 h-4 text-[#F6B94A]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
}