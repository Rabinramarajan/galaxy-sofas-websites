"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { contactSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EnquiryForm({
  defaultProduct = "",
  source = "/contact",
}: {
  defaultProduct?: string;
  source?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFieldErrors({});
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(data);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setFieldErrors(next);
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(body.error ?? "We could not send your enquiry. Please call the showroom.");
        return;
      }
      router.push("/thank-you");
    } catch {
      setError("We could not send your enquiry. Please try again or call the showroom.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="source" value={source} />
      <Field id="name" label="Name" required error={fieldErrors.name} />
      <Field id="email" label="Email" type="email" autoComplete="email" required error={fieldErrors.email} />
      <Field id="phone" label="Phone" type="tel" autoComplete="tel" required error={fieldErrors.phone} />
      <Field id="subject" label="Subject" required error={fieldErrors.subject} defaultValue="Furniture enquiry" />
      <Field id="product" label="Product" defaultValue={defaultProduct} error={fieldErrors.product} />
      <div>
        <label htmlFor="message" className="mb-1 block text-sm">
          Message <span className="text-walnut">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className={cn("field-input min-h-32")}
        />
        {fieldErrors.message ? (
          <p id="message-error" className="mt-1 text-sm text-danger" role="alert">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" loading={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
  defaultValue,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm">
        {label} {required ? <span className="text-walnut">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="field-input"
      />
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
