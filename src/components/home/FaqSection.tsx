import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { site } from "@/constants/site";

/**
 * Answers to the questions customers actually ask before enquiring.
 * Exported so the home page can emit matching FAQPage structured data —
 * the visible copy and the JSON-LD are the same text by construction.
 */
export const homeFaqs = [
  {
    question: "Do you make sofas to custom sizes?",
    answer:
      "Yes. Most of our work is made to measure. Send your room measurements or a photo of the space on WhatsApp and we plan the size, seat depth and layout around it, including access for delivery.",
  },
  {
    question: "Which sofa types do you make?",
    answer:
      "L shape sofas, recliners, sofa cum beds, three seaters, two seaters and fully custom designs built from your own drawing or reference photo.",
  },
  {
    question: "Do you repair or re-upholster an existing sofa?",
    answer:
      "Yes. We handle sofa repair, remodeling, fabric replacement and cushion replacement. If the frame is sound, rebuilding an existing sofa is often the more sensible option.",
  },
  {
    question: "Where does Galaxy Sofas deliver?",
    answer: `We manufacture in ${site.city} and deliver across ${site.serviceArea}. Delivery is planned around staircase, lift and doorway access before the build is finished.`,
  },
  {
    question: "How long does a custom sofa take?",
    answer:
      "Lead time depends on the design, fabric availability and current workload, so we confirm a realistic date when you enquire rather than quoting a blanket figure.",
  },
  {
    question: "How do I get a quote?",
    answer: `Call ${site.phoneDisplay}, message us on WhatsApp or send the enquiry form. Sharing room measurements and a reference photo gets you an accurate answer fastest.`,
  },
];

export function FaqSection() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeader title="Common Questions" />
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {homeFaqs.map((faq) => (
            <div key={faq.question} className="border-t border-line pt-5">
              <h3 className="font-serif text-lg text-dark sm:text-xl">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm">
          Still deciding?{" "}
          <Link href="/products/" className="cursor-pointer text-primary hover:underline">
            Browse the sofa collection
          </Link>{" "}
          or{" "}
          <Link href="/services/" className="cursor-pointer text-primary hover:underline">
            read about our sofa services
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
