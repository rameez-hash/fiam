"use server";

import { redirect } from "next/navigation";
import { sendInquiryMail } from "@/lib/mail";

export type InquiryState = { error?: string; values?: Record<string, string> };

const field = (data: FormData, key: string, max = 200) =>
  String(data.get(key) ?? "")
    .trim()
    .slice(0, max);

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sendFailed: InquiryState = {
  error: "We could not send your message right now. Please try again or call +92 321 8208116.",
};

/** Bots fill the hidden "website" field; humans never see it. */
const isBot = (data: FormData) => field(data, "website").length > 0;

export async function sendContactInquiry(
  _prev: InquiryState,
  data: FormData,
): Promise<InquiryState> {
  if (isBot(data)) redirect("/thank-you?type=contact");

  const name = field(data, "name", 120);
  const email = field(data, "email", 160);
  const company = field(data, "company", 160);
  const phone = field(data, "phone", 40);
  const message = field(data, "message", 4000);
  const values = { name, email, company, phone, message };

  if (!name || !message) return { error: "Please enter your name and message.", values };
  if (!isEmail(email)) return { error: "Please enter a valid email address.", values };

  try {
    await sendInquiryMail({
      subject: `[Website] Contact inquiry from ${name}`,
      title: "New contact inquiry",
      replyTo: email,
      rows: [
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Company / Project", value: company },
      ],
      message,
    });
  } catch (err) {
    console.error("Contact inquiry mail failed", err);
    return { ...sendFailed, values };
  }

  redirect("/thank-you?type=contact");
}

export async function sendCorporateInquiry(
  _prev: InquiryState,
  data: FormData,
): Promise<InquiryState> {
  if (isBot(data)) redirect("/thank-you?type=corporate");

  const companyName = field(data, "companyName", 160);
  const contactName = field(data, "contactName", 120);
  const email = field(data, "email", 160);
  const phone = field(data, "phone", 40);
  const message = field(data, "message", 4000);

  if (!companyName || !contactName || !phone || !message) {
    return { error: "Please fill in all required fields." };
  }
  if (!isEmail(email)) return { error: "Please enter a valid email address." };

  const inquiryType = field(data, "inquiryTypeLabel") || field(data, "inquiryType");

  try {
    await sendInquiryMail({
      subject: `[Corporate] ${inquiryType} - ${companyName}`,
      title: "New corporate inquiry",
      replyTo: email,
      rows: [
        { label: "Inquiry type", value: inquiryType },
        { label: "Company", value: companyName },
        { label: "Contact person", value: contactName },
        { label: "Email", value: email },
        { label: "Phone / WhatsApp", value: phone },
        { label: "City", value: field(data, "city", 80) },
        { label: "Estimated quantity", value: field(data, "quantity", 120) },
        { label: "Category", value: field(data, "categoryName") || "Not specified" },
        { label: "Series", value: field(data, "seriesName") || "Any / multiple" },
      ],
      message,
    });
  } catch (err) {
    console.error("Corporate inquiry mail failed", err);
    return sendFailed;
  }

  redirect("/thank-you?type=corporate");
}

export async function subscribeNewsletter(
  _prev: InquiryState,
  data: FormData,
): Promise<InquiryState> {
  if (isBot(data)) redirect("/thank-you?type=newsletter");

  const email = field(data, "email", 160);
  if (!isEmail(email)) return { error: "Please enter a valid email address.", values: { email } };

  try {
    await sendInquiryMail({
      subject: `[Newsletter] New subscriber ${email}`,
      title: "New newsletter subscriber",
      replyTo: email,
      rows: [{ label: "Email", value: email }],
    });
  } catch (err) {
    console.error("Newsletter mail failed", err);
    return { ...sendFailed, values: { email } };
  }

  redirect("/thank-you?type=newsletter");
}
