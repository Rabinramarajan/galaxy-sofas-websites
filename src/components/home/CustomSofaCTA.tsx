import Image from "next/image";
import { Container } from "@/components/common/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getCustomDesignMessage } from "@/utils/whatsapp";

export function CustomSofaCTA() {
  return (
    <section className="section-y">
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="/images/sofas/grey-l-shape-sectional-living-room.webp"
            alt="Grey sectional sofa arranged around wooden coffee tables"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="font-serif text-[1.625rem] text-dark sm:text-[2.25rem]">
            Have a Sofa Design in Mind?
          </h2>
          <p className="mt-4 max-w-md leading-relaxed">
            We create custom sofas based on your space, style and comfort requirements.
          </p>
          <div className="action-stack mt-8">
            <WhatsAppButton message={getCustomDesignMessage()} label="Discuss Your Design" />
          </div>
        </div>
      </Container>
    </section>
  );
}
