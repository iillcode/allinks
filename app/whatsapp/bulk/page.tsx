"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

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

interface EmojiTextareaProps {
  value: string;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
  charCount?: boolean;
  id?: string;
}

function EmojiTextarea({
  value,
  onChange,
  rows = 4,
  placeholder,
  charCount,
  id,
}: EmojiTextareaProps) {
  const ref = React.useRef<HTMLTextAreaElement>(null);

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
        ref={ref}
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

interface EmojiButtonProps {
  onEmojiSelect: (emoji: string) => void;
  id?: string;
}

function EmojiButton({ onEmojiSelect, id }: EmojiButtonProps) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

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

export default function BulkLinkCreator() {
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
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);

  const handleAddBulkRow = () => {
    const newRow: BulkRow = {
      id: Date.now().toString(),
      countryCode: selectedCountry.code,
      phone: "",
      message: "",
    };
    setBulkRows([...bulkRows, newRow]);
  };

  const handleUpdateBulkRow = (
    id: string,
    field: keyof BulkRow,
    value: string
  ) => {
    setBulkRows(
      bulkRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
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
      row.message
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
        "Could not parse any valid phone numbers. Please check format."
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
      (r) => r.phone.replace(/\D/g, "") !== ""
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center">
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
              allLink<span className="text-gray-500">.tools</span>
            </span>
          </Link>
          <Link
            href="/whatsapp"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Back to Single Link Creator
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200 flex flex-wrap gap-4 items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Bulk Link Creator
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Import, manage, and export multiple WhatsApp links at once.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClearBulkRows}
                  className="h-9 px-4 bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium text-gray-700 rounded-md transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsBulkImportModalOpen(true)}
                  className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                  Import
                </button>
                <button
                  onClick={handleAddBulkRow}
                  className="h-9 px-4 bg-white border border-gray-300 hover:bg-gray-100 text-sm font-medium text-gray-700 rounded-md transition-colors"
                >
                  Add Row
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase">
                    <th className="py-3 px-4 w-12">#</th>
                    <th className="py-3 px-4 w-48">
                      <div className="flex items-center gap-2 w-full">
                        <span className="w-2/3 truncate">Country</span>
                        <select
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val)
                              setBulkRows((prev) =>
                                prev.map((r) => ({ ...r, countryCode: val }))
                              );
                            e.target.value = "";
                          }}
                          className="w-1/3 bg-white border border-gray-300 rounded px-1 py-1 text-[10px] font-normal text-gray-700 focus:outline-none focus:border-emerald-500"
                        >
                          <option value="">All...</option>
                          {COUNTRIES.map((c) => (
                            <option key={`univ-${c.code}`} value={c.code}>
                              +{c.code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </th>
                    <th className="py-3 px-4 w-44 align-top">Phone Number</th>
                    <th className="py-3 px-4 align-top">Message</th>
                    <th className="py-3 px-4 w-40 align-top">Link</th>
                    <th className="py-3 px-4 w-20 text-center align-top">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bulkRows.length > 0 ? (
                    bulkRows.map((row, idx) => {
                      const generatedLink = getBulkRowLink(row);
                      const rowCountry =
                        COUNTRIES.find((c) => c.code === row.countryCode) ||
                        COUNTRIES[0];
                      return (
                        <tr key={row.id} className="hover:bg-gray-50 text-sm">
                          <td className="py-2 px-4 text-gray-500 text-center">
                            {idx + 1}
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2 w-full">
                              <div className="w-2/3 flex items-center gap-2 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={`https://flagcdn.com/w20/${rowCountry.iso}.png`}
                                  alt={rowCountry.name}
                                  className="w-5 h-auto shrink-0 shadow-sm rounded-sm"
                                />
                                <span
                                  className="text-xs truncate text-gray-700"
                                  title={rowCountry.name}
                                >
                                  {rowCountry.name}
                                </span>
                              </div>
                              <select
                                value={row.countryCode}
                                onChange={(e) =>
                                  handleUpdateBulkRow(
                                    row.id,
                                    "countryCode",
                                    e.target.value
                                  )
                                }
                                className="w-1/3 h-8 bg-white border border-gray-300 rounded px-1 text-[10px] focus:outline-none focus:border-emerald-500"
                              >
                                {COUNTRIES.map((c) => (
                                  <option
                                    key={`${idx}-${c.code}`}
                                    value={c.code}
                                  >
                                    +{c.code}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={row.phone}
                              onChange={(e) =>
                                handleUpdateBulkRow(
                                  row.id,
                                  "phone",
                                  e.target.value
                                )
                              }
                              className="w-full h-8 bg-white border border-gray-300 rounded px-2 text-xs focus:outline-none focus:border-emerald-500"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={row.message}
                              onChange={(e) =>
                                handleUpdateBulkRow(
                                  row.id,
                                  "message",
                                  e.target.value
                                )
                              }
                              className="w-full h-8 bg-white border border-gray-300 rounded px-2 text-xs focus:outline-none focus:border-emerald-500"
                            />
                          </td>
                          <td className="py-2 px-3">
                            {generatedLink ? (
                              <a
                                href={generatedLink}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full h-8 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.346a9.945 9.945 0 0 0 4.881 1.279h.005c5.505 0 9.988-4.478 9.989-9.985 0-2.67-1.037-5.18-2.92-7.062C17.18 3.036 14.67 2 12.012 2zm4.7 13.561c-.258.726-1.503 1.34-2.072 1.424-.543.08-1.25.143-3.64-.805-3.056-1.21-5.029-4.313-5.181-4.516-.151-.202-1.233-1.636-1.233-3.12 0-1.485.78-2.215 1.056-2.518.277-.303.606-.379.808-.379.202 0 .404.002.58.01.187.008.437-.03.684.568.253.614.86 2.096.936 2.247.075.152.126.328.025.529-.1.202-.152.328-.303.504-.151.176-.318.393-.454.529-.152.152-.31.318-.134.62.176.303.784 1.289 1.683 2.087.973.864 1.792 1.134 2.12 1.298.328.164.521.139.715-.075.193-.215.833-.969 1.056-1.303.223-.333.447-.278.754-.165.31.114 1.954.919 2.29 1.083.336.164.56.247.643.388.083.14.083.812-.175 1.538z" />
                                </svg>
                                Open Chat
                              </a>
                            ) : (
                              <div className="h-8 bg-gray-100 rounded px-2 flex items-center justify-center">
                                <span className="text-[10px] text-gray-400">
                                  ...
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="py-2 px-4 text-center">
                            <button
                              onClick={() => handleDeleteBulkRow(row.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-500 text-sm"
                      >
                        No rows available. Click <strong>Import</strong> or{" "}
                        <strong>Add Row</strong> to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                Total Rows: <strong>{bulkRows.length}</strong>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCopyAllLinks}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-md transition-colors"
                >
                  {bulkCopySuccess ? "Copied!" : "Copy Links"}
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Export CSV
                </button>
                <button
                  onClick={handleExportTXT}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 text-sm font-medium rounded-md transition-colors"
                >
                  Export TXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bulk Import Modal */}
      {isBulkImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
            <button
              onClick={() => setIsBulkImportModalOpen(false)}
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

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Bulk Import</h3>
              <p className="text-sm text-gray-500 mt-1">
                Paste phone numbers (one per line, or comma-separated).
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                  Phone Numbers
                </label>
                <textarea
                  rows={3}
                  placeholder="919876543210, 915684575212, 12025550143..."
                  value={bulkPasteText}
                  onChange={(e) => setBulkPasteText(e.target.value)}
                  className="w-full bg-white border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-md p-3 text-sm text-gray-900 transition-all focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Universal Message (Optional)
                </label>
                <EmojiTextarea
                  value={bulkUniversalMessage}
                  onChange={setBulkUniversalMessage}
                  rows={2}
                  placeholder="Message to attach to all imported numbers"
                  charCount
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleParseBulkPaste}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Import Rows
                </button>
                <button
                  onClick={() => setIsBulkImportModalOpen(false)}
                  className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                {bulkImportStatus && (
                  <span className="text-xs font-medium text-emerald-600 ml-auto">
                    {bulkImportStatus}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-200 bg-white text-center text-xs text-gray-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-2">© 2026 allLink.tools. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/privacy-policy" className="hover:text-emerald-600">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-emerald-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
