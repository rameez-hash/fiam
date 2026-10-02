"use client";

import { useMemo, useState } from "react";
import { categories, company, products } from "@/data/products";

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

export function CorporateOrderForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [sent, setSent] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!form.category) return products;
    return products.filter((p) => p.categorySlug === form.category);
  }, [form.category]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "category") next.product = "";
      return next;
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const typeLabel =
      inquiryTypes.find((t) => t.value === form.inquiryType)?.label || form.inquiryType;
    const categoryName =
      categories.find((c) => c.slug === form.category)?.name || form.category || "Not specified";
    const productName =
      products.find((p) => p.slug === form.product)?.name || form.product || "Not specified";

    const body = [
      `Inquiry type: ${typeLabel}`,
      `Company: ${form.companyName}`,
      `Contact: ${form.contactName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `City: ${form.city || "—"}`,
      `Category: ${categoryName}`,
      `Product: ${productName}`,
      `Quantity / bulk size: ${form.quantity || "—"}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    const subject = encodeURIComponent(
      `[Corporate] ${typeLabel} — ${form.companyName || form.contactName}`
    );
    const mailto = `mailto:${company.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-white p-8 lg:p-10">
        <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-accent">Received</p>
        <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          Thank you — open your email app to send
        </h3>
        <p className="mt-4 text-ink-soft leading-relaxed">
          Your corporate inquiry is ready to send to{" "}
          <a href={`mailto:${company.email}`} className="text-ink underline">
            {company.email}
          </a>
          . Our team will follow up with product details or a bulk quotation.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm(initial);
          }}
          className="mt-8 inline-flex border border-ink px-6 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-ink hover:text-white transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const field =
    "border border-line bg-bg px-4 py-3 outline-none focus:border-accent w-full";

  return (
    <form onSubmit={onSubmit} className="border border-line bg-white p-8 lg:p-10 grid gap-5">
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
          <span className="font-medium">Specific product (optional)</span>
          <select
            name="product"
            value={form.product}
            onChange={(e) => update("product", e.target.value)}
            className={field}
          >
            <option value="">Any / multiple products</option>
            {filteredProducts.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
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

      <button
        type="submit"
        className="mt-2 inline-flex justify-center bg-accent px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase text-white hover:bg-accent-deep"
      >
        Submit corporate request
      </button>
      <p className="text-xs text-ink-soft">
        Submissions open your email client to send the request to {company.email}.
      </p>
    </form>
  );
}
