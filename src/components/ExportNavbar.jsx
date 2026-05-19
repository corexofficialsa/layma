import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home', to: '/export' },
  { label: 'About', to: '/export/about' },
  { label: 'Services', to: '/export/services' },
  { label: 'Products', to: '/export/products' },
  { label: 'Contact', to: '/export/contact' },
];

export default function ExportNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (to) => {
    if (to === '/export') return location.pathname === '/export';
    return location.pathname === to || location.pathname.startsWith(to + '/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'all 0.4s ease',
          background: 'rgba(240,242,240,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(92,140,70,0.15)',
          padding: scrolled ? '10px 0' : '18px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Export Logo */}
          <Link to="/export" style={{ textDecoration: 'none' }}>
            <motion.img
              whileHover={{ scale: 1.04 }}
              src="/logo-export.png"
              alt="Layma Export"
              style={{ height: scrolled ? 32 : 40, width: 'auto', display: 'block', transition: 'height 0.4s ease' }}
            />
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-desktop">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: 'none', padding: '8px 14px',
                  fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                  letterSpacing: 1.5, textTransform: 'uppercase',
                  color: isActive(link.to) ? '#5C8C46' : '#1a1a1a',
                  transition: 'color 0.3s', position: 'relative',
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div layoutId="export-nav-underline" style={{ position: 'absolute', bottom: 4, left: 14, right: 14, height: 2, background: '#5C8C46', borderRadius: 1 }} />
                )}
              </Link>
            ))}
            <Link to="/" style={{ textDecoration: 'none', marginLeft: 8, display: 'flex', alignItems: 'center' }}>
              <motion.img
                src="/logo.png"
                alt="Layma Global"
                whileHover={{ scale: 1.05 }}
                style={{ height: scrolled ? 32 : 38, width: 'auto', display: 'block', transition: 'height 0.3s ease' }}
              />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', flexDirection: 'column', gap: 5, padding: 8 }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span key={i}
                animate={mobileOpen ? { rotate: i === 0 ? 45 : i === 2 ? -45 : 0, y: i === 0 ? 10 : i === 2 ? -10 : 0, opacity: i === 1 ? 0 : 1 } : { rotate: 0, y: 0, opacity: 1 }}
                style={{ display: 'block', width: 26, height: 2, background: '#497336', borderRadius: 1, transformOrigin: 'center' }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#497336', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 32px' }}
          >
            <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: '#F0F2F0', fontSize: 32, cursor: 'pointer', lineHeight: 1 }}>×</button>
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: 'inline-block', background: 'white', borderRadius: 12, padding: '8px 14px' }}>
                <img src="/logo-export.png" alt="Layma Export" style={{ height: 40, width: 'auto', display: 'block' }} />
              </div>
            </div>
            {links.map((link, i) => (
              <motion.div key={link.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 + 0.1 }}>
                <Link to={link.to} onClick={() => setMobileOpen(false)} style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: 38, fontWeight: 500, color: isActive(link.to) ? '#88A67B' : '#F0F2F0', textDecoration: 'none', marginBottom: 8, lineHeight: 1.2 }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div style={{ marginTop: 40 }}>
              <Link to="/" onClick={() => setMobileOpen(false)} style={{ display: 'inline-block', textDecoration: 'none' }}>
                <div style={{ background: 'white', borderRadius: 10, padding: '6px 12px' }}>
                  <img src="/logo.png" alt="Layma Global" style={{ height: 34, width: 'auto', display: 'block' }} />
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
