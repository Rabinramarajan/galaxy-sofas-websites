import { MessageCircle } from "lucide-react";
import { Button } from "@/components/common/Button";
import { getWhatsAppUrl } from "@/utils/whatsapp";

type WhatsAppButtonProps = {
  message: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </Button>
  );
}
