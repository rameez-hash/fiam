import { Fragment } from "react";

const ALIASES: Record<string, string> = {
  khi: "karachi",
  lhr: "lahore",
  isb: "islamabad",
  isl: "islamabad",
  pindi: "rawalpindi",
  rwp: "rawalpindi",
  fsd: "faisalabad",
  hyd: "hyderabad",
  pesh: "peshawar",
  psh: "peshawar",
  mux: "multan",
  gt: "g.t.",
};

export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[#,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(query: string) {
  return normalize(query)
    .split(" ")
    .filter(Boolean)
    .map((token) => ALIASES[token] ?? token);
}

const digitsOnly = (text: string) => text.replace(/\D/g, "");

/** Every token must appear in the text; tokens with 3+ digits also match phone numbers digit-for-digit. */
export function matchesAll(haystack: string, tokens: string[], phones: string[] = []) {
  if (tokens.length === 0) return true;
  const text = normalize(haystack);
  const phoneDigits = phones.map(digitsOnly);
  return tokens.every((token) => {
    if (text.includes(token)) return true;
    const d = digitsOnly(token);
    return d.length >= 3 && phoneDigits.some((p) => p.includes(d));
  });
}

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  const terms = tokens.filter((t) => t.length > 0);
  if (terms.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="hl">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function writeParams(values: Record<string, string>) {
  const url = new URL(window.location.href);
  Object.entries(values).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  });
  window.history.replaceState(window.history.state, "", url.toString());
}
