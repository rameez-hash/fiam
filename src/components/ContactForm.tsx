"use client";

import { useActionState } from "react";
import { sendContactInquiry, type InquiryState } from "@/app/actions/inquiry";
import { Honeypot } from "./Honeypot";

const field = "border border-line bg-bg px-4 py-3 outline-none focus:border-accent";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(
    sendContactInquiry,
    {},
  );
  const v = state.values ?? {};

  return (
    <form
      data-anim="fade"
      data-delay="0.1"
      action={formAction}
      className="grid gap-5 border border-line bg-white p-8 lg:p-10"
    >
      <h2 className="font-display text-2xl font-semibold">Send a message</h2>
      <Honeypot />
      <label className="grid gap-2 text-sm">
        <span className="font-medium">Name</span>
        <input name="name" required maxLength={120} autoComplete="name" defaultValue={v.name} className={field} />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium">Email</span>
        <input
          type="email"
          name="email"
          required
          maxLength={160}
          autoComplete="email"
          defaultValue={v.email}
          className={field}
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium">Phone (optional)</span>
        <input type="tel" name="phone" maxLength={40} autoComplete="tel" defaultValue={v.phone} className={field} />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium">Company / Project</span>
        <input name="company" maxLength={160} defaultValue={v.company} className={field} />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={4000}
          defaultValue={v.message}
          className={`${field} resize-y`}
        />
      </label>

      {state.error && (
        <p role="alert" className="border border-accent/40 bg-accent/5 px-4 py-3 text-sm text-accent-deep">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex justify-center bg-accent px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-accent-deep disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Sending..." : "Submit inquiry"}
      </button>
      <p className="text-xs text-ink-soft">We reply within 24 hours on working days.</p>
    </form>
  );
}
