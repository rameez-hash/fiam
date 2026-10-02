const testimonials = [
  {
    quote: "By far the most reliable LED partner for our commercial fit-outs.",
    name: "Mark",
    place: "LA",
  },
  {
    quote: "Quick samples, clear specs, and professional project support.",
    name: "Amelie",
    place: "France",
  },
  {
    quote: "The best source when we need architectural outdoor and linear systems together.",
    name: "Mario",
    place: "Netherlands",
  },
];

export function Testimonials() {
  return (
    <section className="section-pad grain bg-bg-muted">
      <div className="container-page grid gap-8 lg:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote key={t.name} className="border-l-2 border-accent pl-6">
            <p className="font-display text-2xl leading-snug text-ink">{t.quote}</p>
            <footer className="mt-6 text-[12px] font-semibold tracking-[0.16em] uppercase text-ink-soft">
              {t.name}, {t.place}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
