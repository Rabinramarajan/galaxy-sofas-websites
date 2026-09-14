import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Galaxy Sofas services in Chennai: custom sofa manufacturing, repair, remodeling, fabric replacement, cushion replacement and home delivery.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Sofa Services | Galaxy Sofas",
    description:
      "Custom manufacturing, sofa repair, remodeling, fabric and cushion replacement, and home delivery.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Sofa Services"
        description="Support for new sofas and the ones you already own — from custom manufacturing to repair and delivery."
      />
      <Container className="section-y">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} showCta headingLevel="h2" />
          ))}
        </div>
      </Container>
    </>
  );
}
