"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroSlides } from "@/data/products";

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const slide = heroSlides[index];
  const titleLines = slide.title.split("\n");

  return (
    <section className="relative isolate min-h-[88vh] overflow-hidden bg-bg-deep text-white">
      {heroSlides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.title.replace("\n", " ")}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover object-center ${i === index ? "animate-kenburns" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        </div>
      ))}

      <div className="relative container-page flex min-h-[88vh] flex-col justify-end pb-20 pt-32">
        <div className="max-w-[34rem] sm:max-w-[38rem]">
          <p className="animate-fade-up text-[12px] font-semibold tracking-[0.28em] uppercase text-white/70">
            Fiam Pakistan · Lighting Studio
          </p>

          <h1
            key={slide.title}
            className="animate-fade-up mt-5 font-display text-[clamp(2.6rem,6.5vw,5.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ animationDelay: "80ms" }}
          >
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="mt-6 h-[3px] w-16 bg-accent animate-line" />

          <p
            key={slide.subtitle}
            className="animate-fade-up mt-6 text-base sm:text-lg text-white/80 leading-relaxed"
            style={{ animationDelay: "160ms" }}
          >
            {slide.subtitle}
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href={slide.ctaHref || "/products"}
              className="inline-flex items-center bg-accent px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-accent-deep transition-colors"
            >
              {slide.ctaLabel || "View collection"}
            </Link>
            <Link
              href="/corporate"
              className="inline-flex items-center border border-white/35 px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-white hover:text-ink transition-colors"
            >
              Bulk / corporate order
            </Link>
          </div>
        </div>

        <div className="mt-14 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 transition-all ${
                i === index ? "w-10 bg-accent" : "w-5 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
