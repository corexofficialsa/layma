import { initialProducts, initialCareers, initialImages, initialExportProducts, initialExportCareers } from './initialData';
import { supabase } from '../lib/supabaseClient';

const PRODUCTS_KEY = 'layma_products';
const CAREERS_KEY = 'layma_careers';
const IMAGES_KEY = 'layma_images';
const EXPORT_PRODUCTS_KEY = 'layma_export_products';
const EXPORT_CAREERS_KEY = 'layma_export_careers';
const DATA_VERSION = 'layma_data_v4';

// Reset data when version changes so seed updates take effect
if (localStorage.getItem(DATA_VERSION) !== '4') {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(CAREERS_KEY);
  localStorage.removeItem(IMAGES_KEY);
  localStorage.removeItem(EXPORT_PRODUCTS_KEY);
  localStorage.removeItem(EXPORT_CAREERS_KEY);
  localStorage.setItem(DATA_VERSION, '4');
}

function seed(key, initial) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(initial));
  }
}

seed(PRODUCTS_KEY, initialProducts);
seed(CAREERS_KEY, initialCareers);
seed(IMAGES_KEY, initialImages);
seed(EXPORT_PRODUCTS_KEY, initialExportProducts);
seed(EXPORT_CAREERS_KEY, initialExportCareers);

export function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function getProduct(id) {
  return getProducts().find(p => p.id === id);
}

export function addProduct(product) {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
  saveProducts([...products, newProduct]);
  return newProduct;
}

export function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
}

export function getCareers() {
  return JSON.parse(localStorage.getItem(CAREERS_KEY) || '[]');
}

export function saveCareers(careers) {
  localStorage.setItem(CAREERS_KEY, JSON.stringify(careers));
}

export function getCareer(id) {
  return getCareers().find(c => c.id === id);
}

export function addCareer(career) {
  const careers = getCareers();
  const newCareer = { ...career, id: Date.now().toString(), posted: new Date().toISOString().split('T')[0] };
  saveCareers([...careers, newCareer]);
  return newCareer;
}

export function deleteCareer(id) {
  saveCareers(getCareers().filter(c => c.id !== id));
}

// ── Site Images ──
export function getImages() {
  return JSON.parse(localStorage.getItem(IMAGES_KEY) || '{}');
}

export function getSiteImage(key) {
  const imgs = getImages();
  return imgs[key]?.url || initialImages[key]?.url || '';
}

// Fetch all images from Supabase and cache locally — call on app load
export async function syncImagesFromSupabase() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase.from('site_images').select('key, url');
    if (error) throw error;
    if (!data?.length) return;
    const imgs = getImages();
    data.forEach(({ key, url }) => { imgs[key] = { ...imgs[key], url }; });
    localStorage.setItem(IMAGES_KEY, JSON.stringify(imgs));
    window.dispatchEvent(new Event('layma_images_updated'));
  } catch (e) {
    console.warn('Supabase image sync failed, using local cache:', e.message);
  }
}

export function updateSiteImage(key, url) {
  // Save to localStorage instantly so UI updates immediately
  try {
    const imgs = getImages();
    imgs[key] = { ...imgs[key], url };
    localStorage.setItem(IMAGES_KEY, JSON.stringify(imgs));
    window.dispatchEvent(new Event('layma_images_updated'));
  } catch {
    window.dispatchEvent(new CustomEvent('layma_images_error', { detail: 'Storage full — try a smaller image or use a URL instead.' }));
    return false;
  }
  // Also save to Supabase in background so all visitors see the update
  if (supabase) {
    supabase.from('site_images').upsert({ key, url }, { onConflict: 'key' })
      .then(({ error }) => { if (error) console.warn('Supabase image save failed:', error.message); });
  }
  return true;
}

// ── Export Products ──
export function getExportProducts() {
  return JSON.parse(localStorage.getItem(EXPORT_PRODUCTS_KEY) || '[]');
}

export function addExportProduct(product) {
  const products = getExportProducts();
  const newProduct = { ...product, id: 'exp_' + Date.now() };
  localStorage.setItem(EXPORT_PRODUCTS_KEY, JSON.stringify([...products, newProduct]));
  return newProduct;
}

export function deleteExportProduct(id) {
  localStorage.setItem(EXPORT_PRODUCTS_KEY, JSON.stringify(getExportProducts().filter(p => p.id !== id)));
}

// ── Export Careers ──
export function getExportCareers() {
  return JSON.parse(localStorage.getItem(EXPORT_CAREERS_KEY) || '[]');
}

export function addExportCareer(career) {
  const careers = getExportCareers();
  const newCareer = { ...career, id: 'expc_' + Date.now(), posted: new Date().toISOString().split('T')[0] };
  localStorage.setItem(EXPORT_CAREERS_KEY, JSON.stringify([...careers, newCareer]));
  return newCareer;
}

export function deleteExportCareer(id) {
  localStorage.setItem(EXPORT_CAREERS_KEY, JSON.stringify(getExportCareers().filter(c => c.id !== id)));
}
