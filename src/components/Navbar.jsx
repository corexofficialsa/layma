import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (to) => location.pathname === to || location.pathname.startsWith(to + '/');

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.4s ease',
          background: 'rgba(241,242,196,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(73,115,54,0.12)',
          padding: scrolled ? '10px 0' : '18px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.img
              whileHover={{ scale: 1.04 }}
              src="/logo.png"
              alt="Layma"
              style={{
                height: scrolled ? 36 : 44,
                width: 'auto',
                display: 'block',
                transition: 'height 0.4s ease',
              }}
            />
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-desktop">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: 'none',
                  padding: '8px 14px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: isActive(link.to) ? '#497336' : '#1a1a1a',
                  transition: 'color 0.3s',
                  position: 'relative',
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{ position: 'absolute', bottom: 4, left: 14, right: 14, height: 2, background: '#BABF26', borderRadius: 1 }}
                  />
                )}
              </Link>
            ))}
            <Link to="/export" style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>
              <motion.img
                src="/logo-export.png"
                alt="Layma Export"
                whileHover={{ scale: 1.05 }}
                style={{ height: scrolled ? 32 : 38, width: 'auto', display: 'block', transition: 'height 0.3s ease' }}
              />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(v => !v)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              padding: 8,
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={mobileOpen ? {
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y: i === 0 ? 10 : i === 2 ? -10 : 0,
                  opacity: i === 1 ? 0 : 1,
                } : { rotate: 0, y: 0, opacity: 1 }}
                style={{
                  display: 'block',
                  width: 26,
                  height: 2,
                  background: '#497336',
                  borderRadius: 1,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: '#497336',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '40px 32px',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                background: 'none',
                border: 'none',
                color: '#F1F2C4',
                fontSize: 32,
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >×</button>
            <div style={{ marginBottom: 40 }}>
              <img src="/logo.png" alt="Layma" style={{ height: 52, width: 'auto' }} />
            </div>
            {links.map((link, i) => (
              <div key={link.to}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => !link.children && setMobileOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 38,
                      fontWeight: 500,
                      color: isActive(link.to) ? '#BABF26' : '#F1F2C4',
                      textDecoration: 'none',
                      marginBottom: 8,
                      lineHeight: 1.2,
                    }}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div style={{ paddingLeft: 20, marginBottom: 8 }}>
                      {link.children.map(child => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'block',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 14,
                            color: '#BABF26',
                            textDecoration: 'none',
                            marginBottom: 6,
                            letterSpacing: 1,
                          }}
                        >
                          → {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            <div style={{ marginTop: 40, display: 'flex', gap: 20 }}>
              <a href="https://www.instagram.com/laymaglobal/" target="_blank" rel="noreferrer" style={{ color: '#BABF26', textDecoration: 'none', fontSize: 13, letterSpacing: 1 }}>Instagram</a>
              <a href="https://wa.me/97472074466" target="_blank" rel="noreferrer" style={{ color: '#BABF26', textDecoration: 'none', fontSize: 13, letterSpacing: 1 }}>WhatsApp</a>
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
