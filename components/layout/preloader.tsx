"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let finished = false;
    const started = performance.now();
    const minMs = reduce ? 200 : 1600;

    const hide = () => {
      if (finished) return;
      finished = true;
      const remaining = Math.max(0, minMs - (performance.now() - started));

      window.setTimeout(() => {
        if (reduce) {
          setVisible(false);
          return;
        }
        setExiting(true);
        window.setTimeout(() => setVisible(false), 650);
      }, remaining);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    const fallback = window.setTimeout(hide, 4000);
    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`preloader${exiting ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading the showroom"
    >
      <div className="preloader-mark">
        <p className="preloader-eyebrow">{site.city}</p>
        <p className="preloader-name">{site.name}</p>
        <span className="preloader-line" aria-hidden="true" />
        <p className="preloader-caption">The showroom is opening</p>
      </div>
    </div>
  );
}
