import { Container, JsonLd } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { mapsEmbedSrc, mapsLink, site, telLink, whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: `Contact ${site.name} | Furniture Enquiries`,
  description: `Enquire about sofas, beds and custom furniture at ${site.name} in ${site.city}. Call, WhatsApp, or visit the showroom. Opening hours and map included.`,
  path: "/contact",
});

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const product = typeof params.product === "string" ? params.product : "";

  return (
    <div className="pb-24 pt-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
        <div className="mt-8 grid gap-14 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-5xl">Enquire or visit</h1>
            <p className="mt-4 text-muted">
              Tell us the room and the piece. We reply on working days, usually within a few hours. For urgent
              availability, call or WhatsApp.
            </p>
            <div className="mt-8">
              <EnquiryForm defaultProduct={product} source="/contact" />
            </div>
          </div>
          <div id="showroom">
            <h2 className="font-display text-3xl">Showroom</h2>
            <address className="mt-4 not-italic text-muted">
              {site.name}
              <br />
              {site.addressLine}
              <br />
              {site.city}, {site.region} {site.postalCode}
            </address>
            <p className="mt-4">
              <a className="underline" href={telLink()}>
                {site.phoneDisplay}
              </a>
              <br />
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <ul className="mt-4 text-sm text-muted">
              {site.hours.map((item) => (
                <li key={item.days}>
                  {item.days}: {item.time}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              We regularly deliver across {site.serviceAreas.join(", ")}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={whatsappLink()} external>
                WhatsApp
              </Button>
              <Button href={mapsLink()} variant="secondary" external>
                Open in Maps
              </Button>
            </div>
            <iframe
              title={`${site.name} showroom map`}
              src={mapsEmbedSrc()}
              className="mt-8 h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
