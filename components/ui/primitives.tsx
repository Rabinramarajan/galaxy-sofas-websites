import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const containerClass = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "copy";
}) {
  const maxWidth = width === "narrow" ? "max-w-xl" : width === "copy" ? "max-w-3xl" : "max-w-7xl";

  return <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", maxWidth, className)}>{children}</div>;
}

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("pb-24 pt-10", className)}>{children}</div>;
}
