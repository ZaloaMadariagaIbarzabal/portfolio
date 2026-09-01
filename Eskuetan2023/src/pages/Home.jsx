import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const FEATURED_IDS = [1, 12, 18, 7, 22, 10, 15, 3];

export default function Home() {
  const { t } = useShop();
  const navigate = useNavigate();
  const featured = FEATURED_IDS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="view active">
      <div className="hero">
        <img className="hero-mural" src="/images/mural_banner.jpg" alt="Mural ESKUETAN, Bilbo" />
        <div className="hero-tagline-box">{t('hero.tag')}</div>
      </div>

      <div className="hero-buttons-container">
        <div className="hero-buttons">
          <div className="hero-text-block">
            <span>{t('hero.lead1')}</span> <strong>{t('hero.lead2')}</strong> <span>{t('hero.lead3')}</span><br />
            <span>{t('hero.lead4')}</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => navigate('/catalogo')}>{t('hero.btn1')}</button>
            <button className="btn btn-outline" onClick={() => navigate('/vender')}>{t('hero.btn2')}</button>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2><span>{t('home.cats.t1')}</span> <span className="underline">{t('home.cats.t2')}</span></h2>
          <div className="meta">{t('home.cats.meta')}</div>
        </div>
        <div className="categories">
          <div className="cat-card" onClick={() => navigate('/catalogo?cat=ropa')}>
            <span className="cat-icon">◫</span>
            <h3>{t('cat.ropa.h')}</h3>
            <p>{t('cat.ropa.p')}</p>
          </div>
          <div className="cat-card" onClick={() => navigate('/catalogo?cat=complementos')}>
            <span className="cat-icon">▦</span>
            <h3>{t('cat.comp.h')}</h3>
            <p>{t('cat.comp.p')}</p>
          </div>
          <div className="cat-card" onClick={() => navigate('/catalogo?cat=bisuteria')}>
            <span className="cat-icon">◯</span>
            <h3>{t('cat.bis.h')}</h3>
            <p>{t('cat.bis.p')}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2><span>{t('home.wanted.t1')}</span> <span className="underline">{t('home.wanted.t2')}</span></h2>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }} onClick={() => navigate('/catalogo')}>
            {t('home.viewall')}
          </button>
        </div>
        <div className="products-grid">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="section no-paper" style={{ margin: '4rem -2rem 0', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', background: 'var(--cream)', padding: '3rem 2rem', border: '3px solid var(--black)', boxShadow: '8px 8px 0 var(--rust)' }}>
          <div className="meta" style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, fontSize: '1.5rem', color: 'var(--rust)', transform: 'rotate(-2deg)', display: 'inline-block', marginBottom: '1rem' }}>
            {t('home.manif.meta')}
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            <span>{t('home.manif.t1')}</span> <span style={{ color: 'var(--yellow)', WebkitTextStroke: '2px var(--black)', fontFamily: "'Alfa Slab One',serif" }}>{t('home.manif.t2')}</span>
          </h2>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', maxWidth: 650, margin: '0 auto' }}>
            {t('home.manif.p')}
          </p>
        </div>
      </section>
    </section>
  );
}
