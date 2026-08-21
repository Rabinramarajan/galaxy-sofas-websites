"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { useState } from "react";
import type { Product } from "@/types/product";
import { imageBlur } from "@/lib/images";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const current = product.images[index] ?? product.images[0];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        <SafeImage
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={imageBlur}
          className="object-cover object-center"
        />
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {product.images.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(imageIndex)}
            aria-label={`Show photo ${imageIndex + 1}: ${image.alt}`}
            aria-pressed={imageIndex === index}
            className={cn(
              "relative h-20 w-16 shrink-0 cursor-pointer overflow-hidden border",
              imageIndex === index ? "border-charcoal" : "border-transparent",
            )}
          >
            <SafeImage src={image.src} alt="" fill className="object-cover object-center" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}
