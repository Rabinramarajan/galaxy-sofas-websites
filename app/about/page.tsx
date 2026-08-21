import { SafeImage } from "@/components/ui/safe-image";
import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { imageBlur } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: `About ${site.name} | Premium Furniture`,
  description: `${site.name} is a furniture showroom in ${site.city} for sofas, beds and home furnishings. Learn how we specify materials, custom work, delivery and aftercare.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
          <div>
            <h1 className="page-title">A showroom, not a warehouse aisle</h1>
            <p className="mt-6 text-muted">
              {site.name} is a furniture showroom in {site.city} for people who want sofas, beds and dining pieces that
              will still look considered in five years. We keep a focused floor rather than a wall of lookalikes, and we
              will tell you when a smaller piece, a different fabric, or a wait for made-to-order is the better decision.
            </p>
            <p className="mt-4 text-muted">
              Custom work exists for rooms that standard sizes cannot serve — stairs, unusual walls, a fabric already in
              the house. It is not a default upsell. Warranty covers manufacturing defects on frames for 36 months. We
              do not publish ratings we have not collected.
            </p>
            <div className="mt-8">
              <Button href="/contact">Contact the showroom</Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-linen">
            <SafeImage
              src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1400&q=80"
              alt="Galaxy Sofas showroom-style living room with a tailored sofa and warm lighting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              placeholder="blur"
              blurDataURL={imageBlur}
            />
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
