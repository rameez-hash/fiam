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
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-anim="image" className="overflow-hidden bg-bg-muted">
            <div className="relative aspect-[4/3] w-full lg:aspect-[5/4]">
              <Image
                src="/sections/layered-lighting.jpg"
                alt="Living room with ambient surface light, dining lamp, wooden picture light, and desk lamp"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div>
            <p data-anim="fade" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              Living spaces
            </p>
            <h2
              data-anim="lines"
              className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight"
            >
              Layered light for every room
            </h2>
            <p data-anim="fade" className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Ambient, dining, picture, and desk lighting — each fixture has a clear job, so the
              room feels warm without looking overdone.
            </p>

            <ul data-anim="stagger" className="mt-8 grid gap-3">
              {layers.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div data-anim="fade" className="mt-8">
              <Link
                href="/categories/decorative-lighting"
                className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
              >
                Decorative lighting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
