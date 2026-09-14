import { Button, type ButtonVariant } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { getWhatsAppUrl } from "@/utils/whatsapp";

type WhatsAppButtonProps = {
  message: string;
  label?: string;
  variant?: ButtonVariant;
  className?: string;
};

export function WhatsAppButton({
  message,
  label = "WhatsApp Us",
  variant = "primary",
  className,
}: WhatsAppButtonProps) {
  return (
    <Button href={getWhatsAppUrl(message)} variant={variant} className={className} external>
      <Icon name="whatsapp" size={18} />
      {label}
    </Button>
  );
}
