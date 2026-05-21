import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { syncImagesFromSupabase, syncProductsFromSupabase, syncCareersFromSupabase, syncTeamFromSupabase } from './data/store';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ExportNavbar from './components/ExportNavbar';
import ExportFooter from './components/ExportFooter';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import CareerDetail from './pages/CareerDetail';
import Admin from './pages/Admin';
import ExportHome from './pages/ExportHome';
import ExportAbout from './pages/ExportAbout';
import ExportServices from './pages/ExportServices';
import ExportProducts from './pages/ExportProducts';
import ExportContact from './pages/ExportContact';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const isExport = location.pathname.startsWith('/export');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && !isExport && <Navbar />}
      {isExport && <ExportNavbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/products/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
          <Route path="/careers/:id" element={<PageTransition><CareerDetail /></PageTransition>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/export" element={<PageTransition><ExportHome /></PageTransition>} />
          <Route path="/export/about" element={<PageTransition><ExportAbout /></PageTransition>} />
          <Route path="/export/services" element={<PageTransition><ExportServices /></PageTransition>} />
          <Route path="/export/products" element={<PageTransition><ExportProducts /></PageTransition>} />
          <Route path="/export/contact" element={<PageTransition><ExportContact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && !isExport && <Footer />}
      {isExport && <ExportFooter />}
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    syncImagesFromSupabase();
    syncProductsFromSupabase();
    syncCareersFromSupabase();
    syncTeamFromSupabase();
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      <AppRoutes />
    </BrowserRouter>
  );
}
