import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  as: Tag = "h2",
  className,
  tone = "default",
}: {
  eyebrow?: string;
  title: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "light" && "text-sand")}>{eyebrow}</p>
      ) : null}
      <Tag className={cn(Tag === "h1" ? "page-title" : "section-title", eyebrow && "mt-3", tone === "light" && "text-parchment")}>{title}</Tag>
    </div>
  );
}
