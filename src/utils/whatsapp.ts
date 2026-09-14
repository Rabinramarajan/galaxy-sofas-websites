import { site } from "@/constants/site";

export function getWhatsAppUrl(message: string): string {
  return `${site.whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function getProductEnquiryMessage(productName: string): string {
  return `Hi Galaxy Sofas, I'm interested in the ${productName}. Please share more details.`;
}

export function getProductEnquiryUrl(productName: string): string {
  return getWhatsAppUrl(getProductEnquiryMessage(productName));
}

export function getCustomDesignMessage(): string {
  return "Hi Galaxy Sofas, I have a custom sofa design in mind. I would like to discuss size, fabric and comfort options.";
}

export function getGeneralEnquiryMessage(): string {
  return "Hi Galaxy Sofas, I would like to know more about your sofa collection.";
}
