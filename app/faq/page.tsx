import { faqs } from "@/data/faq";
import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import Link from "next/link";

export const metadata = createMetadata({
  title: `Furniture FAQ | ${site.name}`,
  description: `Answers on where Galaxy Sofas is in Chennai, sofa types, L-shaped sofas, visiting the Virugambakkam showroom, and what furniture you can explore.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <Container width="copy">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ" }]} />
        <h1 className="page-title mt-8">Questions before you visit</h1>
        <div className="mt-10 space-y-0">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-t border-border py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl leading-tight marker:content-none [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="text-sm text-muted transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-12 text-sm">
          Still unsure?{" "}
          <Link href="/contact" className="underline">
            Contact {site.name}
          </Link>
          , read about the{" "}
          <Link href="/sofa-showroom-chennai" className="underline">
            sofa showroom in Chennai
          </Link>
          , or see{" "}
          <Link href="/guides/how-to-choose-sofa-size" className="underline">
            how to choose the right sofa size
          </Link>
          .
        </p>
      </Container>
    </PageShell>
  );
}
