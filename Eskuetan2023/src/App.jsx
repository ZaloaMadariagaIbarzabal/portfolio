import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Sell from './pages/Sell';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ShopProvider>
      <ScrollToTop />
      <Navbar />
      <Marquee />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/favoritos" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vender" element={<Sell />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
      <Footer />
      <Toast />
    </ShopProvider>
  );
}
