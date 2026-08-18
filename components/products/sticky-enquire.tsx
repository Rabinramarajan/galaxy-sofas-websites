"use client";

import { Button } from "@/components/ui/button";
import { IconWhatsApp } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/site";

export function StickyEnquire({ productName }: { productName: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-parchment/95 p-3 backdrop-blur-sm md:hidden">
      <div className="flex gap-2">
        <Button href={`/contact?product=${encodeURIComponent(productName)}`} className="flex-1">
          Enquire Now
        </Button>
        <Button
          href={whatsappLink(`Hello, I would like to enquire about ${productName}.`)}
          variant="secondary"
          external
          className="flex-1"
        >
          <IconWhatsApp /> WhatsApp
        </Button>
      </div>
    </div>
  );
}
