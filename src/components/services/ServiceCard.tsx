import {
  Armchair,
  Factory,
  Layers,
  RefreshCw,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import type { ServiceItem } from "@/types";

const icons: Record<ServiceItem["icon"], LucideIcon> = {
  factory: Factory,
  wrench: Wrench,
  refresh: RefreshCw,
  layers: Layers,
  armchair: Armchair,
  truck: Truck,
};

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
  const Icon = icons[service.icon];
  const TitleTag = headingLevel;

  return (
    <article className="flex h-full flex-col border-t border-line pt-5">
      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
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
