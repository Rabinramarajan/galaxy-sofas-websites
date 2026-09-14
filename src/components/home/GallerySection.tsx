import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { galleryItems } from "@/data/gallery";

export function GallerySection() {
  const preview = galleryItems.slice(0, 8);

  return (
    <section className="section-y">
      <Container>
        <SectionHeader
          title="Completed Works"
          description="Real sofas delivered to real homes across Chennai."
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {preview.map((item) => (
            <figure
              key={item.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg bg-dark/5"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 to-transparent px-3 pb-3 pt-8 text-xs text-white sm:text-sm">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="action-stack mt-10">
          <Button href="/gallery/" variant="outline">
            View Full Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}
