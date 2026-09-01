import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext(null);

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem('eskuetan_lang') || 'es');
  const [cart, setCart] = useState(() => readLS('eskuetan_cart', []));
  const [wishlist, setWishlist] = useState(() => readLS('eskuetan_wishlist', []));
  const [toast, setToast] = useState('');

  useEffect(() => { localStorage.setItem('eskuetan_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('eskuetan_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('eskuetan_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const setLang = useCallback((l) => setLangState(l), []);

  const t = useCallback((key) => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[lang] || entry.es || key;
  }, [lang]);

  const productName = useCallback((p) => p[`nombre_${lang}`] || p.nombre, [lang]);
  const productDesc = useCallback((p) => p[`desc_${lang}`] || p.desc, [lang]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => setToast(''), 2200);
  }, []);

  const addToCart = useCallback((id) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) {
        return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { id, qty: 1 }];
    });
    showToast(t('det.toast.added'));
  }, [showToast, t]);

  const changeQty = useCallback((id, delta) => {
    setCart((prev) => {
      const next = prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const checkout = useCallback(() => {
    if (cart.length === 0) return;
    showToast(t('cart.toast.ok'));
    setCart([]);
  }, [cart, showToast, t]);

  const toggleFav = useCallback((id) => {
    setWishlist((prev) => {
      const isFav = prev.includes(id);
      showToast(isFav ? t('det.toast.unfav') : t('det.toast.fav'));
      return isFav ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }, [showToast, t]);

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);

  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((s, c) => {
      const p = PRODUCTS.find((x) => x.id === c.id);
      return s + (p ? p.precio * c.qty : 0);
    }, 0);
    const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.95;
    return { subtotal, shipping, total: subtotal + shipping };
  }, [cart]);

  const value = {
    lang, setLang, t, productName, productDesc,
    cart, addToCart, changeQty, removeFromCart, checkout, cartCount, cartTotals,
    wishlist, toggleFav,
    toast, showToast,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop debe usarse dentro de <ShopProvider>');
  return ctx;
}
