import { NextResponse } from "next/server";
import { sendEnquiryEmails } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";
import { contactSchema, sanitizePlainText } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 20_000) {
    return NextResponse.json({ error: "That message is too large to send." }, { status: 413 });
  }

  const limited = rateLimit(`contact:${getClientIp(request.headers)}`);
  if (!limited.success) {
    return NextResponse.json(
      { error: "Please wait a few minutes before sending another enquiry." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check the form." }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    ...parsed.data,
    name: sanitizePlainText(parsed.data.name),
    email: sanitizePlainText(parsed.data.email),
    phone: sanitizePlainText(parsed.data.phone),
    subject: sanitizePlainText(parsed.data.subject),
    product: sanitizePlainText(parsed.data.product ?? ""),
    message: sanitizePlainText(parsed.data.message),
    source: sanitizePlainText(parsed.data.source ?? "/contact"),
  };

  try {
    await sendEnquiryEmails(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error: "We could not send your enquiry just now. Please call the showroom or try again shortly.",
      },
      { status: 503 },
    );
  }
}
