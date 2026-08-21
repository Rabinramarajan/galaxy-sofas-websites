"use client";

import { usePathname } from "next/navigation";
import { IconWhatsApp } from "@/components/ui/icons";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const productPage = /^\/(sofas|beds|furniture)\/.+$/.test(pathname);

  return (
    <div
      className={cn(
        "fixed right-4 z-30 md:right-6",
        productPage ? "bottom-[5.75rem] md:bottom-6" : "bottom-[max(1.25rem,env(safe-area-inset-bottom))]",
      )}
    >
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message ${site.name} on WhatsApp`}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[#1f6b46] text-parchment shadow-[0_10px_30px_rgba(18,16,14,0.22)] transition-transform duration-300 hover:scale-105"
      >
        <IconWhatsApp />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-ink px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-parchment opacity-0 transition-opacity duration-200 group-hover:opacity-100 xl:block">
          Enquire on WhatsApp
        </span>
      </a>
    </div>
  );
}
