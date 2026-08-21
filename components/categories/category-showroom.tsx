import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { getProductsByCategory } from "@/data/products";
import type { CategoryDefinition } from "@/types/product";
import { imageBlur } from "@/lib/images";
import { Reveal } from "@/components/ui/reveal";
import { IconArrow } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function CategoryShowroom({ categories }: { categories: CategoryDefinition[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
      {categories.map((category, index) => {
        const count = getProductsByCategory(category.slug).length;
        const featured = index === 0;

        return (
          <Reveal
            key={category.slug}
            delay={index * 0.08}
            variant="clip-reveal"
            className={featured ? "lg:col-span-6" : "lg:col-span-3"}
          >
            <Link href={category.href} className="group block">
              <div
                className={cn(
                  "relative overflow-hidden bg-linen",
                  featured ? "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" : "aspect-[3/4]",
                )}
              >
                <SafeImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
                  placeholder="blur"
                  blurDataURL={imageBlur}
                  className={cn(
                    "object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]",
                    category.slug === "sofas" && "object-[62%_55%] md:object-[center_58%]",
                    category.slug === "beds" && "object-[center_58%] md:object-[center_62%]",
                    category.slug === "furniture" && "object-[28%_60%] md:object-[32%_center]",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent transition-opacity duration-700 group-hover:from-ink/80" />
                <div className="media-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-parchment transition-transform duration-700 ease-out group-hover:-translate-y-1">
                  <p className="eyebrow text-parchment">{count} pieces</p>
                  <h3 className="mt-2 font-display text-3xl sm:text-4xl">{category.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-parchment/85">{category.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
                    Explore {category.name}
                    <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                      <IconArrow />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
