import Link from "next/link";

export default function PrivacyPolicy() {
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
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-emerald max-w-none space-y-6 text-gray-600">
          <p>
            Your privacy is important to us. It is allLink.tools&apos; policy to respect your privacy regarding any information we may collect from you across our website.
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Do Not Collect</h2>
            <p>
              <strong>We do not store your personal information on our servers.</strong> This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Phone numbers you enter into our tools.</li>
              <li>Messages you compose for your WhatsApp links.</li>
              <li>Any bulk data you import or export.</li>
            </ul>
            <p>
              All processing of phone numbers and messages happens locally in your web browser. When you generate a link or import data, that data remains on your device and is not transmitted to our servers for storage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Log Data</h2>
            <p>
              Like most website operators, we may collect information that your browser sends whenever you visit our website (&quot;Log Data&quot;). This may include information such as your computer&apos;s IP address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, and other statistics. This data is used solely for analytics and to improve the performance of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies</h2>
            <p>
              We may use cookies to understand how you use our site and to improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p>
              We use third-party services like <strong>Flagcdn</strong> for country flags and <strong>QRServer</strong> for QR code generation. These services may receive information necessary to fulfill your request (like the data for a QR code). Please refer to their respective privacy policies for more information.
            </p>
            <p>
              Our tool links to WhatsApp. Use of WhatsApp is governed by WhatsApp&apos;s own Privacy Policy and Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Security</h2>
            <p>
              The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-200 bg-white text-center text-xs text-gray-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-emerald-600 font-semibold">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-emerald-600">Terms of Service</Link>
          </div>
          <p>© {new Date().getFullYear()} allLink.tools. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
