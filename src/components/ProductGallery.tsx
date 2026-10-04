"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const unique = [...new Set(images.filter(Boolean))];
  const [active, setActive] = useState(0);
  const current = unique[Math.min(active, Math.max(unique.length - 1, 0))];

  return (
    <div className="lg:sticky lg:top-24">
      <div className={`grid gap-3 ${unique.length > 1 ? "grid-cols-[68px_1fr] sm:grid-cols-[76px_1fr]" : ""}`}>
        {unique.length > 1 && (
          <div className="flex flex-col gap-2">
            {unique.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
                className={`relative aspect-square w-full overflow-hidden bg-bg-muted transition-shadow ${
                  i === active ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : "ring-1 ring-line hover:ring-ink-soft"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-contain p-1.5" />
              </button>
            ))}
          </div>
        )}

        <div className="relative aspect-square max-h-[min(480px,58vh)] overflow-hidden bg-bg-muted lg:max-h-none">
          {current ? (
            <Image
              key={current}
              src={current}
              alt={alt}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 48vw"
              className="object-contain p-4 sm:p-8 lg:p-10"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-ink-soft">No image</div>
          )}
          {unique.length > 1 && (
            <p className="absolute bottom-3 right-4 rounded-sm bg-white/80 px-2 py-0.5 text-[11px] tabular-nums text-ink-soft">
              {active + 1} / {unique.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
