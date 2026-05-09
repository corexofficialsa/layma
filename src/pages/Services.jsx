import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 100, background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1600&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 20 }}>What We Do</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1, marginBottom: 28 }}>
              Our Services
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(241,242,196,0.7)', maxWidth: 560, margin: '0 auto' }}>
              Two specialised operations — one global trading house in Qatar, one dedicated export arm in Kerala — working in harmony to deliver premium quality at every level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service cards */}
      <section style={{ padding: '100px 0', background: '#F1F2C4' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="two-col">
            {[
              {
                to: '/services/global',
                label: 'Parent Company',
                name: 'Layma Global\nTrading & Services',
                location: 'Doha, Qatar',
                flag: '🇶🇦',
                desc: 'Our Qatar-based parent company manages international sourcing and distribution — importing premium spices, nuts, dry fruits, honey, and tea from India and Saudi Arabia, and supplying supermarkets, wholesalers, retailers, and B2B businesses across Qatar and the GCC.',
                services: ['International Product Sourcing', 'Supermarket & Retail Supply', 'Wholesale Distribution', 'B2B Supply Solutions', 'Private Label Packaging', 'Import & Logistics'],
                img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format',
                accent: '#497336',
                bg: '#497336',
              },
              {
                to: '/services/export',
                label: 'Subsidiary',
                name: 'Layma Export\nRamanattukara, Kerala',
                location: 'Ramanattukara, Kerala, India',
                flag: '🇮🇳',
                desc: 'Our Kerala-based subsidiary focuses on sourcing, processing, and exporting premium Kerala spices, honey, nuts, dry fruits, and tea powder — for international markets and the Indian local market. Full APEDA and FSSAI compliance.',
                services: ['Kerala Spice Export', 'Honey & Tea Export', 'Nuts & Dry Fruits', 'APEDA-Certified Export', 'Retail Consumer Packs', 'Direct Farm Sourcing'],
                img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format',
                accent: '#BABF26',
                bg: '#1a1a1a',
              },
            ].map((s, i) => (
              <ScrollReveal key={s.to} delay={i * 0.2}>
                <Link to={s.to} style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    style={{
                      background: s.bg,
                      borderRadius: 28,
                      overflow: 'hidden',
                      transition: 'box-shadow 0.4s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ aspectRatio: '16/7', backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${s.bg} 100%)` }} />
                      <div style={{ position: 'absolute', top: 24, left: 24, background: s.accent, borderRadius: 40, padding: '6px 16px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: s.bg === '#497336' ? '#1a1a1a' : '#1a1a1a' }}>
                        {s.label}
                      </div>
                    </div>
                    <div style={{ padding: '36px 36px 44px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <span style={{ fontSize: 24 }}>{s.flag}</span>
                        <span style={{ fontSize: 12, color: s.accent, letterSpacing: 1 }}>{s.location}</span>
                      </div>
                      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 600, color: '#F1F2C4', lineHeight: 1.2, marginBottom: 20, whiteSpace: 'pre-line' }}>{s.name}</h2>
                      <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(241,242,196,0.65)', marginBottom: 28 }}>{s.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                        {s.services.map(sv => (
                          <span key={sv} style={{ background: 'rgba(241,242,196,0.08)', border: `1px solid rgba(241,242,196,0.15)`, borderRadius: 40, padding: '5px 14px', fontSize: 12, color: 'rgba(241,242,196,0.8)', letterSpacing: 0.5 }}>{sv}</span>
                        ))}
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: s.accent, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                        Explore Services →
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
