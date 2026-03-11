import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  LinkIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Portfolio Analytics', path: '/services/portfolio-analytics' },
      { name: 'Transaction Advisory', path: '/services/transaction-advisory' },
      { name: 'Tax Planning', path: '/services/tax-planning' },
      { name: 'Mutual Funds', path: '/mutual-funds' },
      { name: 'PMS', path: '/pms' },
      { name: 'Insurance', path: '/insurance' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Offerings', path: '/offerings' },
      { name: 'Fund Managers', path: '/interviews' },
      { name: 'Articles', path: '/articles' },
      { name: 'Contact Us', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Disclaimer', path: '/disclaimer' },
      { name: 'Sitemap', path: '/sitemap' },
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Logo */}
            <div className="flex items-center space-x-2">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SW</span>
              </div> */}
              <span className="font-serif text-xl font-bold">SaviWealth</span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Your trusted partner in wealth management, providing comprehensive financial advisory services 
              with personalized investment strategies since 2022.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">contact@saviwealth.in</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-colors duration-200"
              >
                <LinkIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-primary-600 transition-colors duration-200"
              >
                <GlobeAltIcon className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-800 text-xs rounded">NSE Certified</span>
                <span className="px-2 py-1 bg-gray-800 text-xs rounded">AMFI Registered</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} SaviWealth. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Designed and developed for your financial future
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;