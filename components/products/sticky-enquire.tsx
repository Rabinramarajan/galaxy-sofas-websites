"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconClose, IconWhatsApp } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/site";

export function StickyEnquire({ productName }: { productName: string }) {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-parchment/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <div className="flex items-center gap-2">
        <Button href={`/contact?product=${encodeURIComponent(productName)}`} className="flex-1">
          Enquire About This Product
        </Button>
        <Button
          href={whatsappLink(`Hello, I would like to enquire about ${productName}.`)}
          variant="secondary"
          external
          className="px-4"
          aria-label="WhatsApp enquiry"
        >
          <IconWhatsApp />
        </Button>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted"
          aria-label="Dismiss enquiry bar"
          onClick={() => setOpen(false)}
        >
          <IconClose />
        </button>
      </div>
    </div>
  );
}
