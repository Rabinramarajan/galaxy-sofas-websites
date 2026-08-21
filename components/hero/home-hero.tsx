"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { containerClass } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";
import { imageBlur } from "@/lib/images";
import { media } from "@/data/media";
import { CinematicVideo } from "@/components/media/cinematic-video";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative -mt-[var(--header-height)] min-h-[72dvh] overflow-hidden bg-ink text-parchment sm:min-h-[78dvh] md:min-h-[100dvh]">
      <div className="absolute inset-0 hidden md:block">
        <CinematicVideo video={media.videos.hero} priority preload="metadata" />
      </div>
      <div className="absolute inset-0 md:hidden">
        <SafeImage
          src={media.images.heroPosterMobile.src}
          alt={media.images.heroPosterMobile.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={imageBlur}
          className="object-cover object-[center_78%]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/45 to-transparent" />
      <div
        className={cn(
          containerClass,
          "relative flex min-h-[72dvh] items-end pb-12 pt-28 sm:min-h-[78dvh] md:min-h-[100dvh] md:pb-20 md:pt-32",
        )}
      >
        <div className="max-w-xl">
          <motion.p
            className="eyebrow text-sand"
            initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0, ease }}
          >
            Galaxy Sofas · Chennai
          </motion.p>
          <motion.h1
            className="mt-4 font-display text-4xl leading-[1.08] sm:text-6xl lg:text-7xl"
            initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.1, ease }}
          >
            Comfort That Completes Your Home.
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md text-sm leading-relaxed text-parchment/90 sm:text-base"
            initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Explore thoughtfully selected sofas, beds and furniture designed to bring comfort, character and everyday
            style into your home.
          </motion.p>
          <motion.div
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease }}
          >
            <Button href="/sofas" variant="inverse">
              Explore Sofas
            </Button>
            <Button href="/contact#showroom" variant="onDark">
              Visit Our Showroom
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
