import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ─── Page Metadata (noindex for thin content) ────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "WA.link privacy policy — learn how we protect your data. All WhatsApp link generation happens in your browser. We never store phone numbers or messages.",
  canonical: `${SITE_URL}/privacy-policy`,
  noindex: true,
});

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June 1, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              At allLink.tools, we respect your privacy and are committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, and safeguard your data when you use our
              WhatsApp Link Generator service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
              1.1 Information You Provide
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When using our WhatsApp Link Generator, you voluntarily provide:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Phone numbers (yours and recipients&apos;) for generating
                WhatsApp links
              </li>
              <li>Custom message content for pre-filled WhatsApp messages</li>
              <li>
                Bulk data when importing spreadsheet information (phone numbers
                and messages)
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-2">
              1.2 Automatically Collected Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on the site</li>
              <li>Referring website or search terms</li>
              <li>Usage patterns and interaction data</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-2">
              1.3 Cookies and Tracking Technologies
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to enhance your
              experience, analyze site usage, and serve advertisements. See our
              Cookies section below for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the collected information for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Generating WhatsApp click-to-chat links and QR codes</li>
              <li>Processing bulk link creation and CSV exports</li>
              <li>Improving and optimizing our service</li>
              <li>Analyzing usage patterns and user behavior</li>
              <li>Displaying relevant advertisements through Google AdSense</li>
              <li>Ensuring website security and preventing abuse</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Data Storage and Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Client-Side Processing:</strong> All WhatsApp link
              generation, message customization, and bulk data processing occurs
              directly in your browser. We do not store phone numbers, messages,
              or generated links on our servers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Security Measures:</strong> We implement industry-standard
              security measures including HTTPS/TLS encryption to protect data
              transmission. However, no method of internet transmission is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Google AdSense and Advertising
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use Google AdSense to display advertisements on our website.
              Google AdSense may use cookies and web beacons to serve ads based
              on your browsing behavior.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
              4.1 Third-Party Cookies
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Google, as a third-party vendor, uses cookies to serve ads.
              Google&apos;s use of the DART cookie enables it to serve ads to
              users based on their visit to our site and other sites on the
              Internet.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
              4.2 Opting Out
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may opt out of personalized advertising by visiting:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <a
                  href="https://www.google.com/settings/ads"
                  className="text-emerald-600 hover:text-emerald-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Settings
                </a>
              </li>
              <li>
                <a
                  href="https://www.aboutads.info/"
                  className="text-emerald-600 hover:text-emerald-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.aboutads.info
                </a>
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-2">
              4.3 Google&apos;s Privacy Policy
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Google&apos;s use of advertising cookies is governed by{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                className="text-emerald-600 hover:text-emerald-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy Policy
              </a>
              . We recommend reviewing this policy for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our service integrates with WhatsApp&apos;s public API
              (click-to-chat functionality). When you generate a link and click
              it, you are redirected to WhatsApp&apos;s platform, which is
              governed by WhatsApp&apos;s own Privacy Policy and Terms of
              Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are not responsible for the privacy practices or content of
              WhatsApp or any other third-party websites linked from our
              service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us at the email provided
              below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not intended for children under 16 years of age. We
              do not knowingly collect personal information from children. If
              you believe we have inadvertently collected such information,
              please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              with an updated &quot;Last updated&quot; date. Your continued use
              of our service after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p className="text-gray-700 mt-4">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:privacy@alllink.tools"
                className="text-emerald-600 hover:text-emerald-700"
              >
                privacy@alllink.tools
              </a>
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By using allLink.tools, you consent to the collection and use of
              information as described in this Privacy Policy.
            </p>
          </section>
        </div>
      </main>

      <Footer brandName="allLink" brandHighlight=".tools" />
    </div>
  );
}
