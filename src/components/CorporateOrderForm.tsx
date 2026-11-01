"use client";

import { useActionState, useMemo, useState } from "react";
import { sendCorporateInquiry, type InquiryState } from "@/app/actions/inquiry";
import { Honeypot } from "./Honeypot";

type CategoryOption = { slug: string; name: string; series: { slug: string; name: string }[] };

const inquiryTypes = [
  { value: "product", label: "Product inquiry" },
  { value: "bulk", label: "Bulk / wholesale order" },
  { value: "project", label: "Corporate project quotation" },
] as const;

type FormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  inquiryType: string;
  category: string;
  product: string;
  quantity: string;
  message: string;
};

const initial: FormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  inquiryType: "bulk",
  category: "",
  product: "",
  quantity: "",
  message: "",
};

export function CorporateOrderForm({ categories }: { categories: CategoryOption[] }) {
  const [form, setForm] = useState<FormState>(initial);
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(
    sendCorporateInquiry,
    {},
  );

  const allSeries = useMemo(() => categories.flatMap((c) => c.series), [categories]);
  const filteredSeries = useMemo(() => {
    if (!form.category) return allSeries;
    return categories.find((c) => c.slug === form.category)?.series ?? [];
  }, [allSeries, categories, form.category]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "category") next.product = "";
      return next;
    });
  }

  const typeLabel =
    inquiryTypes.find((t) => t.value === form.inquiryType)?.label || form.inquiryType;
  const categoryName = categories.find((c) => c.slug === form.category)?.name ?? "";
  const seriesName = allSeries.find((s) => s.slug === form.product)?.name ?? "";

  const field =
    "border border-line bg-bg px-4 py-3 outline-none focus:border-accent w-full";

  return (
    <form action={formAction} className="border border-line bg-white p-8 lg:p-10 grid gap-5">
      <Honeypot />
      <input type="hidden" name="inquiryTypeLabel" value={typeLabel} />
      <input type="hidden" name="categoryName" value={categoryName} />
      <input type="hidden" name="seriesName" value={seriesName} />
      <div>
        <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-accent">
          Corporate desk
        </p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
          Product or bulk order request
        </h2>
        <p className="mt-2 text-sm text-ink-soft">
          For dealers, contractors, architects, and companies ordering products in volume.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="font-medium">Inquiry type</span>
          <select
            name="inquiryType"
            required
            value={form.inquiryType}
            onChange={(e) => update("inquiryType", e.target.value)}
            className={field}
          >
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Company name</span>
          <input
            name="companyName"
            required
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            className={field}
            placeholder="Your company"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Contact person</span>
          <input
            name="contactName"
            required
            value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            className={field}
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Work email</span>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={field}
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Phone / WhatsApp</span>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={field}
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">City</span>
          <input
            name="city"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className={field}
            placeholder="Karachi, Lahore, Islamabad…"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Estimated quantity</span>
          <input
            name="quantity"
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            className={field}
            placeholder="e.g. 200 pcs / project package"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Product category</span>
          <select
            name="category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={field}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium">Series (optional)</span>
          <select
            name="product"
            value={form.product}
            onChange={(e) => update("product", e.target.value)}
            className={field}
          >
            <option value="">Any / multiple series</option>
            {filteredSeries.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="font-medium">Project / order details</span>
          <textarea
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={`${field} resize-y`}
            placeholder="Tell us about the project site, delivery timeline, or products you need in bulk."
          />
        </label>
      </div>

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
        {pending ? "Sending..." : "Submit corporate request"}
      </button>
      <p className="text-xs text-ink-soft">
        Our corporate desk replies with product details or a bulk quotation.
      </p>
    </form>
  );
}
