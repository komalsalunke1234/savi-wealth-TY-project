import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  CalculatorIcon,
  PhoneIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const Sitemap: React.FC = () => {
  const siteMapData = {
    main: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Login', path: '/login' },
      { name: 'Sign Up', path: '/signup' },
    ],
    offerings: [
      { name: 'Product Basket', path: '/product-basket' },
      { name: 'Client Services', path: '/client-services' },
      { name: 'Mutual Funds', path: '/mutual-funds' },
      { name: 'PMS', path: '/pms' },
      { name: 'Insurance', path: '/insurance' },
      { name: 'Fixed Income', path: '/fixed-income' },
      { name: 'Capital Market', path: '/capital-market' },
      { name: 'Real Estate', path: '/real-estate' },
    ],
    resources: [
      { name: 'Resources', path: '/resources' },
      { name: 'Articles', path: '/resources/articles' },
      { name: 'Interviews', path: '/resources/interviews' },
      { name: 'Audio Video Clips', path: '/resources/audio-video-clips' },
      { name: 'Image Gallery', path: '/resources/image-gallery' },
      { name: 'Events', path: '/resources/events' },
      { name: 'Important Links', path: '/resources/important-links' },
    ],
    tools: [
      { name: 'Tools', path: '/tools' },
      { name: 'MF Returns Calculator', path: '/tools/mf-returns' },
      { name: 'SIP Calculator', path: '/tools/sip-calculator' },
      { name: 'MF Historic NAV', path: '/tools/mf-historic-nav' },
      { name: 'MF Dividend History', path: '/tools/mf-dividend-history' },
      { name: 'MF Scheme Snapshot', path: '/tools/mf-scheme-snapshot' },
      { name: 'Financial Tools', path: '/tools/financial-tools' },
    ],
    services: [
      { name: 'Services', path: '/services' },
      { name: 'Schedule Consultation', path: '/schedule-consultation' },
      { name: 'Financial Risk Analyzer', path: '/financial-risk' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Disclaimer', path: '/disclaimer' },
    ],
  };

  const iconMap: { [key: string]: React.ReactNode } = {
    Home: <HomeIcon className="h-5 w-5" />,
    User: <UserIcon className="h-5 w-5" />,
    DocumentText: <DocumentTextIcon className="h-5 w-5" />,
    Calculator: <CalculatorIcon className="h-5 w-5" />,
    Phone: <PhoneIcon className="h-5 w-5" />,
    ShieldCheck: <ShieldCheckIcon className="h-5 w-5" />,
    GlobeAlt: <GlobeAltIcon className="h-5 w-5" />,
    BuildingOffice: <BuildingOfficeIcon className="h-5 w-5" />,
    CurrencyRupee: <CurrencyRupeeIcon className="h-5 w-5" />,
    Calendar: <CalendarIcon className="h-5 w-5" />,
  };

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
              Sitemap
            </h1>
            <p className="text-xl text-primary-100">
              Navigate through all pages of SaviWealth
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Main Pages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <HomeIcon className="h-6 w-6 mr-2 text-primary-600" />
                Main Pages
              </h2>
              <ul className="space-y-2">
                {siteMapData.main.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Offerings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <GlobeAltIcon className="h-6 w-6 mr-2 text-primary-600" />
                Offerings
              </h2>
              <ul className="space-y-2">
                {siteMapData.offerings.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <DocumentTextIcon className="h-6 w-6 mr-2 text-primary-600" />
                Resources
              </h2>
              <ul className="space-y-2">
                {siteMapData.resources.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <CalculatorIcon className="h-6 w-6 mr-2 text-primary-600" />
                Financial Tools
              </h2>
              <ul className="space-y-2">
                {siteMapData.tools.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <UserIcon className="h-6 w-6 mr-2 text-primary-600" />
                Services
              </h2>
              <ul className="space-y-2">
                {siteMapData.services.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <ShieldCheckIcon className="h-6 w-6 mr-2 text-primary-600" />
                Legal
              </h2>
              <ul className="space-y-2">
                {siteMapData.legal.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/"
              className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;

