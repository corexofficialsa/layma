import { initialProducts, initialCareers, initialImages, initialExportProducts, initialExportCareers, initialGlobalTeam, initialExportTeam } from './initialData';
import { supabase } from '../lib/supabaseClient';

const PRODUCTS_KEY = 'layma_products';
const CAREERS_KEY = 'layma_careers';
const IMAGES_KEY = 'layma_images';
const EXPORT_PRODUCTS_KEY = 'layma_export_products';
const EXPORT_CAREERS_KEY = 'layma_export_careers';
const TEAM_KEY = 'layma_team';
const EXPORT_TEAM_KEY = 'layma_export_team';
const DATA_VERSION = 'layma_data_v5';

// Reset data when version changes so seed updates take effect
if (localStorage.getItem(DATA_VERSION) !== '5') {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(CAREERS_KEY);
  localStorage.removeItem(IMAGES_KEY);
  localStorage.removeItem(EXPORT_PRODUCTS_KEY);
  localStorage.removeItem(EXPORT_CAREERS_KEY);
  localStorage.removeItem('layma_data_v4');
  localStorage.setItem(DATA_VERSION, '5');
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
seed(TEAM_KEY, initialGlobalTeam);
seed(EXPORT_TEAM_KEY, initialExportTeam);

// Seed team with defaults if stored as empty (from old version)
const TEAM_INIT_KEY = 'layma_team_init_v1';
if (!localStorage.getItem(TEAM_INIT_KEY)) {
  if (JSON.parse(localStorage.getItem(TEAM_KEY) || '[]').length === 0) {
    localStorage.setItem(TEAM_KEY, JSON.stringify(initialGlobalTeam));
  }
  if (JSON.parse(localStorage.getItem(EXPORT_TEAM_KEY) || '[]').length === 0) {
    localStorage.setItem(EXPORT_TEAM_KEY, JSON.stringify(initialExportTeam));
  }
  localStorage.setItem(TEAM_INIT_KEY, '1');
}

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

export function updateProduct(id, data) {
  saveProducts(getProducts().map(p => p.id === id ? { ...p, ...data } : p));
  if (supabase) supabase.from('products').update(data).eq('id', id).then(({ error }) => { if (error) console.warn('Supabase product update failed:', error.message); });
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
  if (supabase) supabase.from('careers').insert(newCareer).then(({ error }) => { if (error) console.warn('Supabase career save failed:', error.message); });
  return newCareer;
}

export function updateCareer(id, data) {
  saveCareers(getCareers().map(c => c.id === id ? { ...c, ...data } : c));
  if (supabase) supabase.from('careers').update(data).eq('id', id).then(({ error }) => { if (error) console.warn('Supabase career update failed:', error.message); });
}

export function deleteCareer(id) {
  saveCareers(getCareers().filter(c => c.id !== id));
  if (supabase) supabase.from('careers').delete().eq('id', id).then(({ error }) => { if (error) console.warn('Supabase career delete failed:', error.message); });
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

export function updateExportProduct(id, data) {
  localStorage.setItem(EXPORT_PRODUCTS_KEY, JSON.stringify(getExportProducts().map(p => p.id === id ? { ...p, ...data } : p)));
  if (supabase) supabase.from('export_products').update(data).eq('id', id).then(({ error }) => { if (error) console.warn('Supabase export product update failed:', error.message); });
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
  window.dispatchEvent(new Event('layma_team_updated'));
  if (supabase) supabase.from('team').insert(m).then(({ error }) => { if (error) console.warn('Supabase team save failed:', error.message); });
  return m;
}
export function updateTeamMember(id, data) {
  const updated = getTeam().map(m => m.id === id ? { ...m, ...data } : m);
  localStorage.setItem(TEAM_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('layma_team_updated'));
  const member = updated.find(m => m.id === id);
  if (supabase && member) supabase.from('team').upsert(member, { onConflict: 'id' }).then(({ error }) => { if (error) console.warn('Supabase team update failed:', error.message); });
}
export function deleteTeamMember(id) {
  localStorage.setItem(TEAM_KEY, JSON.stringify(getTeam().filter(m => m.id !== id)));
  window.dispatchEvent(new Event('layma_team_updated'));
  if (supabase) supabase.from('team').delete().eq('id', id).then(({ error }) => { if (error) console.warn('Supabase team delete failed:', error.message); });
}

export function getExportTeam() {
  return JSON.parse(localStorage.getItem(EXPORT_TEAM_KEY) || '[]');
}
export function addExportTeamMember(member) {
  const team = getExportTeam();
  const m = { ...member, id: 'expt_' + Date.now() };
  localStorage.setItem(EXPORT_TEAM_KEY, JSON.stringify([...team, m]));
  window.dispatchEvent(new Event('layma_team_updated'));
  if (supabase) supabase.from('export_team').insert(m).then(({ error }) => { if (error) console.warn('Supabase export team save failed:', error.message); });
  return m;
}
export function updateExportTeamMember(id, data) {
  const updated = getExportTeam().map(m => m.id === id ? { ...m, ...data } : m);
  localStorage.setItem(EXPORT_TEAM_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('layma_team_updated'));
  const member = updated.find(m => m.id === id);
  if (supabase && member) supabase.from('export_team').upsert(member, { onConflict: 'id' }).then(({ error }) => { if (error) console.warn('Supabase export team update failed:', error.message); });
}
export function deleteExportTeamMember(id) {
  localStorage.setItem(EXPORT_TEAM_KEY, JSON.stringify(getExportTeam().filter(m => m.id !== id)));
  window.dispatchEvent(new Event('layma_team_updated'));
  if (supabase) supabase.from('export_team').delete().eq('id', id).then(({ error }) => { if (error) console.warn('Supabase export team delete failed:', error.message); });
}

function mergeTeam(remote, localKey) {
  const local = JSON.parse(localStorage.getItem(localKey) || '[]');
  // Build map of local members so we can preserve images Supabase doesn't have
  const localMap = Object.fromEntries(local.map(m => [m.id, m]));
  // Include all remote members (merged with local image if remote image missing)
  const merged = remote.map(r => ({ ...r, image: r.image || localMap[r.id]?.image || '' }));
  // Also keep any local-only members Supabase doesn't know about
  const remoteIds = new Set(remote.map(r => r.id));
  local.forEach(m => { if (!remoteIds.has(m.id)) merged.push(m); });
  return merged;
}

export async function syncTeamFromSupabase() {
  if (!supabase) return;
  try {
    const [{ data: team, error: e1 }, { data: expTeam, error: e2 }] = await Promise.all([
      supabase.from('team').select('*'),
      supabase.from('export_team').select('*'),
    ]);
    if (!e1 && team?.length) localStorage.setItem(TEAM_KEY, JSON.stringify(mergeTeam(team, TEAM_KEY)));
    if (!e2 && expTeam?.length) localStorage.setItem(EXPORT_TEAM_KEY, JSON.stringify(mergeTeam(expTeam, EXPORT_TEAM_KEY)));
    window.dispatchEvent(new Event('layma_team_updated'));
  } catch (e) {
    console.warn('Supabase team sync failed, using local cache:', e.message);
  }
}

// ── Export Careers ──
export function getExportCareers() {
  return JSON.parse(localStorage.getItem(EXPORT_CAREERS_KEY) || '[]');
}

export function addExportCareer(career) {
  const careers = getExportCareers();
  const newCareer = { ...career, id: 'expc_' + Date.now(), posted: new Date().toISOString().split('T')[0] };
  localStorage.setItem(EXPORT_CAREERS_KEY, JSON.stringify([...careers, newCareer]));
  if (supabase) supabase.from('export_careers').insert(newCareer).then(({ error }) => { if (error) console.warn('Supabase export career save failed:', error.message); });
  return newCareer;
}

export function updateExportCareer(id, data) {
  localStorage.setItem(EXPORT_CAREERS_KEY, JSON.stringify(getExportCareers().map(c => c.id === id ? { ...c, ...data } : c)));
  if (supabase) supabase.from('export_careers').update(data).eq('id', id).then(({ error }) => { if (error) console.warn('Supabase export career update failed:', error.message); });
}

export function deleteExportCareer(id) {
  localStorage.setItem(EXPORT_CAREERS_KEY, JSON.stringify(getExportCareers().filter(c => c.id !== id)));
  if (supabase) supabase.from('export_careers').delete().eq('id', id).then(({ error }) => { if (error) console.warn('Supabase export career delete failed:', error.message); });
}

// Sync careers from Supabase on app load
export async function syncCareersFromSupabase() {
  if (!supabase) return;
  try {
    const [{ data: careers, error: e1 }, { data: expCareers, error: e2 }] = await Promise.all([
      supabase.from('careers').select('*'),
      supabase.from('export_careers').select('*'),
    ]);
    if (!e1 && careers?.length) localStorage.setItem(CAREERS_KEY, JSON.stringify(careers));
    if (!e2 && expCareers?.length) localStorage.setItem(EXPORT_CAREERS_KEY, JSON.stringify(expCareers));
    window.dispatchEvent(new Event('layma_careers_updated'));
  } catch (e) {
    console.warn('Supabase career sync failed, using local cache:', e.message);
  }
}
