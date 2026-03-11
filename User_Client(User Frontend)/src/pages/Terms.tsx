import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <SEOHead 
        title="Terms & Conditions - SaviWealth | Usage Guidelines"
        description="Read the terms and conditions governing your use of SaviWealth's website and services. Understand your rights and obligations."
        keywords="terms and conditions, terms of service, user agreement, legal terms, usage policy"
      />
      
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xl text-primary-100">
              Please read our terms carefully
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
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                By accessing and using the SaviWealth website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Description of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SaviWealth provides a digital platform for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Financial planning and investment advisory services</li>
                <li>Behavioral risk assessment for investors</li>
                <li>Access to various investment products including mutual funds, PMS, insurance, and fixed income instruments</li>
                <li>Portfolio management and tracking tools</li>
                <li>Financial calculators and educational resources</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                User Eligibility
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Provide accurate and complete registration information</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                User Account Responsibilities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Immediately notifying us of any unauthorized use</li>
                <li>Providing accurate and current information</li>
                <li>Ensuring compliance with these terms and conditions</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Investment Advisory Disclaimer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SaviWealth is a technology platform that connects users with registered financial advisors. We do not provide direct investment advice. All investment decisions should be made in consultation with qualified financial advisors who can provide personalized advice based on your financial situation, risk tolerance, and investment objectives.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Investment Risks
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All investments involve risk, including the possible loss of principal. Before investing, you should understand:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Past performance does not guarantee future results</li>
                <li>Market conditions can cause investment values to fluctuate</li>
                <li>Some investments may have limited liquidity</li>
                <li>Foreign investments carry currency exchange risks</li>
                <li>Tax implications vary based on individual circumstances</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our platform may include links to third-party websites, products, or services. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>The accuracy or reliability of third-party information</li>
                <li>The performance or quality of third-party products</li>
                <li>Any transactions between you and third-party providers</li>
                <li>Content or practices of external websites</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All content, designs, logos, and materials on this website are protected by copyright, trademark, and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Copy, modify, or distribute our content without permission</li>
                <li>Use our trademarks without prior written consent</li>
                <li>Reproduce, scrape, or data mine our website</li>
                <li>Create derivative works based on our materials</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Prohibited Activities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree not to engage in any of the following activities:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Violating any applicable laws or regulations</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Interfering with the proper operation of the website</li>
                <li>Transmitting viruses or malicious code</li>
                <li>Impersonating any person or entity</li>
                <li>Engaging in fraudulent or illegal activities</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SaviWealth shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Investment losses or poor investment decisions</li>
                <li>Actions or advice of third-party advisors</li>
                <li>Technical issues beyond our reasonable control</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Indemnification
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You agree to indemnify, defend, and hold harmless SaviWealth, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Modification of Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We may also update these terms periodically. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may terminate or suspend your account immediately, without prior notice, for any reason including breach of these terms. Upon termination, your right to use our services will immediately cease.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Governing Law
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Severability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If any provision of these terms is found to be unenforceable, the remaining provisions shall continue to be valid and enforceable.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Entire Agreement
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These terms, together with our Privacy Policy and any other legal notices published on this website, constitute the entire agreement between you and SaviWealth concerning your use of this website.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For questions about these Terms & Conditions, please contact us:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                <li>Email: legal@saviwealth.in</li>
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

export default Terms;

