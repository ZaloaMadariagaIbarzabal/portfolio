import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const { t, lang, setLang, cartCount } = useShop();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) navigate(`/catalogo?buscar=${encodeURIComponent(value)}`);
  };

  return (
    <nav>
      <div className="logo-nav" onClick={() => navigate('/')}>
        <div className="name">Eskuetan</div>
        <div className="by">~ bilbo ~</div>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>{t('nav.home')}</NavLink></li>
        <li><NavLink to="/catalogo" className={({ isActive }) => (isActive ? 'active' : '')}>{t('nav.catalog')}</NavLink></li>
        <li><NavLink to="/vender" className={({ isActive }) => (isActive ? 'active' : '')}>{t('nav.sell')}</NavLink></li>
        <li><NavLink to="/favoritos" className={({ isActive }) => (isActive ? 'active' : '')}>{t('nav.favs')}</NavLink></li>
        <li><NavLink to="/sobre" className={({ isActive }) => (isActive ? 'active' : '')}>{t('nav.about')}</NavLink></li>
      </ul>
      <div className="nav-actions">
        <div className="lang-switch">
          <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLang('es')}>ES</button>
          <button className={`lang-btn ${lang === 'eu' ? 'active' : ''}`} onClick={() => setLang('eu')}>EU</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
        </div>
        <input
          type="text"
          className="search-bar"
          placeholder={t('nav.search')}
          value={search}
          onChange={handleSearch}
        />
        <button className="nav-icon" onClick={() => navigate('/login')}>
          <span>{t('nav.login')}</span>
        </button>
        <button className="nav-icon" onClick={() => navigate('/carrito')}>
          <span>{t('nav.cart')}</span>
          <span className="badge">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}
