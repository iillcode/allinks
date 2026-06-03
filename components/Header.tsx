import Link from "next/link";

interface HeaderProps {
  brandName?: string;
  brandHighlight?: string;
  brandHref?: string;
  navLabel?: string;
  navHref?: string;
  variant?: "rounded" | "square";
}

export function Header({
  brandName = "allLink",
  brandHighlight = ".tools",
  brandHref = "/",
  navLabel = "Back to Home",
  navHref = "/",
  variant = "square",
}: HeaderProps) {
  const logoRounded = variant === "rounded";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <Link
          href={brandHref}
          className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer"
        >
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 bg-emerald-600 ${logoRounded ? "rounded-xl" : "rounded"} flex items-center justify-center shadow-md shadow-emerald-200/40 group-hover:shadow-lg group-hover:shadow-emerald-200/50 group-hover:scale-105 transition-all duration-300`}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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
          <span className="font-bold text-lg sm:text-xl tracking-tight text-gray-900">
            {brandName}
            <span className="text-emerald-600">{brandHighlight}</span>
          </span>
        </Link>
        <Link
          href={navHref}
          className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 sm:gap-1.5"
        >
          {navHref === "/" || navHref === "/#tool" ? (
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          ) : null}
          <span className="hidden sm:inline">{navLabel}</span>
          <span className="sm:hidden">
            {navLabel.length > 15 ? navLabel.split(" ")[0] : navLabel}
          </span>
        </Link>
      </div>
    </header>
  );
}
