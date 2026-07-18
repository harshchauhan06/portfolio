import FeaturedProject from "../components/projects/FeaturedProject";

export default function Projects() {
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="text-center">
          <h1 className="text-5xl font-black text-white md:text-7xl">
            Projects
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            A collection of applications I've built while learning,
            experimenting and solving real-world problems.
          </p>
        </section>

        <FeaturedProject />

      </div>
    </main>
  );
}