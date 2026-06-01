import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center py-16 sm:py-24 text-center">
        {/* Hero title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 max-w-3xl leading-tight">
          Professional WhatsApp Link Generator
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl leading-relaxed mb-12">
          Create WhatsApp click-to-chat links, customizable messages, and QR
          codes. Build single links or import spreadsheet data in bulk.
        </p>

        {/* Navigation Link */}
        <div className="w-full max-w-xl border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
          <Link
            href="/whatsapp"
            className="block p-6 text-left relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    WhatsApp Link Creator
                  </h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                  Configure customized links, view chat mockups, and generate
                  bulk lists with CSV exports.
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center font-bold shrink-0 border border-gray-200">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </main>

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
