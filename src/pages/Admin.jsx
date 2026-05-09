import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, addProduct, deleteProduct, getCareers, addCareer, deleteCareer, getImages, updateSiteImage } from '../data/store';
import { initialImages } from '../data/initialData';

const ADMIN_USER = 'LAYMA_GLOBAL';
const ADMIN_PASS = 'LAYMA3223!';

function LoginScreen({ onLogin }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
      setP('');
    }
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
            <input
              type="text"
              value={u}
              onChange={e => setU(e.target.value)}
              placeholder="Admin username"
              autoComplete="username"
              style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid rgba(73,115,54,0.2)', background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none' }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={p}
                onChange={e => setP(e.target.value)}
                placeholder="Admin password"
                autoComplete="current-password"
                style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid rgba(73,115,54,0.2)', background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, outline: 'none' }}
              />
              <button type="button" onClick={() => setShowPass(v => !v)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#999' }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          {error && <p style={{ color: '#c0392b', fontSize: 13, marginBottom: 8 }}>{error}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{ width: '100%', background: '#497336', color: '#F1F2C4', border: 'none', borderRadius: 50, padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', marginTop: 20 }}
          >
            Sign In →
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

function AddProductModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', category: 'Spices', origin: '', price: '', description: '', details: '', badge: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const categories = ['Spices', 'Dates', 'Honey', 'Nuts', 'Dried Fruits'];

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = ev => {
        setImagePreview(ev.target.result);
        setForm(f => ({ ...f, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid rgba(73,115,54,0.2)', background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1a1a1a', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 6 };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.7)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{ background: '#F1F2C4', borderRadius: 24, padding: '40px 36px', width: '100%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#666' }}>×</button>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 28 }}>Add New Product</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Product Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Kashmiri Saffron" required />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select style={inputStyle} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Origin *</label>
              <input style={inputStyle} value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} placeholder="e.g. Kashmir, India" required />
            </div>
            <div>
              <label style={labelStyle}>Price</label>
              <input style={inputStyle} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. QAR 180 / 2g" />
            </div>
            <div>
              <label style={labelStyle}>Badge / Grade</label>
              <input style={inputStyle} value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} placeholder="e.g. Premium, Organic" />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Short Description *</label>
            <textarea rows={2} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief product description..." required />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Full Details</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.details} onChange={e => setForm(f => ({ ...f, details: e.target.value }))} placeholder="Detailed product information..." />
          </div>

          {/* Image upload */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Product Image</label>
            <div style={{ display: 'grid', gridTemplateColumns: imagePreview ? '1fr 1fr' : '1fr', gap: 12 }}>
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', border: '2px dashed rgba(73,115,54,0.3)', borderRadius: 12, background: 'white', cursor: 'pointer' }}>
                <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                <div style={{ fontSize: 28, marginBottom: 6 }}>📷</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Upload from device</div>
                <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>JPG, PNG, WebP</div>
              </label>
              {imagePreview && (
                <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1' }}>
                  <img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
            <div style={{ marginTop: 10 }}>
              <label style={{ ...labelStyle, marginBottom: 6 }}>Or paste image URL</label>
              <input style={inputStyle} value={imageFile ? '' : form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://..." disabled={!!imageFile} />
            </div>
          </div>

          <button type="submit" style={{ width: '100%', background: '#497336', color: '#F1F2C4', border: 'none', borderRadius: 50, padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
            Add Product →
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function AddCareerModal({ onClose, onSave }) {
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time', experience: '', salary: '', description: '', requirements: '', benefits: '' });
  const inputStyle = { width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid rgba(73,115,54,0.2)', background: 'white', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1a1a1a', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', marginBottom: 6 };

  const handleSubmit = (e) => {
    e.preventDefault();
    const career = {
      ...form,
      requirements: form.requirements.split('\n').filter(Boolean),
      benefits: form.benefits.split('\n').filter(Boolean),
    };
    onSave(career);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.7)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ background: '#F1F2C4', borderRadius: 24, padding: '40px 36px', width: '100%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#666' }}>×</button>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#1a1a1a', marginBottom: 28 }}>Add New Career</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Job Title *</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Business Development Executive" required />
            </div>
            <div>
              <label style={labelStyle}>Department *</label>
              <input style={inputStyle} value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} placeholder="e.g. Sales & Marketing" required />
            </div>
            <div>
              <label style={labelStyle}>Location *</label>
              <input style={inputStyle} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Doha, Qatar" required />
            </div>
            <div>
              <label style={labelStyle}>Job Type</label>
              <select style={inputStyle} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                {['Full-time', 'Part-time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Experience</label>
              <input style={inputStyle} value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))} placeholder="e.g. 3-5 years" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Salary</label>
              <input style={inputStyle} value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} placeholder="e.g. QAR 8,000 – 12,000" />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Job Description *</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the role and responsibilities..." required />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Requirements (one per line)</label>
            <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} placeholder={"Degree in relevant field\n3+ years experience\nFluent English"} />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Benefits (one per line)</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.benefits} onChange={e => setForm(f => ({ ...f, benefits: e.target.value }))} placeholder={"Health insurance\nAnnual flights\nPerformance bonus"} />
          </div>

          <button type="submit" style={{ width: '100%', background: '#497336', color: '#F1F2C4', border: 'none', borderRadius: 50, padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
            Add Career →
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function CropModal({ imageSrc, aspectRatio, onConfirm, onCancel }) {
  const MAX_W = 460;
  const MAX_H = 450;
  const CROP_W = Math.round(Math.min(MAX_W, MAX_H * aspectRatio));
  const CROP_H = Math.round(CROP_W / aspectRatio);

  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });
  const [minScale, setMinScale] = useState(1);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const ms = Math.max(CROP_W / img.naturalWidth, CROP_H / img.naturalHeight);
      setImgNatural({ w: img.naturalWidth, h: img.naturalHeight });
      setMinScale(ms);
      setScale(ms);
      setOffset({ x: 0, y: 0 });
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
  const moveDrag = (cx, cy) => {
    if (!dragRef.current) return;
    const { cx: sx, cy: sy, ox, oy } = dragRef.current;
    setOffset(clamp(ox + cx - sx, oy + cy - sy, scale));
  };
  const endDrag = () => { dragRef.current = null; };

  const changeScale = (v) => {
    const s = Math.max(minScale, Math.min(minScale * 3, parseFloat(v)));
    setScale(s);
    setOffset(o => clamp(o.x, o.y, s));
  };

  const doCrop = () => {
    const canvas = document.createElement('canvas');
    canvas.width = CROP_W;
    canvas.height = CROP_H;
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    img.onload = () => {
      ctx.drawImage(img, CROP_W / 2 + offset.x - dispW / 2, CROP_H / 2 + offset.y - dispH / 2, dispW, dispH);
      onConfirm(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.src = imageSrc;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.22 }}
        style={{ background: '#1a1a1a', borderRadius: 22, padding: '24px', width: 'fit-content', maxWidth: '100vw' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#F1F2C4', fontWeight: 600 }}>Crop Image</div>
            <div style={{ fontSize: 11, color: 'rgba(241,242,196,0.35)', letterSpacing: 0.5, marginTop: 2 }}>Drag to pan · scroll or slider to zoom</div>
          </div>
          <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'rgba(241,242,196,0.5)', fontSize: 24, cursor: 'pointer', padding: '0 0 0 16px', lineHeight: 1 }}>×</button>
        </div>

        {/* Crop frame */}
        <div
          style={{
            width: CROP_W, height: CROP_H,
            overflow: 'hidden', borderRadius: 8, position: 'relative',
            cursor: dragRef.current ? 'grabbing' : 'grab',
            border: '1.5px solid #BABF26',
            userSelect: 'none', touchAction: 'none',
          }}
          onMouseDown={e => startDrag(e.clientX, e.clientY)}
          onMouseMove={e => moveDrag(e.clientX, e.clientY)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onWheel={e => { e.preventDefault(); changeScale(scale - e.deltaY * 0.001 * minScale); }}
          onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={e => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); }}
          onTouchEnd={endDrag}
        >
          {imgNatural.w > 0 && (
            <img
              src={imageSrc}
              alt="crop"
              draggable={false}
              style={{
                position: 'absolute',
                width: dispW, height: dispH,
                left: CROP_W / 2 + offset.x - dispW / 2,
                top: CROP_H / 2 + offset.y - dispH / 2,
                pointerEvents: 'none', userSelect: 'none',
              }}
            />
          )}
          {/* Rule of thirds */}
          {['33.33%', '66.66%'].map(p => (
            <div key={'v' + p} style={{ position: 'absolute', left: p, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.13)', pointerEvents: 'none' }} />
          ))}
          {['33.33%', '66.66%'].map(p => (
            <div key={'h' + p} style={{ position: 'absolute', top: p, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.13)', pointerEvents: 'none' }} />
          ))}
          {/* Corner handles */}
          {[
            { top: 0, left: 0, borderTop: '2.5px solid #BABF26', borderLeft: '2.5px solid #BABF26' },
            { top: 0, right: 0, borderTop: '2.5px solid #BABF26', borderRight: '2.5px solid #BABF26' },
            { bottom: 0, left: 0, borderBottom: '2.5px solid #BABF26', borderLeft: '2.5px solid #BABF26' },
            { bottom: 0, right: 0, borderBottom: '2.5px solid #BABF26', borderRight: '2.5px solid #BABF26' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 20, height: 20, pointerEvents: 'none', ...s }} />
          ))}
        </div>

        {/* Zoom slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
          <span style={{ fontSize: 10, color: 'rgba(241,242,196,0.4)', textTransform: 'uppercase', letterSpacing: 1, minWidth: 34 }}>Zoom</span>
          <input
            type="range"
            min={minScale}
            max={minScale * 3}
            step={minScale * 0.01}
            value={scale}
            onChange={e => changeScale(e.target.value)}
            style={{ flex: 1, accentColor: '#BABF26' }}
          />
          <span style={{ fontSize: 10, color: 'rgba(241,242,196,0.4)', minWidth: 34, textAlign: 'right' }}>
            {minScale > 0 ? Math.round((scale / minScale) * 100) : 100}%
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button onClick={onCancel} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(241,242,196,0.15)', color: 'rgba(241,242,196,0.7)', borderRadius: 40, padding: '11px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={doCrop} style={{ flex: 2, background: '#BABF26', color: '#1a1a1a', border: 'none', borderRadius: 40, padding: '11px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.5 }}>Crop & Save →</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ImageCard({ imgKey, label, aspectRatio, currentUrl, onSave, onReset }) {
  const [urlInput, setUrlInput] = useState(currentUrl);
  const [preview, setPreview] = useState(currentUrl);
  const [saved, setSaved] = useState(false);
  const [cropSrc, setCropSrc] = useState(null);

  const ar = aspectRatio || 16 / 9;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setCropSrc(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropConfirm = (croppedUrl) => {
    setPreview(croppedUrl);
    setUrlInput(croppedUrl);
    setCropSrc(null);
  };

  const handleSave = () => {
    onSave(urlInput || preview);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    onReset();
    setSaved(false);
    setPreview(currentUrl);
    setUrlInput(currentUrl);
  };

  return (
    <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(73,115,54,0.1)' }}>
      {/* Preview — aspect ratio matches actual image slot */}
      <div style={{ position: 'relative', aspectRatio: ar, overflow: 'hidden', background: '#e8e9a8' }}>
        {preview ? (
          <img src={preview} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setPreview('')} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#aaa' }}>🖼️</div>
        )}
        {/* Upload overlay — triggers crop modal */}
        <label
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0)', cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.36)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
        >
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{ background: 'rgba(73,115,54,0.92)', color: '#F1F2C4', borderRadius: 40, padding: '8px 18px', fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}
          >
            📷 Upload & Crop
          </motion.div>
        </label>
      </div>

      <div style={{ padding: '14px 16px 18px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#497336', marginBottom: 8 }}>{label}</div>
        <input
          type="text"
          placeholder="Or paste image URL..."
          value={urlInput.startsWith('data:') ? '' : urlInput}
          onChange={e => { setUrlInput(e.target.value); if (e.target.value) setPreview(e.target.value); }}
          style={{ width: '100%', padding: '8px 11px', borderRadius: 8, border: '1.5px solid rgba(73,115,54,0.2)', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#1a1a1a', outline: 'none', marginBottom: 10, boxSizing: 'border-box' }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1, background: saved ? '#497336' : '#BABF26', color: saved ? '#F1F2C4' : '#1a1a1a',
              border: 'none', borderRadius: 40, padding: '9px 12px',
              fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 700,
              letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >{saved ? '✓ Saved!' : 'Save'}</button>
          <button
            onClick={handleReset}
            style={{ background: 'rgba(73,115,54,0.08)', border: '1px solid rgba(73,115,54,0.15)', color: '#497336', borderRadius: 40, padding: '9px 12px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
          >↺ Reset</button>
        </div>
      </div>

      {/* Crop modal rendered into document.body via portal */}
      {cropSrc && createPortal(
        <CropModal
          imageSrc={cropSrc}
          aspectRatio={ar}
          onConfirm={handleCropConfirm}
          onCancel={() => setCropSrc(null)}
        />,
        document.body
      )}
    </div>
  );
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [careers, setCareers] = useState([]);
  const [images, setImages] = useState({});
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCareer, setShowAddCareer] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (loggedIn) {
      setProducts(getProducts());
      setCareers(getCareers());
      setImages(getImages());
    }
  }, [loggedIn]);

  const handleAddProduct = (data) => {
    addProduct(data);
    setProducts(getProducts());
  };

  const handleAddCareer = (data) => {
    addCareer(data);
    setCareers(getCareers());
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    setProducts(getProducts());
    setConfirmDelete(null);
  };

  const handleDeleteCareer = (id) => {
    deleteCareer(id);
    setCareers(getCareers());
    setConfirmDelete(null);
  };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const tabBtn = (tab, label, emoji) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        padding: '10px 24px', borderRadius: 40, border: 'none', cursor: 'pointer',
        background: activeTab === tab ? '#497336' : 'transparent',
        color: activeTab === tab ? '#F1F2C4' : '#497336',
        fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
        letterSpacing: 1, transition: 'all 0.2s',
      }}
    >{emoji} {label}</button>
  );

  return (
    <div style={{ background: '#F1F2C4', minHeight: '100vh', paddingTop: 80 }}>
      {/* Admin Header */}
      <div style={{ background: '#497336', padding: '28px 0', borderBottom: '2px solid #BABF26' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 700, color: '#F1F2C4', letterSpacing: 2 }}>LAYMA</div>
            <div style={{ fontSize: 9, color: '#BABF26', letterSpacing: 4, textTransform: 'uppercase' }}>ADMIN PANEL</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'rgba(241,242,196,0.7)' }}>Logged in as <strong style={{ color: '#BABF26' }}>LAYMA_GLOBAL</strong></span>
            <button
              onClick={() => setLoggedIn(false)}
              style={{ background: 'rgba(186,191,38,0.2)', border: '1px solid rgba(186,191,38,0.4)', color: '#BABF26', borderRadius: 40, padding: '8px 20px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1 }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'white', padding: '24px 0', borderBottom: '1px solid rgba(73,115,54,0.1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24 }}>
            {[
              { label: 'Total Products', value: products.length, emoji: '📦' },
              { label: 'Open Positions', value: careers.length, emoji: '💼' },
              { label: 'Categories', value: [...new Set(products.map(p => p.category))].length, emoji: '🏷️' },
              { label: 'Locations', value: [...new Set(careers.map(c => c.location))].length, emoji: '📍' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{s.emoji}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 700, color: '#497336', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: '#999', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container" style={{ paddingTop: 40 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, background: 'white', borderRadius: 50, padding: 6, width: 'fit-content', border: '1px solid rgba(73,115,54,0.1)' }}>
          {tabBtn('products', 'Products', '📦')}
          {tabBtn('careers', 'Careers', '💼')}
          {tabBtn('images', 'Site Images', '🖼️')}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#1a1a1a' }}>Product Catalogue</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                style={{ background: '#BABF26', color: '#1a1a1a', border: 'none', borderRadius: 40, padding: '12px 28px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                + Add Product
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, paddingBottom: 80 }}>
              {products.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ background: 'white', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(73,115,54,0.08)' }}
                >
                  <div style={{ aspectRatio: '4/3', backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', background: p.image ? undefined : '#e8e9a8' }}>
                    {!p.image && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>📦</div>}
                    {p.badge && (
                      <div style={{ position: 'absolute', top: 10, left: 10, background: '#BABF26', borderRadius: 40, padding: '3px 10px', fontSize: 10, fontWeight: 700, letterSpacing: 1, color: '#1a1a1a' }}>{p.badge}</div>
                    )}
                  </div>
                  <div style={{ padding: '16px 18px 20px' }}>
                    <div style={{ fontSize: 10, color: '#497336', letterSpacing: 1, marginBottom: 4 }}>{p.category} · {p.origin}</div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#497336', marginBottom: 12 }}>{p.price}</div>
                    <button
                      onClick={() => setConfirmDelete({ type: 'product', id: p.id, name: p.name })}
                      style={{ width: '100%', background: 'rgba(192,57,43,0.1)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 40, padding: '8px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}
                    >
                      🗑 Remove
                    </button>
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
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#1a1a1a' }}>Career Listings</h2>
              <button
                onClick={() => setShowAddCareer(true)}
                style={{ background: '#BABF26', color: '#1a1a1a', border: 'none', borderRadius: 40, padding: '12px 28px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}
              >
                + Add Career
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 80 }}>
              {careers.map(c => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ background: 'white', borderRadius: 20, padding: '28px 28px', border: '1px solid rgba(73,115,54,0.08)', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                      <span style={{ background: 'rgba(73,115,54,0.1)', color: '#497336', borderRadius: 40, padding: '3px 10px', fontSize: 11, fontWeight: 600, letterSpacing: 1 }}>{c.department}</span>
                      <span style={{ background: 'rgba(186,191,38,0.15)', color: '#8a8f0a', borderRadius: 40, padding: '3px 10px', fontSize: 11 }}>{c.type}</span>
                    </div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontSize: 13, color: '#777' }}>📍 {c.location} · 💼 {c.experience} · 💰 {c.salary}</div>
                  </div>
                  <button
                    onClick={() => setConfirmDelete({ type: 'career', id: c.id, name: c.title })}
                    style={{ background: 'rgba(192,57,43,0.1)', color: '#c0392b', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 40, padding: '8px 20px', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', flexShrink: 0 }}
                  >
                    🗑 Remove
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div style={{ paddingBottom: 80 }}>
            <div style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 600, color: '#1a1a1a', marginBottom: 8 }}>Site Images</h2>
              <p style={{ fontSize: 14, color: '#888' }}>Upload from your device or paste a URL to replace any image across the website. Changes apply instantly.</p>
            </div>

            {/* Group by page */}
            {Array.from(new Set(Object.values(initialImages).map(img => img.page))).map(page => (
              <div key={page} style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ display: 'inline-block', width: 24, height: 2, background: '#BABF26' }} />
                  {page}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                  {Object.entries(initialImages)
                    .filter(([, v]) => v.page === page)
                    .map(([key, meta]) => {
                      const currentUrl = images[key]?.url || meta.url;
                      return (
                        <ImageCard
                          key={key}
                          imgKey={key}
                          label={meta.label}
                          aspectRatio={meta.aspectRatio || 16 / 9}
                          currentUrl={currentUrl}
                          onSave={(url) => {
                            updateSiteImage(key, url);
                            setImages(getImages());
                          }}
                          onReset={() => {
                            updateSiteImage(key, meta.url);
                            setImages(getImages());
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.7)', backdropFilter: 'blur(8px)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{ background: '#F1F2C4', borderRadius: 24, padding: '40px 36px', maxWidth: 400, width: '100%', textAlign: 'center' }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: '#1a1a1a', marginBottom: 12 }}>Confirm Delete</h3>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 28 }}>Are you sure you want to remove <strong>"{confirmDelete.name}"</strong>? This cannot be undone.</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, background: 'transparent', border: '1.5px solid rgba(73,115,54,0.3)', color: '#497336', borderRadius: 40, padding: '12px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button
                  onClick={() => confirmDelete.type === 'product' ? handleDeleteProduct(confirmDelete.id) : handleDeleteCareer(confirmDelete.id)}
                  style={{ flex: 1, background: '#c0392b', color: 'white', border: 'none', borderRadius: 40, padding: '12px', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Modals */}
      <AnimatePresence>
        {showAddProduct && <AddProductModal onClose={() => setShowAddProduct(false)} onSave={handleAddProduct} />}
        {showAddCareer && <AddCareerModal onClose={() => setShowAddCareer(false)} onSave={handleAddCareer} />}
      </AnimatePresence>
    </div>
  );
}
