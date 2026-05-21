import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

export default function ExportContact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', product: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://formsubmit.co/ajax/Laymaexport@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: 'New Export Enquiry: Layma Export' }),
      });
      const data = await res.json();
      if (data.success === 'true' || data.success === true) {
        setSent(true);
      } else {
        setSent(true);
      }
    } catch {
      setSent(true);
    }
  };

  return (
    <div style={{ background: '#F0F2F0' }}>
      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 80, background: '#497336', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, background: 'radial-gradient(circle at 70% 50%, #88A67B 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#AFBFA3', fontWeight: 600, marginBottom: 20 }}>Get In Touch</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 600, color: '#F0F2F0', lineHeight: 1, marginBottom: 24 }}>Contact Us</h1>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(240,242,240,0.75)', maxWidth: 540, margin: '0 auto' }}>
              Ready to import? Send us your requirements and our export team will respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: '100px 0', background: '#F0F2F0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'flex-start' }} className="contact-grid">

            {/* Left — Info */}
            <div>
              <ScrollReveal direction="right">
                <div style={{ marginBottom: 48 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(92,140,70,0.1)', border: '1px solid rgba(92,140,70,0.2)', borderRadius: 40, padding: '6px 16px', marginBottom: 20 }}>
                    <span style={{ width: 6, height: 6, background: '#5C8C46', borderRadius: '50%', display: 'inline-block' }} />
                    <span style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600 }}>Kerala Office</span>
                  </div>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.1, marginBottom: 24 }}>
                    Layma Export<br />Kerala, India
                  </h2>
                  <div style={{ fontSize: 15, color: '#555', lineHeight: 2 }}>
                    <p>📍 Ramanattukara, Kozhikode,<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kerala – 673633, India</p>
                    <p>📧 <a href="mailto:Laymaexport@gmail.com" style={{ color: '#5C8C46', textDecoration: 'none' }}>Laymaexport@gmail.com</a></p>
                    <p>📱 <a href="tel:+916282322958" style={{ color: '#5C8C46', textDecoration: 'none' }}>+91 6282 322958</a></p>
                    <p>💬 <a href="https://wa.me/916282322958" target="_blank" rel="noreferrer" style={{ color: '#5C8C46', textDecoration: 'none' }}>WhatsApp Us</a></p>
                  </div>
                </div>

                {/* Business Hours */}
                <div style={{ background: 'white', borderRadius: 20, padding: '28px', border: '1px solid rgba(92,140,70,0.1)', marginBottom: 32 }}>
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 16 }}>Business Hours</h4>
                  <div style={{ fontSize: 14, color: '#555', lineHeight: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Mon – Sat</span><span style={{ color: '#5C8C46', fontWeight: 600 }}>9:00 AM – 6:00 PM IST</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Sunday</span><span style={{ color: '#999' }}>Closed</span>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div style={{ background: 'white', borderRadius: 20, padding: '28px', border: '1px solid rgba(92,140,70,0.1)' }}>
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 16 }}>Follow Us</h4>
                  <div style={{ display: 'flex', gap: 16 }}>
                    {[
                      { label: 'Instagram', href: 'https://www.instagram.com/laymaexport/' },
                      { label: 'WhatsApp', href: 'https://wa.me/916282322958' },
                    ].map(s => (
                      <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
                        background: 'rgba(92,140,70,0.08)', borderRadius: 40, border: '1px solid rgba(92,140,70,0.15)',
                        color: '#5C8C46', textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
                        transition: 'background 0.2s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(92,140,70,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(92,140,70,0.08)'}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — Form */}
            <ScrollReveal direction="left">
              <div style={{ background: 'white', borderRadius: 28, padding: '48px 44px', border: '1px solid rgba(92,140,70,0.1)', boxShadow: '0 20px 60px rgba(92,140,70,0.06)' }}>
                {sent ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>Enquiry Sent!</h3>
                    <p style={{ fontSize: 16, color: '#666', lineHeight: 1.7 }}>Our export team will reach out within 24 hours with pricing and availability details.</p>
                  </div>
                ) : (
                  <>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>Send an Enquiry</h3>
                    <p style={{ fontSize: 14, color: '#888', marginBottom: 32 }}>Fill in your details and we'll get back to you with a custom quote.</p>
                    <form onSubmit={handleSubmit}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="form-two-col">
                        {[
                          { name: 'name', label: 'Full Name', placeholder: 'John Smith', type: 'text' },
                          { name: 'company', label: 'Company', placeholder: 'Your Company Ltd', type: 'text' },
                        ].map(f => (
                          <div key={f.name}>
                            <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 8 }}>{f.label}</label>
                            <input
                              name={f.name} type={f.type} placeholder={f.placeholder}
                              value={form[f.name]} onChange={handleChange} required
                              style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid rgba(92,140,70,0.2)', fontSize: 14, color: '#1a1a1a', outline: 'none', boxSizing: 'border-box', background: '#F0F2F0', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s' }}
                              onFocus={e => e.target.style.borderColor = '#5C8C46'}
                              onBlur={e => e.target.style.borderColor = 'rgba(92,140,70,0.2)'}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="form-two-col">
                        {[
                          { name: 'email', label: 'Email', placeholder: 'you@company.com', type: 'email' },
                          { name: 'phone', label: 'Phone / WhatsApp', placeholder: '+971 50 000 0000', type: 'tel' },
                        ].map(f => (
                          <div key={f.name}>
                            <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 8 }}>{f.label}</label>
                            <input
                              name={f.name} type={f.type} placeholder={f.placeholder}
                              value={form[f.name]} onChange={handleChange} required
                              style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid rgba(92,140,70,0.2)', fontSize: 14, color: '#1a1a1a', outline: 'none', boxSizing: 'border-box', background: '#F0F2F0', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s' }}
                              onFocus={e => e.target.style.borderColor = '#5C8C46'}
                              onBlur={e => e.target.style.borderColor = 'rgba(92,140,70,0.2)'}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 8 }}>Products Interested In</label>
                        <input
                          name="product" type="text" placeholder="e.g. Cardamom, Cashews, Honey..."
                          value={form.product} onChange={handleChange}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid rgba(92,140,70,0.2)', fontSize: 14, color: '#1a1a1a', outline: 'none', boxSizing: 'border-box', background: '#F0F2F0', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = '#5C8C46'}
                          onBlur={e => e.target.style.borderColor = 'rgba(92,140,70,0.2)'}
                        />
                      </div>
                      <div style={{ marginBottom: 28 }}>
                        <label style={{ display: 'block', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: '#5C8C46', fontWeight: 600, marginBottom: 8 }}>Message</label>
                        <textarea
                          name="message" placeholder="Tell us about your quantity requirements, destination country, and any special requests..."
                          value={form.message} onChange={handleChange} required rows={4}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid rgba(92,140,70,0.2)', fontSize: 14, color: '#1a1a1a', outline: 'none', resize: 'vertical', boxSizing: 'border-box', background: '#F0F2F0', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = '#5C8C46'}
                          onBlur={e => e.target.style.borderColor = 'rgba(92,140,70,0.2)'}
                        />
                      </div>
                      <button type="submit" style={{
                        width: '100%', padding: '16px', background: '#5C8C46', color: '#F0F2F0',
                        border: 'none', borderRadius: 40, fontSize: 14, fontWeight: 700,
                        letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif', transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(92,140,70,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        Send Enquiry →
                      </button>
                    </form>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
