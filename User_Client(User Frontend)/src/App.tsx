import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail"; 
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import ProductBasket from "./pages/ProductBasket";
import ClientServices from "./pages/ClientServices";
import MFReturnsCalculatorPage from "./pages/MFReturnsCalculatorPage";
import SIPCalculatorPage from "./pages/SIPCalculatorPage"; // ✅ Correct import
import MFHistoricNAVPage from "./pages/mf-historic-nav";
import MFDividendHistory from "./pages/MFDividendHistory";
import MFSchemeSnapshot from "./pages/MFSchemeSnapshot";
import FinancialTools from "./pages/FinancialTools";
 import RiskAnalyzer from "./pages/FinancialRiskPage";

import Tools from "./pages/Tools";
import Interviews from "./pages/Interviews";
import FundManagerDetail from "./pages/FundManagerDetail";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
//import FloatingChatbot from "./components/ui/FloatingChatbot";
import NewsletterPopup from "./components/ui/NewsletterPopup";
import CookieConsent from "./components/ui/CookieConsent";
import MutualFunds from "./pages/MutualFunds";
import PMS from "./pages/PMS";
import Insurance from "./pages/Insurance";
import FixedIncome from "./pages/FixedIncome";
import CapitalMarket from "./pages/CapitalMarket";
import RealEstate from "./pages/RealEstate";
import Resources from "./pages/Resources";
import ResourcesArticles from "./pages/ResourcesArticles";
import ResourcesInterviews from "./pages/ResourcesInterviews";
import ResourcesAudioVideoClips from "./pages/ResourcesAudioVideoClips";
import ResourcesImageGallery from "./pages/ResourcesImageGallery";
import ResourcesEvents from "./pages/ResourcesEvents";
import ResourcesImportantLinks from "./pages/ResourcesImportantLinks";
import InterviewDetail from "./pages/InterviewDetail";
import ScheduleConsultation from "./pages/ScheduleConsultation";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Disclaimer from "./pages/Disclaimer";
import Sitemap from "./pages/Sitemap";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { AdminMainLayout } from "./layouts/AdminMainLayout";
import { Dashboard as AdminDashboard } from "./pages/admin/Dashboard";
import { Users as AdminUsers } from "./pages/admin/Users";
import { Investments as AdminInvestments } from "./pages/admin/Investments";
import { Portfolios as AdminPortfolios } from "./pages/admin/Portfolios";
import { Transactions as AdminTransactions } from "./pages/admin/Transactions";
import { Advisors as AdminAdvisors } from "./pages/admin/Advisors";
import { Reports as AdminReports } from "./pages/admin/Reports";
import { Notifications as AdminNotifications } from "./pages/admin/Notifications";
import { Settings as AdminSettings } from "./pages/admin/Settings";

// ScrollToTop button
const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Admin Routes - Protected with admin role */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminMainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="investments" element={<AdminInvestments />} />
              <Route path="portfolios" element={<AdminPortfolios />} />
              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="advisors" element={<AdminAdvisors />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Public Routes with Navbar and Footer */}
            <Route path="*" element={
              <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
                <Navbar />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/product-basket" element={<ProductBasket />} />
                    <Route path="/client-services" element={<ClientServices />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:slug" element={<ServiceDetail />} />
                    <Route path="/tools" element={<Tools />} />
                    <Route path="/tools/mf-returns" element={<MFReturnsCalculatorPage />} />
                    <Route path="/tools/sip-calculator" element={<SIPCalculatorPage />} />
                    <Route path="/interviews" element={<Interviews />} />
                    <Route path="/fund-managers/:slug" element={<FundManagerDetail />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/articles/:slug" element={<ArticleDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route path="/mutual-funds" element={<MutualFunds />} />
                    <Route path="/pms" element={<PMS />} />
                    <Route path="/insurance" element={<Insurance />} />
                    <Route path="/fixed-income" element={<FixedIncome />} />
                    <Route path="/capital-market" element={<CapitalMarket />} />
                    <Route path="/real-estate" element={<RealEstate />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/resources/articles" element={<ResourcesArticles />} />
                    <Route path="/resources/articles/:slug" element={<ArticleDetail />} />
                    <Route path="/resources/interviews" element={<ResourcesInterviews />} />
                    <Route path="/resources/interviews/:slug" element={<InterviewDetail />} />
                    <Route path="/resources/audio-video-clips" element={<ResourcesAudioVideoClips />} />
                    <Route path="/resources/image-gallery" element={<ResourcesImageGallery />} />
                    <Route path="/resources/events" element={<ResourcesEvents />} />
                    <Route path="/tools/mf-historic-nav" element={<MFHistoricNAVPage />} />
                    <Route path="/tools/mf-dividend-history" element={<MFDividendHistory />} />
                    <Route path="/tools/mf-scheme-snapshot" element={<MFSchemeSnapshot />} />
                    <Route path="/tools/financial-tools" element={<FinancialTools />} />
                    <Route path="/schedule-consultation" element={<ScheduleConsultation />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/financial-risk" element={<div className="pt-20">   
  <RiskAnalyzer />
</div>} /> 
                    <Route path="/resources/important-links" element={<ResourcesImportantLinks />} />
                  </Routes>
                </main>
                <Footer />
                <ScrollToTop />
                {/*<FloatingChatbot />*/}
                <NewsletterPopup />
                <CookieConsent />
              </div>
            } />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
// ...existing code...

// ...existing code...