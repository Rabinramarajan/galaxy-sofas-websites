import { Icon } from "@/components/common/Icon";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import type { ServiceItem } from "@/types";

type ServiceCardProps = {
  service: ServiceItem;
  showCta?: boolean;
  headingLevel?: "h2" | "h3";
};

export function ServiceCard({
  service,
  showCta = false,
  headingLevel = "h3",
}: ServiceCardProps) {
  const TitleTag = headingLevel;

  return (
    <article className="flex h-full flex-col border-t border-line pt-5">
      {/* service.icon keys match the Ionicons registry in src/constants/icons.ts */}
      <Icon name={service.icon} size={22} className="text-primary" />
      <TitleTag className="mt-4 font-serif text-xl text-dark">{service.title}</TitleTag>
      <p className="mt-2 flex-1 text-sm leading-relaxed">
        {showCta ? service.description : service.shortDescription}
      </p>
      {showCta ? (
        <div className="action-stack mt-5">
          <WhatsAppButton
            message={`Hi Galaxy Sofas, I would like to know more about ${service.title}.`}
            label="Enquire on WhatsApp"
            variant="outline"
          />
        </div>
      ) : null}
    </article>
  );
}
