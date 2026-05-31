import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';
import { initialGlobalTeam } from '../data/initialData';

const values = [
  { title: 'Quality', desc: 'We never compromise on product standards. Every item is verified, tested, and certified before it reaches our clients.' },
  { title: 'Trust', desc: 'Transparent dealings, consistent supply, and honest communication are the foundation of every Layma partnership.' },
  { title: 'Reliability', desc: 'On-time delivery, accurate order fulfilment, and responsive service. We do what we say, every time.' },
  { title: 'Qatar Focus', desc: 'Headquartered in Doha, Qatar, we connect premium sourcing origins across India with markets across Qatar.' },
];


export default function About() {
  const aboutHeroImg = useSiteImage('about_hero');
  const aboutGlobalImg = useSiteImage('about_global');
  const globalTeam = initialGlobalTeam;
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
              Qatar's trusted food trading company, built on quality, reliability, and a genuine passion for premium natural food products from the world's best origins.
            </p>
          </motion.div>
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
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#BABF26' }}>Doha, Qatar</div>
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
                  Layma Global Trading & Services is a leading food trading and distribution company headquartered in Doha, Qatar. We specialize in the sourcing, import, packaging, and distribution of premium-quality food products from trusted origins around the world, serving supermarkets, wholesalers, retailers, and food service businesses across Qatar.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 16 }}>
                  Our product portfolio spans nuts (cashew, almonds, walnuts), dry fruits (raisins, figs, dried banana, jackfruit, mango, pineapple), spices (cardamom, black pepper), tea powder, and honey supplied in both bulk packaging and retail branded small packets to meet the diverse needs of the Qatar market.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 32 }}>
                  With a professional approach to product branding, packaging, and B2B supply, Layma Global acts as a reliable food trading partner for businesses across Qatar seeking consistent quality and dependable delivery.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                  {[
                    { label: 'Type', value: 'Trading & Services' },
                    { label: 'Location', value: 'Doha, Qatar' },
                    { label: 'Markets', value: 'Qatar' },
                    { label: 'Supply Formats', value: 'Bulk Supply · Retail Packets' },
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
              { label: 'International Product Sourcing' },
              { label: 'Supermarket & Retail Supply' },
              { label: 'Wholesale Distribution' },
              { label: 'Product Branding & Packaging' },
              { label: 'Import Services' },
              { label: 'B2B Supply Solutions' },
              { label: 'Logistics Coordination' },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div style={{ background: 'white', borderRadius: 16, padding: '20px 18px', textAlign: 'center', border: '1px solid rgba(73,115,54,0.1)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Mission & Vision */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }} className="two-col">
            {[
              {
                label: 'Our Mission',
                title: 'Quality Products,\nReliable Service',
                text: 'To provide quality food products with reliable sourcing, professional service, hygienic packaging, and long-term customer relationships, serving Qatar\'s markets with honesty and consistency.',
                bg: '#497336',
              },
              {
                label: 'Our Vision',
                title: 'A Trusted Global\nFood Brand',
                text: 'To become a trusted international food trading and export brand delivering premium-quality products worldwide, known for excellence, consistency, and the genuine care we invest in every product we trade.',
                bg: '#BABF26',
              },
            ].map(item => (
              <ScrollReveal key={item.label} direction="up">
                <div style={{ background: item.bg, borderRadius: 24, padding: '48px 40px', height: '100%' }}>
                  <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: item.bg === '#497336' ? '#BABF26' : 'rgba(26,26,26,0.55)', fontWeight: 600, marginBottom: 12 }}>{item.label}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 600, color: item.bg === '#497336' ? '#F1F2C4' : '#1a1a1a', lineHeight: 1.2, marginBottom: 20, whiteSpace: 'pre-line' }}>{item.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: item.bg === '#497336' ? 'rgba(241,242,196,0.8)' : 'rgba(26,26,26,0.72)' }}>{item.text}</p>
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
                  style={{ background: 'white', borderRadius: 20, padding: '36px 28px', textAlign: 'center', border: '1px solid rgba(73,115,54,0.08)', transition: 'box-shadow 0.3s', overflow: 'hidden', position: 'relative' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 50px rgba(73,115,54,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: i % 2 === 0 ? '#BABF26' : '#497336' }} />
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 72, fontWeight: 700, color: 'rgba(73,115,54,0.07)', lineHeight: 1, marginBottom: 12, marginTop: 8 }}>0{i + 1}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666' }}>{v.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '100px 0', background: '#497336' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 14 }}>The People Behind Layma</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#F1F2C4' }}>Our Team</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            {globalTeam.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1} style={{ width: 155 }}>
                <motion.div whileHover={{ y: -4 }} style={{ background: 'rgba(241,242,196,0.07)', border: '1px solid rgba(186,191,38,0.2)', borderRadius: 16, overflow: 'hidden', textAlign: 'center' }}>
                  <div style={{ aspectRatio: '1', background: 'rgba(186,191,38,0.1)', overflow: 'hidden' }}>
                    {member.image
                      ? <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                      : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(186,191,38,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#BABF26' }}>{member.name.charAt(0)}</div></div>}
                  </div>
                  <div style={{ padding: '14px 12px' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 600, color: '#F1F2C4', marginBottom: 5 }}>{member.name}</div>
                    <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, lineHeight: 1.4 }}>{member.role}</div>
                  </div>
                </motion.div>
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
