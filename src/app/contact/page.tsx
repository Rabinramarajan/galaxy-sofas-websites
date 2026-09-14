import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactCards } from "@/components/common/ContactCards";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/constants/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: `Contact ${site.name} | Sofa Enquiries in ${site.city}`,
  absoluteTitle: `Contact ${site.name} | Sofa Enquiries in ${site.city}`,
  description:
    "Contact Galaxy Sofas in Chennai for custom sofas, repairs and upholstery. Call +91 97862 11128, message on WhatsApp or send an enquiry.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />
      <PageHero
        title="Contact Galaxy Sofas"
        description="Call, WhatsApp or send a short enquiry. We will help you choose a sofa or plan a custom design."
      />
      <Container className="section-y">
        <Breadcrumbs className="mb-8" trail={[{ name: "Home", path: "/" }]} current="Contact" />
        <p className="mb-10 max-w-2xl leading-relaxed">
          The quickest route is WhatsApp with your room measurements and a photo of the space.
          If you prefer, use the form and we will reply with sizes, fabric options and a realistic
          lead time. We build and deliver across {site.serviceArea}.
        </p>
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-12">
          <ContactCards includeWhatsApp columns="page" />
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
