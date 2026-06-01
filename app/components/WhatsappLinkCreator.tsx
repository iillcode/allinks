"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";
import Link from "next/link";
// Dynamically import EmojiPicker to avoid SSR issues
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

// Types
interface Country {
  name: string;
  code: string;
  iso: string;
  placeholder: string;
}

interface BulkRow {
  id: string;
  countryCode: string;
  phone: string;
  message: string;
}

// 40+ Curated Popular Countries List
const COUNTRIES: Country[] = [
  { name: "India", code: "91", iso: "in", placeholder: "98765 43210" },
  { name: "United States", code: "1", iso: "us", placeholder: "202 555 0143" },
  { name: "United Kingdom", code: "44", iso: "gb", placeholder: "7911 123456" },
  {
    name: "United Arab Emirates",
    code: "971",
    iso: "ae",
    placeholder: "50 123 4567",
  },
  { name: "Saudi Arabia", code: "966", iso: "sa", placeholder: "50 123 4567" },
  { name: "Canada", code: "1", iso: "ca", placeholder: "613 555 0192" },
  { name: "Australia", code: "61", iso: "au", placeholder: "491 570 156" },
  { name: "Germany", code: "49", iso: "de", placeholder: "151 2345678" },
  { name: "France", code: "33", iso: "fr", placeholder: "6 1234 5678" },
  { name: "Spain", code: "34", iso: "es", placeholder: "612 34 56 78" },
  { name: "Italy", code: "39", iso: "it", placeholder: "312 345 6789" },
  { name: "Brazil", code: "55", iso: "br", placeholder: "11 98765-4321" },
  { name: "Mexico", code: "52", iso: "mx", placeholder: "55 1234 5678" },
  { name: "Singapore", code: "65", iso: "sg", placeholder: "8123 4567" },
  { name: "Malaysia", code: "60", iso: "my", placeholder: "12-345 6789" },
  { name: "Indonesia", code: "62", iso: "id", placeholder: "812-3456-7890" },
  { name: "Philippines", code: "63", iso: "ph", placeholder: "917 123 4567" },
  { name: "Pakistan", code: "92", iso: "pk", placeholder: "300 1234567" },
  { name: "Bangladesh", code: "880", iso: "bd", placeholder: "1712-345678" },
  { name: "Sri Lanka", code: "94", iso: "lk", placeholder: "71 234 5678" },
  { name: "Nepal", code: "977", iso: "np", placeholder: "985-1012345" },
  { name: "South Africa", code: "27", iso: "za", placeholder: "82 123 4567" },
  { name: "Nigeria", code: "234", iso: "ng", placeholder: "803 123 4567" },
  { name: "Kenya", code: "254", iso: "ke", placeholder: "712 345678" },
  { name: "Egypt", code: "20", iso: "eg", placeholder: "10 1234 5678" },
  { name: "Turkey", code: "90", iso: "tr", placeholder: "532 123 4567" },
  { name: "Vietnam", code: "84", iso: "vn", placeholder: "91 234 5678" },
  { name: "Thailand", code: "66", iso: "th", placeholder: "81 234 5678" },
  { name: "Japan", code: "81", iso: "jp", placeholder: "90 1234 5678" },
  { name: "South Korea", code: "82", iso: "kr", placeholder: "10-1234-5678" },
  { name: "New Zealand", code: "64", iso: "nz", placeholder: "21 123 4567" },
  { name: "Ireland", code: "353", iso: "ie", placeholder: "85 123 4567" },
  { name: "Netherlands", code: "31", iso: "nl", placeholder: "6 12345678" },
  { name: "Belgium", code: "32", iso: "be", placeholder: "470 12 34 56" },
  { name: "Switzerland", code: "41", iso: "ch", placeholder: "79 123 45 67" },
  { name: "Sweden", code: "46", iso: "se", placeholder: "70 123 45 67" },
  { name: "Norway", code: "47", iso: "no", placeholder: "901 23 456" },
  { name: "Denmark", code: "45", iso: "dk", placeholder: "20 12 34 56" },
  { name: "Finland", code: "358", iso: "fi", placeholder: "40 123 4567" },
  { name: "Russia", code: "7", iso: "ru", placeholder: "912 345-67-89" },
];

// ─── Emoji Button Component ──────────────────────────────────────────────────
interface EmojiButtonProps {
  onEmojiSelect: (emoji: string) => void;
  id?: string;
}
function EmojiButton({ onEmojiSelect, id }: EmojiButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        title="Emoji picker"
        className="h-8 px-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-700 text-lg flex items-center gap-1 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-500"
      >
        <span>😊</span>
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute z-[100] bottom-full mb-2 left-0">
          <EmojiPicker
            onEmojiClick={(data: EmojiClickData) => {
              onEmojiSelect(data.emoji);
              setOpen(false);
            }}
            lazyLoadEmojis
            height={380}
            width={320}
          />
        </div>
      )}
    </div>
  );
}

// ─── Textarea with Emoji Picker ──────────────────────────────────────────────
interface EmojiTextareaProps {
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  charCount?: boolean;
  id?: string;
}
function EmojiTextarea({
  value,
  onChange,
  rows = 4,
  placeholder,
  textareaRef: externalRef,
  charCount,
  id,
}: EmojiTextareaProps) {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const ref = externalRef || internalRef;

  function handleEmojiSelect(emoji: string) {
    const el = ref.current;
    if (!el) {
      onChange(value + emoji);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newVal = value.substring(0, start) + emoji + value.substring(end);
    onChange(newVal);
    setTimeout(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + emoji.length;
    }, 0);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <EmojiButton
          onEmojiSelect={handleEmojiSelect}
          id={id ? `${id}-emoji-btn` : undefined}
        />
        {charCount && (
          <span className="text-xs text-gray-400">{value.length} chars</span>
        )}
      </div>
      <textarea
        ref={ref as React.RefObject<HTMLTextAreaElement>}
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-md p-3 text-sm text-gray-900 transition-all focus:outline-none resize-y"
      />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function WhatsappLinkCreator() {
  const [activeTab, setActiveTab] = useState<"single">("single");

  // Single tab states
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [copiedType, setCopiedType] = useState<"short" | "official" | null>(
    null,
  );
  const [countrySearch, setCountrySearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // FAQ open state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Time for mockup
  const [currentTime, setCurrentTime] = useState("12:00 PM");

  // Bulk tab states
  const [bulkRows, setBulkRows] = useState<BulkRow[]>([
    { id: "1", countryCode: "91", phone: "915684575212", message: "hello ? " },
    {
      id: "2",
      countryCode: "1",
      phone: "2025550143",
      message: "Hey there! I am interested in your products.",
    },
  ]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkCopySuccess, setBulkCopySuccess] = useState(false);
  const [bulkImportStatus, setBulkImportStatus] = useState<string | null>(null);
  const [isBulkImportModalOpen, setIsBulkImportModalOpen] = useState(false);
  const [bulkUniversalMessage, setBulkUniversalMessage] = useState("");

  useEffect(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    setCurrentTime(`${hours}:${minutes} ${ampm}`);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format single link phone
  const cleanSinglePhone = phoneNumber.replace(/\D/g, "");
  const fullSinglePhone = `${selectedCountry.code}${cleanSinglePhone}`;

  // URL Generation
  const encodedSingleText = encodeURIComponent(customMessage);
  const officialSingleUrl = `https://api.whatsapp.com/send?phone=${fullSinglePhone}&text=${encodedSingleText}`;
  const shortSingleUrl = `https://wa.me/${fullSinglePhone}?text=${encodedSingleText}`;

  // Copy helper
  const handleCopyLink = (text: string, type: "short" | "official") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Download QR Code
  const handleDownloadQR = async () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      shortSingleUrl,
    )}`;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `whatsapp_qr_${fullSinglePhone || "link"}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(qrUrl, "_blank");
    }
  };

  // Bulk functions
  const handleAddBulkRow = () => {
    const newRow: BulkRow = {
      id: Date.now().toString(),
      countryCode: COUNTRIES[0].code,
      phone: "",
      message: "",
    };
    setBulkRows([...bulkRows, newRow]);
  };

  const handleUpdateBulkRow = (
    id: string,
    field: keyof BulkRow,
    value: string,
  ) => {
    setBulkRows(
      bulkRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handleDeleteBulkRow = (id: string) => {
    setBulkRows(bulkRows.filter((row) => row.id !== id));
  };

  const handleClearBulkRows = () => {
    setBulkRows([]);
  };

  const getBulkRowLink = (row: BulkRow) => {
    const cleanPhone = row.phone.replace(/\D/g, "");
    if (!cleanPhone) return "";
    const fullPhone = `${row.countryCode}${cleanPhone}`;
    return `https://api.whatsapp.com/send?phone=${fullPhone}&text=${encodeURIComponent(
      row.message,
    )}`;
  };

  const handleParseBulkPaste = () => {
    if (!bulkPasteText.trim()) {
      setBulkImportStatus("Please enter or paste some text first.");
      return;
    }

    const tokens = bulkPasteText.split(/[\n\t,;]+/);
    const parsedRows: BulkRow[] = [];
    let successCount = 0;

    tokens.forEach((token) => {
      let phonePart = token.trim().replace(/^["']|["']$/g, "");
      if (!phonePart) return;

      let countryCode = "91";
      let phoneNum = phonePart.replace(/\D/g, "");

      if (!phoneNum) return;

      if (phonePart.startsWith("+")) {
        const matched = COUNTRIES.slice()
          .sort((a, b) => b.code.length - a.code.length)
          .find((c) => phoneNum.startsWith(c.code));
        if (matched) {
          countryCode = matched.code;
          phoneNum = phoneNum.slice(matched.code.length);
        }
      } else {
        if (phoneNum.length > 10) {
          const matched = COUNTRIES.slice()
            .sort((a, b) => b.code.length - a.code.length)
            .find((c) => phoneNum.startsWith(c.code));
          if (matched) {
            countryCode = matched.code;
            phoneNum = phoneNum.slice(matched.code.length);
          }
        }
      }

      parsedRows.push({
        id: `${Date.now()}-${Math.random()}`,
        countryCode,
        phone: phoneNum,
        message: bulkUniversalMessage,
      });
      successCount++;
    });

    if (parsedRows.length > 0) {
      setBulkRows([...bulkRows, ...parsedRows]);
      setBulkPasteText("");
      setBulkUniversalMessage("");
      setBulkImportStatus(`Successfully imported ${successCount} numbers!`);
      setTimeout(() => {
        setBulkImportStatus(null);
        setIsBulkImportModalOpen(false);
      }, 1500);
    } else {
      setBulkImportStatus(
        "Could not parse any valid phone numbers. Please check format.",
      );
    }
  };

  const handleCopyAllLinks = () => {
    const links = bulkRows
      .map((row) => getBulkRowLink(row))
      .filter((link) => link !== "")
      .join("\n");

    if (!links) return;
    navigator.clipboard.writeText(links);
    setBulkCopySuccess(true);
    setTimeout(() => setBulkCopySuccess(false), 2000);
  };

  const handleExportCSV = () => {
    const activeRows = bulkRows.filter(
      (r) => r.phone.replace(/\D/g, "") !== "",
    );
    if (activeRows.length === 0) return;

    const csvHeaders = [
      "Country Code",
      "Phone Number",
      "Custom Message",
      "WhatsApp Link",
    ];
    const csvRows = activeRows.map((row) => {
      const cleanP = row.phone.replace(/\D/g, "");
      const link = getBulkRowLink(row);
      const escape = (text: string) => `"${text.replace(/"/g, '""')}"`;
      return [
        escape(row.countryCode),
        escape(cleanP),
        escape(row.message),
        escape(link),
      ].join(",");
    });

    const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp_bulk_links_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportTXT = () => {
    const links = bulkRows
      .map((row) => getBulkRowLink(row))
      .filter((link) => link !== "")
      .join("\r\n");

    if (!links) return;
    const blob = new Blob([links], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp_links_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch),
  );

  const faqs = [
    {
      q: "What is a WhatsApp link generator?",
      a: "A WhatsApp link generator creates direct links that open a chat with your number in WhatsApp. When someone clicks the link, it automatically starts a conversation with you — no need to save your contact first.",
    },
    {
      q: "How do I create a WhatsApp link?",
      a: "Simply select your country, enter your phone number, and optionally add a pre-filled message. Click 'Generate WA Link' and your custom WhatsApp link is ready to share anywhere online.",
    },
    {
      q: "Can I add a custom message to my WhatsApp link?",
      a: "Yes! You can add a pre-filled message that will automatically appear in the chat when someone clicks your link. This is perfect for greetings, inquiries, or specific call-to-actions.",
    },
    {
      q: "Is this service free to use?",
      a: "Yes, WA.link is completely free to use. There are no hidden charges, no signup required, and no limitations on how many links you can create.",
    },
    {
      q: "What is the Bulk Link Creator?",
      a: "The Bulk Link Creator allows you to import multiple phone numbers at once and generate individual WhatsApp links for each. You can export the links as CSV or TXT files — ideal for marketing campaigns and customer outreach.",
    },
    {
      q: "Is my phone number safe and private?",
      a: "Absolutely. All link generation happens directly in your browser. We never store, log, or transmit your phone numbers or messages to any server. Your data stays completely private.",
    },
    {
      q: "Do I need WhatsApp Business to use these links?",
      a: "No, these links work with any WhatsApp account — both personal and business. However, WhatsApp Business users can benefit from the professional features like pre-filled messages and QR codes.",
    },
    {
      q: "What are QR codes and how can I use them?",
      a: "QR codes are scannable codes that contain your WhatsApp link. You can download them and use on business cards, flyers, posters, product packaging, or any print material to make it easy for customers to contact you.",
    },
  ];

  const features = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Instant Link Generation",
      desc: "Create WhatsApp links in real-time as you type. No waiting, no forms — just enter your number and you're ready to share.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Bulk Link Creator",
      desc: "Import hundreds of phone numbers at once and generate individual WhatsApp links. Perfect for marketing campaigns and customer outreach.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      title: "Custom Pre-filled Messages",
      desc: "Add personalized messages that auto-fill when customers click your link. Increase engagement with targeted communication.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8H3m2 0V6m0 2h.01M19 8h.01M19 8V6m0 2h.01M19 20v-2M19 12v2m0 6v-2M5 20v-2M5 12v2m0 6v-2"
          />
        </svg>
      ),
      title: "QR Code Generation",
      desc: "Every link comes with a downloadable QR code. Perfect for business cards, posters, packaging, and print materials.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "40+ Countries Supported",
      desc: "Choose from a curated list of countries with correct dial codes and flag icons. We support all major regions worldwide.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "100% Private & Secure",
      desc: "All processing happens in your browser. We never store, log, or transmit your phone numbers or messages to any server.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── Navigation Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-white/75 backdrop-blur-xl border-b border-emerald-100/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-200/40 group-hover:shadow-lg group-hover:shadow-emerald-200/50 group-hover:scale-105 transition-all duration-300">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              WA<span className="text-emerald-600">.link</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden sm:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {[
              { href: "#tool", label: "Tool" },
              { href: "#how-to-use", label: "How to Use" },
              { href: "#features", label: "Features" },
              { href: "#faq", label: "FAQ" },
              { href: "/bulk", label: "Bulk Creator" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="sm:hidden p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── HERO SECTION ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* Background: White top-left → Visible emerald bottom-right */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-emerald-100/80" />

          {/* Wave Layer 1 — White to visible mint */}
          <svg
            className="absolute top-0 right-0 w-[120%] h-full opacity-70"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L60 45C120 90 240 180 360 210C480 240 600 210 720 180C840 150 960 120 1080 135C1200 150 1320 210 1380 240L1440 270V800H1380C1320 800 1200 800 1080 800C960 800 840 800 720 800C600 800 480 800 360 800C240 800 120 800 60 800H0V0Z"
              fill="url(#waveWhite1)"
              className="animate-wave-drift"
            />
            <defs>
              <linearGradient
                id="waveWhite1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#ecfdf5" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Wave Layer 2 — Visible emerald flowing top-right to bottom-left */}
          <svg
            className="absolute top-0 right-0 w-[110%] h-full opacity-60"
            viewBox="0 0 1440 800"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1440 0C1280 80 1120 60 960 120C800 180 720 300 560 330C400 360 240 280 120 310C80 320 40 330 0 340V800H1440V0Z"
              fill="url(#waveGreenFade)"
              className="animate-wave-drift-slow"
            />
            <defs>
              <linearGradient
                id="waveGreenFade"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#6ee7b7" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#34d399" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>

          {/* Wave Layer 3 — Bottom curl with more green */}
          <svg
            className="absolute bottom-0 left-0 w-full h-72 opacity-50"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 128L48 144C96 160 192 192 288 186.7C384 181 480 139 576 122.7C672 107 768 117 864 138.7C960 160 1056 192 1152 197.3C1248 203 1344 181 1392 170.7L1440 160V320H1392C1344 320 1248 320 1152 320C1056 320 960 320 864 320C768 320 672 320 576 320C480 320 384 320 288 320C192 320 96 320 48 320H0V128Z"
              fill="url(#waveBottom)"
            />
            <defs>
              <linearGradient id="waveBottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#a7f3d0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Soft glow orbs — white top-left, visible green bottom-right */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl opacity-90" />
          <div className="absolute bottom-10 right-10 w-[28rem] h-[28rem] bg-emerald-200/50 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 text-center">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight animate-fade-in-up animation-delay-100">
            Create Your WhatsApp Link{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-emerald-600">in Seconds</span>
              <svg
                className="absolute -bottom-1 left-0 w-full h-2.5 text-emerald-200"
                viewBox="0 0 200 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6C50 1 150 1 198 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 animate-fade-in-up animation-delay-200">
            Generate direct WhatsApp links with custom messages for your
            business, marketing campaigns, or personal use. No signup required —
            completely free and private.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
            <a
              href="#tool"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200/60 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl text-sm"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:rotate-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.346a9.945 9.945 0 0 0 4.881 1.279h.005c5.505 0 9.988-4.478 9.989-9.985 0-2.67-1.037-5.18-2.92-7.062C17.18 3.036 14.67 2 12.012 2z" />
              </svg>
              Create Your Link Now
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="#features"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-gray-300 text-sm"
            >
              See How It Works
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-0 animate-fade-in-up animation-delay-500">
            {[
              ["Free Forever", "No Signup Required"],
              ["Single & Bulk", "Link Generation"],
              ["100%", "Private & Secure"],
              ["QR Codes", "Instant Download"],
            ].map(([val, label], i, arr) => (
              <div key={label} className="flex items-center">
                <div className="px-8 py-4 text-center">
                  <div className="text-3xl font-black text-emerald-600 tabular-nums">
                    {val}
                  </div>
                  <div className="text-sm font-medium text-gray-500 mt-1">
                    {label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden sm:block w-px h-10 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom soft fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ── TOOL SECTION ──────────────────────────────────────────── */}
      <main
        id="tool"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14"
      >
        {/* Tab Selector */}
        <div className="flex justify-center mb-6">
          <div className="relative flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("single")}
              className={`relative px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                activeTab === "single"
                  ? "text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Single Link
            </button>
            <Link
              href="/bulk"
              className="relative px-4 py-2.5 text-sm font-semibold transition-colors duration-200 text-gray-500 hover:text-emerald-600"
            >
              Bulk Creator
            </Link>

            {/* Sliding underline */}
            <div
              className="absolute bottom-0 h-0.5 bg-emerald-500 rounded-full transition-all duration-300 ease-out"
              style={{
                width: "50%",
                left: activeTab === "single" ? "0%" : "50%",
              }}
            />
          </div>
        </div>

        {/* ── TAB 1: SINGLE LINK CREATOR ── */}
        {activeTab === "single" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Enter WhatsApp Number
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Select country code and type your phone number.
                    </p>
                  </div>

                  {/* Country Code & Phone Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    {/* Country Selector */}
                    <div className="sm:col-span-5 relative" ref={dropdownRef}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                        Country
                      </label>
                      <button
                        id="country-selector-btn"
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full h-10 bg-white border border-gray-300 rounded-md px-3 flex items-center justify-between text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      >
                        <span className="flex items-center gap-2 text-sm overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                            alt={selectedCountry.name}
                            className="w-5 h-auto shrink-0 shadow-sm rounded-sm"
                          />
                          <span className="truncate">
                            +{selectedCountry.code}
                          </span>
                        </span>
                        <svg
                          className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                          <div className="p-2 border-b border-gray-200 bg-gray-50">
                            <input
                              type="text"
                              placeholder="Search..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="w-full h-8 bg-white border border-gray-300 rounded px-2 text-sm text-gray-900 focus:outline-none focus:border-emerald-500"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-56 overflow-y-auto divide-y divide-gray-100">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((c) => (
                                <button
                                  key={`${c.name}-${c.code}`}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setIsDropdownOpen(false);
                                    setCountrySearch("");
                                  }}
                                  className={`w-full px-3 py-2 flex items-center justify-between text-left text-sm hover:bg-gray-50 ${
                                    selectedCountry.code === c.code &&
                                    selectedCountry.name === c.name
                                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                                      : "text-gray-700"
                                  }`}
                                >
                                  <span className="flex items-center gap-2 truncate">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={`https://flagcdn.com/w40/${c.iso}.png`}
                                      alt={c.name}
                                      className="w-5 h-auto shrink-0 shadow-sm rounded-sm"
                                    />
                                    <span className="truncate">{c.name}</span>
                                  </span>
                                  <span className="text-gray-500 shrink-0">
                                    +{c.code}
                                  </span>
                                </button>
                              ))
                            ) : (
                              <div className="p-3 text-center text-sm text-gray-500">
                                No countries found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="sm:col-span-7">
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                          +{selectedCountry.code}
                        </span>
                        <input
                          id="phone-number-input"
                          type="tel"
                          placeholder={selectedCountry.placeholder}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full h-10 bg-white border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-md pl-12 pr-3 text-sm text-gray-900 transition-all focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* Custom Message */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Custom Message (Optional)
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Pre-filled message users will send to you.
                    </p>
                  </div>

                  <EmojiTextarea
                    id="single-message"
                    value={customMessage}
                    onChange={setCustomMessage}
                    rows={4}
                    placeholder="e.g. Hello, I want more info!"
                    textareaRef={textareaRef}
                    charCount
                  />

                  <div className="pt-2">
                    <button
                      id="generate-link-btn"
                      onClick={() => setIsModalOpen(true)}
                      disabled={!phoneNumber}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-sm text-sm"
                    >
                      Generate WA Link
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Column */}
            <div className="lg:col-span-5 flex justify-center sticky top-24">
              <div className="relative w-80 h-[590px] rounded-[40px] bg-white border-[8px] border-gray-200 shadow-xl overflow-hidden shrink-0 flex flex-col">
                <div className="h-6 bg-[#075e54] text-white px-5 flex items-center justify-between text-xs font-medium select-none">
                  <span>{currentTime}</span>
                  <span>LTE</span>
                </div>
                <div className="h-14 bg-[#075e54] text-white px-3 flex items-center gap-2 shrink-0 select-none shadow-sm z-10">
                  <svg
                    className="w-5 h-5 text-white/90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-semibold text-sm truncate leading-tight">
                      {phoneNumber
                        ? `+${selectedCountry.code} ${cleanSinglePhone}`
                        : "New Contact"}
                    </span>
                  </div>
                </div>
                <div className="flex-1 p-4 bg-[#ece5dd] overflow-y-auto flex flex-col justify-end space-y-3 relative">
                  <div className="self-end bg-[#d9fdd3] text-gray-900 px-3 py-2 rounded-lg rounded-tr-none max-w-[85%] text-sm shadow-sm relative pr-14 min-w-[80px]">
                    {customMessage ? (
                      <p
                        className="whitespace-pre-wrap break-words"
                        title={
                          customMessage.length > 20 ? customMessage : undefined
                        }
                      >
                        {customMessage.length > 20
                          ? customMessage.slice(0, 20) + "..."
                          : customMessage}
                      </p>
                    ) : (
                      <p className="italic text-gray-500">Preview message...</p>
                    )}
                    <span className="absolute bottom-1 right-2 text-[10px] text-gray-500 flex items-center gap-1">
                      {currentTime.replace(/ (AM|PM)/, "")}
                      <svg
                        className="w-3 h-3 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17l-4.24-4.24-1.41 1.41 5.66 5.66L23.66 7l-1.42-1.41zM5.5 12h-1.5v3h3v-1.5h-1.5v-1.5z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="h-14 bg-[#ece5dd] p-2 flex items-center gap-2 shrink-0 select-none">
                  <div className="flex-1 h-10 bg-white rounded-full flex items-center px-4 text-gray-400 text-sm">
                    Type a message
                  </div>
                  <div className="w-10 h-10 bg-[#075e54] text-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.4 2.72 6.2 6 6.6V21h2v-3.4c3.28-.4 6-3.2 6-6.6h-1.7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── FEATURES / ABOUT SECTION ──────────────────────────────── */}
      <section
        id="features"
        className="relative overflow-hidden bg-white py-24"
      >
        {/* Subtle background echo from hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-emerald-50/60 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
              Why Choose WA.link
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-5">
              The Simplest Way to{" "}
              <span className="text-emerald-600">Connect on WhatsApp</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
              Whether you're a business owner, marketer, or freelancer — our
              tool helps you create professional WhatsApp links that make it
              easy for customers to reach you.
            </p>
          </div>

          {/* Tight boxy grid — zero gap, square corners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative p-8 border border-transparent hover:border-emerald-200 
                     hover:bg-emerald-50/40 hover:z-10
                     transition-all duration-300 ease-out animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="relative">
                  {/* Icon: ghost by default, emerald on hover */}
                  <div
                    className="w-10 h-10 rounded-lg text-gray-400 flex items-center justify-center mb-4
                            group-hover:text-emerald-600 group-hover:bg-emerald-100 
                            transition-all duration-300"
                  >
                    {f.icon}
                  </div>

                  <h3
                    className="font-semibold text-gray-900 text-lg mb-2 tracking-tight 
                           group-hover:text-emerald-700 transition-colors duration-300"
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 leading-relaxed 
                          group-hover:text-gray-600 transition-colors duration-300"
                  >
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO USE SECTION ─────────────────────────────────────── */}
      <section id="how-to-use" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
              Getting Started
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              How to Create a WhatsApp Link in 3 Steps
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 text-lg">
              No signup, no downloads. Generate your first link in under a
              minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-extrabold">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Select Country &amp; Enter Number
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Choose your country from the dropdown (40+ supported countries
                with correct dial codes). Type the phone number you want people
                to message.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-extrabold">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Add a Custom Message (Optional)
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Write a pre-filled message that appears automatically when
                someone opens the chat. Use the emoji picker to add personality
                to your message.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-extrabold">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Generate &amp; Share Your Link
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Click "Generate WA Link" to get your shareable URL. Copy it,
                download the QR code, or share it anywhere — website, bio,
                email, or print.
              </p>
            </div>
          </div>

          {/* CTA to Bulk */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Need links for <strong>multiple numbers</strong>? Use our{" "}
              <Link
                href="/bulk"
                className="text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-2"
              >
                Bulk Link Creator
              </Link>{" "}
              to import hundreds of numbers and export them as CSV or TXT.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ───────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFaq === i
                    ? "shadow-md ring-1 ring-gray-100/80"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-300 ${
                    openFaq === i
                      ? "bg-gray-50/60 border-b border-gray-100"
                      : "hover:bg-gray-50/40 border-b border-transparent"
                  }`}
                >
                  <span
                    className={`font-semibold text-sm transition-all duration-300 ${
                      openFaq === i
                        ? "text-emerald-700 underline underline-offset-4 decoration-emerald-300/70"
                        : "text-gray-900"
                    }`}
                  >
                    {faq.q}
                  </span>

                  {/* Plus / Minus Icon */}
                  <span
                    className={`relative w-5 h-5 shrink-0 ml-4 flex items-center justify-center transition-colors duration-300 ${
                      openFaq === i ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    {/* Horizontal line (always visible) */}
                    <span className="absolute w-3 h-0.5 bg-current rounded-full" />
                    {/* Vertical line (rotates out when open) */}
                    <span
                      className={`absolute w-0.5 h-3 bg-current rounded-full transition-all duration-300 ${
                        openFaq === i
                          ? "rotate-90 opacity-0"
                          : "rotate-0 opacity-100"
                      }`}
                    />
                  </span>
                </button>

                {/* Animated Content */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openFaq === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-4 text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-600 rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">
                WA<span className="text-gray-500">.link</span>
              </span>
            </div>

            <nav className="flex items-center gap-6 text-sm text-gray-500">
              <a
                href="#tool"
                className="hover:text-emerald-600 transition-colors"
              >
                Tool
              </a>
              <a
                href="#how-to-use"
                className="hover:text-emerald-600 transition-colors"
              >
                How to Use
              </a>
              <a
                href="#features"
                className="hover:text-emerald-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#faq"
                className="hover:text-emerald-600 transition-colors"
              >
                FAQ
              </a>
              <Link
                href="/bulk"
                className="hover:text-emerald-600 transition-colors"
              >
                Bulk
              </Link>
            </nav>

            <p className="text-xs text-gray-400 text-center">
              © {new Date().getFullYear()} WA.link — Free WhatsApp Link
              Generator.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>
              Not affiliated with WhatsApp or Meta.{" "}
              <Link
                href="/privacy-policy"
                className="hover:text-emerald-600 transition-colors"
              >
                Privacy
              </Link>{" "}
              ·{" "}
              <Link
                href="/terms-of-service"
                className="hover:text-emerald-600 transition-colors"
              >
                Terms
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* ── GENERATED LINK MODAL ──────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 relative">
            <button
              id="close-link-modal-btn"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Your WA Link</h3>
              <p className="text-sm text-gray-500 mt-1">
                Ready to share and scan.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="w-56 h-56 bg-white border border-gray-200 p-3 rounded-xl shadow-sm flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                    shortSingleUrl,
                  )}`}
                  alt="QR Code"
                  className="w-full h-full"
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <a
                  id="open-chat-link"
                  href={shortSingleUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.346a9.945 9.945 0 0 0 4.881 1.279h.005c5.505 0 9.988-4.478 9.989-9.985 0-2.67-1.037-5.18-2.92-7.062C17.18 3.036 14.67 2 12.012 2zm4.7 13.561c-.258.726-1.503 1.34-2.072 1.424-.543.08-1.25.143-3.64-.805-3.056-1.21-5.029-4.313-5.181-4.516-.151-.202-1.233-1.636-1.233-3.12 0-1.485.78-2.215 1.056-2.518.277-.303.606-.379.808-.379.202 0 .404.002.58.01.187.008.437-.03.684.568.253.614.86 2.096.936 2.247.075.152.126.328.025.529-.1.202-.152.328-.303.504-.151.176-.318.393-.454.529-.152.152-.31.318-.134.62.176.303.784 1.289 1.683 2.087.973.864 1.792 1.134 2.12 1.298.328.164.521.139.715-.075.193-.215.833-.969 1.056-1.303.223-.333.447-.278.754-.165.31.114 1.954.919 2.29 1.083.336.164.56.247.643.388.083.14.083.812-.175 1.538z" />
                  </svg>
                  Open Chat
                </a>
                <button
                  id="copy-short-link-btn"
                  onClick={() => handleCopyLink(shortSingleUrl, "short")}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm transition-colors"
                >
                  {copiedType === "short" ? "Copied!" : "Copy wa.me Link"}
                </button>
                <button
                  id="download-qr-btn"
                  onClick={handleDownloadQR}
                  className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
