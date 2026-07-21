import { socialLinks } from "./SocialLinks";
import SocialIcon from "./SocialIcon";

export default function FindMe() {
  return (
    <section className="py-32">

      <div className="mx-auto max-w-5xl text-center">

        <p className="text-sm tracking-[0.4em] uppercase text-[#A36A1F]">
          FIND ME
        </p>

        <h2 className="mt-5 font-serif text-5xl text-[#3D2B1A]">
          Let's Build Something Together
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#6B553A]">
          Whether it's an opportunity, collaboration,
          or simply a conversation,
          I'd love to hear from you.
        </p>

        <div className="mt-16 flex justify-center gap-8">
          {socialLinks.map((item) => (
            <SocialIcon key={item.name} href={item.href}>
              {item.name[0]}
            </SocialIcon>
          ))}
        </div>

      </div>

    </section>
  );
}