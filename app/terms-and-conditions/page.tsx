import { Container, JsonLd } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description: `Terms for using the ${site.name} website, catalogue pricing and showroom enquiries.`,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <div className="pb-24 pt-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms", path: "/terms-and-conditions" },
        ])}
      />
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
        <h1 className="mt-8 font-display text-5xl">Terms and Conditions</h1>
        <div className="mt-8 space-y-5 text-muted">
          <p>
            This website is a catalogue and enquiry service. Prices shown are indicative and may change with fabric,
            size and finish. A sale is formed only when the showroom confirms an order in writing.
          </p>
          <p>
            Images are representative. Timber grain, fabric dye lots and handmade upholstery will vary. Lead times are
            estimates until production is scheduled.
          </p>
          <p>
            You may not scrape or republish our product copy or photography without permission. Showroom visits are by
            opening hours listed on the contact page unless we agree otherwise.
          </p>
        </div>
      </Container>
    </div>
  );
}
