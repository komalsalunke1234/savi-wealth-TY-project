import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <SEOHead 
        title="Privacy Policy - SaviWealth | Your Data is Secure"
        description="Learn how SaviWealth protects your privacy and handles your personal information. Read our comprehensive privacy policy."
        keywords="privacy policy, data protection, personal information, security, GDPR, compliance"
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
              Privacy Policy
            </h1>
            <p className="text-xl text-primary-100">
              Your privacy is our priority
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
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At SaviWealth, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and services. By accessing or using SaviWealth, you agree to the practices described in this policy.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We collect various types of information to provide and improve our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide during registration</li>
                <li><strong>Financial Information:</strong> Investment preferences, financial goals, income details, and portfolio information</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage patterns</li>
                <li><strong>Communication Data:</strong> Records of your interactions with our customer support</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your information is used for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Providing personalized financial advisory services</li>
                <li>Processing your account registration and transactions</li>
                <li>Communicating important updates and notifications</li>
                <li>Conducting risk assessments and behavioral analysis</li>
                <li>Improving our website and user experience</li>
                <li>Complying with legal and regulatory requirements</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Protection & Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>256-bit SSL encryption for all data transmission</li>
                <li>Secure servers with regular security audits</li>
                <li>Multi-factor authentication for account access</li>
                <li>Strict access controls for employee data handling</li>
                <li>Regular data backups and disaster recovery plans</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Sharing Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li><strong>Financial Service Providers:</strong> Registered investment advisors and asset management companies</li>
                <li><strong>Regulatory Bodies:</strong> As required by SEBI, AMFI, or other applicable laws</li>
                <li><strong>Technology Partners:</strong> For hosting, analytics, and service improvement</li>
                <li><strong>Legal Authorities:</strong> When required by law or for fraud prevention</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We do not sell your personal information to third parties for marketing purposes.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Cookies & Tracking Technologies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may affect certain features of our website.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Retention
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We retain your personal information for as long as your account is active or as needed to provide services. After account closure, we may retain certain data for legal, regulatory, and business purposes as required.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Third-Party Links
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Children's Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware of any such data collection, we will take appropriate steps to remove it.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the new policy.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Grievance Officer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For any privacy-related concerns or complaints, you can contact our Grievance Officer:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
                <li>Email: privacy@saviwealth.in</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Mumbai, Maharashtra, India</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

export default Privacy;

