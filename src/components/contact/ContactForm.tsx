"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/common/Button";
import { products } from "@/data/products";
import { getWhatsAppUrl } from "@/utils/whatsapp";

type FormState = {
  name: string;
  phone: string;
  email: string;
  product: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  product: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Please enter your name, phone number and message.");
      return;
    }

    if (!/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }

    const lines = [
      "Hi Galaxy Sofas, I would like to enquire about a sofa.",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : "",
      form.product ? `Interested product: ${form.product}` : "",
      `Message: ${form.message.trim()}`,
    ].filter(Boolean);

    const url = getWhatsAppUrl(lines.join("\n"));
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.assign(url);
    }
    setError("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="min-w-0 rounded-lg border border-line bg-white p-4 sm:p-8"
      noValidate
    >
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <label className="block min-w-0 text-sm text-dark">
          Name
          <input
            name="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            required
            autoComplete="name"
            className="mt-1 min-h-11 w-full min-w-0 rounded-md border border-line bg-cream px-3 text-dark"
          />
        </label>
        <label className="block min-w-0 text-sm text-dark">
          Phone Number
          <input
            name="phone"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            required
            inputMode="tel"
            autoComplete="tel"
            className="mt-1 min-h-11 w-full min-w-0 rounded-md border border-line bg-cream px-3 text-dark"
          />
        </label>
        <label className="block min-w-0 text-sm text-dark md:col-span-2">
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            className="mt-1 min-h-11 w-full min-w-0 rounded-md border border-line bg-cream px-3 text-dark"
          />
        </label>
        <label className="block min-w-0 text-sm text-dark md:col-span-2">
          Interested Product
          <select
            name="product"
            value={form.product}
            onChange={(event) => update("product", event.target.value)}
            className="mt-1 min-h-11 w-full min-w-0 max-w-full cursor-pointer rounded-md border border-line bg-cream px-3 text-dark"
          >
            <option value="">Select a product</option>
            <option value="Custom sofa design">Custom sofa design</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block min-w-0 text-sm text-dark md:col-span-2">
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            required
            rows={5}
            className="mt-1 w-full min-w-0 rounded-md border border-line bg-cream px-3 py-3 text-dark"
          />
        </label>
      </div>
      {error ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-6">
        <Button type="submit" className="w-full sm:w-auto">
          Send WhatsApp Enquiry
        </Button>
      </div>
    </form>
  );
}
