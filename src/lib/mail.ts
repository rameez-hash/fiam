import nodemailer from "nodemailer";

const env = (key: string) => (process.env[key] ?? "").trim();

function getTransport() {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }
  const port = Number(env("SMTP_PORT") || 465);
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export type MailRow = { label: string; value: string };

function renderTable(title: string, rows: MailRow[], message?: string) {
  const body = rows
    .filter((r) => r.value)
    .map(
      (r) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top">${escapeHtml(r.label)}</td><td style="padding:6px 0;color:#1a1a1a">${escapeHtml(r.value)}</td></tr>`,
    )
    .join("");
  const msg = message
    ? `<p style="margin:20px 0 6px;color:#666">Message</p><p style="margin:0;white-space:pre-wrap;color:#1a1a1a">${escapeHtml(message)}</p>`
    : "";
  return `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5"><h2 style="margin:0 0 16px;font-size:18px;color:#1a1a1a">${escapeHtml(title)}</h2><table style="border-collapse:collapse">${body}</table>${msg}</div>`;
}

function renderText(title: string, rows: MailRow[], message?: string) {
  const lines = rows.filter((r) => r.value).map((r) => `${r.label}: ${r.value}`);
  return [title, "", ...lines, ...(message ? ["", "Message:", message] : [])].join("\n");
}

export async function sendInquiryMail({
  subject,
  title,
  rows,
  message,
  replyTo,
}: {
  subject: string;
  title: string;
  rows: MailRow[];
  message?: string;
  replyTo?: string;
}) {
  const transport = getTransport();
  const from = env("SMTP_USER");
  const to = env("MAIL_TO") || from;

  await transport.sendMail({
    from: `"Fiam Pakistan Website" <${from}>`,
    to,
    replyTo,
    subject,
    text: renderText(title, rows, message),
    html: renderTable(title, rows, message),
  });
}