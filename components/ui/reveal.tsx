"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const variants = {
  "fade-up": { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } },
  "fade-in": { hidden: { opacity: 0 }, show: { opacity: 1 } },
  "fade-left": { hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } },
  "fade-right": { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } },
  "scale-in": { hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1 } },
  "image-reveal": { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } },
  "clip-reveal": {
    hidden: { opacity: 0, clipPath: "inset(12% 12% 12% 12%)", scale: 0.98 },
    show: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
  },
} as const;

export type RevealVariant = keyof typeof variants;

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const reduce = useReducedMotion();
  const motionVariant = variants[variant];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={motionVariant}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
