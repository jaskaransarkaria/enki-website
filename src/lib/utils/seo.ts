/**
 * Square item names put the supplier last, e.g.
 * "Tin Candles - Fig Tree - St. Eval". Titles should lead with the product, so
 * drop that trailing supplier segment.
 */
const SUPPLIER_SUFFIX = /\s+[-–]\s+[^-–]+$/;

export const stripSupplierSuffix = (name: string): string =>
  name.replace(SUPPLIER_SUFFIX, "").trim();

/** Product page title, product first, kept under ~60 characters. */
export const productTitle = (name = ""): string => {
  const base = stripSupplierSuffix(name);
  if (!base) return "Enki";

  return `${base} | Enki`.length <= 60 ? `${base} | Enki` : base;
};

const decodeEntities = (text: string): string =>
  text
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(Number(code)),
    )
    .replace(/&amp;/g, "&");

const firstSentence = (html: string): string => {
  const text = decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  const match = text.match(/^.*?[.!?](?=\s|$)/);

  return (match ? match[0] : text).trim();
};

const truncateAtWord = (text: string, max: number): string => {
  if (text.length <= max) return text;

  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");

  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trim()}…`;
};

/** Product meta description from the Square description HTML. */
export const productDescription = (html = ""): string =>
  truncateAtWord(firstSentence(html), 150);
