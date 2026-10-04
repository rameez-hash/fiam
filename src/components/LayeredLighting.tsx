import Image from "next/image";
import Link from "next/link";

const layers = [
  "Ambient surface light",
  "Dining lamp",
  "Wooden picture light",
  "Desk lamp",
];

export function LayeredLighting() {
  return (
    <section className="border-b border-line bg-bg">
      <div className="container-page section-pad">
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p data-anim="fade" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Living spaces
            </p>
            <h2
              data-anim="lines"
              className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
            >
              Layered light for every room
            </h2>
            <p data-anim="fade" className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Ambient, dining, picture, and desk lighting — each fixture has a clear job, so the
              room feels warm without looking overdone.
            </p>
          </div>
          <Link
            data-anim="fade"
            href="/categories/decorative-lighting"
            className="inline-flex self-start bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep md:self-auto"
          >
            Decorative lighting
          </Link>
        </div>

        <div data-anim="image" className="overflow-hidden bg-bg-muted">
          <div className="relative aspect-[16/10] w-full sm:aspect-[2/1]">
            <Image
              src="/sections/layered-lighting.jpg"
              alt="Living room with ambient surface light, dining lamp, wooden picture light, and desk lamp"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={false}
            />
          </div>
        </div>

        <ul
          data-anim="stagger"
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft sm:mt-8"
        >
          {layers.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
