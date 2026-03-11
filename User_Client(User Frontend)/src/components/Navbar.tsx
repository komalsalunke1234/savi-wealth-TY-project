import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
  ChartBarIcon,
  CalculatorIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PhotoIcon,
  CalendarDaysIcon,
  LinkIcon,
  UserIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    {
      name: "Offerings",
      path: "/offerings",
      dropdown: [
        {
          name: "Product Basket",
          path: "/product-basket",
          icon: <ChartBarIcon className="h-4 w-4" />,
        },
        {
          name: "Client Services",
          path: "/client-services",
          icon: <UserIcon className="h-4 w-4" />,
        },
        {
          name: "Mutual Funds",
          path: "/mutual-funds",
          icon: <ChartBarIcon className="h-4 w-4" />,
        },
        {
          name: "PMS",
          path: "/pms",
          icon: <ChartBarIcon className="h-4 w-4" />,
        },
        {
          name: "Insurance",
          path: "/insurance",
          icon: <ShieldCheckIcon className="h-4 w-4" />,
        },
        {
          name: "Fixed Income",
          path: "/fixed-income",
          icon: <CurrencyRupeeIcon className="h-4 w-4" />,
        },
        {
          name: "Capital Market",
          path: "/capital-market",
          icon: <ChartBarIcon className="h-4 w-4" />,
        },
        {
          name: "Real Estate",
          path: "/real-estate",
          icon: <BuildingOfficeIcon className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Resources",
      path: "/resources",
      dropdown: [
        {
          name: "Articles",
          path: "/resources/articles",
          icon: <DocumentTextIcon className="h-4 w-4" />,
        },
        {
          name: "Interviews",
          path: "/resources/interviews",
          icon: <VideoCameraIcon className="h-4 w-4" />,
        },
        {
          name: "Audio Video Clips",
          path: "/resources/audio-video-clips",
          icon: <VideoCameraIcon className="h-4 w-4" />,
        },
        {
          name: "Image Gallery",
          path: "/resources/image-gallery",
          icon: <PhotoIcon className="h-4 w-4" />,
        },
        {
          name: "Events",
          path: "/resources/events",
          icon: <CalendarDaysIcon className="h-4 w-4" />,
        },
        {
          name: "Important Links",
          path: "/resources/important-links",
          icon: <LinkIcon className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "Tools",
      path: "/tools",
      dropdown: [
        {
          name: "MF Returns Calculator",
          path: "/tools/mf-returns",
          icon: <CalculatorIcon className="h-4 w-4" />,
        },
       {
  name: "MF SIP Calculator",
  path: "/tools/sip-calculator",  // ✅ corrected
  icon: <CalculatorIcon className="h-4 w-4" />,
},
    {
  name: "MF Historic NAV",
  path: "/tools/mf-historic-nav",
  icon: <ChartBarIcon className="h-4 w-4" />,
},

        {
          name: "MF Dividend History",
          path: "/tools/mf-dividend-history",
          icon: <DocumentTextIcon className="h-4 w-4" />,
        },
        {
          name: "MF Scheme Snapshot",
          path: "/tools/mf-scheme-snapshot",
          icon: <PhotoIcon className="h-4 w-4" />,
        },
        {
          name: "Financial Tools",
          path: "/tools/financial-tools",
          icon: <CalculatorIcon className="h-4 w-4" />,
        },
      ],
    },
    { name: "Login", path: "/login" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
  {isDark ? (
    <img
      src="/images/Navbar/darklogo.png"
      alt="SaviWealth Logo Dark"
      className="h-18 w-auto object-contain" // Increased height
      style={{ maxWidth: "200px" }} // Optional: set a max width
    />
  ) : (
    <img
      src="/images/Navbar/lightlogo.png"
      alt="SaviWealth Logo Light"
      className="h-14 w-auto object-contain" // Increased height
      style={{ maxWidth: "180px" }} // Optional: set a max width
    />
  )}
  <span className="font-serif text-xl font-bold text-gray-900 dark:text-white">
    {/* Optional: Brand Name */}
  </span>
</Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                        location.pathname.startsWith(item.path)
                          ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                            >
                              {dropdownItem.icon}
                              <span className="ml-3">{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      location.pathname === item.path
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ml-4"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => handleDropdownToggle(item.name)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                            location.pathname.startsWith(item.path)
                              ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                              : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          {item.name}
                          <ChevronDownIcon
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mt-1 space-y-1"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  to={dropdownItem.path}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                                >
                                  {dropdownItem.icon}
                                  <span className="ml-3">
                                    {dropdownItem.name}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                          location.pathname === item.path
                            ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                            : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
