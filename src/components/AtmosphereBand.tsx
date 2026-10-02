import Image from "next/image";
import Link from "next/link";

export function AtmosphereBand() {
  return (
    <section className="relative isolate min-h-[56vh] overflow-hidden bg-bg-deep text-white">
      <Image
        src="http://www.fiam.cc/upload/2/image/202512/13173935462KqE.jpg"
        alt="Architectural lighting project atmosphere"
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container-page flex min-h-[56vh] items-center py-16">
        <div className="max-w-lg">
          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
            Lighting for real project sites
          </h2>
          <p className="mt-4 text-white/75 leading-relaxed">
            From commercial linear systems to outdoor fixtures — practical options with clear specs for
            architects, contractors, and facility teams.
          </p>
          <Link
            href="/projects"
            className="mt-7 inline-flex bg-white px-6 py-3 text-sm font-medium text-ink hover:bg-accent hover:text-white transition-colors"
          >
            View projects
          </Link>
        </div>
      </div>
    </section>
  );
}
