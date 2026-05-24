import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';

const offerings = [
  { title: 'International Product Sourcing', desc: 'We source premium food products from trusted suppliers across India, building direct relationships with producers to guarantee authenticity and competitive pricing.' },
  { title: 'Supermarket & Retail Supply', desc: 'We supply supermarkets and retail chains across Qatar with consistent, quality-verified products in bulk formats and branded retail small packets ready for shelf display.' },
  { title: 'Wholesale Distribution', desc: 'Flexible bulk supply agreements for distributors, wholesalers, and food service operators with competitive pricing, reliable delivery schedules, and customisable order quantities.' },
  { title: 'Product Branding & Retail Packaging', desc: 'We offer retail-ready branded small packet packaging helping our products stand out on the shelf with professional presentation.' },
  { title: 'B2B Supply Solutions', desc: 'Tailored B2B supply programmes for hotels, restaurants, catering companies, and institutional buyers with consistent quality, dedicated account management, and flexible delivery.' },
  { title: 'Import & Logistics Coordination', desc: 'Full import management including customs clearance, quality documentation, and last-mile distribution to your warehouse or retail outlets across Qatar.' },
  { title: 'Quality Certification & Documentation', desc: 'All products come with complete documentation including lab test reports, certificates of origin, and relevant food safety certifications. CoS certification provided where required.' },
];

const products = [
  { name: 'Cashew Nuts', origin: 'India / Vietnam / Ivory Coast', tag: 'W320 · W240 · W180' },
  { name: 'Almonds', origin: 'USA', tag: '27/30 · 32/34' },
  { name: 'Walnuts', origin: 'China / USA', tag: 'Premium' },
  { name: 'Cardamom', origin: 'India / Guatemala', tag: '7mm · 8mm' },
  { name: 'Black Pepper', origin: 'India / Vietnam', tag: 'Whole Peppercorn' },
  { name: 'Raisins', origin: 'Iran / Afghanistan', tag: 'Green · Gold · Black' },
  { name: 'Dried Figs', origin: 'Turkey / Iran', tag: 'Rope' },
  { name: 'Dried Banana', origin: 'Uganda', tag: 'Natural Dried' },
  { name: 'Dried Mango', origin: 'Uganda', tag: 'No Added Sugar' },
  { name: 'Pure Honey', origin: 'Nilambur, Kerala, India', tag: 'Nilambur Forest' },
  { name: 'Tea Powder', origin: 'India', tag: 'CTC Grade' },
];

export default function Services() {
  const heroImg = useSiteImage('services_global_hero');
  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 100, background: '#497336', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <span style={{ fontSize: 36 }}>🇶🇦</span>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600 }}>Doha, Qatar</div>
                <div style={{ fontSize: 11, color: 'rgba(241,242,196,0.5)', marginTop: 2, letterSpacing: 1 }}>Trading · Import · Distribution</div>
              </div>
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1.05, marginBottom: 24 }}>
              Layma Global<br /><em style={{ color: '#BABF26' }}>Trading & Services</em>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(241,242,196,0.8)', maxWidth: 600 }}>
              Qatar's trusted food trading partner. Sourcing globally, distributing locally. We supply supermarkets, wholesalers, retailers, and B2B businesses with premium food products in bulk and retail formats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capability chips */}
      <section style={{ padding: '40px 0', background: '#BABF26' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
              {['B2B Wholesale Supply', 'Retail Branded Packaging', 'Import & Export', 'Global Sourcing', 'Supermarket Supply'].map(tag => (
                <span key={tag} style={{ background: 'rgba(26,26,26,0.12)', borderRadius: 40, padding: '8px 18px', fontSize: 13, fontWeight: 600, color: '#1a1a1a', letterSpacing: 0.5 }}>{tag}</span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Service offerings */}
      <section style={{ padding: '100px 0', background: '#F1F2C4' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 14 }}>What We Offer</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#1a1a1a' }}>
                Our Service Offerings
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {offerings.map((o, i) => (
              <ScrollReveal key={o.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{ background: 'white', borderRadius: 20, padding: '32px 26px', border: '1px solid rgba(73,115,54,0.1)', height: '100%', transition: 'box-shadow 0.3s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 50px rgba(73,115,54,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #BABF26, #497336)' }} />
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#BABF26', marginBottom: 12 }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>{o.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666' }}>{o.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products we supply */}
      <section style={{ padding: '80px 0', background: '#497336' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, color: '#F1F2C4', marginBottom: 12 }}>
                Products We Supply
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(241,242,196,0.65)', maxWidth: 520, margin: '0 auto' }}>
                Available in bulk supply packaging and retail branded small packets.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {products.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.05}>
                <div style={{ background: 'rgba(241,242,196,0.08)', borderRadius: 16, padding: '20px 16px', textAlign: 'center', border: '1px solid rgba(186,191,38,0.18)' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 600, color: '#F1F2C4', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(241,242,196,0.5)', marginBottom: 6 }}>{p.origin}</div>
                  <div style={{ display: 'inline-block', background: '#BABF26', borderRadius: 40, padding: '2px 10px', fontSize: 10, fontWeight: 700, color: '#1a1a1a', letterSpacing: 0.5 }}>{p.tag}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging options */}
      <section style={{ padding: '80px 0', background: '#F1F2C4' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(30px, 3vw, 44px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>
                Packaging Options
              </h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { name: 'Bulk Supply Packaging', desc: 'For wholesalers and distributors requiring large-quantity orders.' },
              { name: 'Retail Branded Packets', desc: 'Layma-branded small consumer packets ready for retail shelving.' },
            ].map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.1}>
                <div style={{ background: 'white', borderRadius: 20, padding: '32px 24px', textAlign: 'center', border: '1px solid rgba(73,115,54,0.1)' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>{p.name}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#666' }}>{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: '#1a1a1a', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, color: '#F1F2C4', marginBottom: 20 }}>
              Partner with Layma Global
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(241,242,196,0.6)', maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.8 }}>
              Supermarkets, wholesalers, retailers, and B2B buyers. Let's build a reliable supply relationship.
            </p>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#BABF26', color: '#1a1a1a', textDecoration: 'none', padding: '16px 36px', borderRadius: 50, fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Get in Touch →
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
