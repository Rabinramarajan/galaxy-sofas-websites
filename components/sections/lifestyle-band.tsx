"use client";

import { SafeImage } from "@/components/ui/safe-image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { imageBlur } from "@/lib/images";
import { media } from "@/data/media";
import { cn } from "@/lib/utils";

export function LifestyleBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);

  return (
    <section ref={ref} className="relative min-h-[70vh] overflow-hidden bg-ink text-parchment md:min-h-[85vh]">
      <motion.div className="absolute inset-0 hidden md:block" style={{ y }}>
        <SafeImage
          src={media.images.lifestyleGolden.src}
          alt={media.images.lifestyleGolden.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={imageBlur}
          className="object-cover object-[center_68%] scale-110"
        />
      </motion.div>
      <div className="absolute inset-0 md:hidden">
        <SafeImage
          src={media.images.lifestyleGolden.src}
          alt={media.images.lifestyleGolden.alt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={imageBlur}
          className="object-cover object-[center_72%]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/25" />
      <div className="relative flex min-h-[70vh] items-end px-5 py-14 sm:px-8 md:min-h-[85vh] md:py-20 lg:px-10">
        <div className={cn("mx-auto w-full max-w-7xl")}>
          <p className="eyebrow text-sand">Living, as a room</p>
          <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight sm:text-5xl">
            Furniture that keeps the light, not the clutter.
          </h2>
          <p className="mt-4 max-w-md text-sm text-parchment/85">
            A sofa, a table, and enough empty floor that the architecture can still speak.
          </p>
          <div className="mt-8">
            <Button href="/sofas" variant="inverse">
              Explore Sofas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
