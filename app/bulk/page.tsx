import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import BulkLinkCreator from "@/components/BulkLinkCreator";

// ─── Page Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "Bulk WhatsApp Link Generator — Create Multiple Links at Once",
  description:
    "Generate hundreds of WhatsApp links in bulk. Import phone numbers, assign custom messages, and export as CSV or TXT. Free, fast, and 100% private — perfect for marketing campaigns.",
  canonical: `${SITE_URL}/bulk`,
  keywords: [
    "bulk whatsapp link generator",
    "whatsapp bulk messaging",
    "bulk wa.me links",
    "whatsapp bulk link creator",
    "whatsapp mass link generator",
    "whatsapp csv export",
    "bulk whatsapp URL generator",
    "whatsapp marketing tool",
    "whatsapp campaign tool",
    "bulk whatsapp chat links",
    "whatsapp link list generator",
    "whatsapp bulk sender links",
    "whatsapp link export CSV",
    "whatsapp multiple link generator",
    "whatsapp bulk link tool",
  ],
});

// ─── WebApplication JSON-LD ──────────────────────────────────────────────────
const bulkAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "WA.link Bulk Creator",
  url: `${SITE_URL}/bulk`,
  description:
    "Bulk WhatsApp link generator — import hundreds of phone numbers, generate individual click-to-chat links, and export as CSV or TXT files. Perfect for marketing campaigns and customer outreach.",
  applicationCategory: "UtilityApplication",
  applicationSubCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Bulk import phone numbers from text",
    "Automatic country code detection",
    "Individual link generation per number",
    "CSV export with phone numbers and links",
    "TXT export with all links",
    "Universal message for all imports",
    "Copy all links at once",
    "Add and delete individual rows",
    "Pagination for large datasets",
  ],
  isPartOf: {
    "@type": "WebApplication",
    name: "WA.link",
    url: SITE_URL,
  },
  author: {
    "@type": "Organization",
    name: "WA.link",
    url: SITE_URL,
  },
};

// ─── FAQ JSON-LD for Bulk Page ───────────────────────────────────────────────
const bulkFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does the Bulk WhatsApp Link Creator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Bulk Creator lets you import multiple phone numbers at once — either by adding rows manually or pasting a list. It automatically detects country codes, generates individual WhatsApp links for each number, and lets you export all links as CSV or TXT files.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a universal message to all bulk links?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! When importing numbers, you can set a universal message that will be attached to all imported numbers. You can also edit individual messages for each row afterwards.",
      },
    },
    {
      "@type": "Question",
      name: "What formats can I export bulk links in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can export bulk WhatsApp links in two formats: CSV (spreadsheet with country code, phone, message, and link columns) or TXT (one link per line). Both are ready for immediate use in marketing campaigns.",
      },
    },
    {
      "@type": "Question",
      name: "How many numbers can I import at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no hard limit on the number of imports. The tool uses pagination (4 rows per page) to keep the interface smooth even with hundreds of numbers.",
      },
    },
  ],
};

export default function BulkPage() {
  return (
    <>
      <JsonLd data={[bulkAppJsonLd, bulkFaqJsonLd]} />
      <BulkLinkCreator />
    </>
  );
}
