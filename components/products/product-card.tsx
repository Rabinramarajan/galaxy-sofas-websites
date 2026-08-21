import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { availabilityLabel, formatPrice } from "@/data/products";
import { imageBlur } from "@/lib/images";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const secondary = product.images[1] ?? product.images[0];
  const href = `/${product.category}/${product.slug}`;

  return (
    <article className="flex h-full flex-col">
      <Link href={href} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-linen">
          <SafeImage
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={imageBlur}
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {product.images[1] ? (
            <SafeImage
              src={secondary.src}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="hidden object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block"
            />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 hidden p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
            <span className="inline-flex min-h-11 items-center bg-parchment/95 px-4 text-[10px] uppercase tracking-[0.18em] text-charcoal">
              View details
            </span>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow tracking-[0.18em]">{product.subcategory}</p>
        <h3 className="mt-1 font-display text-2xl leading-tight">
          <Link href={href} className="line-clamp-2 hover:text-walnut">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{formatPrice(product.price, product.currency)}</p>
        <p className="mt-1 text-xs text-muted">{availabilityLabel(product.availability)}</p>
        <ul className="mt-3 flex gap-2" aria-label="Available colours">
          {product.colors.map((color) => (
            <li key={color.name}>
              <span className="sr-only">{color.name}</span>
              <span
                aria-hidden="true"
                title={color.name}
                className="block h-3.5 w-3.5 rounded-full border border-charcoal/20"
                style={{ backgroundColor: color.hex }}
              />
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          <Button href={href} variant="secondary" className="min-h-11 px-4 text-[10px]">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
