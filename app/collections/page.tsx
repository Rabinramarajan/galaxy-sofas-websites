import { SafeImage } from "@/components/ui/safe-image";
import { collections, getCollectionProducts } from "@/data/collections";
import { Container, JsonLd } from "@/components/ui/primitives";
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
    <div className="pb-24 pt-10">
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
          <h1 className="font-display text-5xl">Collections</h1>
          <p className="mt-4 text-muted">
            Four ways into the catalogue: living rooms, bedrooms, dining, and made-to-measure work.
          </p>
        </header>
        <div className="mt-16 space-y-24">
          {collections.map((collection) => {
            const items = getCollectionProducts(collection);
            return (
              <section key={collection.slug} id={collection.slug}>
                <div className="relative mb-10 aspect-[21/9] overflow-hidden bg-linen">
                  <SafeImage
                    src={collection.image.src}
                    alt={collection.image.alt}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={imageBlur}
                    className="object-cover"
                  />
                </div>
                <h2 className="font-display text-4xl">{collection.name}</h2>
                <p className="mt-3 max-w-2xl text-muted">{collection.description}</p>
                <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
