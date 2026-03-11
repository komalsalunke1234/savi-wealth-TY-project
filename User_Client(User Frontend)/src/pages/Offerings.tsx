import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

const Offerings: React.FC = () => {
  const offerings = [
    {
      title: 'Mutual Funds',
      description: 'Explore a wide range of mutual fund schemes tailored to your risk appetite and investment goals.',
      icon: <ChartBarIcon className="h-8 w-8" />,
      path: '/mutual-funds',
      color: 'bg-blue-500'
    },
    {
      title: 'Portfolio Management Services',
      description: 'Professionally managed portfolios designed to maximize returns while managing risks effectively.',
      icon: <BriefcaseIcon className="h-8 w-8" />,
      path: '/pms',
      color: 'bg-purple-500'
    },
    {
      title: 'Insurance Planning',
      description: 'Comprehensive life and health insurance solutions to protect your family\'s future.',
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      path: '/insurance',
      color: 'bg-green-500'
    },
    {
      title: 'Fixed Income',
      description: 'Stable and secure investment options including bonds, FDs, and government securities.',
      icon: <CurrencyRupeeIcon className="h-8 w-8" />,
      path: '/fixed-income',
      color: 'bg-yellow-500'
    },
    {
      title: 'Capital Markets',
      description: 'Direct equity investments and trading opportunities in Indian stock markets.',
      icon: <GlobeAltIcon className="h-8 w-8" />,
      path: '/capital-market',
      color: 'bg-red-500'
    },
    {
      title: 'Real Estate',
      description: 'Investment opportunities in commercial and residential real estate properties.',
      icon: <BuildingOfficeIcon className="h-8 w-8" />,
      path: '/real-estate',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Our Offerings
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Discover a comprehensive suite of wealth management solutions tailored to meet your unique financial goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <motion.div
                key={offering.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={offering.path}
                  className="block h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${offering.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {offering.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                    {offering.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {offering.description}
                  </p>
                  <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium">
                    Learn more →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Not Sure What Fits You Best?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our expert financial advisors are here to help you choose the right investment products based on your goals and risk tolerance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/schedule-consultation"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-gray-700 border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-medium rounded-lg hover:bg-primary-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Offerings;

