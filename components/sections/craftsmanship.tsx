"use client";

import { CinematicVideo } from "@/components/media/cinematic-video";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { media } from "@/data/media";

export function CraftsmanshipSection() {
  return (
    <section className="bg-ink py-16 text-parchment md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-10">
        <Reveal variant="clip-reveal">
          <div className="relative aspect-[16/10] overflow-hidden bg-charcoal md:aspect-[16/9]">
            <CinematicVideo video={media.videos.craftsmanship} preload="none" stillOnMobile />
          </div>
        </Reveal>
        <Reveal variant="fade-up">
          <SectionHeading
            as="h2"
            eyebrow="Making"
            title="Stitch, grain and the last two millimetres"
            tone="light"
          />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-parchment/80">
            The camera stays close: fabric nap, timber edges, the line where a cushion meets a plinth. This is the work
            you sit with for years, not a finish for a photograph.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="inverse">
              How we specify a piece
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
