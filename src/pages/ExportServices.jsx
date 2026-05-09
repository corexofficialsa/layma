import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';

const offerings = [
  { icon: '🌾', title: 'Farm-Direct Sourcing', desc: 'We work directly with certified farmers and growers across Kerala, Karnataka, and Tamil Nadu, ensuring provenance and eliminating unnecessary markups.' },
  { icon: '🏭', title: 'Processing & Grading', desc: 'Our Ramanattukara facility handles cleaning, drying, sorting, and grading to international specifications for spices, nuts, and dry fruits.' },
  { icon: '📦', title: 'Bulk Export Packaging', desc: 'Available in 5kg, 10kg, 25kg, and custom FIBC sacks for wholesale and commercial buyers with proper FSSAI and export-compliant labelling.' },
  { icon: '🔖', title: 'Private Label & Retail', desc: 'Custom branded retail packs (50g–1kg) with your label — ideal for supermarkets, specialty stores, and Gulf retail brands.' },
  { icon: '🚢', title: 'Sea & Air Freight', desc: 'FCL/LCL sea freight and air cargo solutions with complete export documentation — Bill of Lading, COO, Health Certificate, Phytosanitary.' },
  { icon: '✅', title: 'Quality Certification', desc: 'All products supplied with relevant certifications: FSSAI, ISO, organic (where applicable), and GCC food import compliance.' },
  { icon: '📋', title: 'Export Documentation', desc: 'Full handling of shipping bill, packing list, invoice, certificates of origin, and customs clearance paperwork for hassle-free import at destination.' },
  { icon: '🤝', title: 'Long-Term Supply', desc: 'Consistent monthly or quarterly supply programmes for importers, distributors, and hospitality buyers who need reliable year-round stock.' },
];

const products = [
  { name: 'Green Cardamom', origin: 'Idukki, Kerala', category: 'Spices' },
  { name: 'Black Pepper', origin: 'Wayanad, Kerala', category: 'Spices' },
  { name: 'Turmeric Powder', origin: 'Erode, Tamil Nadu', category: 'Spices' },
  { name: 'Premium Cashews', origin: 'Kollam, Kerala', category: 'Nuts' },
  { name: 'Whole Almonds', origin: 'California (via India)', category: 'Nuts' },
  { name: 'Sun-Dried Raisins', origin: 'Nashik, Maharashtra', category: 'Dry Fruits' },
  { name: 'Dried Mango Slices', origin: 'Alphonso, Maharashtra', category: 'Dry Fruits' },
  { name: 'Jackfruit Chips', origin: 'Kerala', category: 'Dry Fruits' },
  { name: 'Wild Forest Honey', origin: 'Kerala Forests', category: 'Honey' },
  { name: 'Kerala Tea Powder', origin: 'Munnar, Kerala', category: 'Tea' },
  { name: 'Medjool Dates', origin: 'Saudi Arabia', category: 'Dates' },
  { name: 'Ajwa Dates', origin: 'Madinah, KSA', category: 'Dates' },
];

const packagingOptions = [
  { title: 'Bulk Export', subtitle: 'For Importers & Distributors', desc: 'FIBC jumbo bags (500kg–1MT), 25kg woven sacks, 10kg PP bags. Proper moisture-barrier inner lining for long-haul sea freight.', color: '#497336', textColor: '#F0F2F0' },
  { title: 'Wholesale', subtitle: 'For Retailers & Wholesalers', desc: '1kg–5kg retail-ready packs in kraft, zipper pouches, or tins — suitable for direct shelf display or repacking.', color: '#5C8C46', textColor: '#F0F2F0' },
  { title: 'Private Label', subtitle: 'Your Brand, Our Product', desc: 'Custom-branded 50g–1kg packs with your logo, nutrition info, and GCC barcode. MOQ applies. Lead time: 3–4 weeks.', color: '#88A67B', textColor: '#1a1a1a' },
];

export default function ExportServices() {
  const heroImg = useSiteImage('export_hero');
  return (
    <div style={{ background: '#F0F2F0' }}>
      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 100, background: '#497336', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600, marginBottom: 20 }}>Export Solutions</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 600, color: '#F0F2F0', lineHeight: 1, marginBottom: 28 }}>Our Services</h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(240,242,240,0.75)', maxWidth: 580, margin: '0 auto' }}>
              End-to-end food export solutions — from farm sourcing and processing to certified packaging and global shipping.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offerings */}
      <section style={{ padding: '100px 0', background: '#F0F2F0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 16 }}>What We Offer</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: '#1a1a1a' }}>
                Export <em style={{ color: '#5C8C46' }}>Services</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {offerings.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{ background: 'white', borderRadius: 20, padding: '32px 28px', border: '1px solid rgba(92,140,70,0.1)', transition: 'box-shadow 0.3s', height: '100%' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 50px rgba(92,140,70,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product Catalogue */}
      <section style={{ padding: '100px 0', background: '#497336' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600, marginBottom: 16 }}>What We Supply</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: '#F0F2F0' }}>
                Product <em style={{ color: '#88A67B' }}>Catalogue</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {products.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.05}>
                <div style={{ background: 'rgba(240,242,240,0.07)', border: '1px solid rgba(240,242,240,0.12)', borderRadius: 16, padding: '20px 18px' }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#88A67B', fontWeight: 600, marginBottom: 6 }}>{p.category}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600, color: '#F0F2F0', marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(240,242,240,0.5)' }}>📍 {p.origin}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Link to="/export/products" style={{
                display: 'inline-block', background: '#F0F2F0', color: '#497336',
                borderRadius: 40, padding: '14px 36px',
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                View Full Product Range →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Packaging */}
      <section style={{ padding: '100px 0', background: '#F0F2F0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 16 }}>Packaging Solutions</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: '#1a1a1a' }}>
                Flexible <em style={{ color: '#5C8C46' }}>Formats</em>
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {packagingOptions.map((opt, i) => (
              <ScrollReveal key={opt.title} delay={i * 0.1}>
                <div style={{ background: opt.color, borderRadius: 24, padding: '44px 36px', height: '100%' }}>
                  <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: opt.textColor === '#F0F2F0' ? 'rgba(240,242,240,0.6)' : 'rgba(26,26,26,0.5)', fontWeight: 600, marginBottom: 12 }}>{opt.subtitle}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 600, color: opt.textColor, lineHeight: 1.2, marginBottom: 20 }}>{opt.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: opt.textColor === '#F0F2F0' ? 'rgba(240,242,240,0.75)' : 'rgba(26,26,26,0.7)' }}>{opt.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: '#5C8C46' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 600, color: '#F0F2F0', marginBottom: 20 }}>
              Ready to Start Exporting?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(240,242,240,0.75)', maxWidth: 480, margin: '0 auto 36px' }}>
              Contact our team for a custom quote, product samples, or to discuss your import requirements.
            </p>
            <Link to="/export/contact" style={{
              display: 'inline-block', background: '#F0F2F0', color: '#497336',
              borderRadius: 40, padding: '14px 36px',
              fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Contact Us →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
