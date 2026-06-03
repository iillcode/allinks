import Link from "next/link";

interface FooterProps {
  brandName?: string;
  brandHighlight?: string;
  showLinks?: boolean;
}

export function Footer({
  brandName = "WA",
  brandHighlight = ".link",
  showLinks = true,
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-white"
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
            <span className="font-bold text-sm text-gray-900">
              {brandName}
              <span className="text-gray-500">{brandHighlight}</span>
            </span>
          </div>

          <p className="text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} {brandName}
            {brandHighlight} &mdash; Free WhatsApp Link Generator. Not
            affiliated with WhatsApp or Meta.
          </p>
        </div>

        {showLinks && (
          <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/privacy-policy"
              className="text-xs text-gray-500 hover:text-emerald-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-xs text-gray-500 hover:text-emerald-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}
