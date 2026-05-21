import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { getCareers } from '../data/store';
import useSiteImage from '../hooks/useSiteImage';

export default function Careers() {
  const heroImg = useSiteImage('careers_hero');
  const [careers, setCareers] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setCareers(getCareers());
  }, []);

  const departments = ['All', ...new Set(careers.map(c => c.department))];
  const filtered = filter === 'All' ? careers : careers.filter(c => c.department === filter);

  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 100, background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 20 }}>Join Our Team</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1, marginBottom: 28 }}>
              Careers at<br /><em style={{ color: '#BABF26' }}>Layma</em>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(241,242,196,0.75)', maxWidth: 560 }}>
              Be part of a passionate team building something genuinely meaningful. Premium food trading that connects cultures, supports communities, and brings quality to the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture section */}
      <section style={{ padding: '80px 0', background: '#497336' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { title: 'Global Impact', desc: 'Your work reaches markets from Qatar to the world.' },
              { title: 'Strong Culture', desc: 'A team built on trust, respect, and shared ambition.' },
              { title: 'Growth Focused', desc: 'We invest in your development and career progression.' },
              { title: 'Purposeful Work', desc: 'Premium natural foods with real story and provenance.' },
            ].map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div style={{ textAlign: 'center', padding: '32px 24px', background: 'rgba(241,242,196,0.06)', borderRadius: 20, border: '1px solid rgba(186,191,38,0.2)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(186,191,38,0.15)', border: '1.5px solid rgba(186,191,38,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, color: '#BABF26', letterSpacing: 1 }}>
                    0{i + 1}
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 600, color: '#F1F2C4', marginBottom: 8 }}>{v.title}</div>
                  <div style={{ fontSize: 14, color: 'rgba(241,242,196,0.65)', lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section style={{ padding: '80px 0 100px', background: '#F1F2C4' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 48 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 8 }}>Open Positions</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, color: '#1a1a1a' }}>
                  Current Openings
                </h2>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setFilter(dept)}
                    style={{
                      padding: '8px 18px', borderRadius: 40, border: '1.5px solid',
                      borderColor: filter === dept ? '#497336' : 'rgba(73,115,54,0.2)',
                      background: filter === dept ? '#497336' : 'transparent',
                      color: filter === dept ? '#F1F2C4' : '#497336',
                      fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
                      cursor: 'pointer', transition: 'all 0.2s', letterSpacing: 0.5,
                    }}
                  >{dept}</button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#497336', marginBottom: 8 }}>No positions currently open in this department.</p>
              <p style={{ fontSize: 14, color: '#bbb', marginTop: 8 }}>Check back soon or send us your CV speculatively.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {filtered.map((career, i) => (
                <ScrollReveal key={career.id} delay={i * 0.08}>
                  <Link to={`/careers/${career.id}`} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ x: 6, boxShadow: '0 16px 50px rgba(73,115,54,0.12)' }}
                      style={{
                        background: 'white',
                        borderRadius: 20,
                        padding: '32px 36px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 24,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid rgba(73,115,54,0.08)',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.3s',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                          <span style={{ background: 'rgba(73,115,54,0.1)', color: '#497336', borderRadius: 40, padding: '4px 12px', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{career.department}</span>
                          <span style={{ background: 'rgba(186,191,38,0.15)', color: '#8a8f0a', borderRadius: 40, padding: '4px 12px', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{career.type}</span>
                        </div>
                        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>{career.title}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 14, color: '#666' }}>
                          <span>{career.location}</span>
                          <span>{career.experience}</span>
                          <span>{career.salary}</span>
                          <span style={{ color: '#999' }}>Posted: {career.posted}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#497336', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: 1, flexShrink: 0 }}>
                        View & Apply →
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Speculative application */}
          <ScrollReveal>
            <div style={{ marginTop: 60, background: '#497336', borderRadius: 24, padding: '48px 40px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#F1F2C4', marginBottom: 12 }}>Don't See Your Role?</h3>
              <p style={{ fontSize: 15, color: 'rgba(241,242,196,0.75)', maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.8 }}>
                We're always interested in talented people. Send us your CV and tell us how you'd contribute to Layma.
              </p>
              <a href="mailto:careers@laymaglobal.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#BABF26', color: '#1a1a1a',
                textDecoration: 'none', padding: '14px 32px', borderRadius: 50,
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                letterSpacing: 1.5, textTransform: 'uppercase',
              }}>
                Send Speculative CV
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
