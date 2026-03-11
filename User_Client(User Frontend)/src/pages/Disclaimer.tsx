import React from 'react';
import { motion } from 'framer-motion';

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Disclaimer
            </h1>
            <p className="text-xl text-primary-100">
              Important information about our services
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12"
          >
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                General Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The information provided on this website is for general informational and educational purposes only. It should not be construed as professional financial, investment, tax, or legal advice. Before making any investment decisions, you should consult with a qualified financial advisor who can provide personalized advice based on your specific circumstances.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Investment Risks
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All investments involve risk, including the possible loss of principal. Past performance is not indicative of future results. The value of investments and the income from them can go down as well as up. Investors should be aware that market conditions can lead to fluctuations in the value of investments.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No Guarantee of Results
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SaviWealth does not guarantee any specific investment outcomes or returns. Any projections, forecasts, or estimates mentioned on this website are hypothetical in nature and do not reflect actual investment results. Actual results may differ materially from any projections or forecasts.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Third-Party Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This website may contain links to third-party websites or content. SaviWealth does not endorse or assume responsibility for any third-party information, products, or services. Users access such content at their own risk.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Accuracy of Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                While we strive to provide accurate and up-to-date information, SaviWealth makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on this website. Any reliance you place on such information is strictly at your own risk.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Regulatory Compliance
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SaviWealth is a technology platform that connects users with financial advisors and investment opportunities. We are not a registered investment advisor, broker-dealer, or financial institution. All investment products mentioned on this platform are offered by third-party providers who are registered with the appropriate regulatory authorities.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Privacy & Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By using this website, you acknowledge that your personal and financial information will be handled in accordance with our Privacy Policy. We take appropriate measures to protect your data, but we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In no event shall SaviWealth, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the website; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to Disclaimer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to modify this disclaimer at any time without prior notice. Any changes will be effective immediately upon posting on this page. Your continued use of this website following the posting of changes constitutes your acceptance of such changes.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this disclaimer, please contact us at:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                <li>Email: contact@saviwealth.in</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Mumbai, Maharashtra, India</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;

