import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { getProductsByCategory } from "@/data/products";
import type { CategoryDefinition } from "@/types/product";
import { imageBlur } from "@/lib/images";
import { Reveal } from "@/components/ui/reveal";

export function CategoryShowroom({ categories }: { categories: CategoryDefinition[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {categories.map((category, index) => {
        const count = getProductsByCategory(category.slug).length;
        return (
          <Reveal key={category.slug} delay={index * 0.08}>
            <Link href={category.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-linen">
                <SafeImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={imageBlur}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-parchment">
                  <p className="text-[11px] uppercase tracking-[0.22em]">{count} pieces</p>
                  <h3 className="mt-2 font-display text-4xl">{category.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-parchment/85">{category.description}</p>
                  <span className="mt-4 inline-block text-[11px] uppercase tracking-[0.18em]">
                    Explore {category.name}
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
