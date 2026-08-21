"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { SafeImage } from "@/components/ui/safe-image";
import { imageBlur } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { MediaVideo } from "@/data/media";

export function CinematicVideo({
  video,
  className,
  posterClassName,
  priority = false,
  preload = "none",
  stillOnMobile = false,
}: {
  video: MediaVideo;
  className?: string;
  posterClassName?: string;
  priority?: boolean;
  preload?: "none" | "metadata" | "auto";
  stillOnMobile?: boolean;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduce || failed) return;
    const node = videoRef.current;
    if (!node) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    if (stillOnMobile && window.matchMedia("(max-width: 767px)").matches) return;
    node.play().catch(() => setFailed(true));
  }, [reduce, failed, stillOnMobile]);

  const showVideo = !reduce && !failed;

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-ink", className)}>
      <SafeImage
        src={video.poster}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={imageBlur}
        className={cn("object-cover object-[center_center] md:object-center", posterClassName)}
      />
      {showVideo ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            stillOnMobile && "hidden md:block",
          )}
          style={{ objectPosition: video.objectPosition }}
          poster={video.poster}
          muted
          loop
          playsInline
          autoPlay
          preload={preload}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ) : (
        <span className="sr-only">{video.alt}</span>
      )}
    </div>
  );
}
