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
        <SectionHeader title="Our Recent Works" />
        <div className="grid grid-cols-1 gap-3 min-[375px]:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {preview.map((item) => (
            <figure
              key={item.id}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 374px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </figure>
          ))}
        </div>
        <div className="action-stack mt-10">
          <Button href="/gallery/" variant="outline">
            View Gallery
          </Button>
        </div>
      </Container>
    </section>
  );
}
