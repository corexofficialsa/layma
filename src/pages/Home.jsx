import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';

const stats = [
  { value: '5+', label: 'Product Categories' },
  { value: 'GCC+', label: 'Markets Served' },
  { value: 'GCC+', label: 'Distribution Reach' },
  { value: '100%', label: 'Quality Committed' },
];

const processSteps = [
  {
    num: '01',
    title: 'Global Sourcing',
    desc: 'We source premium food products from trusted origins — spices from Kerala, dates from Saudi Arabia, nuts from Iran and India — through direct supplier relationships.',
    icon: '🌱',
  },
  {
    num: '02',
    title: 'Quality Control',
    desc: 'Every batch is quality-checked and tested — from origin to our Qatar warehouse — ensuring only certified, premium-grade products reach your business.',
    icon: '🔬',
  },
  {
    num: '03',
    title: 'Packaging & Branding',
    desc: 'Products are cleaned, graded, and packed in bulk supply formats or retail branded small packets — with private-label options available for wholesale clients.',
    icon: '📦',
  },
  {
    num: '04',
    title: 'Reliable Supply',
    desc: 'Our Qatar distribution team ensures timely, accurate delivery to supermarkets, wholesalers, and retailers across Qatar and the GCC — dependable supply, every order.',
    icon: '🚢',
  },
];

const reviews = [
  {
    name: 'Ahmed Al-Rashidi',
    role: 'Head Buyer, Landmark Group Qatar',
    text: 'Layma Global has been our preferred spice supplier for over three years. The consistency of quality and reliability of delivery is unmatched in the market.',
    rating: 5,
  },
  {
    name: 'Fatima Al-Sayed',
    role: 'Executive Chef, Four Seasons Doha',
    text: 'The saffron and cardamom from Layma are simply exceptional. You can taste the difference — our guests notice it too. Premium in every sense.',
    rating: 5,
  },
  {
    name: 'Mohammed Khalid',
    role: 'Owner, Noor Fine Foods',
    text: 'Their Medjool dates and Sidr honey are the best we have sourced. Layma\'s team is professional, transparent, and genuinely passionate about quality.',
    rating: 5,
  },
];

const faqs = [
  {
    q: 'What regions do you source your products from?',
    a: 'We source premium nuts, spices, dates, and honey primarily from India (Kerala, Kashmir), Saudi Arabia, Iran, Turkey, and Sri Lanka — working directly with trusted farmers and certified exporters.',
  },
  {
    q: 'Do you supply to retail, hospitality, and wholesale clients?',
    a: 'Yes. We cater to a wide range of clients including retail chains, specialty food stores, hotels, restaurants, and wholesale distributors across Qatar and internationally.',
  },
  {
    q: 'Are your products certified and tested?',
    a: 'Absolutely. All our products undergo rigorous quality testing and carry relevant certifications (ISO, FSSAI, APEDA, HACCP as applicable). We maintain full traceability from origin to delivery.',
  },
  {
    q: 'Can I order custom quantities or private-label products?',
    a: 'Yes, we offer flexible quantity options and can arrange private-label packaging for qualified clients. Please get in touch with our team to discuss your requirements.',
  },
  {
    q: 'How do you ensure freshness during shipping?',
    a: 'We use temperature-controlled storage and packaging, nitrogen-flush sealing where applicable, and work with reputable freight partners who specialise in food commodities.',
  },
  {
    q: 'What is the minimum order quantity (MOQ)?',
    a: 'MOQ varies by product and client type. For wholesale and B2B clients, MOQ typically starts from 25kg per SKU. Contact us for a personalised quote.',
  },
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeReview, setActiveReview] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroImg = useSiteImage('home_hero');
  const introImg = useSiteImage('home_intro');
  const catImgSpices = useSiteImage('home_cat_spices');
  const catImgNuts = useSiteImage('home_cat_nuts');
  const catImgDryFruits = useSiteImage('home_cat_dry_fruits');
  const catImgHoney = useSiteImage('home_cat_honey');
  const catImgTea = useSiteImage('home_cat_tea');

  const categories = [
    { name: 'Spices', emoji: '🌶️', img: catImgSpices, count: 'Cardamom · Pepper · Cloves · More' },
    { name: 'Nuts', emoji: '🥜', img: catImgNuts, count: 'Cashew · Almonds · Walnuts · Pistachios' },
    { name: 'Dry Fruits', emoji: '🍇', img: catImgDryFruits, count: 'Raisins · Figs · Dates · Banana · More' },
    { name: 'Honey', emoji: '🍯', img: catImgHoney, count: 'Pure Honey · Small Bottles' },
    { name: 'Tea', emoji: '🍵', img: catImgTea, count: 'Kerala CTC Tea Powder' },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveReview(v => (v + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <motion.div
          style={{ position: 'absolute', inset: 0, y: heroY }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(73,115,54,0.92) 0%, rgba(42,69,32,0.78) 50%, rgba(73,115,54,0.65) 100%)',
          }} />
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
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(186,191,38,0.2)',
                border: '1px solid rgba(186,191,38,0.4)',
                borderRadius: 40,
                padding: '8px 20px',
                marginBottom: 28,
              }}
            >
              <span style={{ width: 6, height: 6, background: '#BABF26', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600 }}>
                Doha, Qatar · GCC Region
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(52px, 8vw, 100px)',
                fontWeight: 600,
                color: '#F1F2C4',
                lineHeight: 1.0,
                marginBottom: 28,
                textAlign: 'center',
              }}
            >
              Pure Origins,<br />
              <span style={{ color: '#BABF26', fontStyle: 'italic' }}>Premium</span> Quality.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: 'rgba(241,242,196,0.85)',
                maxWidth: 580,
                marginBottom: 44,
                fontWeight: 300,
                textAlign: 'center',
              }}
            >
              Layma Global Trading sources and supplies premium nuts, spices, dry fruits, honey, and tea — from trusted origins in India and Saudi Arabia — to supermarkets, wholesalers, and retailers across Qatar and the GCC.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <Link to="/products" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#BABF26',
                color: '#1a1a1a',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: 50,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(186,191,38,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Explore Products →
              </Link>
              <Link to="/about" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                color: '#F1F2C4',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: 50,
                border: '1px solid rgba(241,242,196,0.4)',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(241,242,196,0.1)'; e.currentTarget.style.borderColor = 'rgba(241,242,196,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(241,242,196,0.4)'; }}
              >
                Our Story
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
          <div style={{ width: 26, height: 40, border: '2px solid rgba(241,242,196,0.5)', borderRadius: 13, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 6 }}>
            <div style={{ width: 4, height: 8, background: '#BABF26', borderRadius: 2 }} />
          </div>
        </motion.div>

      </section>

      {/* Stats Bar */}
      <section style={{ background: '#497336', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 32 }}>
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1} direction="up">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 700, color: '#BABF26', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(241,242,196,0.7)', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="two-col">
            <ScrollReveal direction="right">
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: 24,
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  backgroundImage: `url(${introImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    border: '2px dashed #BABF26',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{
                    width: 70,
                    height: 70,
                    background: '#BABF26',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    lineHeight: 1.4,
                    color: '#1a1a1a',
                  }}>Since<br/>2016</div>
                </motion.div>
                <div style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  background: 'rgba(73,115,54,0.9)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 16,
                  padding: '16px 20px',
                  color: '#F1F2C4',
                }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#BABF26', marginBottom: 4 }}>Origin</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600 }}>Kerala · Kashmir<br/>Saudi Arabia</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 16 }}>Who We Are</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 24, color: '#1a1a1a' }}>
                  Trading with<br />
                  <em style={{ color: '#497336' }}>Purpose</em> & Precision
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>
                  Layma Global Trading & Services is Qatar's trusted food trading partner — headquartered in Doha, managing international sourcing, import, and B2B distribution across the GCC and beyond.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 36 }}>
                  We source, package, and distribute premium spices, nuts, dry fruits, honey, and tea powder — in bulk supply and retail branded formats — to supermarkets, wholesalers, retailers, and food businesses across Qatar and the GCC.
                </p>
                <Link to="/about" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  color: '#497336',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #BABF26',
                  paddingBottom: 4,
                  transition: 'gap 0.3s',
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
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 14 }}>Our Range</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1.1 }}>
                Premium Categories
              </h2>
            </div>
          </ScrollReveal>

          <div className="mob-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 0.1}>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      aspectRatio: '3/4',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url(${cat.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.5s',
                    }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px' }}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}>{cat.emoji}</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#F1F2C4' }}>{cat.name}</div>
                      <div style={{ fontSize: 11, color: '#BABF26', letterSpacing: 1 }}>{cat.count}</div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: '120px 0', background: '#F1F2C4' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 80 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 14 }}>How We Work</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.1 }}>
                Our Process
              </h2>
            </div>
          </ScrollReveal>

          <div className="mob-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'white',
                    borderRadius: 24,
                    padding: '40px 32px',
                    position: 'relative',
                    border: '1px solid rgba(73,115,54,0.1)',
                    transition: 'box-shadow 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 60px rgba(73,115,54,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2,
                    color: 'rgba(73,115,54,0.3)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 80,
                    lineHeight: 0.8,
                    marginBottom: 20,
                    color: 'rgba(186,191,38,0.3)',
                  }}>
                    {step.num}
                  </div>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{step.icon}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666' }}>{step.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '100px 0', background: '#1a1a1a', overflow: 'hidden' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 14 }}>Testimonials</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1.1 }}>
                What Our Clients Say
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{ fontSize: 48, color: '#BABF26', marginBottom: 24, lineHeight: 1 }}>"</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.6, color: '#F1F2C4', fontStyle: 'italic', marginBottom: 32 }}>
                  {reviews[activeReview].text}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
                  {Array(reviews[activeReview].rating).fill(0).map((_, i) => (
                    <span key={i} style={{ color: '#BABF26', fontSize: 16 }}>★</span>
                  ))}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: '#F1F2C4', fontSize: 15 }}>{reviews[activeReview].name}</div>
                <div style={{ fontSize: 13, color: 'rgba(241,242,196,0.5)', marginTop: 4 }}>{reviews[activeReview].role}</div>
              </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReview(i)}
                  style={{
                    width: i === activeReview ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === activeReview ? '#BABF26' : 'rgba(186,191,38,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: '120px 0', background: '#F1F2C4' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 14 }}>FAQ</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#1a1a1a' }}>
                Frequently Asked Questions
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div style={{
                  borderBottom: '1px solid rgba(73,115,54,0.15)',
                  overflow: 'hidden',
                }}>
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '24px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a' }}>{faq.q}</span>
                    <motion.span
                      animate={{ rotate: activeFaq === i ? 45 : 0 }}
                      style={{ fontSize: 24, color: '#497336', flexShrink: 0, fontWeight: 300, lineHeight: 1 }}
                    >+</motion.span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ paddingBottom: 24, fontSize: 15, lineHeight: 1.8, color: '#555' }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '100px 0', background: '#497336', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 20 }}>Ready to Partner?</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 70px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1.1, marginBottom: 24 }}>
              Let's Build Something<br /><em>Exceptional</em> Together
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(241,242,196,0.75)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.8 }}>
              Whether you're sourcing premium products or looking to expand your distribution network, Layma Global is your trusted partner.
            </p>
            <Link to="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#BABF26',
              color: '#1a1a1a',
              textDecoration: 'none',
              padding: '18px 40px',
              borderRadius: 50,
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Contact Us Today
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-pills { display: none !important; }
          .mob-2col { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}
