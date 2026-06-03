import type { Metadata } from "next";

// ─── Site Constants ──────────────────────────────────────────────────────────
export const SITE_URL = "https://wa.link";
export const SITE_NAME = "WA.link";
export const SITE_DESCRIPTION =
  "Create WhatsApp click-to-chat links instantly. Free, private, and secure. Generate single or bulk WhatsApp links with custom messages, emojis, and QR codes.";

export const SITE_KEYWORDS = [
  "whatsapp link generator",
  "whatsapp link creator",
  "wa.me link generator",
  "click to chat whatsapp",
  "whatsapp direct link",
  "whatsapp chat link",
  "whatsapp link with message",
  "bulk whatsapp link generator",
  "whatsapp QR code generator",
  "whatsapp link for business",
  "create whatsapp link",
  "generate whatsapp link",
  "free whatsapp link",
  "whatsapp click to chat",
  "whatsapp URL generator",
  "whatsapp link maker",
  "wa.me link creator",
  "whatsapp message link",
  "whatsapp pre-filled message",
  "whatsapp share link",
];

export const SITE_AUTHOR = "WA.link";
export const OG_IMAGE = "/og-image.png";

// ─── Default Metadata ────────────────────────────────────────────────────────
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free WhatsApp Link Generator`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_AUTHOR, url: SITE_URL }],
  creator: SITE_AUTHOR,
  publisher: SITE_AUTHOR,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free WhatsApp Link Generator`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — WhatsApp Link Generator`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free WhatsApp Link Generator`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@walink",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {},
  category: "technology",
};

// ─── Helper: Build Page Metadata ─────────────────────────────────────────────
export function buildMetadata(overrides: {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  noindex?: boolean;
}): Metadata {
  return {
    title: overrides.title,
    description: overrides.description,
    keywords: overrides.keywords ?? SITE_KEYWORDS,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: `${overrides.title} | ${SITE_NAME}`,
      description: overrides.description,
      url: overrides.canonical ?? SITE_URL,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${overrides.title} | ${SITE_NAME}`,
      description: overrides.description,
    },
    alternates: {
      canonical: overrides.canonical ?? SITE_URL,
    },
    robots: overrides.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
