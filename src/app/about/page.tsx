import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/constants/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getCustomDesignMessage } from "@/utils/whatsapp";

export const metadata = pageMetadata({
  title: `About ${site.name} | Sofa Makers in ${site.city}`,
  absoluteTitle: `About ${site.name} | Sofa Makers in ${site.city}`,
  description:
    "Galaxy Sofas is a sofa workshop in Chennai making custom sofas and rebuilding existing ones. Read how we plan size, foam, fabric and delivery with you.",
  path: "/about/",
});

const values = ["Comfort", "Quality", "Craftsmanship", "Trust", "Customization"];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ])}
      />
      <PageHero
        title="About Galaxy Sofas, Sofa Makers in Chennai"
        description="A Chennai sofa workshop focused on comfort, lasting build quality and custom designs for modern homes."
        image="/images/sofas/tan-leather-three-seater-sofa.webp"
      />
      <Container className="section-y space-y-12 md:space-y-20">
        <Breadcrumbs trail={[{ name: "Home", path: "/" }]} current="About" />
        <section>
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">Our Story</h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            Galaxy Sofas began with a simple idea: a sofa should look considered and feel easy to
            live with. We work with homeowners who want seating that fits their room, their family
            and the way they actually sit — not a one-size catalogue piece.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">Our Approach</h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            We start with the space and the people who use it. Measurements, fabric feel, cushion
            firmness and daily wear all shape the design. Whether you need an L shape for a family
            room or a compact two-seater, the process stays practical and clear. You can see the
            range on our{" "}
            <Link href="/products/" className="cursor-pointer text-primary hover:underline">
              sofa collection page
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">Our Craftsmanship</h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            Frames, foam and upholstery are chosen for durability. Skilled stitching and finishing
            keep the sofa looking composed in the home. If you already have a sofa worth keeping,
            we also{" "}
            <Link href="/services/" className="cursor-pointer text-primary hover:underline">
              remodel, repair and replace fabric or cushions
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">Why Customers Choose Us</h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            People come to Galaxy Sofas for custom sizing, honest material choices and support
            after delivery. We keep communication simple through phone and WhatsApp so you can
            decide with confidence.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {values.map((value) => (
              <li key={value} className="text-sm text-dark">
                {value}
              </li>
            ))}
          </ul>
        </section>
        <section className="border-t border-line pt-12 text-center">
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
            Let&apos;s Create Your Perfect Sofa
          </h2>
          <p className="mx-auto mt-3 max-w-xl">
            Tell us about your room, preferred style and comfort. We will help you plan a sofa that
            belongs in your home.
          </p>
          <div className="action-stack mt-6 sm:justify-center">
            <WhatsAppButton message={getCustomDesignMessage()} label="Discuss Your Design" />
            <Button href="/contact/" variant="outline">
              Contact Us
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
