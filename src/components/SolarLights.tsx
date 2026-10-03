import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Solar powered",
    text: "Daytime charge, automatic night operation.",
  },
  {
    title: "Outdoor ready",
    text: "Built for pathways, campuses, and open sites.",
  },
  {
    title: "Low running cost",
    text: "No wiring bills after install.",
  },
  {
    title: "Project supply",
    text: "Available for bulk and corporate orders.",
  },
];

export function SolarLights() {
  return (
    <section className="border-y border-line bg-white">
      <div className="container-page section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="order-2 lg:order-1">
            <p data-anim="fade" className="text-sm text-accent font-medium">Outdoor solar</p>
            <h2
              data-anim="lines"
              className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-ink"
            >
              Solar street lighting for outdoor projects
            </h2>
            <p data-anim="fade" className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Reliable solar fixtures for pathways, compounds, and commercial outdoor areas —
              practical to install and economical to run.
            </p>

            <ul data-anim="stagger" className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((item) => (
                <li key={item.title}>
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </li>
              ))}
            </ul>

            <div data-anim="fade" className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/categories/outdoor-light"
                className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-deep transition-colors"
              >
                Outdoor lights
              </Link>
              <Link
                href="/corporate"
                className="inline-flex border border-line px-6 py-3 text-sm font-medium text-ink hover:border-ink transition-colors"
              >
                Request bulk quote
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div data-anim="image" className="overflow-hidden bg-bg-muted">
              <Image
                src="/solar-lights.jpg"
                alt="Solar street lights along an outdoor walkway at night"
                width={1200}
                height={900}
                className="h-auto w-full object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
