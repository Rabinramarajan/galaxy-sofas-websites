import Link from "next/link";
import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { mapsLink, site, telLink } from "@/lib/site";

export const metadata = createMetadata({
  title: "Sofa Showroom in Virugambakkam, Chennai | Galaxy Sofas",
  description:
    "Galaxy Sofas is a sofa showroom in Nerkundram, Virugambakkam, Chennai. Directions, nearby areas, furniture categories and contact details for a showroom visit.",
  path: "/sofa-showroom-virugambakkam",
});

const pageFaqs = [
  {
    question: "Is Galaxy Sofas in Virugambakkam or Nerkundram?",
    answer:
      "Both names describe the same location. The showroom is at No. 19, Nerkundram, Virugambakkam, Chennai 600107. Nerkundram is the locality; Virugambakkam is the neighbourhood most people search for.",
  },
  {
    question: "Which nearby areas is the Virugambakkam showroom convenient for?",
    answer:
      "West Chennai neighbourhoods such as Valasaravakkam, Porur, Koyambedu, Arumbakkam, Saligramam, KK Nagar, Ashok Nagar, Vadapalani, Mogappair, Choolaimedu and Anna Nagar are typical starting points for a visit.",
  },
];

export default function SofaShowroomVirugambakkamPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Sofa showroom in Virugambakkam", path: "/sofa-showroom-virugambakkam" },
        ])}
      />
      <JsonLd data={faqJsonLd(pageFaqs)} />
      <Container width="copy">
        <Breadcrumbs
          items={[{ name: "Home", href: "/" }, { name: "Sofa showroom in Virugambakkam" }]}
        />
        <p className="eyebrow mt-8">Nerkundram · Chennai 600107</p>
        <h1 className="page-title mt-3">Sofa Showroom in Virugambakkam</h1>
        <p className="mt-5 text-muted">
          If you are looking for a sofa shop near Virugambakkam, Galaxy Sofas is a showroom at No. 19, Nerkundram —
          the same NAP used on Google Business Profile: Galaxy Sofas, {site.fullAddress}, phone {site.phoneDisplay}.
        </p>

        <section className="mt-12">
          <h2 className="section-title">The Nerkundram location</h2>
          <p className="mt-4 text-muted">
            Nerkundram sits beside Virugambakkam in West Chennai. The showroom is intended as a place to walk a living
            room layout in person: sit on an L-shape, compare a 3-seater, and check whether a bed or dining table will
            still leave you a walkway at home.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">What you can see on a visit</h2>
          <p className="mt-4 text-muted">
            Furniture categories currently listed on the website include{" "}
            <Link className="underline" href="/sofas">
              sofas
            </Link>
            ,{" "}
            <Link className="underline" href="/beds">
              beds
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/furniture">
              home furniture
            </Link>
            . Within sofas, look at{" "}
            <Link className="underline" href="/sofas/l-shaped-sofas">
              L-shaped sofas
            </Link>
            ,{" "}
            <Link className="underline" href="/sofas/3-seater-sofas">
              3-seater sofas
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/sofas/fabric-sofas">
              fabric sofas
            </Link>
            . Floor pieces change; a call to {site.phoneDisplay} before you travel is worthwhile if you need a specific
            style.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Nearby areas</h2>
          <p className="mt-4 text-muted">
            Households often visit from {site.nearbyAreas.slice(0, 8).join(", ")}, and other parts of West Chennai. We
            have not created a separate page for every neighbourhood — this page is here because the showroom actually
            sits in Virugambakkam / Nerkundram.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Directions and contact</h2>
          <address className="mt-4 not-italic text-muted">
            {site.name}
            <br />
            No. 19, Nerkundram,
            <br />
            Virugambakkam,
            <br />
            Chennai, Tamil Nadu 600107
            <br />
            <a className="text-charcoal underline" href={telLink()}>
              {site.phoneDisplay}
            </a>
            <br />
            <a className="text-charcoal underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </address>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={mapsLink()} external>
              Get Directions
            </Button>
            <Button href="/contact" variant="secondary">
              Send Enquiry
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            For a broader overview of visiting, see the{" "}
            <Link className="underline" href="/sofa-showroom-chennai">
              sofa showroom in Chennai
            </Link>{" "}
            page.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="section-title">Local questions</h2>
          {pageFaqs.map((faq) => (
            <details key={faq.question} className="group border-t border-border py-5">
              <summary className="cursor-pointer font-display text-2xl marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.question}
              </summary>
              <p className="mt-3 text-muted">{faq.answer}</p>
            </details>
          ))}
        </section>
      </Container>
    </PageShell>
  );
}
