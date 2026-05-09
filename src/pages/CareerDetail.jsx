import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { getCareer } from '../data/store';

export default function CareerDetail() {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', coverLetter: '', cv: null });
  const [submitted, setSubmitted] = useState(false);
  const [cvName, setCvName] = useState('');

  useEffect(() => {
    setCareer(getCareer(id));
    window.scrollTo(0, 0);
  }, [id]);

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setForm(f => ({ ...f, cv: file }));
      setCvName(file.name);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.cv) { alert('Please upload your CV (PDF).'); return; }
    setSubmitted(true);
    setApplyOpen(false);
  };

  if (!career) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F2C4' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🌿</div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#497336' }}>Position not found</p>
          <Link to="/careers" style={{ color: '#497336', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>← Back to Careers</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F1F2C4', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ paddingTop: 120, paddingBottom: 60, background: '#497336', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1400&auto=format)', backgroundSize: 'cover', opacity: 0.08 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#BABF26', textDecoration: 'none', fontSize: 13, fontWeight: 500, marginBottom: 28, letterSpacing: 1 }}>
            ← Back to Careers
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <span style={{ background: 'rgba(186,191,38,0.2)', color: '#BABF26', borderRadius: 40, padding: '5px 14px', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>{career.department}</span>
            <span style={{ background: 'rgba(241,242,196,0.15)', color: '#F1F2C4', borderRadius: 40, padding: '5px 14px', fontSize: 11, fontWeight: 500 }}>{career.type}</span>
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 600, color: '#F1F2C4', lineHeight: 1.05, marginBottom: 24 }}>
            {career.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, fontSize: 14, color: 'rgba(241,242,196,0.75)', marginBottom: 32 }}>
            <span>📍 {career.location}</span>
            <span>💼 {career.experience} experience</span>
            <span>💰 {career.salary}</span>
            <span>📅 Posted: {career.posted}</span>
          </div>
          {!submitted ? (
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 12px 30px rgba(186,191,38,0.4)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setApplyOpen(true)}
              style={{
                background: '#BABF26', color: '#1a1a1a',
                border: 'none', borderRadius: 50,
                padding: '16px 40px',
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                letterSpacing: 2, textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Apply for This Role →
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(186,191,38,0.2)', border: '1px solid rgba(186,191,38,0.4)', borderRadius: 40, padding: '14px 28px', color: '#BABF26', fontWeight: 600, fontSize: 15 }}
            >
              ✅ Application Submitted — We'll be in touch!
            </motion.div>
          )}
        </div>
      </section>

      {/* Job content */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60 }} className="two-col">
            <div>
              <ScrollReveal>
                <div style={{ background: 'white', borderRadius: 24, padding: '40px 36px', marginBottom: 24, border: '1px solid rgba(73,115,54,0.08)' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 16 }}>About the Role</h2>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: '#555' }}>{career.description}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div style={{ background: 'white', borderRadius: 24, padding: '40px 36px', border: '1px solid rgba(73,115,54,0.08)' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 20 }}>Requirements</h2>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {career.requirements?.map((req, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                        <span style={{ width: 22, height: 22, background: '#BABF26', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                        <span style={{ fontSize: 15, lineHeight: 1.65, color: '#444' }}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            <div>
              <ScrollReveal direction="left">
                <div style={{ background: '#497336', borderRadius: 24, padding: '36px 28px', marginBottom: 20 }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#F1F2C4', marginBottom: 20 }}>Benefits</h3>
                  {career.benefits?.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ color: '#BABF26', fontSize: 16 }}>✦</span>
                      <span style={{ fontSize: 15, color: 'rgba(241,242,196,0.85)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.15}>
                <div style={{ background: '#BABF26', borderRadius: 24, padding: '36px 28px' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a1a1a', marginBottom: 20 }}>Quick Details</h3>
                  {[
                    { label: 'Department', value: career.department },
                    { label: 'Location', value: career.location },
                    { label: 'Job Type', value: career.type },
                    { label: 'Experience', value: career.experience },
                    { label: 'Salary', value: career.salary },
                  ].map(item => (
                    <div key={item.label} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(26,26,26,0.55)', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{item.value}</div>
                    </div>
                  ))}
                  {!submitted && (
                    <button
                      onClick={() => setApplyOpen(true)}
                      style={{
                        marginTop: 20, width: '100%',
                        background: '#1a1a1a', color: '#F1F2C4',
                        border: 'none', borderRadius: 40,
                        padding: '14px', fontFamily: 'Inter, sans-serif',
                        fontSize: 13, fontWeight: 600,
                        letterSpacing: 1.5, textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Apply Now →
                    </button>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {applyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(26,26,26,0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
            onClick={e => e.target === e.currentTarget && setApplyOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              style={{
                background: '#F1F2C4',
                borderRadius: 28,
                padding: '48px 40px',
                width: '100%',
                maxWidth: 560,
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setApplyOpen(false)}
                style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#666', lineHeight: 1 }}
              >×</button>

              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 8 }}>Apply for</div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 600, color: '#1a1a1a', marginBottom: 32 }}>{career.title}</h2>

              <form onSubmit={handleSubmit}>
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'Your full name', required: true },
                  { key: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email', required: true },
                  { key: 'phone', label: 'Phone Number', placeholder: '+971 / +91 / +974...' },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      required={field.required}
                      style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '1.5px solid rgba(73,115,54,0.2)', background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1a1a1a', outline: 'none' }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>Cover Letter (optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Why are you a great fit for this role?"
                    value={form.coverLetter}
                    onChange={e => setForm(f => ({ ...f, coverLetter: e.target.value }))}
                    style={{ width: '100%', padding: '13px 16px', borderRadius: 10, border: '1.5px solid rgba(73,115,54,0.2)', background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1a1a1a', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                {/* CV Upload */}
                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>Upload CV / Resume (PDF) *</label>
                  <label style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '32px 20px',
                    border: `2px dashed ${cvName ? '#497336' : 'rgba(73,115,54,0.3)'}`,
                    borderRadius: 16,
                    background: cvName ? 'rgba(73,115,54,0.06)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    <input type="file" accept=".pdf" onChange={handleCvChange} style={{ display: 'none' }} />
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{cvName ? '✅' : '📄'}</div>
                    {cvName ? (
                      <>
                        <div style={{ fontWeight: 600, color: '#497336', fontSize: 14 }}>{cvName}</div>
                        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Click to change file</div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: 14 }}>Drop your CV here</div>
                        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>PDF format only · Max 10MB</div>
                      </>
                    )}
                  </label>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%',
                    background: '#497336', color: '#F1F2C4',
                    border: 'none', borderRadius: 50,
                    padding: '16px',
                    fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700,
                    letterSpacing: 1.5, textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Submit Application →
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
