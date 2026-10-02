import Image from "next/image";
import Link from "next/link";

export function AtmosphereBand() {
  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden bg-bg-deep text-white">
      <Image
        src="http://www.fiam.cc/upload/2/image/202512/13173935462KqE.jpg"
        alt="Fiam Pakistan architectural lighting atmosphere"
        fill
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
      <div className="relative container-page flex min-h-[70vh] items-center py-20">
        <div className="max-w-xl">
          <p className="text-[12px] font-semibold tracking-[0.22em] uppercase text-white/65">Projects</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl font-semibold leading-[1.05] tracking-tight">
            Designed for spaces that need more than a bulb
          </h2>
          <p className="mt-6 text-white/75 leading-relaxed">
            From linear commercial systems to IP65 outdoor step lights, Fiam Pakistan helps architects and
            contractors specify durable luminaires with clear technical data.
          </p>
          <Link
            href="/projects"
            className="mt-8 inline-flex bg-white px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-ink hover:bg-accent hover:text-white transition-colors"
          >
            See projects
          </Link>
        </div>
      </div>
    </section>
  );
}
