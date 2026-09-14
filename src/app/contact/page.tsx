import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactCards } from "@/components/common/ContactCards";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Galaxy Sofas in Chennai for custom sofas, repairs and WhatsApp enquiries. Call 9786211128 or email galaxysofas1717@gmail.com.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact Galaxy Sofas",
    description: "Call, WhatsApp or send an enquiry about custom and premium sofas in Chennai.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Talk About Your Sofa"
        description="Call, WhatsApp or send a short enquiry. We will help you choose a sofa or plan a custom design."
      />
      <Container className="section-y grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-12">
        <ContactCards includeWhatsApp columns="page" />
        <ContactForm />
      </Container>
    </>
  );
}
