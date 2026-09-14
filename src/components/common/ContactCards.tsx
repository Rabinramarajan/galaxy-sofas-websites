import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { site } from "@/constants/site";
import { getGeneralEnquiryMessage, getWhatsAppUrl } from "@/utils/whatsapp";

type ContactCardItem = {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
};

const baseCards: ContactCardItem[] = [
  {
    label: "Phone",
    value: site.phoneDisplay,
    href: site.phoneHref,
    icon: Phone,
  },
  {
    label: "Email",
    value: site.email,
    href: site.emailHref,
    icon: Mail,
  },
  {
    label: "Service area",
    value: site.serviceArea,
    icon: MapPin,
  },
];

const whatsappCard: ContactCardItem = {
  label: "WhatsApp",
  value: "Send an enquiry",
  href: getWhatsAppUrl(getGeneralEnquiryMessage()),
  icon: MessageCircle,
};

type ContactCardsProps = {
  includeWhatsApp?: boolean;
  columns?: "preview" | "page";
};

export function ContactCards({
  includeWhatsApp = false,
  columns = "preview",
}: ContactCardsProps) {
  const cards = includeWhatsApp ? [...baseCards, whatsappCard] : baseCards;
  const gridClass =
    columns === "page"
      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
      : "grid gap-4 sm:grid-cols-3";

  return (
    <div className={gridClass}>
      {cards.map((card) => {
        const Icon = card.icon;
        const inner = (
          <div className="flex items-start gap-3 border-t border-line py-5 transition-colors duration-200 hover:border-primary/40">
            <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <span className="block text-xs text-foreground">{card.label}</span>
              <span className="mt-1 block break-words text-sm font-medium text-dark">{card.value}</span>
            </span>
          </div>
        );

        if (!card.href) {
          return <div key={card.label}>{inner}</div>;
        }

        const isHttp = card.href.startsWith("http");

        return (
          <a
            key={card.label}
            href={card.href}
            className="cursor-pointer"
            target={isHttp ? "_blank" : undefined}
            rel={isHttp ? "noopener noreferrer" : undefined}
          >
            {inner}
          </a>
        );
      })}
    </div>
  );
}
