import { Container, JsonLd } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses enquiry information. We do not sell personal data.`,
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <div className="pb-24 pt-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />
        <h1 className="mt-8 font-display text-5xl">Privacy Policy</h1>
        <div className="mt-8 space-y-5 text-muted">
          <p>
            {site.name} uses the contact form to receive furniture enquiries. We collect your name, email, phone number
            and message so we can reply. SMTP credentials never run in the browser.
          </p>
          <p>
            We do not sell enquiry data. Messages are stored only as needed to fulfil your request. If analytics IDs are
            configured by the site owner, those tools may set cookies according to their own policies. They are off by
            default in this project until those IDs are provided.
          </p>
          <p>
            To ask for a copy or deletion of an enquiry you sent, email {site.email} from the same address you used on
            the form.
          </p>
        </div>
      </Container>
    </div>
  );
}
