"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import type { EmojiClickData } from "emoji-picker-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

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
  const [bulkRows, setBulkRows] = useState<BulkRow[]>([]);
  const [bulkPasteText, setBulkPasteText] = useState("");
  const [bulkCopySuccess, setBulkCopySuccess] = useState(false);
  const [bulkImportStatus, setBulkImportStatus] = useState<string | null>(null);
  const [isBulkImportModalOpen, setIsBulkImportModalOpen] = useState(true);
  const [bulkUniversalMessage, setBulkUniversalMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedRowId, setCopiedRowId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    countryCode: string;
    phone: string;
    message: string;
  }>({ countryCode: "", phone: "", message: "" });
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const [openedLinks, setOpenedLinks] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("openedLinks");
        return stored ? new Set(JSON.parse(stored)) : new Set();
      } catch {
        return new Set();
      }
    }
    return new Set();
  });
  const rowsPerPage = isMobile ? 8 : 4;

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset to page 1 when rowsPerPage changes (screen resize)
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage]);

  // Close export menu on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(e.target as Node)
      ) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    localStorage.setItem("openedLinks", JSON.stringify([...openedLinks]));
  }, [openedLinks]);

  const handleAddBulkRow = () => {
    const newRow: BulkRow = {
      id: Date.now().toString(),
      countryCode: selectedCountry.code,
      phone: "",
      message: "",
    };
    const newRows = [...bulkRows, newRow];
    setBulkRows(newRows);
    // Navigate to the page where the new row was added
    const newPage = Math.ceil(newRows.length / rowsPerPage);
    setCurrentPage(newPage);
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
    const filteredRows = bulkRows.filter((row) => row.id !== id);
    setBulkRows(filteredRows);
    // Adjust current page if necessary
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  };

  const handleClearBulkRows = () => {
    setIsClearConfirmOpen(true);
  };

  const confirmClearAll = () => {
    setBulkRows([]);
    setIsClearConfirmOpen(false);
    setCurrentPage(1);
    setOpenedLinks(new Set());
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
      const previousCount = bulkRows.length;
      setBulkRows([...bulkRows, ...parsedRows]);
      setBulkPasteText("");
      setBulkUniversalMessage("");
      setBulkImportStatus(`Successfully imported ${successCount} numbers!`);
      // Calculate which page the new rows will be on
      const newTotalCount = bulkRows.length + parsedRows.length;
      const newRowsStartIndex = previousCount;
      const newPage = Math.floor(newRowsStartIndex / rowsPerPage) + 1;
      setCurrentPage(newPage);
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

  const handleCopySingleLink = (link: string, rowId: string) => {
    navigator.clipboard.writeText(link);
    setCopiedRowId(rowId);
    setTimeout(() => setCopiedRowId(null), 2000);
  };

  const handleOpenLink = (link: string) => {
    setOpenedLinks((prev) => new Set(prev).add(link));
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // Mobile edit modal handlers
  const handleOpenEditModal = (row: BulkRow) => {
    setEditingRowId(row.id);
    setEditForm({
      countryCode: row.countryCode,
      phone: row.phone,
      message: row.message,
    });
  };

  const handleSaveEdit = () => {
    if (!editingRowId) return;
    setBulkRows(
      bulkRows.map((row) =>
        row.id === editingRowId
          ? {
              ...row,
              countryCode: editForm.countryCode,
              phone: editForm.phone,
              message: editForm.message,
            }
          : row,
      ),
    );
    setEditingRowId(null);
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
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

  // Pagination logic
  const totalPages = Math.ceil(bulkRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = bulkRows.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header
        brandName="WA"
        brandHighlight=".link"
        brandHref="/"
        navLabel="Back to Single Link Creator"
        navHref="/#tool"
        variant="rounded"
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Bulk Link Creator
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                  Import, manage, and export multiple WhatsApp links at once.
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleClearBulkRows}
                  className="h-9 px-3 sm:px-4 bg-white border border-gray-300 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span className="sm:hidden">Clear</span>
                  <span className="hidden sm:inline">Clear All</span>
                </button>

                <button
                  onClick={handleAddBulkRow}
                  className="h-9 px-3 sm:px-4 bg-white border border-gray-300 hover:bg-gray-100 text-xs sm:text-sm font-medium text-gray-700 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add Row</span>
                </button>
                <button
                  onClick={() => setIsBulkImportModalOpen(true)}
                  className="h-9 px-3 sm:px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Import
                </button>

                {/* Mobile Export Dropdown (3-dot menu) */}
                <div className="relative sm:hidden" ref={exportMenuRef}>
                  <button
                    onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                    className="h-9 w-9 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-md transition-colors flex items-center justify-center"
                    title="Export options"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>

                  {isExportMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-30 overflow-hidden">
                      <button
                        onClick={() => {
                          handleExportCSV();
                          setIsExportMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                      >
                        <svg
                          className="w-4 h-4 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Export as CSV
                      </button>
                      <div className="border-t border-gray-100" />
                      <button
                        onClick={() => {
                          handleExportTXT();
                          setIsExportMenuOpen(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors text-left"
                      >
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Export as TXT
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase">
                    <th className="py-3 px-3 sm:px-4 w-10 sm:w-12">#</th>
                    <th className="py-3 px-3 sm:px-4 w-48 hidden md:table-cell">
                      <div className="flex items-center gap-2 w-full">
                        <span className="w-2/3 truncate">Country</span>
                        <select
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val)
                              setBulkRows((prev) =>
                                prev.map((r) => ({ ...r, countryCode: val })),
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
                    <th className="py-3 px-3 sm:px-4 align-top">
                      Phone Number
                    </th>
                    <th className="py-3 px-3 sm:px-4 align-top hidden md:table-cell">
                      Message
                    </th>
                    <th className="py-3 px-3 sm:px-4 w-32 sm:w-40 align-top">
                      Link
                    </th>
                    <th className="py-3 px-3 sm:px-4 w-16 sm:w-20 text-center align-top hidden md:table-cell">
                      Actions
                    </th>
                    <th className="py-3 px-3 w-12 text-center align-top md:hidden">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentRows.length > 0 ? (
                    currentRows.map((row, idx) => {
                      const globalIdx = startIndex + idx;
                      const generatedLink = getBulkRowLink(row);
                      const rowCountry =
                        COUNTRIES.find((c) => c.code === row.countryCode) ||
                        COUNTRIES[0];
                      return (
                        <tr key={row.id} className="hover:bg-gray-50 text-sm">
                          <td className="py-2 px-3 sm:px-4 text-gray-500 text-center text-xs">
                            {globalIdx + 1}
                          </td>
                          {/* Country - hidden on mobile */}
                          <td className="py-2 px-3 sm:px-4 hidden md:table-cell">
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
                                    e.target.value,
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
                          {/* Phone Number - always visible */}
                          <td className="py-2 px-3 sm:px-4">
                            <input
                              type="text"
                              value={row.phone}
                              onChange={(e) =>
                                handleUpdateBulkRow(
                                  row.id,
                                  "phone",
                                  e.target.value,
                                )
                              }
                              className="w-full h-8 bg-white border border-gray-300 rounded px-2 text-xs focus:outline-none focus:border-emerald-500"
                            />
                          </td>
                          {/* Message - hidden on mobile */}
                          <td className="py-2 px-3 sm:px-4 hidden md:table-cell">
                            <input
                              type="text"
                              value={row.message}
                              onChange={(e) =>
                                handleUpdateBulkRow(
                                  row.id,
                                  "message",
                                  e.target.value,
                                )
                              }
                              className="w-full h-8 bg-white border border-gray-300 rounded px-2 text-xs focus:outline-none focus:border-emerald-500"
                            />
                          </td>
                          {/* Link / Open Chat - always visible */}
                          <td className="py-2 px-3 sm:px-4">
                            {generatedLink ? (
                              <div className="flex gap-1.5 sm:gap-2">
                                <button
                                  onClick={() => handleOpenLink(generatedLink)}
                                  className={`flex-1 h-8 text-xs font-semibold rounded flex items-center justify-center gap-1 sm:gap-1.5 transition-colors ${
                                    openedLinks.has(generatedLink)
                                      ? "bg-gray-100 hover:bg-gray-200 text-gray-600"
                                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                                  }`}
                                >
                                  <svg
                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.13-1.346a9.945 9.945 0 0 0 4.881 1.279h.005c5.505 0 9.988-4.478 9.989-9.985 0-2.67-1.037-5.18-2.92-7.062C17.18 3.036 14.67 2 12.012 2zm4.7 13.561c-.258.726-1.503 1.34-2.072 1.424-.543.08-1.25.143-3.64-.805-3.056-1.21-5.029-4.313-5.181-4.516-.151-.202-1.233-1.636-1.233-3.12 0-1.485.78-2.215 1.056-2.518.277-.303.606-.379.808-.379.202 0 .404.002.58.01.187.008.437-.03.684.568.253.614.86 2.096.936 2.247.075.152.126.328.025.529-.1.202-.152.328-.303.504-.151.176-.318.393-.454.529-.152.152-.31.318-.134.62.176.303.784 1.289 1.683 2.087.973.864 1.792 1.134 2.12 1.298.328.164.521.139.715-.075.193-.215.833-.969 1.056-1.303.223-.333.447-.278.754-.165.31.114 1.954.919 2.29 1.083.336.164.56.247.643.388.083.14.083.812-.175 1.538z" />
                                  </svg>
                                  <span className="hidden sm:inline">
                                    {openedLinks.has(generatedLink)
                                      ? "Opened"
                                      : "Open"}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleCopySingleLink(generatedLink, row.id)
                                  }
                                  className="h-8 px-2 sm:px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded flex items-center justify-center gap-1 sm:gap-1.5 transition-colors"
                                  title="Copy link"
                                >
                                  {copiedRowId === row.id ? (
                                    <svg
                                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            ) : (
                              <div className="h-8 bg-gray-100 rounded px-2 flex items-center justify-center">
                                <span className="text-[10px] text-gray-400">
                                  ...
                                </span>
                              </div>
                            )}
                          </td>
                          {/* Actions / Delete - hidden on mobile */}
                          <td className="py-2 px-3 sm:px-4 text-center hidden md:table-cell">
                            <button
                              onClick={() => handleDeleteBulkRow(row.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1 mx-auto"
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </button>
                          </td>
                          {/* Mobile Edit Button - visible only on mobile */}
                          <td className="py-2 px-3 text-center md:hidden">
                            <button
                              onClick={() => handleOpenEditModal(row)}
                              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors"
                              title="Edit row"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-8 sm:py-12 text-center text-gray-500 text-sm"
                      >
                        No rows available. Click <strong>Import</strong> or{" "}
                        <strong>Add Row</strong> to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer: Total + Pagination + Actions */}
            <div className="bg-gray-50 px-4 sm:px-5 py-3 sm:py-4 border-t border-gray-200 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
              <div className="text-sm text-gray-600 flex flex-col items-center sm:items-start">
                <span>
                  Total Rows: <strong>{bulkRows.length}</strong>
                </span>
                {totalPages > 1 && (
                  <span className="text-xs text-gray-500 mt-0.5">
                    Showing {startIndex + 1}-
                    {Math.min(endIndex, bulkRows.length)} of {bulkRows.length}
                  </span>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center gap-1.5 sm:gap-2 justify-center">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9 sm:h-8 sm:w-auto sm:px-3 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 rounded-md transition-colors flex items-center justify-center gap-1"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`h-9 w-9 sm:h-8 sm:w-8 text-sm font-medium rounded-md transition-colors ${
                          currentPage === page
                            ? "bg-emerald-600 text-white"
                            : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 sm:h-8 sm:w-auto sm:px-3 bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium text-gray-700 rounded-md transition-colors flex items-center justify-center gap-1"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <div className="hidden sm:flex gap-2 sm:gap-3 justify-center">
                <button
                  onClick={handleExportCSV}
                  className="px-3 sm:px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1 sm:gap-1.5"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Export CSV</span>
                  <span className="sm:hidden">CSV</span>
                </button>
                <button
                  onClick={handleExportTXT}
                  className="px-3 sm:px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1 sm:gap-1.5"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Export TXT</span>
                  <span className="sm:hidden">TXT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Clear All Confirmation Modal */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 sm:p-6 relative mx-3">
            <button
              onClick={() => setIsClearConfirmOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
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
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Clear All Rows?
              </h3>
              <p className="text-sm text-gray-600">
                This will remove all {bulkRows.length} row
                {bulkRows.length !== 1 ? "s" : ""} from your list. This action
                cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsClearConfirmOpen(false)}
                className="flex-1 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-1.5"
              >
                <svg
                  className="w-4 h-4"
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
                Cancel
              </button>
              <button
                onClick={confirmClearAll}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm flex items-center justify-center gap-1.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {isBulkImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-gray-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-5 sm:p-8 relative mx-3 my-4">
            <button
              onClick={() => setIsBulkImportModalOpen(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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

            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Bulk Import
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Paste phone numbers (one per line, or comma-separated).
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
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

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={handleParseBulkPaste}
                  className="px-5 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Import Rows
                </button>
                <button
                  onClick={() => setIsBulkImportModalOpen(false)}
                  className="px-5 sm:px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4"
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
                  Cancel
                </button>
                {bulkImportStatus && (
                  <span className="text-xs font-medium text-emerald-600 sm:ml-auto text-center">
                    {bulkImportStatus}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Edit Row Modal */}
      {editingRowId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-gray-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full p-5 sm:p-6 relative sm:mx-3 max-h-[90vh] overflow-y-auto">
            {/* Drag handle for mobile */}
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Edit Row</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <svg
                  className="w-5 h-5"
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
            </div>

            <div className="space-y-4">
              {/* Country */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                  Country
                </label>
                <select
                  value={editForm.countryCode}
                  onChange={(e) =>
                    setEditForm({ ...editForm, countryCode: e.target.value })
                  }
                  className="w-full h-11 bg-white border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  {COUNTRIES.map((c) => (
                    <option key={`edit-${c.code}`} value={c.code}>
                      {c.name} (+{c.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="w-full h-11 bg-white border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  value={editForm.message}
                  onChange={(e) =>
                    setEditForm({ ...editForm, message: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                  placeholder="Pre-filled message"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    handleDeleteBulkRow(editingRowId);
                    setEditingRowId(null);
                  }}
                  className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-[2] py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer brandName="WA" brandHighlight=".link" showLinks={false} />
    </div>
  );
}
