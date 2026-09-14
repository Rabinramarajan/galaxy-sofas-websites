import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/constants/site";
import { getGeneralEnquiryMessage, getWhatsAppUrl } from "@/utils/whatsapp";

export function FloatingActions() {
  return (
    <div className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 flex flex-col gap-2 sm:right-4 sm:bottom-4 sm:gap-3">
      <a
        href={site.phoneHref}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-primary text-white sm:hidden"
        aria-label={`Call ${site.name}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={getWhatsAppUrl(getGeneralEnquiryMessage())}
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-[#25D366] text-white transition-[filter] duration-200 hover:brightness-95 sm:h-12 sm:w-12"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </a>
    </div>
  );
}
