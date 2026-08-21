import { SafeImage } from "@/components/ui/safe-image";
import { collections, getCollectionProducts } from "@/data/collections";
import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { ProductCard } from "@/components/products/product-card";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { imageBlur } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `Furniture Collections in ${site.city}`,
  description: `Browse living, bedroom, dining and custom furniture collections from ${site.name}. Rooms composed as they would sit in a home, not as isolated catalogue items.`,
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          "Collections",
          collections.map((collection) => ({
            name: collection.name,
            path: `/collections#${collection.slug}`,
          })),
        )}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Collections" }]} />
        <header className="mt-8 max-w-2xl">
          <h1 className="page-title">Collections</h1>
          <p className="mt-4 text-muted">
            Four ways into the catalogue: living rooms, bedrooms, dining, and made-to-measure work.
          </p>
        </header>
        <div className="mt-16 space-y-24">
          {collections.map((collection) => {
            const items = getCollectionProducts(collection);
            return (
              <section key={collection.slug} id={collection.slug} className="scroll-mt-28">
                <div className="relative mb-10 aspect-[16/9] overflow-hidden bg-linen sm:aspect-[21/9]">
                  <SafeImage
                    src={collection.image.src}
                    alt={collection.image.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    placeholder="blur"
                    blurDataURL={imageBlur}
                    className="object-cover object-[center_55%] transition-transform duration-[700ms] group-hover:scale-[1.04]"
                  />
                </div>
                <h2 className="section-title">{collection.name}</h2>
                <p className="mt-3 max-w-2xl text-muted">{collection.description}</p>
                <div className="mt-8 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </PageShell>
  );
}
