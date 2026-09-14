import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ServiceCard } from "@/components/services/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/constants/site";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceListSchema } from "@/lib/structured-data";
import { getGeneralEnquiryMessage } from "@/utils/whatsapp";

export const metadata = pageMetadata({
  title: `Sofa Services in ${site.city}`,
  description:
    "Sofa repair, renovation, upholstery and cushion replacement in Chennai, plus custom sofa manufacturing and home delivery from Galaxy Sofas.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceListSchema(services),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/" },
          ]),
        ]}
      />
      <PageHero
        title="Sofa Services in Chennai"
        description="Support for new sofas and the ones you already own — from custom manufacturing to repair, upholstery and delivery."
      />
      <Container className="section-y">
        <Breadcrumbs
          className="mb-8"
          trail={[{ name: "Home", path: "/" }]}
          current="Services"
        />
        <p className="mb-12 max-w-2xl leading-relaxed sm:mb-16">
          A sofa that has lost its shape rarely needs replacing. If the frame is sound, repair,
          new foam or fresh upholstery usually restores it for a fraction of a new build. Tell us
          what is wrong — sagging seats, torn fabric, a wobbly frame, or simply a colour that no
          longer suits the room — and we will say honestly whether a repair or a new sofa is the
          better use of your money.
        </p>
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} showCta headingLevel="h2" />
          ))}
        </div>
        <section className="mt-16 border-t border-line pt-10 sm:mt-20">
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
            Looking for a new sofa instead?
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed">
            If a rebuild is not worth it, we also manufacture new sofas to measure. Browse{" "}
            <Link href="/products/l-shape/" className="cursor-pointer text-primary hover:underline">
              L shape sofas
            </Link>
            ,{" "}
            <Link href="/products/recliner/" className="cursor-pointer text-primary hover:underline">
              recliner sofas
            </Link>
            ,{" "}
            <Link
              href="/products/sofa-cum-bed/"
              className="cursor-pointer text-primary hover:underline"
            >
              sofa cum beds
            </Link>{" "}
            or ask about a{" "}
            <Link href="/products/custom/" className="cursor-pointer text-primary hover:underline">
              custom sofa built to your room
            </Link>
            .
          </p>
          <div className="action-stack mt-8">
            <WhatsAppButton
              message={getGeneralEnquiryMessage()}
              label="Ask about a sofa service"
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed">
            Services are carried out across {site.serviceArea}. Call{" "}
            <a href={site.phoneHref} className="cursor-pointer text-primary hover:underline">
              {site.phoneDisplay}
            </a>{" "}
            or use the{" "}
            <Link href="/contact/" className="cursor-pointer text-primary hover:underline">
              enquiry form
            </Link>
            .
          </p>
        </section>
      </Container>
    </>
  );
}
