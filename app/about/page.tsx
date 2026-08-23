import { SafeImage } from "@/components/ui/safe-image";
import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { imageBlur } from "@/lib/images";
import { media } from "@/data/media";
import Link from "next/link";

export const metadata = createMetadata({
  title: "About Galaxy Sofas | Furniture Showroom in Chennai",
  description:
    "Galaxy Sofas is a furniture showroom in Virugambakkam, Chennai, focused on comfortable sofas, beds and contemporary home furniture you can see in person.",
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
            <h1 className="page-title">Furniture for the Way You Live</h1>
            <p className="mt-6 text-muted">
              Galaxy Sofas is a furniture showroom in Nerkundram, Virugambakkam, Chennai. We specialise in sofas and
              complementary home furniture — beds, dining pieces and living storage — chosen for comfort, contemporary
              design and everyday use.
            </p>
            <p className="mt-4 text-muted">
              The philosophy is simple: furniture should support how a household actually sits, sleeps and gathers. That
              means paying attention to seat depth, walkways, mattress size and finish — not only how a piece photographs.
            </p>
            <p className="mt-4 text-muted">
              Customer experience here is the showroom itself. You can compare L-shaped sofas with straight 3-seaters,
              feel fabrics, and talk through what will fit a Chennai apartment or an independent house. Personalised
              assistance is part of a visit; we would rather recommend a smaller piece than one that owns the floor.
            </p>
            <p className="mt-4 text-muted">
              If you are exploring{" "}
              <Link className="underline" href="/sofas">
                sofas in Chennai
              </Link>
              ,{" "}
              <Link className="underline" href="/beds">
                beds
              </Link>{" "}
              or{" "}
              <Link className="underline" href="/furniture">
                home furniture
              </Link>
              , start in the catalogue or{" "}
              <Link className="underline" href="/contact">
                visit Galaxy Sofas
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/sofa-showroom-chennai">Sofa showroom in Chennai</Button>
              <Button href="/contact" variant="secondary">
                Contact the showroom
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-linen">
            <SafeImage
              src={media.images.sofasLiving.src}
              alt={media.images.sofasLiving.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_58%]"
              placeholder="blur"
              blurDataURL={imageBlur}
            />
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
