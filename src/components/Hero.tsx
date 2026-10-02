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
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  const slide = heroSlides[index];
  const titleLines = slide.title.split("\n");

  return (
    <section className="relative isolate min-h-[82vh] overflow-hidden bg-bg-deep text-white">
      {heroSlides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.title.replace("\n", " ")}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      ))}

      <div className="relative container-page flex min-h-[82vh] flex-col justify-end pb-16 pt-28">
        <div className="max-w-xl">
          <p className="text-sm text-white/70">Fiam Pakistan</p>

          <h1
            key={slide.title}
            className="mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.1] tracking-tight text-white"
          >
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p key={slide.subtitle} className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/75">
            {slide.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={slide.ctaHref || "/products"}
              className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-deep transition-colors"
            >
              {slide.ctaLabel || "View products"}
            </Link>
            <Link
              href="/corporate"
              className="inline-flex border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white hover:text-ink transition-colors"
            >
              Corporate orders
            </Link>
          </div>
        </div>

        <div className="mt-12 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all ${
                i === index ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
