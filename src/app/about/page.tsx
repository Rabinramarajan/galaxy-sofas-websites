import type { Metadata } from "next";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getCustomDesignMessage } from "@/utils/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Galaxy Sofas in Chennai — a furniture brand focused on comfortable, durable and custom-made sofas.",
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About Galaxy Sofas",
    description:
      "Learn about Galaxy Sofas in Chennai — stylish, comfortable and custom-made sofas.",
  },
};

const values = ["Comfort", "Quality", "Craftsmanship", "Trust", "Customization"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Galaxy Sofas"
        description="A Chennai sofa workshop focused on comfort, lasting build quality and custom designs for modern homes."
        image="/images/about/workshop.jpg"
      />
      <Container className="section-y space-y-12 md:space-y-20">
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
            room or a compact two-seater, the process stays practical and clear.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">Our Craftsmanship</h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            Frames, foam and upholstery are chosen for durability. Skilled stitching and finishing
            keep the sofa looking composed in the home. If you already have a sofa worth keeping,
            we also remodel, repair and replace fabric or cushions.
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
