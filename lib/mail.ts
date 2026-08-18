import nodemailer from "nodemailer";
import { site } from "@/lib/site";
import type { ContactPayload } from "@/lib/validation";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function emailLayout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#F4EEE4;font-family:Georgia,'Times New Roman',serif;color:#1A1714;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4EEE4;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FAF7F1;border:1px solid #E4D8C4;">
            <tr>
              <td style="padding:28px 32px 12px;border-bottom:1px solid #E4D8C4;">
                <p style="margin:0;letter-spacing:0.28em;font-size:11px;text-transform:uppercase;color:#6B4F32;">${escapeHtml(site.name)}</p>
                <h1 style="margin:12px 0 0;font-size:26px;font-weight:400;">${escapeHtml(title)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 36px;font-size:16px;line-height:1.6;font-family:'Segoe UI',Arial,sans-serif;">
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;color:#6B6358;width:140px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#1A1714;">${escapeHtml(value) || "—"}</td>
  </tr>`;
}

export async function sendEnquiryEmails(payload: ContactPayload) {
  const transporter = getTransport();
  const to = process.env.CONTACT_EMAIL;

  if (!transporter || !to) {
    throw new Error("Mail is not configured.");
  }

  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const details = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${row("Name", payload.name)}
    ${row("Email", payload.email)}
    ${row("Phone", payload.phone)}
    ${row("Product", payload.product || "General enquiry")}
    ${row("Subject", payload.subject)}
    ${row("Source page", payload.source || "/contact")}
    ${row("Timestamp", timestamp)}
  </table>
  <p style="margin:24px 0 8px;color:#6B6358;">Message</p>
  <p style="margin:0;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>`;

  await transporter.sendMail({
    from: `"${site.name}" <${process.env.SMTP_USER}>`,
    to,
    replyTo: payload.email,
    subject: `New furniture enquiry — ${payload.name}`,
    html: emailLayout("New showroom enquiry", details),
  });

  await transporter.sendMail({
    from: `"${site.name}" <${process.env.SMTP_USER}>`,
    to: payload.email,
    subject: `We have received your enquiry — ${site.name}`,
    html: emailLayout(
      "Thank you for writing to us",
      `<p>Dear ${escapeHtml(payload.name)},</p>
       <p>We have received your message and a specialist will reply by phone or email, usually within one working day.</p>
       ${details}
       <p style="margin-top:24px;">If your enquiry is urgent, call ${escapeHtml(site.phoneDisplay)} or visit the showroom in ${escapeHtml(site.city)}.</p>
       <p style="margin-bottom:0;">${escapeHtml(site.name)}</p>`,
    ),
  });
}
