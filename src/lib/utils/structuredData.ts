import { PUBLIC_BUCKET_URL } from "$app/env/public";
import { GOOGLE_REVIEWS_URL, REPAIRS_EMAIL, SITE_URL } from "#lib/constants.js";
import type { SquareCategory } from "#lib/types/category.js";
import type { SquareProduct } from "#lib/types/product.js";
import { plainText, stripSupplierSuffix } from "./seo";

export const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * Serialise JSON-LD for injection into `<svelte:head>` via `{@html …}`.
 * `<` is escaped so a `</script>` inside the data can't break out of the tag.
 */
export const jsonLdScript = (data: unknown): string =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  )}</script>`;

const supplierOf = (name: string): string | undefined =>
  name.match(/\s+[-–]\s+([^-–]+)$/)?.[1]?.trim();

export const productImageUrls = (product: SquareProduct): string[] => {
  const hashes = (product.item_data.variations ?? []).flatMap((variation) =>
    (variation.custom_attribute_values?.image_arr?.string_value ?? "")
      .split(",")
      .filter(Boolean),
  );

  return [...new Set(hashes)].map((hash) => `${PUBLIC_BUCKET_URL}/${hash}`);
};

export const productJsonLd = (product: SquareProduct) => {
  const variations = product.item_data.variations ?? [];
  const supplier = supplierOf(product.item_data.name);
  const url = `${SITE_URL}/shop/product/${product.id}`;

  const offers = variations.map((variation) => {
    const data = variation.item_variation_data;
    const offer: Record<string, unknown> = {
      "@type": "Offer",
      price: (data.price_money.amount / 100).toFixed(2),
      priceCurrency: data.price_money.currency ?? "GBP",
      availability:
        parseInt(data.quantity ?? "0", 10) > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url,
      seller: { "@id": BUSINESS_ID },
    };

    if (data.sku) offer.sku = data.sku;
    if (data.upc && /^\d{13}$/.test(data.upc)) offer.gtin13 = data.upc;

    return offer;
  });

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: stripSupplierSuffix(product.item_data.name),
    description: plainText(product.item_data.description_html),
    image: productImageUrls(product),
    ...(supplier ? { brand: { "@type": "Brand", name: supplier } } : {}),
    ...(offers.length
      ? { offers: offers.length === 1 ? offers[0] : offers }
      : {}),
  };
};

export interface Breadcrumb {
  name: string;
  url: string;
}
export const shopBreadcrumb: Breadcrumb = {
  name: "Shop",
  url: `${SITE_URL}/shop`,
};

export const breadcrumbJsonLd = (items: Breadcrumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/** Root-first trail to a category, walking up via `parent_category.id`. */
export const categoryTrail = (
  categories: readonly SquareCategory[],
  categoryId: string,
): Breadcrumb[] => {
  const byId = new Map<string, SquareCategory>();

  const index = (nodes: readonly SquareCategory[]) => {
    for (const node of nodes) {
      byId.set(node.id, node);
      index(node.children ?? []);
    }
  };
  index(categories);

  const trail: Breadcrumb[] = [];
  let current = byId.get(categoryId);

  while (current) {
    trail.unshift({
      name: current.category_data.name,
      url: `${SITE_URL}/shop/category/${current.id}`,
    });
    const parentId = current.category_data.parent_category?.id;
    current = parentId ? byId.get(parentId) : undefined;
  }

  return trail;
};

// ── AEO / GEO schemas ──────────────────────────────────────────
// These help AI answer engines (Google AI Overviews, Perplexity,
// ChatGPT) understand what the business does and surface it in
// zero-click answers.

/** Single Q&A pair for an FAQPage. */
export interface Faq {
  question: string;
  answer: string;
}

/**
 * FAQPage structured data. Google uses this to power the expandable Q&A
 * snippets that often appear in AI Overviews.
 */
export const faqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

/**
 * Service schema. Tells AI engines exactly what services the business
 * offers, where, and at what price point.
 */
export interface ServiceOffering {
  name: string;
  description: string;
  url: string;
  price?: string;
}

export const serviceJsonLd = (services: ServiceOffering[]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  provider: { "@id": BUSINESS_ID },
  serviceType: services.map((s) => s.name).join(", "),
  areaServed: {
    "@type": "City",
    name: "Birmingham",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Jewellery services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: s.url,
        ...(s.price ? { offers: { "@type": "Offer", price: s.price } } : {}),
      },
    })),
  },
});

/**
 * LocalBusiness schema with entity-rich detail. The one in the root
 * layout covers the basics; this extended version is for the /about page
 * and adds areas served, price range, and same-as links that help AI
 * engines connect Enki to its external identity.
 */
export const localBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": ["Store", "JewelryStore"],
  "@id": BUSINESS_ID,
  name: "Enki",
  description:
    "Independent gift shop and working jewellers in Kings Heath, Birmingham: jewellery repairs, wedding ring workshops, craft classes, cards and gifts.",
  url: SITE_URL,
  telephone: "+44 121 444 4453",
  email: REPAIRS_EMAIL,
  foundingDate: "2017",
  address: {
    "@type": "PostalAddress",
    streetAddress: "30 High Street, Kings Heath",
    addressLocality: "Birmingham",
    postalCode: "B14 7JT",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.43718715965811,
    longitude: -1.892812886574717,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "17:00",
  },
  areaServed: [
    { "@type": "City", name: "Birmingham" },
    { "@type": "Place", name: "Kings Heath" },
    { "@type": "Place", name: "Moseley" },
    { "@type": "Place", name: "Harborne" },
    { "@type": "Place", name: "Stirchley" },
  ],
  priceRange: "££",
  sameAs: [
    "https://www.instagram.com/enkionline/",
    "https://www.facebook.com/Enki-1665334930147391",
    GOOGLE_REVIEWS_URL,
  ],
});

/**
 * Review snippets aren't pulled from third-party platforms by Google
 * automatically, but providing a few inline with the business card helps
 * AI overviews surface social proof.
 */
export const reviewJsonLd = (reviews: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": BUSINESS_ID,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: reviews.length.toString(),
    bestRating: "5",
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.question },
    reviewBody: r.answer,
  })),
});
