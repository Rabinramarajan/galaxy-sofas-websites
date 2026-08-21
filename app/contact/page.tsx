import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { mapsEmbedSrc, mapsLink, site, telLink, whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { IconWhatsApp } from "@/components/ui/icons";

export const metadata = createMetadata({
  title: `Contact ${site.name} | Furniture Enquiries`,
  description: `Enquire about sofas, beds and custom furniture at ${site.name} in ${site.city}. Call, WhatsApp, or visit the showroom. Opening hours and map included.`,
  path: "/contact",
});

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const params = await searchParams;
  const product = typeof params.product === "string" ? params.product : "";

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Visit or write</p>
            <h1 className="page-title mt-3">Enquire or visit</h1>
            <p className="mt-4 max-w-lg text-muted">
              Tell us the room and the piece. We reply on working days, usually within a few hours. For urgent
              availability, call or WhatsApp.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              <li>
                <a href={telLink()} className="flex min-h-14 items-center justify-between gap-4 py-3">
                  <span className="eyebrow text-muted">Phone</span>
                  <span className="text-sm sm:text-base">{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex min-h-14 items-center justify-between gap-4 py-3">
                  <span className="eyebrow text-muted">Email</span>
                  <span className="break-all text-sm sm:text-base">{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  className="flex min-h-14 items-center justify-between gap-4 py-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="eyebrow text-muted">WhatsApp</span>
                  <span className="inline-flex items-center gap-2 text-sm sm:text-base">
                    <IconWhatsApp /> Message the showroom
                  </span>
                </a>
              </li>
            </ul>
            <div className="mt-10">
              <h2 className="font-display text-2xl">Send an enquiry</h2>
              <div className="mt-6">
                <EnquiryForm defaultProduct={product} source="/contact" />
              </div>
            </div>
          </div>
          <div id="showroom" className="scroll-mt-28">
            <h2 className="section-title">Showroom</h2>
            <address className="mt-4 not-italic text-muted">
              {site.name}
              <br />
              {site.addressLine}
              <br />
              {site.city}, {site.region} {site.postalCode}
            </address>
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
    </PageShell>
  );
}
