import {
  BadgeIndianRupee,
  Hammer,
  HeartHandshake,
  Sofa,
  Sparkles,
  SwatchBook,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";

const reasons = [
  {
    title: "Premium Materials",
    text: "Frames, foam and fabrics chosen for daily living, not just showroom photos.",
    icon: Sparkles,
  },
  {
    title: "Custom Sofa Designs",
    text: "Sizes, layouts and finishes planned around your room and how you sit.",
    icon: SwatchBook,
  },
  {
    title: "Quality Craftsmanship",
    text: "Careful stitching, strong joints and finishing you can inspect up close.",
    icon: Hammer,
  },
  {
    title: "Affordable Pricing",
    text: "Clear options so you can choose the sofa that fits your budget.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Comfort Focused",
    text: "Seat depth, cushion density and support come first in every design.",
    icon: Sofa,
  },
  {
    title: "Customer Support",
    text: "Talk to us on call or WhatsApp for samples, measurements and aftercare.",
    icon: HeartHandshake,
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeader title="Why Choose Galaxy Sofas" />
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <article key={reason.title} className="border-t border-line pt-5">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-xl text-dark">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{reason.text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
