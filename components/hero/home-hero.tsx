"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { containerClass } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
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
    <section className="relative -mt-[var(--header-height)] min-h-[85dvh] overflow-hidden bg-ink text-parchment md:min-h-[100dvh]">
      <SafeImage
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={imageBlur}
        className="object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/15" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/60 to-transparent" />
      <div
        className={cn(
          containerClass,
          "relative flex min-h-[85dvh] items-end pb-16 pt-28 md:min-h-[100dvh] md:pb-20 md:pt-32",
        )}
      >
        <motion.div
          className="max-w-xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-sand">Showroom · {site.city}</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">{site.tagline}</h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment/90 sm:text-base">{site.description}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/collections" variant="inverse">
              Explore Collection
            </Button>
            <Button href="/contact" variant="onDark">
              Book a visit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
