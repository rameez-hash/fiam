"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    const next = openIndex === index ? -1 : index;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : 0.45;

    panels.current.forEach((panel, i) => {
      if (!panel) return;
      if (i === next) {
        gsap.fromTo(
          panel,
          { height: 0, autoAlpha: 0 },
          { height: "auto", autoAlpha: 1, duration, ease: "power3.inOut" }
        );
      } else if (i === openIndex) {
        gsap.to(panel, { height: 0, autoAlpha: 0, duration, ease: "power3.inOut" });
      }
    });
    setOpenIndex(next);
  };

  return (
    <section className="border-t border-line bg-bg">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="order-2 flex flex-col justify-center px-5 py-14 sm:px-8 md:py-20 lg:order-1 lg:pl-[max(1.25rem,calc((100vw-1180px)/2))] lg:pr-10 xl:pr-14">
          <p
            data-anim="fade"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent"
          >
            FAQ
          </p>

          <h2
            data-anim="lines"
            className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.12] tracking-tight text-ink"
          >
            Have a question?
            <br />
            <span className="text-ink/45">We can help</span>
          </h2>

          <p data-anim="fade" className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
            Products, store locations, and project or bulk order support from Fiam Pakistan.
          </p>

          <div data-anim="stagger" className="mt-9 border-t border-line">
            {items.map((item, index) => {
              const open = openIndex === index;

              return (
                <div key={item.question} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="group flex w-full items-start gap-3 py-5 text-left sm:gap-4"
                    aria-expanded={open}
                  >
                    <span
                      className={`pt-0.5 text-xs font-semibold tabular-nums transition-colors ${
                        open ? "text-accent" : "text-ink/35"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-base font-semibold transition-colors sm:text-lg ${
                        open ? "text-ink" : "text-ink/80 group-hover:text-ink"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span className="relative mt-1.5 h-3 w-3 shrink-0" aria-hidden>
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-ink" />
                      <span
                        className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-ink transition-transform duration-300 ${
                          open ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    ref={(el) => {
                      panels.current[index] = el;
                    }}
                    className="overflow-hidden"
                    style={index === 0 ? undefined : { height: 0, visibility: "hidden" }}
                  >
                    <p className="pb-5 pl-8 pr-6 text-sm leading-relaxed text-ink-soft sm:pl-10">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div data-anim="fade" className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
            >
              Contact us
            </Link>
            <Link
              href="/stores"
              className="inline-flex border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              Find a store
            </Link>
          </div>
        </div>

        <div
          data-anim="image"
          className="relative order-1 min-h-[360px] overflow-hidden bg-bg-deep sm:min-h-[480px] lg:order-2 lg:min-h-full lg:self-stretch"
        >
          <div className="relative h-full min-h-[360px] sm:min-h-[480px] lg:sticky lg:top-0 lg:h-[min(100vh,920px)] lg:min-h-[720px]">
            <Image
              src="/sections/faq-showroom.jpg"
              alt="FIAM lighting showroom with decorative and commercial fixtures"
              fill
              quality={92}
              sizes="(max-width:1024px) 100vw, 52vw"
              className="object-cover object-[center_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
                Showroom
              </p>
              <p className="mt-1.5 max-w-xs text-lg font-semibold tracking-tight text-white">
                See the range in person at partner stores nationwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
