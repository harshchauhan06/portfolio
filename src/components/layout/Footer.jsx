/*
 * Footer.jsx — cream paper strip, refined.
 * Icons 15% larger. "Harsh Chauhan" font-medium instead of font-semibold.
 * Divider opacity increased. Everything else preserved.
 */
import { SOCIAL_LINKS } from "../../config/socialLinks";

export default function Footer() {
  return (
    <footer className="
      relative flex items-center justify-between
      px-8 py-[16px]
      bg-[#FFF8EC]
      border-t border-[#A36A1F]/22
      shadow-[0_-4px_20px_rgba(61,43,26,.07),inset_0_1px_0_rgba(255,255,255,.7)]
    ">
      {/* Left — credit */}
      <p className="text-[12px] text-[#7C6448]">
        Crafted by{" "}
        <span className="font-medium text-[#3D2B1A]">Harsh Chauhan</span>
        {" "}© 2026
      </p>

      {/* Right — icon links */}
      <div className="flex items-center gap-5">
        {SOCIAL_LINKS.github && (
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#7C6448] hover:text-[#3D2B1A] transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.112-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
        )}

        {SOCIAL_LINKS.linkedin && (
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#7C6448] hover:text-[#3D2B1A] transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </div>
    </footer>
  );
}