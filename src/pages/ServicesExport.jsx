import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';

const offerings = [
  { icon: '🌶️', title: 'Kerala Spice Export', desc: 'Direct export of premium Kerala spices — cardamom, black pepper, cloves, cinnamon, turmeric, and more. Sourced from certified farms across Wayanad, Idukki, and Kozhikode districts.' },
  { icon: '🍯', title: 'Honey Export & Supply', desc: 'Cold-extracted, raw pure honey from Kerala\'s forest and farm regions. Supplied in bulk containers and retail small bottles, tested for purity and packed hygienically.' },
  { icon: '🥜', title: 'Nuts & Dry Fruits', desc: 'Premium cashew nuts, almonds, pistachios, raisins, dates, dried figs, dried banana, dried mango, dried jackfruit, and dried pineapple — sourced, graded, and exported to international standards.' },
  { icon: '🍵', title: 'Kerala Tea Powder', desc: 'Premium CTC grade tea powder from Munnar and Wayanad estates. Packed fresh in airtight bags for bulk export and retail consumer packs. Strong, rich, and authentically Kerala.' },
  { icon: '🌱', title: 'Direct Farm Sourcing', desc: 'We work directly with spice farmers, beekeepers, and agricultural cooperatives across Kerala — building fair trade relationships that ensure product traceability and community benefit.' },
  { icon: '📋', title: 'APEDA-Certified Export', desc: 'Full export compliance with APEDA, Spices Board of India, and FSSAI regulations. We handle all documentation — phytosanitary certificates, fumigation reports, and quality certifications.' },
  { icon: '🛍️', title: 'Retail & Consumer Packaging', desc: 'Small consumer packets, honey small bottles, and branded retail packs for both the Indian local market and international retail clients. Custom brand packaging available.' },
  { icon: '🚢', title: 'Export Shipping & Logistics', desc: 'Experienced freight management from Kerala ports. Sea freight and air freight options for bulk and express orders. We coordinate directly with freight forwarders for smooth export clearance.' },
];

const productList = [
  { cat: 'Kerala Spices', icon: '🌶️', items: ['Premium Cardamom (AGEB Grade)', 'Malabar Black Pepper', 'Whole Cloves', 'Ceylon Cinnamon', 'Turmeric Powder'] },
  { cat: 'Nuts', icon: '🥜', items: ['Cashew Nuts (W240)', 'Almonds', 'Pistachios'] },
  { cat: 'Dry Fruits', icon: '🍇', items: ['Golden Raisins', 'Dates', 'Dried Figs', 'Dried Banana (Nendran)', 'Dried Mango', 'Dried Jackfruit', 'Dried Pineapple'] },
  { cat: 'Honey', icon: '🍯', items: ['Pure Natural Honey (Bulk)', 'Honey Small Bottles (Retail)'] },
  { cat: 'Tea', icon: '🍵', items: ['Kerala CTC Tea Powder', 'Export Carton Packs', 'Retail Consumer Bags'] },
];

const packagingTypes = [
  { icon: '🛍️', name: 'Small Consumer Packets', desc: 'Retail-ready branded small packets for supermarket and local market distribution.' },
  { icon: '🍯', name: 'Small Honey Bottles', desc: 'Hygienic glass or PET bottle filling — Layma branded or private label.' },
  { icon: '📦', name: 'Export Cartons', desc: 'Standard export carton packing meeting international shipping requirements.' },
  { icon: '🏭', name: 'Bulk Packaging', desc: 'Large-format bulk bags and sacks for wholesale and industrial buyers.' },
  { icon: '🏷️', name: 'Custom Brand Packaging', desc: 'We design and produce packaging under your own brand identity.' },
];

export default function ServicesExport() {
  const heroImg = useSiteImage('services_export_hero');
  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 100, background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#AFBFA3', textDecoration: 'none', fontSize: 13, fontWeight: 500, marginBottom: 32, letterSpacing: 1 }}>
              ← Back to Services
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>🇮🇳</span>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600 }}>Subsidiary · Ramanattukara, Kerala, India</div>
                <div style={{ fontSize: 11, color: 'rgba(240,242,240,0.45)', marginTop: 2, letterSpacing: 1 }}>Food Processing · Export · Local Distribution</div>
              </div>
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 600, color: '#F0F2F0', lineHeight: 1.05, marginBottom: 24 }}>
              Layma Export<br /><em style={{ color: '#88A67B' }}>Kerala</em>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(240,242,240,0.75)', maxWidth: 600 }}>
              Kerala's spice legacy and natural food heritage, delivered to the world. Premium spice, honey, nuts, dry fruits, and tea powder — processed and exported from Ramanattukara with full APEDA and FSSAI compliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Target markets */}
      <section style={{ padding: '44px 0', background: '#5C8C46' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(240,242,240,0.7)', letterSpacing: 1, marginBottom: 10 }}>Target Markets</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              {['Qatar', 'GCC Countries', 'Indian Local Market', 'International Export Markets'].map(m => (
                <span key={m} style={{ background: 'rgba(240,242,240,0.15)', borderRadius: 40, padding: '8px 20px', fontSize: 14, fontWeight: 600, color: '#F0F2F0' }}>{m}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '100px 0', background: '#F0F2F0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 14 }}>Export Services</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#1a1a1a' }}>What We Do</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {offerings.map((o, i) => (
              <ScrollReveal key={o.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{ background: 'white', borderRadius: 20, padding: '32px 26px', border: '1px solid rgba(92,140,70,0.12)', height: '100%', transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 50px rgba(92,140,70,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{o.icon}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>{o.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666' }}>{o.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product catalogue */}
      <section style={{ padding: '80px 0', background: '#497336' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 600, color: '#F0F2F0', marginBottom: 12 }}>
                Products We Export
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(240,242,240,0.6)', maxWidth: 480, margin: '0 auto' }}>
                From farm to export carton — Kerala's finest, packed and shipped with care.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {productList.map((cat, i) => (
              <ScrollReveal key={cat.cat} delay={i * 0.1}>
                <div style={{ background: 'rgba(240,242,240,0.07)', borderRadius: 20, padding: '28px 22px', border: '1px solid rgba(175,191,163,0.25)' }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#AFBFA3', marginBottom: 14 }}>{cat.cat}</div>
                  {cat.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ width: 5, height: 5, background: '#88A67B', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(240,242,240,0.8)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging types */}
      <section style={{ padding: '80px 0', background: '#F0F2F0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(30px, 3vw, 44px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>
                Packaging Options
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
            {packagingTypes.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.08}>
                <div style={{ background: 'white', borderRadius: 18, padding: '28px 20px', textAlign: 'center', border: '1px solid rgba(92,140,70,0.1)' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{p.name}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: '#666' }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Export process */}
      <section style={{ padding: '72px 0', background: '#1a1a1a' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 600, color: '#F0F2F0' }}>
                Our Export Process
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
            {[
              { step: '01', label: 'Farm Sourcing', icon: '🌱' },
              { step: '02', label: 'Quality Grading', icon: '🔬' },
              { step: '03', label: 'Processing & Packing', icon: '📦' },
              { step: '04', label: 'FSSAI / APEDA Cert.', icon: '📋' },
              { step: '05', label: 'Export Clearance', icon: '✅' },
              { step: '06', label: 'Global Delivery', icon: '🌍' },
            ].map((p, i) => (
              <ScrollReveal key={p.step} delay={i * 0.08}>
                <div style={{ textAlign: 'center', padding: '24px 14px', background: 'rgba(240,242,240,0.04)', borderRadius: 16, border: '1px solid rgba(175,191,163,0.15)' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: 'rgba(136,166,123,0.4)', marginBottom: 6 }}>{p.step}</div>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, fontWeight: 600, color: '#F0F2F0' }}>{p.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: '#F0F2F0', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 20 }}>
              Source Kerala's Finest
            </h2>
            <p style={{ fontSize: 16, color: '#555', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.8 }}>
              Looking to import premium Kerala spices, honey, tea, or natural foods? Connect with our export team in Ramanattukara.
            </p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#497336', color: '#F0F2F0', textDecoration: 'none', padding: '16px 36px', borderRadius: 50, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Contact Export Team →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
