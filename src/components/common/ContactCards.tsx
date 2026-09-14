import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/constants/icons";
import { site } from "@/constants/site";
import { getGeneralEnquiryMessage, getWhatsAppUrl } from "@/utils/whatsapp";

type ContactCardItem = {
  label: string;
  value: string;
  href?: string;
  icon: IconName;
};

const baseCards: ContactCardItem[] = [
  {
    label: "Phone",
    value: site.phoneDisplay,
    href: site.phoneHref,
    icon: "phone",
  },
  {
    label: "Email",
    value: site.email,
    href: site.emailHref,
    icon: "mail",
  },
  {
    label: "Service area",
    value: site.serviceArea,
    icon: "location",
  },
];

const whatsappCard: ContactCardItem = {
  label: "WhatsApp",
  value: "Send an enquiry",
  href: getWhatsAppUrl(getGeneralEnquiryMessage()),
  icon: "whatsapp",
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
        const inner = (
          <div className="flex items-start gap-3 border-t border-line py-5 transition-colors duration-200 hover:border-primary/40">
            <Icon name={card.icon} size={20} className="mt-0.5 text-primary" />
            <span>
              <span className="block text-xs text-foreground">{card.label}</span>
              <span className="mt-1 block break-words text-sm font-medium text-dark">
                {card.value}
              </span>
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
