"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { useState } from "react";
import type { Product } from "@/types/product";
import { imageBlur } from "@/lib/images";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div>
      <div className="relative hidden overflow-hidden bg-linen md:block">
        <button
          type="button"
          className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden"
          onClick={() => setZoomed((value) => !value)}
          aria-label={zoomed ? "Reset image zoom" : "Zoom image"}
        >
          {product.images.map((image, imageIndex) => (
            <SafeImage
              key={image.src + image.alt}
              src={image.src}
              alt={imageIndex === index ? image.alt : ""}
              fill
              priority={imageIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={imageBlur}
              className={cn(
                "object-cover object-center transition-opacity duration-500",
                imageIndex === index ? "opacity-100" : "opacity-0",
                zoomed && imageIndex === index && "scale-[1.18] cursor-zoom-out transition-transform duration-500",
              )}
            />
          ))}
        </button>
      </div>
      <div className="-mx-5 flex snap-x snap-mandatory gap-0 overflow-x-auto md:hidden">
        {product.images.map((image) => (
          <div key={image.src + image.alt} className="relative aspect-[4/5] w-full min-w-full snap-center bg-linen">
            <SafeImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              placeholder="blur"
              blurDataURL={imageBlur}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 hidden gap-3 overflow-x-auto pb-1 md:flex">
        {product.images.map((image, imageIndex) => (
          <button
            key={image.src + imageIndex}
            type="button"
            onClick={() => {
              setIndex(imageIndex);
              setZoomed(false);
            }}
            aria-label={`Show photo ${imageIndex + 1}: ${image.alt}`}
            aria-pressed={imageIndex === index}
            className={cn(
              "relative h-24 w-20 shrink-0 cursor-pointer overflow-hidden border",
              imageIndex === index ? "border-charcoal" : "border-transparent",
            )}
          >
            <SafeImage src={image.src} alt="" fill className="object-cover object-center" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
