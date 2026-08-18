import { Suspense } from "react";
import type { ProductCategory } from "@/types/product";
import { getPrimaryCategory, getSubcategories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { Container, JsonLd } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { Catalogue } from "@/components/products/catalogue";
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

  if (!definition) return null;

  return (
    <div className="pb-24 pt-10">
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
      <Container>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: definition.name }]} />
        <header className="mt-8 max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-walnut">{site.city} showroom</p>
          <h1 className="mt-3 font-display text-5xl">{title}</h1>
          <p className="mt-4 text-muted">{intro}</p>
        </header>
        <Suspense fallback={<div className="mt-10 h-96 animate-pulse bg-linen" />}>
          <Catalogue products={products} subcategories={subcategories} />
        </Suspense>
      </Container>
    </div>
  );
}
