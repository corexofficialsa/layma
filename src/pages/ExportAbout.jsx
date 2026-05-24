import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';
import { initialExportTeam } from '../data/initialData';


const values = [
  { title: 'Quality First', desc: 'Every product we export is verified, graded, and certified before it leaves our facility. No compromises on standards.' },
  { title: 'Partnership', desc: 'We build long-term relationships with farmers, suppliers, and buyers based on trust and transparent communication.' },
  { title: 'Global Reach', desc: 'From Kerala to Qatar and beyond, we bridge the best of Indian produce with global markets.' },
  { title: 'Reliability', desc: 'On-time delivery, accurate documentation, and consistent supply are what our buyers count on from us.' },
];

export default function ExportAbout() {
  const aboutImg = useSiteImage('export_about');
  const heroImg = useSiteImage('export_hero');
  const exportTeam = initialExportTeam;
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
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600, marginBottom: 20 }}>Our Story</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 600, color: '#F0F2F0', lineHeight: 1, marginBottom: 28 }}>About Layma Export</h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(240,242,240,0.75)', maxWidth: 600, margin: '0 auto' }}>
              Kerala's trusted food export company, built on authentic farm sourcing, rigorous quality, and a genuine passion for bringing India's finest produce to the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '120px 0', background: '#F0F2F0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 80 }} className="two-col">
            <ScrollReveal direction="right">
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: 24, overflow: 'hidden', aspectRatio: '4/5', backgroundImage: `url(${aboutImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', top: -16, left: -16, background: '#5C8C46', borderRadius: 16, padding: '20px 24px', boxShadow: '0 12px 40px rgba(92,140,70,0.4)' }}>
                  <div style={{ fontSize: 36 }}>🌏</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#AFBFA3' }}>Kerala, India · Across the Globe</div>
                </div>
                <div style={{ position: 'absolute', bottom: 20, right: 20, background: '#88A67B', borderRadius: 16, padding: '16px 20px' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>Export</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(26,26,26,0.6)' }}>Division</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left">
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(92,140,70,0.1)', border: '1px solid rgba(92,140,70,0.2)', borderRadius: 40, padding: '6px 16px', marginBottom: 20 }}>
                  <span style={{ width: 6, height: 6, background: '#5C8C46', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600 }}>Export Division</span>
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 24, color: '#1a1a1a' }}>
                  Layma Export<br />Ramanattukara, Kerala
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 16 }}>
                  Layma Export is the sourcing, distribution, and export subsidiary of Layma Global Trading & Services, headquartered in Ramanattukara, Kerala, India. We specialise in procuring premium spices, nuts, dry fruits, honey, and tea from Kerala's farms and supplying them in Layma branded packs.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 16 }}>
                  We supply Layma branded consumer packs for local distribution across Qatar and the GCC through our parent company, and export in bulk to importers, wholesalers, and food businesses worldwide. All products are under the Layma brand.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 32 }}>
                  With direct farm relationships, a modern processing facility, and deep expertise in food export compliance, we deliver consistency, quality, and reliability in every shipment. CoS certification is provided for countries that require it.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { label: 'Type', value: 'Export & Local Distribution' },
                    { label: 'Location', value: 'Ramanattukara, Kerala' },
                    { label: 'Markets', value: 'India, Qatar, GCC & Worldwide' },
                    { label: 'Formats', value: 'Bulk Export · Layma Branded Packs' },
                  ].map(item => (
                    <div key={item.label} style={{ padding: '14px 16px', background: 'white', borderRadius: 12, border: '1px solid rgba(92,140,70,0.1)' }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* What We Do */}
          <ScrollReveal>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 24 }}>What We Do</h3>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 80 }}>
            {[
              { label: 'Farm-Level Sourcing' },
              { label: 'Processing & Grading' },
              { label: 'Layma Branded Packaging' },
              { label: 'Local Distribution' },
              { label: 'Sea & Air Export' },
              { label: 'Export Documentation' },
              { label: 'Quality Certification' },
              { label: 'B2B Partnerships' },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div style={{ background: 'white', borderRadius: 16, padding: '20px 18px', textAlign: 'center', border: '1px solid rgba(92,140,70,0.1)' }}>
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
                title: 'Pure Quality,\nDirect from Source',
                text: 'To export the finest Kerala produce with uncompromising quality, transparent sourcing, and reliable fulfilment, building lasting partnerships with buyers across the globe.',
                bg: '#497336', textColor: '#F0F2F0', subColor: '#AFBFA3',
              },
              {
                label: 'Our Vision',
                title: "Kerala's Premier\nExport Brand",
                text: "To become India's most trusted food export brand, known for direct farm access, certified quality, and the authenticity of every spice, nut, and fruit we ship.",
                bg: '#88A67B', textColor: '#1a1a1a', subColor: 'rgba(26,26,26,0.55)',
              },
            ].map(item => (
              <ScrollReveal key={item.label} direction="up">
                <div style={{ background: item.bg, borderRadius: 24, padding: '48px 40px', height: '100%' }}>
                  <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: item.subColor, fontWeight: 600, marginBottom: 12 }}>{item.label}</div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 600, color: item.textColor, lineHeight: 1.2, marginBottom: 20, whiteSpace: 'pre-line' }}>{item.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: item.bg === '#497336' ? 'rgba(240,242,240,0.8)' : 'rgba(26,26,26,0.72)' }}>{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 0', background: '#F0F2F0' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 14 }}>What Drives Us</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#1a1a1a' }}>Our Core Values</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  style={{ background: 'white', borderRadius: 20, padding: '36px 28px', textAlign: 'center', border: '1px solid rgba(92,140,70,0.08)', transition: 'box-shadow 0.3s', overflow: 'hidden', position: 'relative' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 20px 50px rgba(92,140,70,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: i % 2 === 0 ? '#88A67B' : '#5C8C46' }} />
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 72, fontWeight: 700, color: 'rgba(92,140,70,0.07)', lineHeight: 1, marginBottom: 12, marginTop: 8 }}>0{i + 1}</div>
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
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600, marginBottom: 14 }}>The People Behind Layma Export</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 600, color: '#F0F2F0' }}>Our Team</h2>
            </div>
          </ScrollReveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {exportTeam.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1} style={{ width: 175 }}>
                <motion.div whileHover={{ y: -6 }} style={{ background: 'rgba(240,242,240,0.07)', border: '1px solid rgba(136,166,123,0.25)', borderRadius: 20, overflow: 'hidden', textAlign: 'center' }}>
                  <div style={{ aspectRatio: '1', background: 'rgba(136,166,123,0.15)', overflow: 'hidden' }}>
                    {member.image
                      ? <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                      : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(136,166,123,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: '#88A67B' }}>{member.name.charAt(0)}</div></div>}
                  </div>
                  <div style={{ padding: '16px 12px' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 600, color: '#F0F2F0', marginBottom: 5 }}>{member.name}</div>
                    <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: '#88A67B', fontWeight: 600, lineHeight: 1.4 }}>{member.role}</div>
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
