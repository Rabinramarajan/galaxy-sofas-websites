import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getGeneralEnquiryMessage } from "@/utils/whatsapp";

const HERO_IMAGE = "/images/sofas/green-velvet-three-seater-sofa.webp";

export function HeroSection() {
  return (
    <section className="relative min-h-[30rem] overflow-hidden bg-dark sm:min-h-[88vh]">
      {/*
        LCP element. The still image always renders and is never lazy-loaded;
        the video sits on top only from 640px up, and its <source media> query
        means phones never download the 2.5MB file at all.
      */}
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[center_60%] sm:object-center"
      />
      <video
        className="absolute inset-0 hidden h-full w-full object-cover object-center sm:block motion-reduce:hidden"
        poster={HERO_IMAGE}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src="/images/hero/galaxy-sofas-hero-loop.mp4"
          type="video/mp4"
          media="(min-width: 640px)"
        />
      </video>

      <div className="absolute inset-0 bg-dark/30" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark/90 via-dark/45 to-transparent" />

      <Container className="relative flex min-h-[30rem] flex-col justify-end pb-20 pt-16 sm:min-h-[88vh] sm:pb-24 sm:pt-28">
        <h1 className="max-w-2xl font-serif text-[2.125rem] text-white sm:text-[3.25rem] lg:text-[3.75rem]">
          Custom Sofas Crafted for Comfortable Chennai Homes
        </h1>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/85 sm:text-lg">
          L shape sofas, recliners, sofa cum beds and made-to-measure designs, built in our Chennai
          workshop.
        </p>
        <div className="action-stack mt-8">
          <Button href="/products/" className="px-7 py-3 text-base">
            Explore Sofa Collection
          </Button>
          <WhatsAppButton
            message={getGeneralEnquiryMessage()}
            variant="inverse"
            className="px-7 py-3 text-base"
          />
        </div>
      </Container>
    </section>
  );
}
