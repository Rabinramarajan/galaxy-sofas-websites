import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { PageHero } from "@/components/common/PageHero";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See recent sofa projects from Galaxy Sofas in Chennai, including custom designs, L shape sofas, recliners and sofa cum beds.",
  alternates: { canonical: "/gallery/" },
  openGraph: {
    title: "Our Works | Galaxy Sofas",
    description: "A gallery of recent sofa projects completed by Galaxy Sofas.",
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Our Works"
        description="A look at sofas we have made and finished for homes in and around Chennai."
      />
      <Container className="section-y">
        <div className="grid grid-cols-1 gap-8 min-[375px]:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <figure key={item.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
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
      </Container>
    </>
  );
}
