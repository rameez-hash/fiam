"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { heroSlides } from "@/data/products";

gsap.registerPlugin(useGSAP);

const SLIDE_SECONDS = 7;

export function Hero() {
  const [index, setIndex] = useState(0);
  const scope = useRef<HTMLElement>(null);
  const previous = useRef<number | null>(null);
  const progress = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide", root);
      const bars = gsap.utils.toArray<HTMLElement>(".hero-bar", root);
      const current = slides[index];
      const prevSlide = previous.current === null ? null : slides[previous.current];
      const first = prevSlide === null;

      progress.current?.kill();
      gsap.set(bars, { scaleX: 0 });
      bars.slice(0, index).forEach((bar) => gsap.set(bar, { scaleX: 1 }));

      gsap.set(slides, { zIndex: 0 });
      if (prevSlide && prevSlide !== current) gsap.set(prevSlide, { zIndex: 1 });
      gsap.set(current, { zIndex: 2, autoAlpha: 1 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      const img = current.querySelector("img");

      if (first || reduced) {
        gsap.set(current, { clipPath: "inset(0% 0% 0% 0%)" });
      } else {
        tl.fromTo(
          current,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.inOut" },
          0
        );
        const prevImg = prevSlide?.querySelector("img");
        if (prevImg) {
          tl.to(prevImg, { xPercent: -10, duration: 1.25, ease: "expo.inOut" }, 0);
        }
        tl.add(() => {
          if (prevSlide) gsap.set(prevSlide, { autoAlpha: 0 });
          if (prevImg) gsap.set(prevImg, { xPercent: 0 });
        });
      }

      if (img && !reduced) {
        gsap.fromTo(img, { scale: 1.14 }, { scale: 1, duration: SLIDE_SECONDS + 1.5, ease: "power1.out" });
      }

      if (reduced) {
        gsap.set(root.querySelectorAll(".hero-line"), { yPercent: 0, y: 0 });
        gsap.set(root.querySelectorAll(".hero-fade"), { autoAlpha: 1 });
      } else {
        const textAt = first ? 0.25 : 0.55;
        tl.fromTo(
          root.querySelectorAll(".hero-line"),
          { yPercent: 110, y: 0 },
          { yPercent: 0, y: 0, duration: 1.15, stagger: 0.09 },
          textAt
        ).fromTo(
          root.querySelectorAll(".hero-fade"),
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" },
          textAt + 0.35
        );
      }

      const bar = bars[index];
      if (bar) {
        progress.current = gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: SLIDE_SECONDS,
            ease: "none",
            onComplete: () => setIndex((i) => (i + 1) % heroSlides.length),
          }
        );
      }

      previous.current = index;
    },
    { dependencies: [index], scope }
  );

  const slide = heroSlides[index];
  const titleLines = slide.title.split("\n");

  return (
    <section
      ref={scope}
      className="relative isolate min-h-[86vh] overflow-hidden bg-bg-deep text-white"
    >
      {heroSlides.map((s, i) => (
        <div
          key={s.image}
          className={`hero-slide absolute inset-0 overflow-hidden ${i === 0 ? "" : "invisible"}`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt={s.title.replace("\n", " ")}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/30" />
        </div>
      ))}

      <div className="relative z-10 container-page flex min-h-[86vh] flex-col justify-end pb-14 pt-28">
        <div key={index} className="max-w-2xl">
          <p className="hero-fade flex items-center gap-3 text-sm text-white/70">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-white/40" aria-hidden />
            Fiam Pakistan
          </p>

          <h1 className="mt-5 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.04] tracking-tight text-white">
            {titleLines.map((line) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span className="hero-line block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-5 max-w-lg text-[15px] leading-relaxed text-white/75">
            {slide.subtitle}
          </p>

          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <Link
              href={slide.ctaHref || "/products"}
              className="inline-flex bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-deep"
            >
              {slide.ctaLabel || "View products"}
            </Link>
            <Link
              href="/corporate"
              className="inline-flex border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-ink"
            >
              Corporate orders
            </Link>
          </div>
        </div>

        <div
          className="mt-14 grid max-w-md gap-3"
          style={{ gridTemplateColumns: `repeat(${heroSlides.length}, minmax(0, 1fr))` }}
        >
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => i !== index && setIndex(i)}
              className="group py-2 text-left"
            >
              <span className="relative block h-[2px] overflow-hidden bg-white/25">
                <span className="hero-bar absolute inset-0 origin-left scale-x-0 bg-white" />
              </span>
              <span
                className={`mt-2 hidden truncate text-xs transition-colors sm:block ${
                  i === index ? "text-white" : "text-white/45 group-hover:text-white/80"
                }`}
              >
                {s.title.replace("\n", " ")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
