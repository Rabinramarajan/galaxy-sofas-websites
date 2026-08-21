import Link from "next/link";
import { mapsLink, site, telLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/primitives";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyGalaxySection() {
  const reasons = [
    {
      title: "Curated furniture selection",
      body: "A focused floor of sofas, beds and complementary pieces — chosen so you can compare designs without wading through lookalikes.",
    },
    {
      title: "Comfortable sofa designs",
      body: "Seating is specified for everyday living: proportions you can sit in, fabrics you can live with, and layouts for different room sizes.",
    },
    {
      title: "Contemporary styles",
      body: "Modern and quiet designs for living rooms and bedrooms, from L-shaped sofas to straightforward three-seaters and beds.",
    },
    {
      title: "Showroom experience",
      body: "Visit in person to check dimensions, seat depth and finish. Photographs help; sitting in the piece decides.",
    },
    {
      title: "Personalised assistance",
      body: "Ask about layout, fabric and what will actually fit through a Chennai apartment stair. We would rather scale a piece than force one.",
    },
    {
      title: "Local Chennai presence",
      body: `Galaxy Sofas is in Nerkundram, Virugambakkam — convenient for West Chennai neighbourhoods including Porur, Koyambedu, Anna Nagar and Vadapalani.`,
    },
  ];

  return (
    <section className="bg-linen py-20 md:py-24">
      <Container>
        <SectionHeading as="h2" eyebrow="The showroom" title="Why Choose Galaxy Sofas?" />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title} className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">{reason.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{reason.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted">
          Start with{" "}
          <Link className="underline" href="/sofas">
            sofas
          </Link>
          ,{" "}
          <Link className="underline" href="/beds">
            beds
          </Link>{" "}
          or{" "}
          <Link className="underline" href="/furniture">
            home furniture
          </Link>
          , or read how we approach rooms on the{" "}
          <Link className="underline" href="/about">
            about page
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}

export function VisitShowroomSection({
  title = "Visit Galaxy Sofas in Virugambakkam, Chennai",
  intro,
}: {
  title?: string;
  intro: string;
}) {
  return (
    <section className="border-t border-border py-20 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading as="h2" eyebrow={`${site.locality} · ${site.city}`} title={title} />
          <p className="mt-6 max-w-xl text-muted">{intro}</p>
          <address className="mt-8 not-italic">
            <p className="font-medium">{site.name}</p>
            <p className="mt-1 text-muted">
              {site.streetAddress}
              <br />
              {site.city}, {site.region} {site.postalCode}
            </p>
            <p className="mt-4">
              <a className="hover:text-walnut" href={telLink()}>
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a className="hover:text-walnut" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
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
            Prefer to see sofas first?{" "}
            <Link className="underline" href="/sofa-showroom-chennai">
              Read about the Chennai sofa showroom
            </Link>{" "}
            or{" "}
            <Link className="underline" href="/contact">
              contact Galaxy Sofas
            </Link>
            .
          </p>
        </div>
        <div>
          <iframe
            title={`${site.name} showroom map`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.name}, ${site.fullAddress}`)}&output=embed`}
            className="h-80 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p className="mt-3 text-sm text-muted">
            Search Google Maps for {site.name} at {site.fullAddress} if the embed does not load.
          </p>
        </div>
      </Container>
    </section>
  );
}
