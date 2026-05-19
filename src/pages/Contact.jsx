import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import useSiteImage from '../hooks/useSiteImage';

const Instagram = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const WhatsApp = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.85L.057 23.928a.5.5 0 0 0 .606.61l6.284-1.644A11.935 11.935 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.93 0-3.73-.5-5.295-1.377l-.38-.22-3.931 1.029 1.048-3.817-.247-.39A9.935 9.935 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);
const Mail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const Phone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.36 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MapPin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const socials = [
  { icon: <Instagram />, label: 'Instagram', handle: '@laymaglobal', href: 'https://www.instagram.com/laymaglobal/', color: '#E1306C' },
  { icon: <WhatsApp />, label: 'WhatsApp', handle: '+974 7207 4466', href: 'https://wa.me/97472074466', color: '#25D366' },
  { icon: <Mail />, label: 'Email', handle: 'info@laymaglobal.com', href: 'mailto:info@laymaglobal.com', color: '#497336' },
];

const offices = [
  {
    name: 'Layma Global Trading & Services',
    city: 'Doha, Qatar',
    type: 'International Trading & Distribution',
    address: 'Doha, Qatar',
    phone: '+974 7207 4466',
    email: 'info@laymaglobal.com',
  },
];

export default function Contact() {
  const heroImg = useSiteImage('contact_hero');
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendError('');
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@laymaglobal.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || '—',
          subject: form.subject,
          message: form.message,
          _subject: `Layma Website Enquiry — ${form.subject}`,
        }),
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        setSubmitted(true);
      } else {
        setSendError('Could not send. Please email us directly at info@laymaglobal.com');
      }
    } catch {
      setSendError('Could not send. Please email us directly at info@laymaglobal.com');
    }
    setSending(false);
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 80, background: '#497336', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#BABF26', fontWeight: 600, marginBottom: 20 }}>Get in Touch</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1, marginBottom: 24 }}>
              Contact Us
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(241,242,196,0.75)', maxWidth: 500, margin: '0 auto' }}>
              Whether you're sourcing, partnering, or enquiring — our team is ready to connect with you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social quick links */}
      <section style={{ padding: '48px 0', background: '#F1F2C4', borderBottom: '1px solid rgba(73,115,54,0.1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {socials.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -6, scale: 1.02 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    background: 'white',
                    borderRadius: 20,
                    padding: '24px 24px',
                    textDecoration: 'none',
                    border: '1px solid rgba(73,115,54,0.1)',
                    transition: 'box-shadow 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = `0 16px 40px rgba(73,115,54,0.12)`}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>{s.handle}</div>
                  </div>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Office info */}
      <section style={{ padding: '100px 0', background: '#F1F2C4' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64 }} className="two-col">
            {/* Form */}
            <ScrollReveal direction="right">
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 12 }}>Send a Message</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 36 }}>
                  Let's Start a Conversation
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ background: '#497336', borderRadius: 24, padding: '56px 40px', textAlign: 'center' }}
                  >
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 600, color: '#F1F2C4', marginBottom: 12 }}>Message Received!</h3>
                    <p style={{ fontSize: 16, color: 'rgba(241,242,196,0.75)', lineHeight: 1.7 }}>Thank you for reaching out. Our team will get back to you within 24 business hours.</p>
                    <button onClick={() => { setSubmitted(false); setSendError(''); setForm({ name: '', email: '', company: '', subject: '', message: '' }); }} style={{ marginTop: 24, background: '#BABF26', color: '#1a1a1a', border: 'none', borderRadius: 40, padding: '12px 28px', fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }} className="form-grid">
                      {[
                        { key: 'name', label: 'Full Name', placeholder: 'Your name', required: true },
                        { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email', required: true },
                        { key: 'company', label: 'Company', placeholder: 'Company name (optional)' },
                        { key: 'subject', label: 'Subject', placeholder: 'What is this about?', required: true },
                      ].map(field => (
                        <div key={field.key}>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>{field.label}</label>
                          <input
                            type={field.type || 'text'}
                            placeholder={field.placeholder}
                            value={form[field.key]}
                            onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                            required={field.required}
                            style={{
                              width: '100%',
                              padding: '14px 18px',
                              borderRadius: 12,
                              border: '1.5px solid rgba(73,115,54,0.2)',
                              background: 'white',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: 14,
                              color: '#1a1a1a',
                              outline: 'none',
                              transition: 'border-color 0.2s',
                            }}
                            onFocus={e => e.target.style.borderColor = '#497336'}
                            onBlur={e => e.target.style.borderColor = 'rgba(73,115,54,0.2)'}
                          />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>Message</label>
                      <textarea
                        rows={6}
                        placeholder="Tell us how we can help..."
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        required
                        style={{
                          width: '100%',
                          padding: '14px 18px',
                          borderRadius: 12,
                          border: '1.5px solid rgba(73,115,54,0.2)',
                          background: 'white',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: 14,
                          color: '#1a1a1a',
                          outline: 'none',
                          resize: 'vertical',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = '#497336'}
                        onBlur={e => e.target.style.borderColor = 'rgba(73,115,54,0.2)'}
                      />
                    </div>
                    {sendError && (
                      <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{sendError}</p>
                    )}
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={!sending ? { scale: 1.03, boxShadow: '0 16px 40px rgba(73,115,54,0.3)' } : {}}
                      whileTap={!sending ? { scale: 0.97 } : {}}
                      style={{
                        background: sending ? '#888' : '#497336',
                        color: '#F1F2C4',
                        border: 'none',
                        borderRadius: 50,
                        padding: '16px 40px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        cursor: sending ? 'not-allowed' : 'pointer',
                        width: '100%',
                        transition: 'background 0.2s',
                      }}
                    >
                      {sending ? 'Sending…' : 'Send Message →'}
                    </motion.button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Office info */}
            <div>
              <ScrollReveal direction="left">
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 12 }}>Our Offices</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 600, color: '#1a1a1a', marginBottom: 36 }}>
                  Find Us
                </h2>
              </ScrollReveal>

              {offices.map((office, i) => (
                <ScrollReveal key={office.name} delay={i * 0.15}>
                  <div style={{ background: 'white', borderRadius: 20, padding: '28px 24px', marginBottom: 20, border: '1px solid rgba(73,115,54,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                      <span style={{ fontSize: 28, marginTop: 2 }}>🇶🇦</span>
                      <div>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>{office.name}</div>
                        <div style={{ fontSize: 12, color: '#497336', letterSpacing: 0.5, marginBottom: 2 }}>{office.city}</div>
                        <div style={{ fontSize: 11, color: '#aaa', letterSpacing: 0.3 }}>{office.type}</div>
                      </div>
                    </div>
                    {[
                      { icon: <MapPin />, val: office.address },
                      { icon: <Phone />, val: office.phone },
                      { icon: <Mail />, val: office.email },
                    ].map((item, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <span style={{ color: '#497336', width: 18, flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontSize: 14, color: '#555' }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.3}>
                <div style={{ background: '#497336', borderRadius: 20, padding: '28px 24px' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#F1F2C4', marginBottom: 8 }}>Business Hours</div>
                  <div style={{ fontSize: 14, color: 'rgba(241,242,196,0.75)', lineHeight: 2 }}>
                    <div>🇶🇦 Sunday – Thursday, 9:00 AM – 6:00 PM (AST)</div>
                    <div style={{ marginTop: 8, color: '#BABF26' }}>Enquiries responded within 24 business hours</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
