import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { getProduct, getProducts } from '../data/store';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const p = getProduct(id);
    setProduct(p);
    if (p) {
      const all = getProducts();
      setRelated(all.filter(x => x.category === p.category && x.id !== p.id).slice(0, 3));
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F2C4' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🌿</div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: '#497336' }}>Product not found</p>
          <Link to="/products" style={{ color: '#497336', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 1 }}>← Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F1F2C4', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ paddingTop: 100, paddingBottom: 20, background: 'white', borderBottom: '1px solid rgba(73,115,54,0.1)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#999' }}>
            <Link to="/" style={{ color: '#497336', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link to="/products" style={{ color: '#497336', textDecoration: 'none' }}>Products</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main product */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="two-col">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              style={{ position: 'sticky', top: 120 }}
            >
              <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', aspectRatio: '1' }}>
                {!imgLoaded && (
                  <div style={{ position: 'absolute', inset: 0, background: '#e8e9a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 48 }}>🌿</div>
                  </div>
                )}
                <motion.img
                  src={product.image}
                  alt={product.name}
                  onLoad={() => setImgLoaded(true)}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: imgLoaded ? 'block' : 'none' }}
                />
                {product.badge && (
                  <div style={{
                    position: 'absolute', top: 20, left: 20,
                    background: '#BABF26', borderRadius: 40,
                    padding: '6px 16px', fontSize: 12, fontWeight: 700,
                    letterSpacing: 1.5, textTransform: 'uppercase', color: '#1a1a1a',
                  }}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Origin badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: 20, background: '#497336', borderRadius: 20, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}
              >
                <div style={{ fontSize: 32 }}>📍</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#BABF26', marginBottom: 4 }}>Origin</div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#F1F2C4' }}>{product.origin}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 12 }}>
                {product.category}
              </div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.05, marginBottom: 20 }}>
                {product.name}
              </h1>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#497336', marginBottom: 28 }}>
                {product.price}
              </div>

              <p style={{ fontSize: 16, lineHeight: 1.85, color: '#555', marginBottom: 20 }}>{product.description}</p>

              <div style={{ height: 1, background: 'rgba(73,115,54,0.12)', margin: '28px 0' }} />

              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 16 }}>Product Details</h3>
              <p style={{ fontSize: 15, lineHeight: 1.85, color: '#555', marginBottom: 28 }}>{product.details}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 36 }}>
                {[
                  { label: 'Category', value: product.category },
                  { label: 'Origin', value: product.origin },
                  { label: 'Grade', value: product.badge || 'Premium' },
                  { label: 'Availability', value: 'In Stock' },
                ].map(item => (
                  <div key={item.label} style={{ background: 'white', borderRadius: 12, padding: '14px 16px', border: '1px solid rgba(73,115,54,0.1)' }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#497336', color: '#F1F2C4',
                textDecoration: 'none', padding: '16px 36px', borderRadius: 50,
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600,
                letterSpacing: 1.5, textTransform: 'uppercase', marginRight: 12,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(73,115,54,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Enquire Now
              </Link>
              <Link to="/products" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                color: '#497336', textDecoration: 'none',
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                letterSpacing: 1, borderBottom: '2px solid #BABF26', paddingBottom: 2,
              }}>
                ← More Products
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: '60px 0 100px', background: 'white' }}>
          <div className="container">
            <ScrollReveal>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 600, color: '#1a1a1a', marginBottom: 40 }}>
                More {product.category}
              </h2>
            </ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1}>
                  <Link to={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      style={{ background: '#F1F2C4', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(73,115,54,0.08)' }}
                    >
                      <div style={{ aspectRatio: '4/3', backgroundImage: `url(${p.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <div style={{ padding: '16px 18px' }}>
                        <div style={{ fontSize: 11, color: '#497336', marginBottom: 4 }}>{p.origin}</div>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 600, color: '#1a1a1a' }}>{p.name}</div>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: '#497336', marginTop: 4 }}>{p.price}</div>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </div>
  );
}
