import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getGeneralEnquiryMessage } from "@/utils/whatsapp";

const trustItems = [
  "Quality Craftsmanship",
  "Custom Designs",
  "Built for Comfort",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[32rem] overflow-hidden bg-dark sm:min-h-[86vh]">
      <Image
        src="/images/hero/galaxy-sofas-hero.jpg"
        alt="Premium sofa in a modern living room"
        fill
        priority
        className="object-cover object-[center_70%] sm:object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-dark/40 sm:bg-dark/25" />
      <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-dark/80 to-transparent sm:h-1/2" />
      <Container className="relative flex min-h-[32rem] flex-col justify-end pb-24 pt-16 sm:min-h-[86vh] sm:pb-16 sm:pt-28">
        <h1 className="max-w-xl font-serif text-[1.875rem] text-white sm:text-[3.15rem] lg:text-[3.5rem]">
          Comfort Crafted for Your Home
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/88 sm:mt-4 sm:text-base">
          Discover beautifully crafted sofas designed for comfort, style and everyday living.
        </p>
        <div className="action-stack mt-6 sm:mt-7">
          <Button href="/products/">Explore Collection</Button>
          <WhatsAppButton
            message={getGeneralEnquiryMessage()}
            variant="outline"
            className="border-white/70 text-white hover:border-white hover:bg-white hover:text-dark"
          />
        </div>
        <ul className="mt-6 flex flex-col gap-1.5 text-xs text-white/75 sm:mt-10 sm:flex-row sm:gap-10 sm:text-sm">
          {trustItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
