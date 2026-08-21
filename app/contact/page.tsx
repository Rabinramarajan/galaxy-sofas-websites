import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { mapsEmbedSrc, mapsLink, site, telLink } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "Contact Galaxy Sofas | Chennai Furniture Showroom",
  description:
    "Visit Galaxy Sofas at No. 19, Nerkundram, Virugambakkam, Chennai 600107. Call 097862 11128, email galaxysofas1717@gmail.com, or send an enquiry.",
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
            <p className="eyebrow">Chennai showroom</p>
            <h1 className="page-title mt-3">Visit Galaxy Sofas</h1>
            <p className="mt-4 max-w-lg text-muted">
              Come to the showroom to sit in sofas, check bed sizes and compare furniture finishes. For questions before
              you travel, call, email or send an enquiry.
            </p>
            <address className="mt-8 not-italic text-muted">
              <p className="font-medium text-charcoal">{site.name}</p>
              <p className="mt-2">
                No. 19, Nerkundram,
                <br />
                Virugambakkam,
                <br />
                Chennai,
                <br />
                Tamil Nadu 600107
              </p>
            </address>
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
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={mapsLink()} external>
                Get Directions
              </Button>
              <Button href={telLink()} variant="secondary">
                Call Us
              </Button>
            </div>
            <div className="mt-10">
              <h2 className="font-display text-2xl">Send Enquiry</h2>
              <div className="mt-6">
                <EnquiryForm defaultProduct={product} source="/contact" />
              </div>
            </div>
          </div>
          <div id="showroom" className="scroll-mt-28">
            <h2 className="section-title">Showroom location</h2>
            <p className="mt-4 text-sm text-muted">
              Galaxy Sofas is in Nerkundram, Virugambakkam — West Chennai, with straightforward access from Porur,
              Koyambedu, Valasaravakkam, Saligramam and Vadapalani. Use Get Directions for the verified Google Maps
              listing.
            </p>
            <iframe
              title={`${site.name} showroom map`}
              src={mapsEmbedSrc()}
              className="mt-8 h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
