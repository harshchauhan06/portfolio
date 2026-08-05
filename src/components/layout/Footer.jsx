/*
 * Footer.jsx — cream paper strip.
 * Designed and built by Harsh Chauhan © 2026
 */
import { SOCIAL_LINKS } from "../../config/socialLinks";

export default function Footer() {
  return (
    <footer className="
      relative flex items-center justify-between
      px-6 sm:px-8 py-[16px]
      bg-[#FFF8EC]
      border-t border-[#A36A1F]/22
      shadow-[0_-4px_20px_rgba(61,43,26,.07),inset_0_1px_0_rgba(255,255,255,.7)]
    ">
      {/* Left — credit */}
      <p className="text-[12px] text-[#7C6448]">
        Designed and built by <span className="font-medium text-[#3D2B1A]">Harsh Chauhan</span> © 2026
      </p>

      {/* Right — icon links */}
      <div className="flex items-center gap-4 sm:gap-5">
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
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.48 1.48 0 1 0 0 2.96 1.48 1.48 0 0 0 0-2.96z" />
            </svg>
          </a>
        )}
      </div>
    </footer>
  );
}