import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Scallar IT Solution',
  description:
    'Read the Privacy Policy of Scallar IT Solution. Learn how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://scallar.in/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const lastUpdated = 'January 1, 2025';

  return (
    <div className="w-full min-h-screen bg-brand-bg pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-12">Last updated: {lastUpdated}</p>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you use our website or contact us, we may collect the following information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Name, email address, and phone number (via contact forms)</li>
              <li>Business name and details related to your inquiry</li>
              <li>Usage data and analytics (pages visited, time on site)</li>
              <li>IP address and browser type for security purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Send service-related communications and updates</li>
              <li>Improve our website and service offerings</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">3. Data Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or transfer your personal information to third parties without
              your consent, except where required by law or to trusted service providers who assist
              in our business operations (e.g., email delivery services). All such partners are
              obligated to keep your information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">4. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website uses cookies to enhance your browsing experience and analyse site traffic.
              You can choose to disable cookies through your browser settings, though this may
              affect some functionality of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">5. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organisational security measures to protect
              your personal information against unauthorised access, alteration, disclosure, or
              destruction. However, no internet transmission is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">6. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">7. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:Info@scallar.in" className="text-brand-lime font-bold hover:underline">
                Info@scallar.in
              </a>{' '}
              or call{' '}
              <a href="tel:+918510806031" className="text-brand-lime font-bold hover:underline">
                +91 8510806031
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
