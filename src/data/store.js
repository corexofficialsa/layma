import { initialProducts, initialCareers, initialImages } from './initialData';

const PRODUCTS_KEY = 'layma_products';
const CAREERS_KEY = 'layma_careers';
const IMAGES_KEY = 'layma_images';
const DATA_VERSION = 'layma_data_v2';

// Reset data when version changes so seed updates take effect
if (localStorage.getItem(DATA_VERSION) !== '2') {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(CAREERS_KEY);
  localStorage.setItem(DATA_VERSION, '2');
}

function seed(key, initial) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(initial));
  }
}

seed(PRODUCTS_KEY, initialProducts);
seed(CAREERS_KEY, initialCareers);
seed(IMAGES_KEY, initialImages);

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

export function updateSiteImage(key, url) {
  const imgs = getImages();
  imgs[key] = { ...imgs[key], url };
  localStorage.setItem(IMAGES_KEY, JSON.stringify(imgs));
  window.dispatchEvent(new Event('layma_images_updated'));
}
