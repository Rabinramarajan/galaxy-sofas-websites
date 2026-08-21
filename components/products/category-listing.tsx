import { Suspense } from "react";
import type { ProductCategory } from "@/types/product";
import { getPrimaryCategory, getSubcategories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { categoryMedia } from "@/data/media";
import { Container, JsonLd } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { Catalogue } from "@/components/products/catalogue";
import { CatalogueSkeleton } from "@/components/products/product-skeleton";
import { CinematicVideo } from "@/components/media/cinematic-video";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export function CategoryListing({
  category,
  title,
  intro,
}: {
  category: ProductCategory;
  title: string;
  intro: string;
}) {
  const definition = getPrimaryCategory(category);
  const products = getProductsByCategory(category);
  const subcategories = getSubcategories(category);
  const media = categoryMedia[category];

  if (!definition) return null;

  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: definition.name, path: definition.href },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          definition.name,
          products.map((product) => ({
            name: product.name,
            path: `/${product.category}/${product.slug}`,
          })),
        )}
      />
      <section className="relative -mt-[var(--header-height)] min-h-[52vh] overflow-hidden bg-ink text-parchment md:min-h-[64vh]">
        <CinematicVideo video={media.video} priority preload="metadata" stillOnMobile />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/40 to-transparent" />
        <Container className="relative flex min-h-[52vh] flex-col justify-end pb-12 pt-28 md:min-h-[64vh] md:pb-16">
          <p className="eyebrow text-sand">{site.city} showroom</p>
          <h1 className="page-title mt-3 max-w-2xl text-parchment">{title}</h1>
          <p className="mt-4 max-w-xl text-sm text-parchment/85 md:text-base">{intro}</p>
        </Container>
      </section>
      <Container>
        <div className="pt-8">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: definition.name }]} />
        </div>
        <Suspense fallback={<CatalogueSkeleton />}>
          <Catalogue products={products} subcategories={subcategories} />
        </Suspense>
      </Container>
    </div>
  );
}
