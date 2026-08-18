import { faqs } from "@/data/faq";
import { Container, JsonLd } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata = createMetadata({
  title: `Furniture FAQ | ${site.name}`,
  description: `Answers on delivery, custom sofas, warranty, fabrics and visiting the ${site.name} showroom in ${site.city}.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div className="pb-24 pt-10">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <Container className="max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
        <h1 className="mt-8 font-display text-5xl">Questions before you visit</h1>
        <div className="mt-10 space-y-8">
          {faqs.map((faq) => (
            <section key={faq.question}>
              <h2 className="font-display text-2xl">{faq.question}</h2>
              <p className="mt-3 text-muted">{faq.answer}</p>
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm">
          Still unsure?{" "}
          <Link href="/contact" className="underline">
            Contact {site.name}
          </Link>{" "}
          or read{" "}
          <Link href="/guides/how-to-choose-sofa-size" className="underline">
            how to choose the right sofa size
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
