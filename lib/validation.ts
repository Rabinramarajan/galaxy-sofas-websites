import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a phone number.")
    .max(20)
    .regex(/^[0-9+\-() \s]+$/, "Please enter a valid phone number."),
  subject: z.string().trim().min(3, "Please add a subject.").max(120),
  product: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10, "Please write a short message.").max(4000),
  website: z.string().max(0).optional().default(""),
  source: z.string().trim().max(200).optional().default("/contact"),
});

export type ContactPayload = z.infer<typeof contactSchema>;

export function sanitizePlainText(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
}
