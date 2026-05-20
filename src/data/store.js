import { initialProducts, initialCareers, initialImages, initialExportProducts, initialExportCareers } from './initialData';
import { supabase } from '../lib/supabaseClient';

const PRODUCTS_KEY = 'layma_products';
const CAREERS_KEY = 'layma_careers';
const IMAGES_KEY = 'layma_images';
const EXPORT_PRODUCTS_KEY = 'layma_export_products';
const EXPORT_CAREERS_KEY = 'layma_export_careers';
const TEAM_KEY = 'layma_team';
const EXPORT_TEAM_KEY = 'layma_export_team';
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
seed(TEAM_KEY, []);
seed(EXPORT_TEAM_KEY, []);

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
  if (supabase) supabase.from('products').insert(newProduct).then(({ error }) => { if (error) console.warn('Supabase product save failed:', error.message); });
  return newProduct;
}

export function deleteProduct(id) {
  saveProducts(getProducts().filter(p => p.id !== id));
  if (supabase) supabase.from('products').delete().eq('id', id).then(({ error }) => { if (error) console.warn('Supabase product delete failed:', error.message); });
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

// Sync products from Supabase on app load
export async function syncProductsFromSupabase() {
  if (!supabase) return;
  try {
    const [{ data: prods, error: e1 }, { data: expProds, error: e2 }] = await Promise.all([
      supabase.from('products').select('*'),
      supabase.from('export_products').select('*'),
    ]);
    if (!e1 && prods?.length) localStorage.setItem(PRODUCTS_KEY, JSON.stringify(prods));
    if (!e2 && expProds?.length) localStorage.setItem(EXPORT_PRODUCTS_KEY, JSON.stringify(expProds));
    window.dispatchEvent(new Event('layma_products_updated'));
  } catch (e) {
    console.warn('Supabase product sync failed, using local cache:', e.message);
  }
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
  if (supabase) supabase.from('export_products').insert(newProduct).then(({ error }) => { if (error) console.warn('Supabase export product save failed:', error.message); });
  return newProduct;
}

export function deleteExportProduct(id) {
  localStorage.setItem(EXPORT_PRODUCTS_KEY, JSON.stringify(getExportProducts().filter(p => p.id !== id)));
  if (supabase) supabase.from('export_products').delete().eq('id', id).then(({ error }) => { if (error) console.warn('Supabase export product delete failed:', error.message); });
}

// ── Team ──
export function getTeam() {
  return JSON.parse(localStorage.getItem(TEAM_KEY) || '[]');
}
export function addTeamMember(member) {
  const team = getTeam();
  const m = { ...member, id: Date.now().toString() };
  localStorage.setItem(TEAM_KEY, JSON.stringify([...team, m]));
  return m;
}
export function updateTeamMember(id, data) {
  localStorage.setItem(TEAM_KEY, JSON.stringify(getTeam().map(m => m.id === id ? { ...m, ...data } : m)));
}
export function deleteTeamMember(id) {
  localStorage.setItem(TEAM_KEY, JSON.stringify(getTeam().filter(m => m.id !== id)));
}

export function getExportTeam() {
  return JSON.parse(localStorage.getItem(EXPORT_TEAM_KEY) || '[]');
}
export function addExportTeamMember(member) {
  const team = getExportTeam();
  const m = { ...member, id: 'expt_' + Date.now() };
  localStorage.setItem(EXPORT_TEAM_KEY, JSON.stringify([...team, m]));
  return m;
}
export function updateExportTeamMember(id, data) {
  localStorage.setItem(EXPORT_TEAM_KEY, JSON.stringify(getExportTeam().map(m => m.id === id ? { ...m, ...data } : m)));
}
export function deleteExportTeamMember(id) {
  localStorage.setItem(EXPORT_TEAM_KEY, JSON.stringify(getExportTeam().filter(m => m.id !== id)));
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
