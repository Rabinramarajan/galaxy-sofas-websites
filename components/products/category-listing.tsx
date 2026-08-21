import { Suspense } from "react";
import type { ProductCategory } from "@/types/product";
import { getPrimaryCategory, getSubcategories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { Catalogue } from "@/components/products/catalogue";
import { CatalogueSkeleton } from "@/components/products/product-skeleton";
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
    <PageShell>
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
          <p className="eyebrow">{site.city} showroom</p>
          <h1 className="page-title mt-3">{title}</h1>
          <p className="mt-4 text-muted">{intro}</p>
        </header>
        <Suspense fallback={<CatalogueSkeleton />}>
          <Catalogue products={products} subcategories={subcategories} />
        </Suspense>
      </Container>
    </PageShell>
  );
}
