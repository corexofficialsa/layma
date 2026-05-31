import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';

const processSteps = [
  { num: '01', title: 'Farm Sourcing', desc: 'We partner directly with certified farmers in Kerala, cutting out middlemen to bring you the freshest produce at competitive prices.' },
  { num: '02', title: 'Processing & Grading', desc: 'Products are cleaned, dried, and graded at our Ramanattukara facility under strict hygienic conditions to meet international food safety standards.' },
  { num: '03', title: 'Packaging & Certification', desc: 'Packed in Layma branded consumer packs or bulk export formats with full documentation: FSSAI, COO, Health Certificate, and CoS where required.' },
  { num: '04', title: 'Distribution & Export', desc: 'Supplied across the Indian market in Layma-branded packs and exported to international destinations via sea and air freight, with a strong focus on quality assurance, efficient logistics, and complete traceability throughout the supply chain.' },
];

const faqs = [
  { q: 'Where are your products sourced from?', a: 'We source directly from certified farms in Kerala, spices, nuts, dry fruits, honey, and tea from their own origin regions.' },
  { q: 'What are your packaging options?', a: 'We supply Layma branded consumer packs (50g to 1kg) for local distribution across Qatar and the GCC, and bulk export packaging (5kg to 25kg sacks) for international buyers. All products are under the Layma brand.' },
  { q: 'Do you handle export documentation?', a: 'Yes. We handle all export paperwork including shipping bill, packing list, invoice, certificate of origin, health certificate, and phytosanitary certificate as required. For countries that require it, we also provide CoS (Certificate of Conformity) certification.' },
  { q: 'What is the minimum order quantity?', a: 'MOQ varies by product, typically 25kg per SKU for B2B wholesale orders. Contact us for a personalised quote based on your requirements.' },
  { q: 'Which countries do you supply to?', a: 'We supply locally across Qatar and the GCC through Layma branded distribution packs, and export globally to importers across the Middle East, Europe, and Southeast Asia.' },
  { q: 'Are your products certified?', a: 'Yes. All products carry FSSAI certification, and relevant export-grade certificates (APEDA, HACCP) are available on request. CoS certification is provided for countries that require it.' },
];

export default function ExportHome() {
  const [activeFaq, setActiveFaq] = useState(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const heroImg = useSiteImage('export_hero');
  const introImg = useSiteImage('export_intro');
  const catImgSpices = useSiteImage('export_cat_spices');
  const catImgNuts = useSiteImage('export_cat_nuts');
  const catImgDryFruits = useSiteImage('export_cat_dry_fruits');
  const catImgHoney = useSiteImage('export_cat_honey');
  const catImgTea = useSiteImage('export_cat_tea');

  const categories = [
    { name: 'Spices', img: catImgSpices, count: 'Cardamom · Pepper · Turmeric · More' },
    { name: 'Nuts', img: catImgNuts, count: 'Cashew · Almonds · Walnuts · Pistachios' },
    { name: 'Dry Fruits', img: catImgDryFruits, count: 'Raisins · Figs · Mango · Jackfruit · More' },
    { name: 'Honey', img: catImgHoney, count: 'Pure Forest Honey · Bottles' },
    { name: 'Kerala Tea', img: catImgTea, count: 'CTC Tea Powder · Munnar Blends' },
  ];

  return (
    <div>
      {/* Hero — full screen parallax */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <motion.div style={{ position: 'absolute', inset: 0, y: heroY }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(73,115,54,0.88) 0%, rgba(26,26,26,0.55) 60%, rgba(92,140,70,0.3) 100%)' }} />
        </motion.div>

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ opacity: heroOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(175,191,163,0.2)', border: '1px solid rgba(175,191,163,0.4)', borderRadius: 40, padding: '8px 20px', marginBottom: 28 }}
            >
              <span style={{ width: 6, height: 6, background: '#AFBFA3', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600 }}>
                Kerala, India · Exporting Globally
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 100px)', fontWeight: 600, color: '#F0F2F0', lineHeight: 1.0, marginBottom: 28, textAlign: 'center' }}
            >
              From Kerala's Heart,<br />
              <span style={{ color: '#88A67B', fontStyle: 'italic' }}>To the World.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(240,242,240,0.85)', maxWidth: 580, marginBottom: 44, fontWeight: 300, textAlign: 'center' }}
            >
              Layma Export sources premium spices, nuts, dry fruits, honey, and tea from trusted producers and suppliers. We distribute our products across India and GCC markets under the Layma brand and export to international buyers worldwide, delivering quality products that meet global standards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <Link to="/export/products" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#88A67B', color: '#1a1a1a', textDecoration: 'none',
                padding: '16px 32px', borderRadius: 50,
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                letterSpacing: 1.5, textTransform: 'uppercase', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(136,166,123,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Explore Products →
              </Link>
              <Link to="/export/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: '#F0F2F0', textDecoration: 'none',
                padding: '16px 32px', borderRadius: 50, border: '1px solid rgba(240,242,240,0.4)',
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                letterSpacing: 1.5, textTransform: 'uppercase', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,242,240,0.1)'; e.currentTarget.style.borderColor = 'rgba(240,242,240,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(240,242,240,0.4)'; }}
              >
                Get a Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
        >
          <div style={{ width: 26, height: 40, border: '2px solid rgba(240,242,240,0.5)', borderRadius: 13, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 6 }}>
            <div style={{ width: 4, height: 8, background: '#88A67B', borderRadius: 2 }} />
          </div>
        </motion.div>
      </section>


      {/* Intro */}
      <section style={{ padding: '120px 0', background: '#F0F2F0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="two-col">
            <ScrollReveal direction="right">
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', backgroundImage: `url(${introImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', bottom: 24, left: 24, background: 'rgba(92,140,70,0.9)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '16px 20px', color: '#F0F2F0' }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#AFBFA3', marginBottom: 4 }}>Source</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600 }}>Kerala, India</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 16 }}>Who We Are</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 24, color: '#1a1a1a' }}>
                  Exporting with<br />
                  <em style={{ color: '#5C8C46' }}>Purpose</em> & Precision
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
                  Layma Export is the sourcing, processing, and distribution division of Layma Global Trading & Services, dedicated to delivering premium-quality food products to domestic and international markets.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
                  We source, process, and package high-quality spices, nuts, dry fruits, honey, and tea under the Layma brand, serving distributors, wholesalers, retailers, and food businesses across India while also exporting to customers in international markets.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 36 }}>
                  From our facility in Ramanattukara, we oversee every stage of the supply chain from sourcing and quality control to grading, packaging, certification, and export coordination ensuring consistent quality, reliability, and value in every product we deliver.
                </p>
                <Link to="/export/about" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, color: '#5C8C46',
                  textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                  letterSpacing: 1.5, textTransform: 'uppercase', borderBottom: '2px solid #88A67B', paddingBottom: 4, transition: 'gap 0.3s',
                }}
                  onMouseEnter={e => e.currentTarget.style.gap = '14px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                >
                  Discover Our Story →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section style={{ background: '#497336', padding: '100px 0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600, marginBottom: 14 }}>Our Range</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#F0F2F0', lineHeight: 1.1 }}>
                Premium Categories
              </h2>
            </div>
          </ScrollReveal>

          <div className="mob-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 0.1}>
                <Link to="/export/products" style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '3/4', position: 'relative', cursor: 'pointer' }}
                  >
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cat.img})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px' }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 600, color: '#F0F2F0' }}>{cat.name}</div>
                      <div style={{ fontSize: 11, color: '#AFBFA3', letterSpacing: 1 }}>{cat.count}</div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '120px 0', background: '#F0F2F0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 14 }}>How We Work</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.1 }}>
                Our Export Process
              </h2>
            </div>
          </ScrollReveal>

          <div className="mob-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{ background: 'white', borderRadius: 24, padding: '40px 32px', position: 'relative', border: '1px solid rgba(92,140,70,0.1)', transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 60px rgba(92,140,70,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 80, lineHeight: 0.8, marginBottom: 20, color: 'rgba(136,166,123,0.3)' }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666' }}>{step.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section style={{ padding: '100px 0', background: '#F0F2F0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 14 }}>Common Questions</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#1a1a1a' }}>FAQ</h2>
            </div>
          </ScrollReveal>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div
                  style={{ borderBottom: '1px solid rgba(92,140,70,0.15)', overflow: 'hidden' }}
                  initial={false}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: 16 }}
                  >
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3 }}>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: activeFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ fontSize: 24, color: '#5C8C46', flexShrink: 0, lineHeight: 1 }}
                    >+</motion.span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', paddingBottom: 24 }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 0', background: '#5C8C46', position: 'relative', overflow: 'hidden' }}>
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity }}
          style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600, marginBottom: 20 }}>Ready to Partner?</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 600, color: '#F0F2F0', lineHeight: 1.05, marginBottom: 24 }}>
              Let's Build a Long-Term<br />Export Partnership
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(240,242,240,0.75)', maxWidth: 520, margin: '0 auto 44px' }}>
              Contact our Kerala export team for pricing, samples, or to discuss your supply requirements.
            </p>
            <Link to="/export/contact" style={{
              display: 'inline-block', background: '#F0F2F0', color: '#497336',
              borderRadius: 40, padding: '16px 44px',
              fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 700,
              letterSpacing: 1.5, textTransform: 'uppercase', textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Contact Export Team →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .mob-2col { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .mob-2col { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}
