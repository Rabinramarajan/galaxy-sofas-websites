import { HomeHero } from "@/components/hero/home-hero";
import { CategoryShowroom } from "@/components/categories/category-showroom";
import { ProductCard } from "@/components/products/product-card";
import { Container, JsonLd } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { IconArrow } from "@/components/ui/icons";
import { primaryCategories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { collections } from "@/data/collections";
import { guides } from "@/data/guides";
import { createMetadata } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { imageBlur } from "@/lib/images";

export const metadata = createMetadata({
  title: `Premium Sofas, Beds & Furniture | ${site.name}`,
  description: `Explore premium sofas, beds and furniture designed for modern homes. Discover timeless designs, quality materials and personalised furniture solutions from ${site.name} in ${site.city}.`,
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <HomeHero />
      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              as="h2"
              eyebrow="The showroom"
              title="Three rooms. One way of furnishing a home."
              className="max-w-2xl"
            />
          </Reveal>
          <div className="mt-12">
            <CategoryShowroom categories={primaryCategories} />
          </div>
        </Container>
      </section>
      <section className="bg-linen py-20 md:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading as="h2" eyebrow="Featured pieces" title="Currently on the floor" />
            <Button href="/sofas" variant="secondary">
              Explore our sofas
            </Button>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[7/5] overflow-hidden bg-linen">
              <SafeImage
                src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1400&q=80"
                alt="Timber dining chairs and table in a sunlit interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                placeholder="blur"
                blurDataURL={imageBlur}
              />
            </div>
          </Reveal>
          <Reveal>
            <SectionHeading as="h2" eyebrow="How we work" title="Materials you can sit with for years" />
            <ul className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
              <li>
                <strong className="block text-charcoal">Frames and fill</strong>
                Kiln-dried hardwood frames and high-resilience foam specified for daily sitting, not showroom posing.
              </li>
              <li>
                <strong className="block text-charcoal">Custom when a standard size fails</strong>
                Sofas, beds and wardrobes can be planned around your wall, stair and fabric. We will say if a custom
                piece is unnecessary.
              </li>
              <li>
                <strong className="block text-charcoal">Warranty and delivery</strong>
                {site.warranty} Delivery inside {site.city} is arranged with access and assembly confirmed first.
              </li>
            </ul>
            <div className="mt-8">
              <Button href="/about">About the showroom</Button>
            </div>
          </Reveal>
        </Container>
      </section>
      <section className="bg-charcoal py-20 text-parchment md:py-24">
        <Container>
          <SectionHeading as="h2" eyebrow="Collections" title="Rooms, not isolated products" tone="light" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                href={`/collections#${collection.slug}`}
                className="group relative min-h-72 overflow-hidden"
              >
                <SafeImage
                  src={collection.image.src}
                  alt={collection.image.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-ink/45" />
                <div className="relative flex min-h-72 flex-col justify-end p-6 sm:p-8">
                  <h3 className="font-display text-3xl">{collection.name}</h3>
                  <p className="mt-2 max-w-md text-sm text-parchment/85">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20 md:py-24">
        <Container>
          <SectionHeading as="h2" title="Guides worth reading before you buy" />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="border-t border-border pt-5">
                <h3 className="font-display text-2xl leading-tight">{guide.title}</h3>
                <p className="mt-3 text-sm text-muted">{guide.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
                  Read the guide <IconArrow />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-border py-16 md:py-20">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="section-title">Visit the {site.city} showroom</h2>
            <p className="mt-2 max-w-xl text-muted">
              Sit in the pieces, feel the fabrics, and leave with a clear recommendation — including if you should wait.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/contact">Enquire Now</Button>
            <Button href="/contact#showroom" variant="secondary">
              Showroom details
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
