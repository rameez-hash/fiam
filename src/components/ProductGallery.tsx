"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden border border-line bg-white">
        {current && (
          <Image
            key={current}
            src={current}
            alt={alt}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-contain p-8"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`relative aspect-square overflow-hidden border bg-white transition-colors ${
                i === active ? "border-accent" : "border-line hover:border-ink-soft"
              }`}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
