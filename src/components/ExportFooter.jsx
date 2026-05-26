import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Instagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const WhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.85L.057 23.928a.5.5 0 0 0 .606.61l6.284-1.644A11.935 11.935 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.73-.5-5.295-1.377l-.38-.22-3.931 1.029 1.048-3.817-.247-.39A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);
const Mail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function ExportFooter() {
  return (
    <footer style={{ background: '#1e3a16', color: '#F0F2F0' }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src="/logo-export.png" alt="Layma Export" style={{ height: 48, width: 'auto', marginBottom: 8 }} />
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(240,242,240,0.65)', maxWidth: 240, marginBottom: 24 }}>
              Kerala's premier spice and food export company, sourcing and shipping the finest natural products to Qatar, GCC, and global markets.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { icon: <Instagram />, href: 'https://www.instagram.com/laymaexport/', label: 'Instagram' },
                { icon: <WhatsApp />, href: 'https://wa.me/916282322958', label: 'WhatsApp' },
                { icon: <Mail />, href: 'mailto:Laymaexport@gmail.com', label: 'Email' },
              ].map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, color: '#88A67B' }}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    border: '1px solid rgba(240,242,240,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(240,242,240,0.65)', textDecoration: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  aria-label={s.label}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#88A67B', marginBottom: 20, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Navigate</h5>
            {[
              { label: 'Home', to: '/export' },
              { label: 'About Us', to: '/export/about' },
              { label: 'Services', to: '/export/services' },
              { label: 'Products', to: '/export/products' },
              { label: 'Contact', to: '/export/contact' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', color: 'rgba(240,242,240,0.65)',
                textDecoration: 'none', fontSize: 14, marginBottom: 10, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#88A67B'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,242,240,0.65)'}
              >{l.label}</Link>
            ))}
          </div>

          {/* Products */}
          <div>
            <h5 style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#88A67B', marginBottom: 20, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Products</h5>
            {['Premium Spices', 'Cashews & Nuts', 'Dry Fruits & Dates', 'Raw Honey', 'Kerala Tea Powder'].map(p => (
              <Link key={p} to="/export/products" style={{
                display: 'block', color: 'rgba(240,242,240,0.65)',
                textDecoration: 'none', fontSize: 14, marginBottom: 10, transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#88A67B'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,242,240,0.65)'}
              >{p}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#88A67B', marginBottom: 20, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Contact</h5>
            <div style={{ fontSize: 14, color: 'rgba(240,242,240,0.65)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 8 }}>🇮🇳 Ramanattukara, Kerala, India</p>
              <p style={{ marginBottom: 8 }}>📧 Laymaexport@gmail.com</p>
              <p style={{ marginBottom: 16 }}>📱 +91 6282 322958</p>
              <div style={{ padding: '10px 16px', background: 'rgba(92,140,70,0.15)', borderRadius: 8, border: '1px solid rgba(92,140,70,0.3)', fontSize: 12 }}>
                <span style={{ color: '#88A67B' }}>✦ </span>Kerala, India · Exporting Globally
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(240,242,240,0.1)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 13, color: 'rgba(240,242,240,0.4)' }}>
            © {new Date().getFullYear()} Layma Export. A subsidiary of Layma Global Trading & Services.
          </p>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link to="/" style={{ fontSize: 13, color: 'rgba(136,166,123,0.7)', textDecoration: 'none', letterSpacing: 1, fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#88A67B'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(136,166,123,0.7)'}
            >← Layma Global ↗</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
