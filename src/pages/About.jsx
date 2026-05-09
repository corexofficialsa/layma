import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';

const values = [
  { icon: '🌿', title: 'Quality', desc: 'We never compromise on product standards — every item is verified, tested, and certified before it reaches our clients.' },
  { icon: '🤝', title: 'Trust', desc: 'Transparent dealings, consistent supply, and honest communication are the foundation of every Layma partnership.' },
  { icon: '📦', title: 'Reliability', desc: 'On-time delivery, accurate order fulfilment, and responsive service — we do what we say, every time.' },
  { icon: '🌍', title: 'Global Reach', desc: 'Headquartered in Qatar with operations in Kerala, we connect sourcing origins with markets across the GCC and beyond.' },
];

const timeline = [
  { year: '2016', event: 'Founded in Doha', desc: 'Layma Global Trading & Services established in Doha, Qatar — with a mission to bring authentic premium food products to the GCC market.' },
  { year: '2018', event: 'Layma Export Launched', desc: 'Layma Export established in Ramanattukara, Kerala — creating a dedicated sourcing, processing, and export arm in India.' },
  { year: '2020', event: 'GCC Expansion', desc: 'Extended distribution network across the GCC region; added Saudi Arabia and Gulf import partnerships for dates and honey.' },
  { year: '2022', event: 'Retail Packaging', desc: 'Launched branded retail small-packet range and private-label packaging services through Layma Export.' },
  { year: '2024', event: 'International Export Growth', desc: 'Expanded international export reach beyond the GCC, serving clients in Europe and Southeast Asia through Layma Export.' },
  { year: '2026', event: 'Full Product Range', desc: 'Completed full product portfolio — spices, nuts, dry fruits, honey, tea powder — supplied in bulk and retail branded formats.' },
];

export default function About() {
  const aboutHeroImg = useSiteImage('about_hero');
  const aboutGlobalImg = useSiteImage('about_global');
  const aboutExportImg = useSiteImage('about_export');
  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 100, background: '#497336', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, backgroundImage: `url(${aboutHeroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 20 }}>Our Story</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1, marginBottom: 28 }}>About Layma</h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(241,242,196,0.8)', maxWidth: 620, margin: '0 auto' }}>
              An international food trading group — with a parent company in Qatar and an export division in Kerala — built on quality, trust, and a passion for premium natural food products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Group overview */}
      <section style={{ padding: '80px 0', background: '#BABF26' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(26,26,26,0.1)', borderRadius: 40, padding: '6px 18px', marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(26,26,26,0.7)' }}>The Layma Group</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 16 }}>
              One Brand. Two Operations.
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(26,26,26,0.7)', maxWidth: 680, margin: '0 auto' }}>
              Layma Group is an international food trading and export company connecting global markets with premium-quality food products. The group operates through two complementary entities — Layma Global in Qatar and Layma Export in Kerala, India.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 1: Layma Global */}
      <section style={{ padding: '120px 0', background: '#F1F2C4' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 80 }} className="two-col">
            <ScrollReveal direction="right">
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '1', backgroundImage: `url(${aboutGlobalImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', top: -16, left: -16, background: '#497336', borderRadius: 16, padding: '20px 24px', boxShadow: '0 12px 40px rgba(73,115,54,0.4)' }}>
                  <div style={{ fontSize: 36 }}>🇶🇦</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#BABF26', marginTop: 6 }}>Doha, Qatar</div>
                </div>
                <div style={{ position: 'absolute', bottom: 20, right: 20, background: '#BABF26', borderRadius: 16, padding: '16px 20px' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>Parent</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(26,26,26,0.6)' }}>Company</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(73,115,54,0.1)', border: '1px solid rgba(73,115,54,0.2)', borderRadius: 40, padding: '6px 16px', marginBottom: 20 }}>
                  <span style={{ width: 6, height: 6, background: '#497336', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600 }}>Parent Company</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 24, color: '#1a1a1a' }}>
                  Layma Global<br />Trading & Services
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 16 }}>
                  Layma Global Trading & Services is the parent company of the group, headquartered in Doha, Qatar. We specialise in international sourcing and supply chain solutions — importing premium food products from India, Saudi Arabia, and other key origins and distributing them across Qatar's supermarkets, wholesalers, retailers, and B2B food businesses.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 16 }}>
                  Our product portfolio spans nuts (cashew, almonds, walnuts), dry fruits (raisins, figs, dried banana, jackfruit, mango, pineapple, dates), spices (cardamom, black pepper), tea powder, and honey — supplied in both bulk packaging and retail branded small packets to meet the diverse needs of the Qatar market.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 32 }}>
                  With a professional approach to product branding, customised packaging, and B2B supply, Layma Global acts as a reliable food trading partner for businesses across the GCC seeking consistent quality and dependable delivery.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                  {[
                    { label: 'Type', value: 'International Trading & Distribution' },
                    { label: 'Location', value: 'Doha, Qatar' },
                    { label: 'Markets', value: 'Qatar · GCC Region' },
                    { label: 'Supply Formats', value: 'Bulk · Retail Packets · Private Label' },
                  ].map(item => (
                    <div key={item.label} style={{ padding: '14px 16px', background: 'white', borderRadius: 12, border: '1px solid rgba(73,115,54,0.1)' }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Services tiles */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 24 }}>What We Do</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 80 }}>
            {[
              { icon: '🌐', label: 'International Product Sourcing' },
              { icon: '🏪', label: 'Supermarket & Retail Supply' },
              { icon: '📦', label: 'Wholesale Distribution' },
              { icon: '🏷️', label: 'Product Branding & Packaging' },
              { icon: '🚢', label: 'Import & Export Services' },
              { icon: '🤝', label: 'B2B Supply Solutions' },
              { icon: '🔖', label: 'Private Label Packaging' },
              { icon: '🚛', label: 'Logistics Coordination' },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div style={{ background: 'white', borderRadius: 16, padding: '20px 18px', textAlign: 'center', border: '1px solid rgba(73,115,54,0.1)' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mission & Vision */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="two-col">
            {[
              {
                icon: '🎯',
                label: 'Our Mission',
                title: 'Quality Products,\nReliable Service',
                text: 'To provide quality food products with reliable sourcing, professional service, hygienic packaging, and long-term customer relationships — serving Qatar\'s markets and beyond with honesty and consistency.',
                bg: '#497336',
              },
              {
                icon: '🔭',
                label: 'Our Vision',
                title: 'A Trusted Global\nFood Brand',
                text: 'To become a trusted international food trading and export brand delivering premium-quality products worldwide — known for excellence, consistency, and the genuine care we invest in every product we trade.',
                bg: '#BABF26',
              },
            ].map(item => (
              <ScrollReveal key={item.label} direction="up">
                <div style={{ background: item.bg, borderRadius: 24, padding: '48px 40px', height: '100%' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                  <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: item.bg === '#497336' ? '#BABF26' : 'rgba(26,26,26,0.55)', fontWeight: 600, marginBottom: 12 }}>{item.label}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 600, color: item.bg === '#497336' ? '#F1F2C4' : '#1a1a1a', lineHeight: 1.2, marginBottom: 20, whiteSpace: 'pre-line' }}>{item.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: item.bg === '#497336' ? 'rgba(241,242,196,0.8)' : 'rgba(26,26,26,0.72)' }}>{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Layma Export */}
      <section style={{ padding: '120px 0', background: '#1a1a1a' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="two-col">
            <ScrollReveal direction="right">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(186,191,38,0.15)', border: '1px solid rgba(186,191,38,0.3)', borderRadius: 40, padding: '6px 16px', marginBottom: 20 }}>
                  <span style={{ width: 6, height: 6, background: '#BABF26', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600 }}>Subsidiary Company</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 24, color: '#F1F2C4' }}>
                  Layma Export<br /><em style={{ color: '#BABF26' }}>Ramanattukara, Kerala</em>
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(241,242,196,0.7)', marginBottom: 16 }}>
                  Layma Export is the India-based production and export division of Layma Group, located in Ramanattukara, Kerala. As a subsidiary of Layma Global Trading & Services, this entity focuses on Kerala-origin products — sourcing, processing, packaging, and exporting premium Indian spices, nuts, honey, tea powder, and dry fruits to international markets.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(241,242,196,0.7)', marginBottom: 16 }}>
                  Kerala has been the world's spice capital for millennia. Layma Export is deeply embedded in this ecosystem — working directly with farmers and processing units across the spice-growing districts of Wayanad, Idukki, Ernakulam, and Kozhikode to source produce of the highest quality and purity.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(241,242,196,0.7)', marginBottom: 16 }}>
                  Beyond export, Layma Export also serves the Indian local market with retail consumer packs, honey small bottles, and branded food products — establishing Layma as a trusted domestic brand in Kerala and South India.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: 'rgba(241,242,196,0.7)', marginBottom: 32 }}>
                  All processing is carried out in FSSAI-certified facilities. Products are exported under APEDA guidelines and Spices Board of India certification, with full traceability from farm to destination.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {[
                    { label: 'Type', value: 'Food Processing & Export' },
                    { label: 'Location', value: 'Ramanattukara, Kerala, India' },
                    { label: 'Export Markets', value: 'Qatar · GCC · Global' },
                    { label: 'Compliance', value: 'APEDA · FSSAI · Spices Board' },
                  ].map(item => (
                    <div key={item.label} style={{ padding: '14px 16px', background: 'rgba(241,242,196,0.05)', borderRadius: 12, border: '1px solid rgba(186,191,38,0.15)' }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F2C4' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', backgroundImage: `url(${aboutExportImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(26,26,26,0.85)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '16px 18px', border: '1px solid rgba(186,191,38,0.3)' }}>
                  <div style={{ fontSize: 28 }}>🇮🇳</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#BABF26', marginTop: 6 }}>Kerala, India</div>
                </div>
                <div style={{ position: 'absolute', bottom: 20, left: 20, background: '#BABF26', borderRadius: 16, padding: '18px 22px' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 34, fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>30+</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(26,26,26,0.6)' }}>Products<br/>Exported</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Export products grid */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#F1F2C4', marginTop: 80, marginBottom: 24 }}>Products Handled</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { icon: '🌶️', cat: 'Kerala Spices', items: 'Cardamom · Pepper · Cloves · Cinnamon · Turmeric' },
              { icon: '🥜', cat: 'Nuts', items: 'Cashew · Almonds · Pistachios' },
              { icon: '🍇', cat: 'Dry Fruits', items: 'Raisins · Dates · Figs · Banana · Mango · Jackfruit · Pineapple' },
              { icon: '🍯', cat: 'Honey', items: 'Pure Honey · Honey Small Bottles' },
              { icon: '🍵', cat: 'Tea Powder', items: 'CTC Grade · Kerala Estate Tea' },
            ].map((p, i) => (
              <ScrollReveal key={p.cat} delay={i * 0.1}>
                <div style={{ background: 'rgba(241,242,196,0.05)', borderRadius: 16, padding: '24px 18px', border: '1px solid rgba(186,191,38,0.15)', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>{p.icon}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600, color: '#F1F2C4', marginBottom: 6 }}>{p.cat}</div>
                  <div style={{ fontSize: 11, color: 'rgba(241,242,196,0.5)', lineHeight: 1.6 }}>{p.items}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 0', background: '#F1F2C4' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 14 }}>What Drives Us</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#1a1a1a' }}>Our Core Values</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  style={{ background: 'white', borderRadius: 20, padding: '36px 28px', textAlign: 'center', border: '1px solid rgba(73,115,54,0.08)', transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 50px rgba(73,115,54,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666' }}>{v.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '100px 0', background: '#497336' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 14 }}>Our Journey</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#F1F2C4' }}>Milestones</h2>
            </div>
          </ScrollReveal>
          <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 44, top: 0, bottom: 0, width: 2, background: 'rgba(186,191,38,0.3)' }} />
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1}>
                <div style={{ display: 'flex', gap: 32, marginBottom: 48, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 88, height: 88, borderRadius: '50%', background: '#BABF26', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 700, color: '#1a1a1a', position: 'relative', zIndex: 1 }}>
                    {item.year}
                  </div>
                  <div style={{ paddingTop: 20 }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#F1F2C4', marginBottom: 8 }}>{item.event}</div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(241,242,196,0.65)' }}>{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  );
}
