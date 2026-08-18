"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { imageBlur, unsplash } from "@/lib/images";

const hero = unsplash(
  "photo-1618221195710-dd6b41faaea6",
  "Sunlit living room with a premium sofa, timber floors and quiet contemporary furniture",
  2400,
  1600,
);

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative -mt-[4.5rem] min-h-[100dvh] overflow-hidden bg-ink text-parchment">
      <SafeImage
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={imageBlur}
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent" />
      <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl items-end px-5 py-20 sm:px-8">
        <motion.div
          className="max-w-xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.32em] text-sand">Showroom · {site.city}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-parchment/85">{site.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/collections" className="bg-parchment text-charcoal hover:bg-linen">
              Explore Collection
            </Button>
            <Button href="/contact" variant="secondary" className="border-parchment/50 text-parchment hover:bg-white/10">
              Enquire Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
