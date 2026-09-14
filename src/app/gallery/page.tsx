import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/constants/site";
import { galleryItems } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { getGeneralEnquiryMessage } from "@/utils/whatsapp";

export const metadata = pageMetadata({
  title: `Sofa Designs & Recent Works | ${site.city}`,
  absoluteTitle: `Sofa Designs & Recent Works | ${site.name} ${site.city}`,
  description:
    "Sofa designs and finished work from Galaxy Sofas in Chennai — L shape sectionals, three seaters, two seaters and re-upholstered sofas.",
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery/" },
        ])}
      />
      <PageHero
        title="Sofa Designs & Recent Works"
        description="A look at sofa styles we build and finish for homes in and around Chennai."
      />
      <Container className="section-y">
        <Breadcrumbs className="mb-8" trail={[{ name: "Home", path: "/" }]} current="Gallery" />
        <p className="mb-10 max-w-2xl leading-relaxed sm:mb-14">
          Each of these can be rebuilt in a different size, fabric or colour. If one is close to
          what you have in mind, send it to us on WhatsApp and we will work out what it takes to
          make it fit your room.
        </p>
        <div className="grid grid-cols-1 gap-8 min-[375px]:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <figure key={item.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index < 3}
                  loading={index < 3 ? undefined : "lazy"}
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <figcaption className="pt-3">
                <p className="text-[0.8125rem] text-primary">{item.category}</p>
                <p className="mt-1 text-sm text-dark">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <section className="mt-16 border-t border-line pt-10 text-center">
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
            Seen something you like?
          </h2>
          <p className="mx-auto mt-3 max-w-xl">
            Send us the design along with your room measurements and we will tell you what is
            possible, in which fabrics, and how long it takes.
          </p>
          <div className="action-stack mt-6 sm:justify-center">
            <WhatsAppButton message={getGeneralEnquiryMessage()} label="Send an enquiry" />
          </div>
          <p className="mt-6 text-sm">
            Or browse the{" "}
            <Link href="/products/" className="cursor-pointer text-primary hover:underline">
              full sofa collection
            </Link>{" "}
            and{" "}
            <Link href="/services/" className="cursor-pointer text-primary hover:underline">
              sofa services
            </Link>
            .
          </p>
        </section>
      </Container>
    </>
  );
}
