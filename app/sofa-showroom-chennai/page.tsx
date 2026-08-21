import Link from "next/link";
import { Container, JsonLd, PageShell } from "@/components/ui/primitives";
import { Breadcrumbs } from "@/components/products/breadcrumbs";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { mapsLink, site, telLink } from "@/lib/site";
import { sofaSubcategories } from "@/data/categories";
import { VisitShowroomSection } from "@/components/sections/local-seo";

export const metadata = createMetadata({
  title: "Sofa Showroom in Chennai | Galaxy Sofas",
  description:
    "Visit the Galaxy Sofas showroom in Virugambakkam, Chennai to compare sofas, beds and home furniture in person. Location, categories, directions and enquiry options.",
  path: "/sofa-showroom-chennai",
});

const pageFaqs = [
  {
    question: "Who is the Galaxy Sofas showroom for?",
    answer:
      "The Chennai showroom is for households choosing a sofa or related furniture who want to sit in pieces, check dimensions and talk through layout before deciding. It is equally useful if you already know you need an L-shape, a 3-seater, or a bed to match.",
  },
  {
    question: "What can I explore at the sofa showroom in Chennai?",
    answer:
      "You can browse sofas — including L-shaped, corner, 3-seater, 2-seater, recliner and sofa sets — plus beds and complementary living, dining and bedroom furniture. Floor stock varies, so call ahead if you are travelling for a specific piece.",
  },
  {
    question: "How do I reach Galaxy Sofas?",
    answer:
      "The showroom is at No. 19, Nerkundram, Virugambakkam, Chennai 600107. Use Get Directions for the Google Maps listing, or call 097862 11128 if you need help with the approach from your neighbourhood.",
  },
];

export default function SofaShowroomChennaiPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Sofa showroom in Chennai", path: "/sofa-showroom-chennai" },
        ])}
      />
      <JsonLd data={faqJsonLd(pageFaqs)} />
      <Container>
        <Breadcrumbs
          items={[{ name: "Home", href: "/" }, { name: "Sofa showroom in Chennai" }]}
        />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Virugambakkam · West Chennai</p>
          <h1 className="page-title mt-3">Sofa Showroom in Chennai</h1>
          <p className="mt-5 text-muted">
            Galaxy Sofas is a sofa-first furniture showroom in Nerkundram, Virugambakkam. If you are searching for a
            sofa shop in Chennai and want to compare contemporary designs in person — rather than from photographs
            alone — this page explains what a visit is for, what you can look at, and how to get here.
          </p>
        </header>

        <section className="mt-14 max-w-3xl">
          <h2 className="section-title">Where the showroom is</h2>
          <p className="mt-4 text-muted">
            The address is {site.fullAddress}. That places the floor in West Chennai, with straightforward access from
            areas such as Porur, Koyambedu, Valasaravakkam, Saligramam, Anna Nagar, KK Nagar and Vadapalani. The
            listing name to search is Galaxy Sofas — the same name, address and phone used across this website.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="section-title">Sofa categories you can browse</h2>
          <p className="mt-4 max-w-3xl text-muted">
            Start with the sofa catalogue if you want to shortlist before you travel. These are the sofa types we
            currently list because we have pieces in those families — we do not publish empty category pages.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sofaSubcategories.map((item) => (
              <li key={item.slug} className="border-t border-border pt-4">
                <Link className="font-display text-2xl hover:text-walnut" href={`/sofas/${item.slug}`}>
                  {item.name}
                </Link>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            You can also explore{" "}
            <Link className="underline" href="/beds">
              beds in Chennai
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/furniture">
              home furniture
            </Link>{" "}
            on the same visit.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="section-title">Who a showroom visit helps</h2>
          <p className="mt-4 text-muted">
            A visit is most useful if you are furnishing a living room for the first time, replacing a sofa that no
            longer fits how you sit, or choosing between an L-shape and a 3-seater. Bring wall lengths, a photo of the
            room, and a note of door width if the piece has to go up a typical apartment stair.
          </p>
          <p className="mt-4 text-muted">
            If you already know the model, you can still enquire by phone or form. Pricing and order confirmation happen
            through the showroom — this website is a catalogue, not a checkout.
          </p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="section-title">How to enquire</h2>
          <p className="mt-4 text-muted">
            Call {site.phoneDisplay}, email {site.email}, or use the contact form. For driving directions, use the
            Google Maps listing for Galaxy Sofas at the address above.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Send Enquiry</Button>
            <Button href={telLink()} variant="secondary">
              Call Us
            </Button>
            <Button href={mapsLink()} variant="secondary" external>
              Get Directions
            </Button>
          </div>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="section-title">Questions about visiting</h2>
          <div className="mt-6">
            {pageFaqs.map((faq) => (
              <details key={faq.question} className="group border-t border-border py-5">
                <summary className="cursor-pointer font-display text-2xl marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                </summary>
                <p className="mt-3 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </Container>
      <VisitShowroomSection
        title="Directions to the Chennai showroom"
        intro="Use the map for the verified Galaxy Sofas location in Nerkundram, Virugambakkam. If you are coming from another part of Chennai, call ahead so we can confirm what is on the floor that day."
      />
    </PageShell>
  );
}
