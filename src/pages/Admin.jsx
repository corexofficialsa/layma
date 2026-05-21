import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CLOUD_NAME, UPLOAD_PRESET } from '../config/cloudinary';

async function uploadToCloudinary(dataUrl) {
  const formData = new FormData();
  formData.append('file', dataUrl);
  formData.append('upload_preset', UPLOAD_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Cloudinary error ${res.status}`);
  }
  const data = await res.json();
  return data.secure_url;
}
import {
  getProducts, addProduct, updateProduct, deleteProduct,
  getCareers, addCareer, updateCareer, deleteCareer,
  getExportProducts, addExportProduct, updateExportProduct, deleteExportProduct,
  getExportCareers, addExportCareer, updateExportCareer, deleteExportCareer,
  getImages, updateSiteImage,
  getTeam, addTeamMember, updateTeamMember, deleteTeamMember,
  getExportTeam, addExportTeamMember, updateExportTeamMember, deleteExportTeamMember,
} from '../data/store';
import { initialImages } from '../data/initialData';

const ADMIN_USER = 'LAYMA_GLOBAL';
const ADMIN_PASS = 'LAYMA3223!';

// ─── Brand config ───────────────────────────────────────────────────────────
const BRANDS = {
  global: {
    id: 'global',
    name: 'Layma Global',
    logo: '/logo.png',
    accent: '#BABF26',
    accentText: '#1a1a1a',
    bg: '#F1F2C4',
    green: '#497336',
    imagePrefix: null, // non-export images
  },
  export: {
    id: 'export',
    name: 'Layma Export',
    logo: '/logo-export.png',
    accent: '#88A67B',
    accentText: '#1a1a1a',
    bg: '#F0F2F0',
    green: '#5C8C46',
    imagePrefix: 'export_',
  },
};

// ─── Login ───────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) { onLogin(); }
    else { setError('Invalid credentials. Please try again.'); setP(''); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#497336', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&auto=format)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: '#F1F2C4', borderRadius: 28, padding: '56px 48px', width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src="/logo.png" alt="Layma" style={{ height: 52, width: 'auto', marginBottom: 10 }} />
          <div style={{ fontSize: 9, fontWeight: 600, color: '#BABF26', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 12 }}>ADMIN PANEL</div>
          <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #BABF26, transparent)' }} />
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 32, textAlign: 'center' }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>Username</label>
            <input type="text" value={u} onChange={e => setU(e.target.value)} placeholder="Admin username" autoComplete="username"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid rgba(73,115,54,0.2)', background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} value={p} onChange={e => setP(e.target.value)} placeholder="Admin password" autoComplete="current-password"
                style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid rgba(73,115,54,0.2)', background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {error && <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 8 }}>{error}</p>}
          <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            style={{ width: '100%', background: '#497336', color: '#F1F2C4', border: 'none', borderRadius: 50, padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', marginTop: 20 }}>
            Sign In →
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Add Product Modal ────────────────────────────────────────────────────────
function AddProductModal({ onClose, onSave, brand, existing }) {
  const isExport = brand === 'export';
  const categories = isExport
    ? ['Spices', 'Nuts', 'Dry Fruits', 'Honey', 'Tea', 'Dates']
    : ['Spices', 'Dates', 'Honey', 'Nuts', 'Dried Fruits'];
  const pricePlaceholder = isExport ? 'e.g. ₹650 / kg (bulk)' : 'e.g. QAR 180 / kg';
  const accentColor = isExport ? '#5C8C46' : '#497336';

  const [form, setForm] = useState(existing
    ? { name: existing.name || '', category: existing.category || categories[0], origin: existing.origin || '', price: existing.price || '', description: existing.description || '', details: existing.details || '', badge: existing.badge || '', image: existing.image || '' }
    : { name: '', category: categories[0], origin: '', price: '', description: '', details: '', badge: '', image: '' });
  const [imagePreview, setImagePreview] = useState(existing?.image || '');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    const reader = new FileReader();
    reader.onload = async (ev) => {
      setImagePreview(ev.target.result);
      setUploading(true);
      setUploadError('');
      try {
        const url = await uploadToCloudinary(ev.target.result);
        setForm(f => ({ ...f, image: url }));
        setImagePreview(url);
      } catch {
        setUploadError('Image upload failed. Paste a URL instead.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => { e.preventDefault(); if (!uploading) { onSave(form); onClose(); } };

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 10, border: `1.5px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.2)`, background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1a1a1a', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: accentColor, marginBottom: 6 };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.7)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        style={{ background: isExport ? '#F0F2F0' : '#F1F2C4', borderRadius: 24, padding: '40px 36px', width: '100%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#666' }}>×</button>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{existing ? 'Edit Product' : 'Add Product'}</h2>
        <p style={{ fontSize: 12, color: accentColor, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 28 }}>{isExport ? 'Layma Export' : 'Layma Global'}</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div><label style={labelStyle}>Product Name *</label><input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Green Cardamom" required /></div>
            <div><label style={labelStyle}>Category *</label><select style={inputStyle} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{categories.map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label style={labelStyle}>Origin *</label><input style={inputStyle} value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} placeholder={isExport ? 'e.g. Idukki, Kerala' : 'e.g. Kashmir, India'} required /></div>
            <div><label style={labelStyle}>Price</label><input style={inputStyle} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder={pricePlaceholder} /></div>
            <div><label style={labelStyle}>Badge / Grade</label><input style={inputStyle} value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="e.g. Export Grade" /></div>
          </div>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Short Description *</label><textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief product description..." required /></div>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Full Details</label><textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} placeholder="Detailed product information..." /></div>
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Product Image</label>
            <div style={{ display: 'grid', gridTemplateColumns: imagePreview ? '1fr 1fr' : '1fr', gap: 12 }}>
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', border: '2px dashed rgba(73,115,54,0.3)', borderRadius: 12, background: 'white', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }}>
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} disabled={uploading} />
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{uploading ? '⏳ Uploading...' : '📷 Upload from device'}</div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>JPG, PNG, WebP</div>
              </label>
              {imagePreview && <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1' }}><img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
            </div>
            {uploadError && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 6 }}>{uploadError}</div>}
            <div style={{ marginTop: 10 }}>
              <label style={{ ...labelStyle, marginBottom: 6 }}>Or paste image URL</label>
              <input style={inputStyle} value={form.image.startsWith('data:') ? '' : form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
          <button type="submit" disabled={uploading} style={{ width: '100%', background: uploading ? '#aaa' : accentColor, color: '#F0F2F0', border: 'none', borderRadius: 50, padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: uploading ? 'not-allowed' : 'pointer' }}>
            {uploading ? 'Uploading image...' : existing ? 'Save Changes →' : 'Add Product →'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Add Career Modal ─────────────────────────────────────────────────────────
function AddCareerModal({ onClose, onSave, brand, existing }) {
  const isExport = brand === 'export';
  const accentColor = isExport ? '#5C8C46' : '#497336';
  const locationHint = isExport ? 'e.g. Ramanattukara, Kerala' : 'e.g. Doha, Qatar';
  const salaryHint = isExport ? 'e.g. ₹40,000 – 60,000 / month' : 'e.g. QAR 8,000 – 12,000';

  const [form, setForm] = useState(existing
    ? { title: existing.title || '', department: existing.department || '', location: existing.location || '', type: existing.type || 'Full-time', experience: existing.experience || '', salary: existing.salary || '', description: existing.description || '', requirements: Array.isArray(existing.requirements) ? existing.requirements.join('\n') : (existing.requirements || ''), benefits: Array.isArray(existing.benefits) ? existing.benefits.join('\n') : (existing.benefits || '') }
    : { title: '', department: '', location: '', type: 'Full-time', experience: '', salary: '', description: '', requirements: '', benefits: '' });
  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 10, border: `1.5px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.2)`, background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1a1a1a', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: accentColor, marginBottom: 6 };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, requirements: form.requirements.split('\n').filter(Boolean), benefits: form.benefits.split('\n').filter(Boolean) });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.7)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{ background: isExport ? '#F0F2F0' : '#F1F2C4', borderRadius: 24, padding: '40px 36px', width: '100%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#666' }}>×</button>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{existing ? 'Edit Career' : 'Add Career'}</h2>
        <p style={{ fontSize: 12, color: accentColor, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 28 }}>{isExport ? 'Layma Export' : 'Layma Global'}</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Job Title *</label><input style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Export Operations Manager" required /></div>
            <div><label style={labelStyle}>Department *</label><input style={inputStyle} value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} placeholder="e.g. Sourcing & Export" required /></div>
            <div><label style={labelStyle}>Location *</label><input style={inputStyle} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder={locationHint} required /></div>
            <div><label style={labelStyle}>Job Type</label><select style={inputStyle} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>{['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}</select></div>
            <div><label style={labelStyle}>Experience</label><input style={inputStyle} value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} placeholder="e.g. 2-4 years" /></div>
            <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Salary</label><input style={inputStyle} value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} placeholder={salaryHint} /></div>
          </div>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Job Description *</label><textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the role..." required /></div>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Requirements (one per line)</label><textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} placeholder={"Degree in relevant field\n3+ years experience\nFluent English"} /></div>
          <div style={{ marginBottom: 28 }}><label style={labelStyle}>Benefits (one per line)</label><textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} placeholder={"Health insurance\nPerformance bonus"} /></div>
          <button type="submit" style={{ width: '100%', background: accentColor, color: '#F0F2F0', border: 'none', borderRadius: 50, padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
            {existing ? 'Save Changes →' : 'Add Career →'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Team Member Modal ────────────────────────────────────────────────────────
function TeamMemberModal({ onClose, onSave, brand, existing }) {
  const isExport = brand === 'export';
  const accentColor = isExport ? '#5C8C46' : '#497336';
  const [form, setForm] = useState(existing
    ? { name: existing.name, role: existing.role, bio: existing.bio || '', image: existing.image || '' }
    : { name: '', role: '', bio: '', image: '' });
  const [preview, setPreview] = useState(existing?.image || '');
  const [cropSrc, setCropSrc] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 10, border: `1.5px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.2)`, background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1a1a1a', outline: 'none', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: accentColor, marginBottom: 6 };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setCropSrc(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropConfirm = (url) => {
    setCropSrc(null);
    setPreview(url);
    setForm(f => ({ ...f, image: url }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, image: form.image || preview });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.7)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        style={{ background: isExport ? '#F0F2F0' : '#F1F2C4', borderRadius: 24, padding: '40px 36px', width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#666' }}>×</button>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{existing ? 'Edit' : 'Add'} Team Member</h2>
        <p style={{ fontSize: 12, color: accentColor, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 28 }}>{isExport ? 'Layma Export' : 'Layma Global'}</p>

        {/* Photo upload */}
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Photo</label>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', background: 'rgba(73,115,54,0.1)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.2)` }}>
              {preview ? <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 32, color: '#ccc' }}>👤</span>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, background: accentColor, color: '#F0F2F0', borderRadius: 40, padding: '10px 18px', cursor: 'pointer', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', width: 'fit-content', marginBottom: 10 }}>
                <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                📷 Upload Photo
              </label>
              <input style={{ ...inputStyle, fontSize: 12 }} placeholder="Or paste photo URL..." value={form.image.startsWith('data:') ? '' : form.image}
                onChange={e => { setForm(f => ({ ...f, image: e.target.value })); setPreview(e.target.value); }} />
              {uploadError && <div style={{ fontSize: 11, color: '#c0392b', marginTop: 6 }}>{uploadError}</div>}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Name *</label><input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Ahmed Al-Rashid" required /></div>
          <div style={{ marginBottom: 16 }}><label style={labelStyle}>Role / Position *</label><input style={inputStyle} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Managing Director" required /></div>
          <div style={{ marginBottom: 28 }}><label style={labelStyle}>Bio (optional)</label><textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Short description about this person..." /></div>
          <button type="submit" style={{ width: '100%', background: accentColor, color: '#F0F2F0', border: 'none', borderRadius: 50, padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
            {existing ? 'Save Changes →' : 'Add Team Member →'}
          </button>
        </form>
      </motion.div>
      {cropSrc && createPortal(<CropModal imageSrc={cropSrc} aspectRatio={1} onConfirm={handleCropConfirm} onCancel={() => setCropSrc(null)} />, document.body)}
    </motion.div>
  );
}

// ─── Crop Modal ───────────────────────────────────────────────────────────────
function CropModal({ imageSrc, aspectRatio, onConfirm, onCancel }) {
  const MAX_W = 460, MAX_H = 450;
  const CROP_W = Math.round(Math.min(MAX_W, MAX_H * aspectRatio));
  const CROP_H = Math.round(CROP_W / aspectRatio);
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const [minScale, setMinScale] = useState(1);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const dragRef = useRef(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const ms = Math.max(CROP_W / img.naturalWidth, CROP_H / img.naturalHeight);
      setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
      setMinScale(ms); setScale(ms); setOffset({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc, CROP_W, CROP_H]);

  const dispW = imgNatural.w * scale;
  const dispH = imgNatural.h * scale;
  const clamp = (ox, oy, s) => ({
    x: Math.max(-(imgNatural.w * s - CROP_W) / 2, Math.min((imgNatural.w * s - CROP_W) / 2, ox)),
    y: Math.max(-(imgNatural.h * s - CROP_H) / 2, Math.min((imgNatural.h * s - CROP_H) / 2, oy)),
  });
  const startDrag = (cx, cy) => { dragRef.current = { cx, cy, ox: offset.x, oy: offset.y }; };
  const moveDrag = (cx, cy) => { if (!dragRef.current) return; const { cx: sx, cy: sy, ox, oy } = dragRef.current; setOffset(clamp(ox + cx - sx, oy + cy - sy, scale)); };
  const endDrag = () => { dragRef.current = null; };
  const changeScale = (v) => { const s = Math.max(minScale, Math.min(minScale * 3, parseFloat(v))); setScale(s); setOffset(o => clamp(o.x, o.y, s)); };
  const doCrop = () => {
    setUploading(true);
    setUploadError('');
    const canvas = document.createElement('canvas');
    canvas.width = CROP_W; canvas.height = CROP_H;
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    img.onload = async () => {
      ctx.drawImage(img, CROP_W / 2 + offset.x - dispW / 2, CROP_H / 2 + offset.y - dispH / 2, dispW, dispH);
      const base64 = canvas.toDataURL('image/jpeg', 0.85);
      try {
        const url = await uploadToCloudinary(base64);
        onConfirm(url);
      } catch {
        setUploadError('Upload failed — check your Cloudinary credentials in src/config/cloudinary.js');
        setUploading(false);
      }
    };
    img.src = imageSrc;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <motion.div initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.22 }}
        style={{ background: '#1a1a1a', borderRadius: 22, padding: '24px', width: 'fit-content', maxWidth: '100vw' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#F1F2C4', fontWeight: 600 }}>Crop Image</div>
            <div style={{ fontSize: 11, color: 'rgba(241,242,196,0.35)', letterSpacing: 0.5, marginTop: 2 }}>Drag to pan · scroll or slider to zoom</div>
          </div>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'rgba(241,242,196,0.5)', fontSize: 24, cursor: 'pointer', padding: '0 0 0 16px', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ width: CROP_W, height: CROP_H, overflow: 'hidden', borderRadius: 8, position: 'relative', cursor: dragRef.current ? 'grabbing' : 'grab', border: '1.5px solid #BABF26', userSelect: 'none', touchAction: 'none' }}
          onMouseDown={e => startDrag(e.clientX, e.clientY)} onMouseMove={e => moveDrag(e.clientX, e.clientY)} onMouseUp={endDrag} onMouseLeave={endDrag}
          onWheel={e => { e.preventDefault(); changeScale(scale - e.deltaY * 0.001 * minScale); }}
          onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }} onTouchEnd={endDrag}>
          {imgNatural.w > 0 && <img src={imageSrc} alt="crop" draggable={false} style={{ position: 'absolute', width: dispW, height: dispH, left: CROP_W / 2 + offset.x - dispW / 2, top: CROP_H / 2 + offset.y - dispH / 2, pointerEvents: 'none' }} />}
          {['33.33%', '66.66%'].map(p => <div key={'v' + p} style={{ position: 'absolute', left: p, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.13)', pointerEvents: 'none' }} />)}
          {['33.33%', '66.66%'].map(p => <div key={'h' + p} style={{ position: 'absolute', top: p, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.13)', pointerEvents: 'none' }} />)}
          {[{ top: 0, left: 0, borderTop: '2.5px solid #BABF26', borderLeft: '2.5px solid #BABF26' }, { top: 0, right: 0, borderTop: '2.5px solid #BABF26', borderRight: '2.5px solid #BABF26' }, { bottom: 0, left: 0, borderBottom: '2.5px solid #BABF26', borderLeft: '2.5px solid #BABF26' }, { bottom: 0, right: 0, borderBottom: '2.5px solid #BABF26', borderRight: '2.5px solid #BABF26' }].map((s, i) => <div key={i} style={{ position: 'absolute', width: 20, height: 20, pointerEvents: 'none', ...s }} />)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
          <span style={{ fontSize: 10, color: 'rgba(241,242,196,0.4)', textTransform: 'uppercase', letterSpacing: 1, minWidth: 34 }}>Zoom</span>
          <input type="range" min={minScale} max={minScale * 3} step={minScale * 0.01} value={scale} onChange={e => changeScale(e.target.value)} style={{ flex: 1, accentColor: '#BABF26' }} />
          <span style={{ fontSize: 10, color: 'rgba(241,242,196,0.4)', minWidth: 34, textAlign: 'right' }}>{minScale > 0 ? Math.round((scale / minScale) * 100) : 100}%</span>
        </div>
        {uploadError && <div style={{ marginTop: 12, fontSize: 11, color: '#ff6b6b', lineHeight: 1.4, textAlign: 'center' }}>{uploadError}</div>}
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button onClick={onCancel} disabled={uploading} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(241,242,196,0.15)', color: 'rgba(241,242,196,0.7)', borderRadius: 40, padding: '11px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.5 : 1 }}>Cancel</button>
          <button onClick={doCrop} disabled={uploading} style={{ flex: 2, background: uploading ? '#888' : '#BABF26', color: '#1a1a1a', border: 'none', borderRadius: 40, padding: '11px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, cursor: uploading ? 'not-allowed' : 'pointer', letterSpacing: 0.5 }}>
            {uploading ? '⏳ Uploading...' : 'Crop & Upload →'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Image Card ───────────────────────────────────────────────────────────────
function ImageCard({ imgKey, label, aspectRatio, currentUrl, onSave, onReset, accentColor }) {
  const [urlInput, setUrlInput] = useState(currentUrl);
  const [preview, setPreview] = useState(currentUrl);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [cropSrc, setCropSrc] = useState(null);
  const ar = aspectRatio || 16 / 9;

  useEffect(() => {
    const onError = (e) => { setSaveError(e.detail); setTimeout(() => setSaveError(''), 4000); };
    window.addEventListener('layma_images_error', onError);
    return () => window.removeEventListener('layma_images_error', onError);
  }, []);

  const handleFile = (e) => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = ev => setCropSrc(ev.target.result); reader.readAsDataURL(file); e.target.value = ''; };
  const handleCropConfirm = (croppedUrl) => { setPreview(croppedUrl); setUrlInput(croppedUrl); setCropSrc(null); };
  const handleSave = () => {
    const ok = onSave(urlInput || preview);
    if (ok !== false) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  };
  const handleReset = () => { onReset(); setSaved(false); setSaveError(''); setPreview(currentUrl); setUrlInput(currentUrl); };

  return (
    <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(73,115,54,0.1)' }}>
      <div style={{ position: 'relative', aspectRatio: ar, overflow: 'hidden', background: '#e8e9c8' }}>
        {preview ? <img src={preview} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setPreview('')} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#aaa' }}>🖼️</div>}
        <label style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0)', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.36)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}>
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
            style={{ background: `rgba(${accentColor === '#5C8C46' ? '92,140,70' : '73,115,54'},0.92)`, color: '#F1F2C4', borderRadius: 40, padding: '8px 18px', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
            📷 Upload & Crop
          </motion.div>
        </label>
      </div>
      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: accentColor, marginBottom: 8 }}>{label}</div>
        <input type="text" placeholder="Or paste image URL..." value={urlInput.startsWith('data:') ? '' : urlInput}
          onChange={e => { setUrlInput(e.target.value); if (e.target.value) setPreview(e.target.value); }}
          style={{ width: '100%', padding: '8px 11px', borderRadius: 8, border: '1.5px solid rgba(73,115,54,0.2)', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#1a1a1a', outline: 'none', marginBottom: 10, boxSizing: 'border-box' }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleSave}
            style={{ flex: 1, background: saved ? '#497336' : saveError ? '#c0392b' : (accentColor === '#5C8C46' ? '#88A67B' : '#BABF26'), color: saved || saveError ? '#F1F2C4' : '#1a1a1a', border: 'none', borderRadius: 40, padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}>
            {saved ? '✓ Saved!' : saveError ? '⚠ Failed' : 'Save'}
          </button>
          <button onClick={handleReset}
            style={{ background: 'rgba(73,115,54,0.08)', border: '1px solid rgba(73,115,54,0.15)', color: accentColor, borderRadius: 40, padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            ↺ Reset
          </button>
        </div>
        {saveError && <div style={{ marginTop: 8, fontSize: 11, color: '#c0392b', lineHeight: 1.4 }}>{saveError}</div>}
      </div>
      {cropSrc && createPortal(<CropModal imageSrc={cropSrc} aspectRatio={ar} onConfirm={handleCropConfirm} onCancel={() => setCropSrc(null)} />, document.body)}
    </div>
  );
}

// ─── Main Admin ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeBrand, setActiveBrand] = useState('global');
  const [activeTab, setActiveTab] = useState('products');
  const [globalProducts, setGlobalProducts] = useState([]);
  const [globalCareers, setGlobalCareers] = useState([]);
  const [exportProducts, setExportProducts] = useState([]);
  const [exportCareers, setExportCareers] = useState([]);
  const [images, setImages] = useState({});
  const [globalTeam, setGlobalTeam] = useState([]);
  const [exportTeam, setExportTeam] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCareer, setShowAddCareer] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCareer, setEditingCareer] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      setGlobalProducts(getProducts());
      setGlobalCareers(getCareers());
      setExportProducts(getExportProducts());
      setExportCareers(getExportCareers());
      setImages(getImages());
      setGlobalTeam(getTeam());
      setExportTeam(getExportTeam());
    }
  }, [loggedIn]);

  const brand = BRANDS[activeBrand];
  const isExport = activeBrand === 'export';
  const products = isExport ? exportProducts : globalProducts;
  const careers = isExport ? exportCareers : globalCareers;
  const team = isExport ? exportTeam : globalTeam;

  const handleAddProduct = (data) => {
    if (isExport) { addExportProduct(data); setExportProducts(getExportProducts()); }
    else { addProduct(data); setGlobalProducts(getProducts()); }
  };
  const handleAddCareer = (data) => {
    if (isExport) { addExportCareer(data); setExportCareers(getExportCareers()); }
    else { addCareer(data); setGlobalCareers(getCareers()); }
  };
  const handleDeleteProduct = (id) => {
    if (isExport) { deleteExportProduct(id); setExportProducts(getExportProducts()); }
    else { deleteProduct(id); setGlobalProducts(getProducts()); }
    setConfirmDelete(null);
  };
  const handleDeleteCareer = (id) => {
    if (isExport) { deleteExportCareer(id); setExportCareers(getExportCareers()); }
    else { deleteCareer(id); setGlobalCareers(getCareers()); }
    setConfirmDelete(null);
  };

  const handleUpdateProduct = (data) => {
    if (isExport) { updateExportProduct(editingProduct.id, data); setExportProducts(getExportProducts()); }
    else { updateProduct(editingProduct.id, data); setGlobalProducts(getProducts()); }
    setEditingProduct(null);
  };
  const handleUpdateCareer = (data) => {
    if (isExport) { updateExportCareer(editingCareer.id, data); setExportCareers(getExportCareers()); }
    else { updateCareer(editingCareer.id, data); setGlobalCareers(getCareers()); }
    setEditingCareer(null);
  };

  const handleAddTeam = (data) => {
    if (isExport) { addExportTeamMember(data); setExportTeam(getExportTeam()); }
    else { addTeamMember(data); setGlobalTeam(getTeam()); }
  };
  const handleUpdateTeam = (data) => {
    if (isExport) { updateExportTeamMember(editingTeam.id, data); setExportTeam(getExportTeam()); }
    else { updateTeamMember(editingTeam.id, data); setGlobalTeam(getTeam()); }
    setEditingTeam(null);
  };
  const handleDeleteTeam = (id) => {
    if (isExport) { deleteExportTeamMember(id); setExportTeam(getExportTeam()); }
    else { deleteTeamMember(id); setGlobalTeam(getTeam()); }
    setConfirmDelete(null);
  };

  // Switch brand → reset to products tab
  const switchBrand = (b) => { setActiveBrand(b); setActiveTab('products'); };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  // Images filtered by brand
  const brandImages = Object.entries(initialImages).filter(([key]) =>
    isExport ? key.startsWith('export_') : !key.startsWith('export_')
  );
  const imagePages = [...new Set(brandImages.map(([, v]) => v.page))];

  const tabBtn = (tab, label, emoji) => (
    <button onClick={() => setActiveTab(tab)} style={{
      padding: '10px 24px', borderRadius: 40, border: 'none', cursor: 'pointer',
      background: activeTab === tab ? brand.green : 'transparent',
      color: activeTab === tab ? '#F0F2F0' : brand.green,
      fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
      letterSpacing: 1, transition: 'all 0.2s',
    }}>{emoji} {label}</button>
  );

  return (
    <div style={{ background: brand.bg, minHeight: '100vh', paddingTop: 80 }}>

      {/* Admin Header */}
      <div style={{ background: brand.green, padding: '20px 0', borderBottom: `2px solid ${brand.accent}` }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={brand.logo} alt={brand.name} style={{ height: 40, width: 'auto' }} />
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: '#F0F2F0', letterSpacing: 1 }}>{brand.name}</div>
              <div style={{ fontSize: 9, color: brand.accent, letterSpacing: 4, textTransform: 'uppercase' }}>ADMIN PANEL</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'rgba(240,242,240,0.7)' }}>Signed in as <strong style={{ color: brand.accent }}>LAYMA_GLOBAL</strong></span>
            <button onClick={() => setLoggedIn(false)}
              style={{ background: `rgba(${isExport ? '136,166,123' : '186,191,38'},0.2)`, border: `1px solid ${brand.accent}`, color: brand.accent, borderRadius: 40, padding: '8px 20px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1 }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Brand Switcher */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(73,115,54,0.12)', padding: '0' }}>
        <div className="container" style={{ display: 'flex', gap: 0 }}>
          {Object.values(BRANDS).map(b => (
            <button key={b.id} onClick={() => switchBrand(b.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '16px 32px',
              background: activeBrand === b.id ? b.bg : 'white',
              border: 'none', borderBottom: activeBrand === b.id ? `3px solid ${b.green}` : '3px solid transparent',
              cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
            }}>
              <img src={b.logo} alt={b.name} style={{ height: 28, width: 'auto' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: activeBrand === b.id ? b.green : '#999', transition: 'color 0.2s' }}>{b.name}</div>
                <div style={{ fontSize: 10, color: '#bbb', letterSpacing: 1 }}>{b.id === 'global' ? 'DOHA, QATAR' : 'KERALA, INDIA'}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'white', padding: '24px 0', borderBottom: '1px solid rgba(73,115,54,0.08)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24 }}>
            {[
              { label: 'Products', value: products.length, emoji: '📦' },
              { label: 'Careers', value: careers.length, emoji: '💼' },
              { label: 'Team Members', value: team.length, emoji: '👥' },
              { label: 'Site Images', value: brandImages.length, emoji: '🖼️' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 700, color: brand.green, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#999', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container" style={{ paddingTop: 40 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, background: 'white', borderRadius: 50, padding: 6, width: 'fit-content', border: `1px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.1)` }}>
          {tabBtn('products', 'Products', '📦')}
          {tabBtn('careers', 'Careers', '💼')}
          {tabBtn('team', 'Team', '👥')}
          {tabBtn('images', 'Site Images', '🖼️')}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>Product Catalogue</h2>
                <div style={{ fontSize: 11, color: brand.green, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{brand.name}</div>
              </div>
              <button onClick={() => setShowAddProduct(true)}
                style={{ background: brand.accent, color: brand.accentText, border: 'none', borderRadius: 40, padding: '12px 28px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
                + Add Product
              </button>
            </div>
            {products.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22 }}>No products yet. Add your first product above.</p>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, paddingBottom: 80 }}>
              {products.map(p => (
                <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: 'white', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(73,115,54,0.08)' }}>
                  <div style={{ aspectRatio: '4/3', backgroundImage: p.image ? `url(${p.image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', background: p.image ? undefined : '#e8e9c8' }}>
                    {!p.image && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>📦</div>}
                    {p.badge && <div style={{ position: 'absolute', top: 10, left: 10, background: brand.accent, borderRadius: 40, padding: '3px 10px', fontSize: 10, fontWeight: 700, letterSpacing: 1, color: brand.accentText }}>{p.badge}</div>}
                  </div>
                  <div style={{ padding: '16px 18px 20px' }}>
                    <div style={{ fontSize: 10, color: brand.green, letterSpacing: 1, marginBottom: 4 }}>{p.category} · {p.origin}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: brand.green, marginBottom: 12 }}>{p.price}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setEditingProduct(p)}
                        style={{ flex: 1, background: `rgba(${isExport ? '92,140,70' : '73,115,54'},0.08)`, color: brand.green, border: `1px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.2)`, borderRadius: 40, padding: '8px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>
                        ✏ Edit
                      </button>
                      <button onClick={() => setConfirmDelete({ type: 'product', id: p.id, name: p.name })}
                        style={{ flex: 1, background: 'rgba(192,57,43,0.08)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 40, padding: '8px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Careers Tab */}
        {activeTab === 'careers' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>Career Listings</h2>
                <div style={{ fontSize: 11, color: brand.green, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{brand.name}</div>
              </div>
              <button onClick={() => setShowAddCareer(true)}
                style={{ background: brand.accent, color: brand.accentText, border: 'none', borderRadius: 40, padding: '12px 28px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
                + Add Career
              </button>
            </div>
            {careers.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>💼</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22 }}>No career listings yet.</p>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 80 }}>
              {careers.map(c => (
                <motion.div key={c.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  style={{ background: 'white', borderRadius: 20, padding: '28px', border: '1px solid rgba(73,115,54,0.08)', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      <span style={{ background: `rgba(${isExport ? '92,140,70' : '73,115,54'},0.1)`, color: brand.green, borderRadius: 40, padding: '3px 10px', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{c.department}</span>
                      <span style={{ background: 'rgba(136,166,123,0.15)', color: '#5C8C46', borderRadius: 40, padding: '3px 10px', fontSize: 11 }}>{c.type}</span>
                    </div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: '#777' }}>📍 {c.location} · 💼 {c.experience} · 💰 {c.salary}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button onClick={() => setEditingCareer(c)}
                      style={{ background: `rgba(${isExport ? '92,140,70' : '73,115,54'},0.08)`, color: brand.green, border: `1px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.2)`, borderRadius: 40, padding: '8px 20px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>
                      ✏ Edit
                    </button>
                    <button onClick={() => setConfirmDelete({ type: 'career', id: c.id, name: c.title })}
                      style={{ background: 'rgba(192,57,43,0.08)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 40, padding: '8px 20px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>
                      🗑 Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div style={{ paddingBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>Team Members</h2>
                <div style={{ fontSize: 11, color: brand.green, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{brand.name}</div>
              </div>
              <button onClick={() => setShowAddTeam(true)}
                style={{ background: brand.accent, color: brand.accentText, border: 'none', borderRadius: 40, padding: '12px 28px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
                + Add Member
              </button>
            </div>
            {team.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22 }}>No team members yet. Add your first member above.</p>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {team.map(m => (
                <motion.div key={m.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: 'white', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(73,115,54,0.08)' }}>
                  <div style={{ aspectRatio: '1', backgroundImage: m.image ? `url(${m.image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center top', position: 'relative', background: m.image ? undefined : (isExport ? 'rgba(92,140,70,0.1)' : 'rgba(73,115,54,0.1)') }}>
                    {!m.image && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 72, height: 72, borderRadius: '50%', background: isExport ? 'rgba(92,140,70,0.2)' : 'rgba(73,115,54,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: brand.green }}>{m.name.charAt(0)}</div></div>}
                  </div>
                  <div style={{ padding: '16px 18px 20px' }}>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{m.name}</div>
                    <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: brand.green, fontWeight: 600, marginBottom: m.bio ? 8 : 12 }}>{m.role}</div>
                    {m.bio && <div style={{ fontSize: 13, color: '#777', lineHeight: 1.6, marginBottom: 12 }}>{m.bio}</div>}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setEditingTeam(m)}
                        style={{ flex: 1, background: `rgba(${isExport ? '92,140,70' : '73,115,54'},0.08)`, color: brand.green, border: `1px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.2)`, borderRadius: 40, padding: '8px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>
                        ✏ Edit
                      </button>
                      <button onClick={() => setConfirmDelete({ type: 'team', id: m.id, name: m.name })}
                        style={{ flex: 1, background: 'rgba(192,57,43,0.08)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 40, padding: '8px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div style={{ paddingBottom: 80 }}>
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>Site Images</h2>
              <div style={{ fontSize: 11, color: brand.green, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>{brand.name}</div>
              <p style={{ fontSize: 14, color: '#888' }}>Upload from your device or paste a URL. Changes apply instantly across the website.</p>
            </div>
            {imagePages.map(page => (
              <div key={page} style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: brand.green, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ display: 'inline-block', width: 24, height: 2, background: brand.accent }} />
                  {page}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                  {brandImages.filter(([, v]) => v.page === page).map(([key, meta]) => {
                    const currentUrl = images[key]?.url || meta.url;
                    return (
                      <ImageCard key={key} imgKey={key} label={meta.label} aspectRatio={meta.aspectRatio || 16 / 9} currentUrl={currentUrl} accentColor={brand.green}
                        onSave={(url) => { updateSiteImage(key, url); setImages(getImages()); }}
                        onReset={() => { updateSiteImage(key, meta.url); setImages(getImages()); }} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Delete */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.7)', backdropFilter: 'blur(8px)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              style={{ background: brand.bg, borderRadius: 24, padding: '40px 36px', maxWidth: 400, width: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>Confirm Delete</h3>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 28 }}>Are you sure you want to remove <strong>"{confirmDelete.name}"</strong>? This cannot be undone.</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: 'transparent', border: `1.5px solid rgba(${isExport ? '92,140,70' : '73,115,54'},0.3)`, color: brand.green, borderRadius: 40, padding: '12px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => confirmDelete.type === 'product' ? handleDeleteProduct(confirmDelete.id) : confirmDelete.type === 'career' ? handleDeleteCareer(confirmDelete.id) : handleDeleteTeam(confirmDelete.id)}
                  style={{ flex: 1, background: '#c0392b', color: 'white', border: 'none', borderRadius: 40, padding: '12px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddProduct && <AddProductModal onClose={() => setShowAddProduct(false)} onSave={handleAddProduct} brand={activeBrand} />}
        {showAddCareer && <AddCareerModal onClose={() => setShowAddCareer(false)} onSave={handleAddCareer} brand={activeBrand} />}
        {showAddTeam && <TeamMemberModal onClose={() => setShowAddTeam(false)} onSave={handleAddTeam} brand={activeBrand} />}
        {editingProduct && <AddProductModal onClose={() => setEditingProduct(null)} onSave={handleUpdateProduct} brand={activeBrand} existing={editingProduct} />}
        {editingCareer && <AddCareerModal onClose={() => setEditingCareer(null)} onSave={handleUpdateCareer} brand={activeBrand} existing={editingCareer} />}
        {editingTeam && <TeamMemberModal onClose={() => setEditingTeam(null)} onSave={handleUpdateTeam} brand={activeBrand} existing={editingTeam} />}
      </AnimatePresence>
    </div>
  );
}
