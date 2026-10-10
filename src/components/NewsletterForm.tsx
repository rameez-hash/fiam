"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type InquiryState } from "@/app/actions/inquiry";
import { Honeypot } from "./Honeypot";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(
    subscribeNewsletter,
    {},
  );

  return (
    <>
      <form action={formAction} className="relative mt-5 flex overflow-hidden rounded-sm bg-white">
        <Honeypot />
        <label className="sr-only" htmlFor="footer-newsletter">
          Email address
        </label>
        <input
          id="footer-newsletter"
          type="email"
          name="email"
          required
          maxLength={160}
          defaultValue={state.values?.email}
          placeholder="Enter your email"
          className="w-full bg-transparent px-4 py-3 text-sm text-[#1a1c1e] outline-none placeholder:text-black/40"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Subscribe"
          className="px-4 text-[#1a1c1e] transition-colors hover:text-accent disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
      {state.error && (
        <p role="alert" className="mt-2 text-xs text-accent">
          {state.error}
        </p>
      )}
    </>
  );
}
