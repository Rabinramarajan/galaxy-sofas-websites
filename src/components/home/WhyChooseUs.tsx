import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { IconName } from "@/constants/icons";

const reasons: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Premium Materials",
    text: "Frames, foam and fabrics chosen for daily living, not just showroom photos.",
    icon: "materials",
  },
  {
    title: "Custom Sofa Designs",
    text: "Sizes, layouts and finishes planned around your room and how you sit.",
    icon: "customDesign",
  },
  {
    title: "Quality Craftsmanship",
    text: "Careful stitching, strong joints and finishing you can inspect up close.",
    icon: "craftsmanship",
  },
  {
    title: "Affordable Pricing",
    text: "Clear options so you can choose the sofa that fits your budget.",
    icon: "pricing",
  },
  {
    title: "Comfort Focused",
    text: "Seat depth, cushion density and support come first in every design.",
    icon: "comfort",
  },
  {
    title: "Customer Support",
    text: "Talk to us on call or WhatsApp for samples, measurements and aftercare.",
    icon: "support",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeader title="Why Choose Galaxy Sofas" />
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="border-t border-line pt-5">
              <Icon name={reason.icon} size={22} className="text-primary" />
              <h3 className="mt-4 font-serif text-xl text-dark">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{reason.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
