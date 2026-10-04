import Image from "next/image";
import Link from "next/link";

export function AtmosphereBand() {
  return (
    <section className="relative isolate min-h-[64vh] overflow-hidden bg-bg-deep text-white">
      <div data-parallax="14" className="absolute inset-x-0 -inset-y-[12%]">
        <Image
          src="http://www.fiam.cc/upload/2/image/202512/13173935462KqE.jpg"
          alt="Architectural lighting project atmosphere"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {/* Soft left-to-right shade for text only — image stays visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />

      <div className="relative container-page flex min-h-[64vh] items-center py-16">
        <div className="max-w-lg">
          <h2 data-anim="lines" className="text-3xl sm:text-5xl font-semibold leading-tight tracking-tight drop-shadow-sm">
            Lighting for real project sites
          </h2>
          <p data-anim="fade" className="mt-4 text-white/90 leading-relaxed drop-shadow-sm">
            From commercial linear systems to outdoor fixtures — practical options with clear specs for
            architects, contractors, and facility teams.
          </p>
          <div data-anim="fade" data-delay="0.1">
            <Link
              href="/projects"
              className="mt-7 inline-flex bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-white"
            >
              View projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
