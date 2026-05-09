import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import { getProducts } from '../data/store';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filtered = products;

  return (
    <div>
      {/* Hero */}
      <section className="prod-hero-section" style={{ paddingTop: 160, paddingBottom: 64, background: '#F1F2C4' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: '#497336', fontWeight: 600, marginBottom: 16 }}>Our Catalogue</div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 600, color: '#1a1a1a', lineHeight: 1.05, marginBottom: 0 }}>
              Premium <em style={{ color: '#497336' }}>Products</em>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="prod-section" style={{ padding: '64px 0 100px', background: '#F1F2C4' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#999' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24 }}>No products found</p>
            </div>
          ) : (
            <motion.div
              layout
              className="products-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}
            >
              <AnimatePresence>
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                      <motion.div
                        className="product-card"
                        whileHover={{ y: -8 }}
                        style={{
                          background: 'white',
                          borderRadius: 24,
                          overflow: 'hidden',
                          border: '1px solid rgba(73,115,54,0.08)',
                          transition: 'box-shadow 0.3s',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 24px 60px rgba(73,115,54,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                      >
                        <div className="prod-img-wrap" style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.5 }}
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundImage: `url(${product.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                          {product.badge && (
                            <div className="prod-badge" style={{
                              position: 'absolute',
                              top: 14,
                              left: 14,
                              background: '#BABF26',
                              borderRadius: 40,
                              padding: '4px 12px',
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: 1,
                              color: '#1a1a1a',
                              textTransform: 'uppercase',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              maxWidth: 'calc(100% - 28px)',
                              textOverflow: 'ellipsis',
                            }}>
                              {product.badge}
                            </div>
                          )}
                          <div className="prod-cat-pill" style={{
                            position: 'absolute',
                            top: 14,
                            right: 14,
                            background: 'rgba(73,115,54,0.9)',
                            borderRadius: 40,
                            padding: '4px 12px',
                            fontSize: 11,
                            fontWeight: 500,
                            color: '#F1F2C4',
                          }}>
                            {product.category}
                          </div>
                        </div>
                        <div className="prod-card-body" style={{ padding: '18px 20px 22px' }}>
                          <div className="prod-origin" style={{ fontSize: 11, color: '#497336', letterSpacing: 1, marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📍 {product.origin}</div>
                          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: '#1a1a1a', marginBottom: 8, lineHeight: 1.2 }}>
                            {product.name}
                          </h3>
                          <p className="prod-desc" style={{ fontSize: 13, color: '#888', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {product.description}
                          </p>
                          <div className="prod-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                            <span className="prod-price" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600, color: '#497336' }}>{product.price}</span>
                            <span className="prod-view-link" style={{ fontSize: 12, color: '#497336', fontWeight: 600, letterSpacing: 1, flexShrink: 0 }}>View Details →</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
      <style>{`
        @media (max-width: 640px) {
          .prod-hero-section { padding-top: 120px !important; padding-bottom: 40px !important; text-align: center !important; }
          .prod-section { padding: 28px 0 60px !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .product-card { border-radius: 14px !important; }
          .prod-img-wrap { aspect-ratio: 1/1 !important; }
          .prod-badge { font-size: 9px !important; padding: 2px 7px !important; top: 6px !important; left: 6px !important; max-width: calc(100% - 12px) !important; letter-spacing: 0.5px !important; }
          .prod-cat-pill { display: none !important; }
          .prod-card-body { padding: 9px 10px 11px !important; }
          .prod-origin { font-size: 9px !important; margin-bottom: 3px !important; letter-spacing: 0.3px !important; }
          .products-grid h3 { font-size: 13px !important; margin-bottom: 5px !important; line-height: 1.25 !important; }
          .prod-desc { display: none !important; }
          .prod-footer { gap: 0 !important; }
          .prod-price { font-size: 14px !important; }
          .prod-view-link { display: none !important; }
        }
      `}</style>
    </div>
  );
}
