"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { fallbackImage } from "@/lib/images";

export function SafeImage({ src, alt, ...props }: ImageProps) {
  const [failedFor, setFailedFor] = useState<ImageProps["src"] | null>(null);
  const resolved = failedFor === src ? fallbackImage : src;

  return (
    <Image
      {...props}
      src={resolved}
      alt={alt}
      onError={() => {
        if (failedFor !== src) setFailedFor(src);
      }}
    />
  );
}
