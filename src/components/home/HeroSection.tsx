import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { getGeneralEnquiryMessage } from "@/utils/whatsapp";

export function HeroSection() {
  return (
    <section className="relative min-h-[30rem] overflow-hidden bg-dark sm:min-h-[88vh]">
      {/* Single hero video for the whole site — no other section autoplays media. */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_60%] sm:object-center motion-reduce:hidden"
        poster="/images/hero/galaxy-sofas-hero.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/images/hero/Muted_Sofa_Video_Background.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 hidden bg-cover bg-[center_60%] motion-reduce:block sm:bg-center"
        style={{ backgroundImage: "url('/images/hero/galaxy-sofas-hero.jpg')" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-dark/30" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark/90 via-dark/45 to-transparent" />

      <Container className="relative flex min-h-[30rem] flex-col justify-end pb-20 pt-16 sm:min-h-[88vh] sm:pb-24 sm:pt-28">
        <h1 className="max-w-2xl font-serif text-[2.125rem] text-white sm:text-[3.25rem] lg:text-[3.75rem]">
          Comfort Crafted for Your Home
        </h1>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/85 sm:text-lg">
          Custom sofas, handcrafted in Chennai.
        </p>
        <div className="action-stack mt-8">
          <Button href="/products/" className="px-7 py-3 text-base">
            Explore Collection
          </Button>
          <WhatsAppButton
            message={getGeneralEnquiryMessage()}
            variant="outline"
            className="border-white/70 px-7 py-3 text-base text-white hover:border-white hover:bg-white hover:text-dark"
          />
        </div>
      </Container>
    </section>
  );
}
