export default function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      className="
        flex
        h-16
        w-16
        items-center
        justify-center

        rounded-full

        border
        border-[#A36A1F]/25

        bg-[#FFF8EC]

        shadow-sm

        transition-all

        duration-300

        hover:-translate-y-1

        hover:shadow-lg
      "
    >
      {children}
    </a>
  );
}