import type { Metadata } from "next";
import { buildMetadata, SITE_URL } from "./seo";
import { JsonLd } from "./components/JsonLd";
import WhatsappLinkCreator from "./components/WhatsappLinkCreator";

// ─── Page Metadata ───────────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "WhatsApp Link Generator — Create Free Click-to-Chat Links",
  description:
    "Create WhatsApp click-to-chat links in seconds. Generate free wa.me links with custom messages, emojis, and downloadable QR codes. No signup required — 100% private and secure.",
  canonical: SITE_URL,
  keywords: [
    "whatsapp link generator",
    "whatsapp link creator",
    "wa.me link generator",
    "click to chat whatsapp",
    "whatsapp direct link",
    "whatsapp chat link",
    "whatsapp link with message",
    "whatsapp QR code generator",
    "create whatsapp link",
    "generate whatsapp link",
    "free whatsapp link",
    "whatsapp click to chat",
    "whatsapp URL generator",
    "whatsapp link maker",
    "wa.me link creator",
    "whatsapp share link",
    "whatsapp pre-filled message",
    "whatsapp link for business",
    "whatsapp marketing",
    "whatsapp link tool",
  ],
});

// ─── FAQPage JSON-LD (Rich Snippets) ─────────────────────────────────────────
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a WhatsApp link generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A WhatsApp link generator creates direct links that open a chat with your number in WhatsApp. When someone clicks the link, it automatically starts a conversation with you — no need to save your contact first.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a WhatsApp link?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply select your country, enter your phone number, and optionally add a pre-filled message. Click 'Generate WA Link' and your custom WhatsApp link is ready to share anywhere online.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add a custom message to my WhatsApp link?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can add a pre-filled message that will automatically appear in the chat when someone clicks your link. This is perfect for greetings, inquiries, or specific call-to-actions.",
      },
    },
    {
      "@type": "Question",
      name: "Is this service free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, WA.link is completely free to use. There are no hidden charges, no signup required, and no limitations on how many links you can create.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Bulk Link Creator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Bulk Link Creator allows you to import multiple phone numbers at once and generate individual WhatsApp links for each. You can export the links as CSV or TXT files — ideal for marketing campaigns and customer outreach.",
      },
    },
    {
      "@type": "Question",
      name: "Is my phone number safe and private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. All link generation happens directly in your browser. We never store, log, or transmit your phone numbers or messages to any server. Your data stays completely private.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need WhatsApp Business to use these links?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, these links work with any WhatsApp account — both personal and business. However, WhatsApp Business users can benefit from the professional features like pre-filled messages and QR codes.",
      },
    },
    {
      "@type": "Question",
      name: "What are QR codes and how can I use them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "QR codes are scannable codes that contain your WhatsApp link. You can download them and use on business cards, flyers, posters, product packaging, or any print material to make it easy for customers to contact you.",
      },
    },
  ],
};

// ─── WebApplication JSON-LD ──────────────────────────────────────────────────
const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "WA.link",
  url: SITE_URL,
  description:
    "Free WhatsApp link generator — create click-to-chat links with custom messages, emojis, and QR codes. Supports single and bulk link creation.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Instant WhatsApp link generation",
    "Bulk link creator with CSV/TXT export",
    "Custom pre-filled messages",
    "Emoji picker integration",
    "QR code generation and download",
    "40+ countries with correct dial codes",
    "100% client-side processing for privacy",
  ],
  author: {
    "@type": "Organization",
    name: "WA.link",
    url: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqJsonLd, webAppJsonLd]} />
      <WhatsappLinkCreator />
    </>
  );
}
