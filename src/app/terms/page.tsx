import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Scallar IT Solution',
  description:
    'Read the Terms of Service for Scallar IT Solution. Understand the conditions governing the use of our digital marketing and AI automation services.',
  alternates: { canonical: 'https://scallar.in/terms' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const lastUpdated = 'January 1, 2025';

  return (
    <div className="w-full min-h-screen bg-brand-bg pt-24 md:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">
          Terms of Service
        </h1>
        <p className="text-gray-500 mb-12">Last updated: {lastUpdated}</p>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using the Scallar IT Solution website and services, you accept and
              agree to be bound by these Terms of Service. If you do not agree to these terms,
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">2. Services</h2>
            <p className="text-gray-600 leading-relaxed">
              Scallar IT Solution provides digital marketing, web development, AI automation, and
              related services as described on our website. Specific service terms and deliverables
              will be outlined in individual service agreements or proposals provided to each client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">3. Payment Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Payment terms are agreed upon in individual service contracts. Generally:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Monthly retainer services are billed in advance</li>
              <li>Project-based work follows the payment schedule in the project proposal</li>
              <li>Late payments may incur a 2% monthly interest charge</li>
              <li>All prices are in Indian Rupees (INR) unless stated otherwise</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              Upon full payment, clients receive ownership of the deliverables specified in their
              service agreement. Scallar IT Solution retains the right to display work in our
              portfolio unless explicitly agreed otherwise. All pre-existing tools, frameworks,
              and proprietary processes remain the property of Scallar IT Solution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Scallar IT Solution shall not be liable for any indirect, incidental, or consequential
              damages arising from the use of our services. Our total liability for any claim shall
              not exceed the fees paid for the specific service giving rise to the claim in the
              preceding 3 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">6. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              Either party may terminate a service agreement with 30 days written notice. Clients
              are responsible for payment of services rendered up to the termination date. Scallar
              IT Solution reserves the right to terminate services immediately for breach of these
              terms or non-payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">7. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of the courts in Delhi, India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-4">8. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:Info@scallar.in" className="text-brand-lime font-bold hover:underline">
                Info@scallar.in
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
