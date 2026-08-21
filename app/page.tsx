import { HomeHero } from "@/components/hero/home-hero";
import { CategoryShowroom } from "@/components/categories/category-showroom";
import { ProductCard } from "@/components/products/product-card";
import { Container, JsonLd } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { IconArrow } from "@/components/ui/icons";
import { CraftsmanshipSection } from "@/components/sections/craftsmanship";
import { LifestyleBand } from "@/components/sections/lifestyle-band";
import { VisitShowroomSection, WhyGalaxySection } from "@/components/sections/local-seo";
import { primaryCategories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { collections } from "@/data/collections";
import { guides } from "@/data/guides";
import { createMetadata } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { imageBlur } from "@/lib/images";
import { media } from "@/data/media";

export const metadata = createMetadata({
  title: "Sofas & Furniture Showroom in Chennai | Galaxy Sofas",
  description:
    "Explore stylish sofas and furniture at Galaxy Sofas in Virugambakkam, Chennai. Discover contemporary designs for living rooms and bedrooms and visit our showroom to find the right fit for your home.",
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
          <SectionHeading
            as="h2"
            eyebrow="Furniture Designed for Comfortable Living"
            title="Sofas, beds and furniture for modern Chennai homes"
            className="max-w-2xl"
          />
          <p className="mt-6 max-w-2xl text-muted">
            Galaxy Sofas is a furniture showroom in Virugambakkam for people choosing sofas and complementary home
            furniture in person. Explore the collections below, or visit the floor to compare comfort, scale and finish.
          </p>
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
              Explore Sofas
            </Button>
          </div>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
      <LifestyleBand />
      <WhyGalaxySection />
      <section className="py-20 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[7/5] overflow-hidden bg-linen lg:order-2">
            <SafeImage
              src={media.images.furnitureDining.src}
              alt={media.images.furnitureDining.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[32%_center]"
              placeholder="blur"
              blurDataURL={imageBlur}
            />
          </div>
          <div className="lg:order-1">
            <SectionHeading as="h2" eyebrow="How we help" title="Furniture discovery, with time to decide" />
            <p className="mt-6 text-muted">
              Bring wall measurements if you have them. We will help you compare{" "}
              <Link className="underline" href="/sofas/l-shaped-sofas">
                L-shaped sofas
              </Link>
              ,{" "}
              <Link className="underline" href="/sofas/3-seater-sofas">
                3-seater sofas
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/beds">
                beds
              </Link>{" "}
              against the way your room actually works — including walkways, door swings and how the household sits.
            </p>
            <div className="mt-8">
              <Button href="/about">About Galaxy Sofas</Button>
            </div>
          </div>
        </Container>
      </section>
      <CraftsmanshipSection />
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
                  className="object-cover object-center transition-transform duration-[700ms] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
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
            {guides.slice(0, 6).map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group border-t border-border pt-5"
              >
                <h3 className="font-display text-2xl leading-tight">{guide.title}</h3>
                <p className="mt-3 text-sm text-muted">{guide.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
                  Read the guide{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    <IconArrow />
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-sm">
            <Link className="underline" href="/guides">
              All furniture buying guides
            </Link>
          </p>
        </Container>
      </section>
      <VisitShowroomSection intro="Looking for sofas or furniture in Chennai? Visit Galaxy Sofas at Nerkundram, Virugambakkam and explore our available furniture collection in person. Our showroom gives you the opportunity to compare designs, understand dimensions and choose furniture that suits your home." />
    </>
  );
}
