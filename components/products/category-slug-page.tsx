import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { ProductCategory } from "@/types/product";
import { getPrimaryCategory, getSubcategories, getSubcategory, productInSubcategory } from "@/data/categories";
import { getProductBySlug, getProductsByCategory, getRelatedProducts } from "@/data/products";
import Link from "next/link";
import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { Catalogue } from "@/components/products/catalogue";
import { CatalogueSkeleton } from "@/components/products/product-skeleton";
import { ProductGallery } from "@/components/products/gallery";
import { ProductCard } from "@/components/products/product-card";
import { StickyEnquire } from "@/components/products/sticky-enquire";
import { Button } from "@/components/ui/button";
import { IconWhatsApp } from "@/components/ui/icons";
import { breadcrumbJsonLd, itemListJsonLd, productJsonLd } from "@/lib/jsonld";
import { createMetadata, hasFilterParams } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";
import { availabilityLabel, formatPrice } from "@/data/products";
import type { Metadata } from "next";

export async function generateCategoryParams(category: ProductCategory) {
  const products = getProductsByCategory(category);
  const subcategories = getSubcategories(category);
  return [
    ...products.map((product) => ({ slug: product.slug })),
    ...subcategories.map((item) => ({ slug: item.slug })),
  ];
}

export async function generateCategorySlugMetadata(
  category: ProductCategory,
  slug: string,
  searchParams: Record<string, string | string[] | undefined>,
): Promise<Metadata> {
  const subcategory = getSubcategory(category, slug);
  const product = getProductBySlug(category, slug);
  const parent = getPrimaryCategory(category);
  const filtered = hasFilterParams(searchParams);

  if (subcategory && parent) {
    return createMetadata({
      title: subcategory.seoTitle,
      description: subcategory.seoDescription,
      path: `/${category}/${slug}`,
      index: !filtered,
    });
  }

  if (product) {
    return createMetadata({
      title: product.seoTitle,
      description: product.seoDescription,
      path: `/${category}/${slug}`,
      image: product.images[0]?.src,
    });
  }

  return createMetadata({
    title: "Piece not found",
    description: `This furniture piece is no longer listed at ${site.name}.`,
    path: `/${category}/${slug}`,
    index: false,
  });
}

export function CategorySlugPage({
  category,
  slug,
}: {
  category: ProductCategory;
  slug: string;
}) {
  const parent = getPrimaryCategory(category);
  const subcategory = getSubcategory(category, slug);
  const product = getProductBySlug(category, slug);

  if (subcategory && parent) {
    const products = getProductsByCategory(category);
    return (
      <PageShell>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: parent.name, path: parent.href },
            { name: subcategory.name, path: `/${category}/${slug}` },
          ])}
        />
        <JsonLd
          data={itemListJsonLd(
            subcategory.name,
            products
              .filter((item) => productInSubcategory(item, subcategory))
              .map((item) => ({ name: item.name, path: `/${item.category}/${item.slug}` })),
          )}
        />
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: parent.name, href: parent.href },
              { name: subcategory.name },
            ]}
          />
          <header className="mt-8 max-w-2xl">
            <h1 className="page-title">{subcategory.name}</h1>
            <p className="mt-4 text-muted">{subcategory.description}</p>
            <p className="mt-4 text-sm text-muted">
              Looking for something else?{" "}
              <a className="underline" href={parent.href}>
                Browse all {parent.name.toLowerCase()}
              </a>
              {" "}or{" "}
              <a className="underline" href="/contact">
                visit the showroom
              </a>
              .
            </p>
          </header>
          <Suspense fallback={<CatalogueSkeleton />}>
            <Catalogue products={products} subcategories={getSubcategories(category)} activeSubcategory={slug} />
          </Suspense>
        </Container>
      </PageShell>
    );
  }

  if (!product || !parent) notFound();

  const related = getRelatedProducts(product);

  return (
    <PageShell className="pb-28 md:pb-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: parent.name, path: parent.href },
          { name: product.subcategory, path: `/${category}/${product.subcategorySlug}` },
          { name: product.name, path: `/${category}/${product.slug}` },
        ])}
      />
      <JsonLd data={productJsonLd(product)} />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: parent.name, href: parent.href },
            { name: product.subcategory, href: `/${category}/${product.subcategorySlug}` },
            { name: product.name },
          ]}
        />
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <ProductGallery product={product} />
          <div>
            <p className="eyebrow tracking-[0.22em]">{product.subcategory}</p>
            <h1 className="page-title mt-3">{product.name}</h1>
            <p className="mt-4 text-base text-muted sm:text-lg">{product.shortDescription}</p>
            <p className="mt-6 font-display text-3xl">{formatPrice(product.price)}</p>
            <p className="mt-1 text-sm text-muted">{availabilityLabel(product.availability)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={`/contact?product=${encodeURIComponent(product.name)}`}>Enquire Now</Button>
              <Button
                href={whatsappLink(`Hello ${site.name}, I would like to enquire about ${product.name}.`)}
                variant="secondary"
                external
              >
                <IconWhatsApp /> WhatsApp
              </Button>
            </div>
            <p className="mt-6 leading-relaxed text-muted">{product.description}</p>
            <dl className="mt-10 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <Spec label="Material" value={product.material} />
              <Spec label="Finish" value={product.finish} />
              <Spec
                label="Dimensions"
                value={`${product.dimensions.width} × ${product.dimensions.depth} × ${product.dimensions.height} ${product.dimensions.unit}`}
              />
              {product.seatingCapacity ? (
                <Spec label="Seating" value={`${product.seatingCapacity} seats`} />
              ) : null}
            </dl>
            <div className="mt-6">
              <p className="text-sm font-medium">Available colours</p>
              <ul className="mt-2 flex flex-wrap gap-3 text-sm text-muted">
                {product.colors.map((color) => (
                  <li key={color.name} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-charcoal/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-muted">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="mt-8 space-y-4 text-sm">
              <p>
                <strong className="block text-charcoal">Care</strong>
                <span className="text-muted">{product.careInstructions}</span>
              </p>
              <p>
                <strong className="block text-charcoal">Delivery</strong>
                <span className="text-muted">{product.deliveryInformation}</span>
              </p>
            </div>
            <p className="mt-8 text-sm">
              Looking for similar pieces?{" "}
              <Link className="underline" href={`/${category}/${product.subcategorySlug}`}>
                Explore our {product.subcategory.toLowerCase()}
              </Link>
              .
            </p>
          </div>
        </div>
        {related.length ? (
          <section className="mt-20">
            <h2 className="section-title">Related pieces</h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
      <StickyEnquire productName={product.name} />
    </PageShell>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-3">
      <dt className="eyebrow tracking-[0.16em] text-muted">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
