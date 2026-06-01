import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, SITE_URL } from "../seo";

// ─── Page Metadata (noindex for thin content) ────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "WA.link terms of service — understand your rights and responsibilities when using our free WhatsApp link generator.",
  canonical: `${SITE_URL}/terms-of-service`,
  noindex: true,
});

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
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
            href="/"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June 1, 2026</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              Welcome to allLink.tools. By accessing or using our WhatsApp Link
              Generator service, you agree to be bound by these Terms of
              Service. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By using allLink.tools, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service and
              our Privacy Policy. If you do not agree with any part of these
              terms, you must not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Service Description
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              allLink.tools provides a free WhatsApp Link Generator service that
              allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Create WhatsApp click-to-chat links</li>
              <li>Customize pre-filled messages with text and emojis</li>
              <li>Generate QR codes for WhatsApp links</li>
              <li>Import bulk data from spreadsheets (CSV files)</li>
              <li>Export generated links and data to CSV format</li>
              <li>Preview WhatsApp chat mockups before generating links</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our service uses WhatsApp's public "click-to-chat" API
              functionality. We are not affiliated with, endorsed by, or
              connected to WhatsApp Inc. or Meta Platforms, Inc.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Free Service
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              allLink.tools is completely free to use. We do not offer premium
              plans, subscriptions, or paid features. Our service is supported
              by advertisements displayed through Google AdSense.
            </p>
            <p className="text-gray-700 leading-relaxed">
              While the service is free, we reserve the right to modify,
              suspend, or discontinue any aspect of the service at any time
              without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. User Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using our service, you agree to:
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">
              4.1 Lawful Use
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Use the service only for lawful purposes</li>
              <li>
                Comply with all applicable laws and regulations in your
                jurisdiction
              </li>
              <li>Respect the privacy and rights of others</li>
              <li>
                Not use the service for spam, harassment, or fraudulent
                activities
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">
              4.2 WhatsApp Compliance
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Comply with WhatsApp's Terms of Service and Commerce Policy
              </li>
              <li>
                Only generate links for phone numbers you have permission to use
              </li>
              <li>
                Not use the service to impersonate others or create misleading
                links
              </li>
              <li>
                Ensure your messages comply with WhatsApp's acceptable use
                guidelines
              </li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">
              4.3 Prohibited Activities
            </h3>
            <p className="text-gray-700 leading-relaxed mb-2">You must not:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Use the service to generate links for illegal or harmful
                purposes
              </li>
              <li>
                Attempt to reverse engineer, decompile, or hack the service
              </li>
              <li>
                Use automated systems to access the service in violation of our
                policies
              </li>
              <li>
                Collect phone numbers or data from the service for unauthorized
                purposes
              </li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>
                Transmit viruses, malware, or malicious code through the service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The allLink.tools service, including its design, logos, code, and
              content, is protected by intellectual property laws. You are
              granted a limited, non-exclusive, non-transferable license to use
              the service for personal or business purposes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You retain all rights to the phone numbers, messages, and data you
              input into the service. We do not claim ownership of your content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Advertisements
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our service displays advertisements through Google AdSense to
              support the free nature of the service.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                You acknowledge that ads may appear throughout the service
              </li>
              <li>
                Ad content is controlled by Google and its advertising partners
              </li>
              <li>
                We are not responsible for the content or accuracy of
                advertisements
              </li>
              <li>
                Clicking on ads is subject to Google's terms and advertiser
                policies
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Disclaimers
            </h2>

            <h3 className="text-xl font-medium text-gray-800 mb-2">
              7.1 Service Provided "As Is"
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The service is provided on an "as is" and "as available" basis
              without warranties of any kind, either express or implied,
              including but not limited to merchantability, fitness for a
              particular purpose, and non-infringement.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">
              7.2 No Guarantee
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>The service will be uninterrupted, secure, or error-free</li>
              <li>
                Generated links will always work as expected (depends on
                WhatsApp's systems)
              </li>
              <li>The quality of the service will meet your expectations</li>
              <li>Any defects will be corrected immediately</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-6">
              7.3 Third-Party Services
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We are not responsible for the availability, content, or policies
              of third-party services including WhatsApp, Google AdSense, or any
              external websites linked through our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, allLink.tools and its
              creators shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Any indirect, incidental, special, consequential, or punitive
                damages
              </li>
              <li>
                Loss of data, profits, business opportunities, or goodwill
              </li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Misuse of generated links by third parties</li>
              <li>
                Any content or conduct of WhatsApp or other third-party services
              </li>
              <li>
                Any damages resulting from your use or inability to use the
                service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Indemnification
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless allLink.tools
              and its creators from any claims, liabilities, damages, losses,
              and expenses (including reasonable legal fees) arising out of or
              related to your use of the service, violation of these terms, or
              infringement of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Data Processing
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Client-Side Processing:</strong> All link generation,
              message customization, QR code creation, and bulk data processing
              occurs in your browser. We do not store your phone numbers,
              messages, or generated links on our servers.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For information about how we handle automatically collected data
              (such as analytics and advertising cookies), please refer to our
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Modifications to Service and Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Modify or discontinue the service at any time without notice
              </li>
              <li>Update these Terms of Service as needed</li>
              <li>Change, suspend, or restrict access to the service</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We will update the "Last updated" date when changes are made. Your
              continued use of the service after changes constitutes acceptance
              of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Termination
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your access to the service
              immediately, without prior notice, for conduct that we believe
              violates these Terms, is harmful to other users, or is unlawful.
              Upon termination, your right to use the service will cease
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction in which allLink.tools operates,
              without regard to conflict of law principles. Any disputes arising
              from these Terms shall be subject to the exclusive jurisdiction of
              the courts in that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              14. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@alllink.tools"
                className="text-emerald-600 hover:text-emerald-700"
              >
                support@alllink.tools
              </a>
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By using allLink.tools, you acknowledge that you have read and
              agree to these Terms of Service.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-gray-200 bg-white text-center text-xs text-gray-500 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
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
