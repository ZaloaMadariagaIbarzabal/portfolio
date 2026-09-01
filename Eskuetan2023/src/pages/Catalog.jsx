import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'U'];

export default function Catalog() {
  const { t, productName } = useShop();
  const [searchParams] = useSearchParams();

  const [cat, setCat] = useState(searchParams.get('cat') || 'all');
  const [size, setSize] = useState('all');
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState('default');
  const search = searchParams.get('buscar') || '';

  // Si llegamos desde un enlace externo (home/footer) con ?cat=, sincronizamos el filtro
  useEffect(() => {
    const paramCat = searchParams.get('cat');
    if (paramCat) setCat(paramCat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (cat !== 'all' && p.cat !== cat) return false;
      if (size !== 'all' && p.talla !== size) return false;
      if (p.precio > maxPrice) return false;
      if (search && !productName(p).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.precio - b.precio);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.precio - a.precio);
    if (sort === 'name') list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre));
    return list;
  }, [cat, size, maxPrice, search, sort, productName]);

  const resetFilters = () => {
    setCat('all'); setSize('all'); setMaxPrice(200); setSort('default');
  };

  return (
    <section className="view active">
      <div className="section" style={{ paddingTop: '2rem' }}>
        <div className="section-header">
          <h2><span>{t('cat.title.t1')}</span> <span className="underline">{t('cat.title.t2')}</span></h2>
          <div className="meta">
            ~ {filtered.length} {filtered.length === 1 ? t('result_one') : t('results')} ~
          </div>
        </div>
        <div className="catalog-layout">
          <aside className="filters">
            <h3>{t('cat.filters')}</h3>

            <div className="filter-group">
              <label>{t('cat.f.cat')}</label>
              <div className="filter-options">
                <button className={`filter-tag ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>{t('cat.f.all')}</button>
                <button className={`filter-tag ${cat === 'ropa' ? 'active' : ''}`} onClick={() => setCat('ropa')}>{t('cat.ropa.h')}</button>
                <button className={`filter-tag ${cat === 'complementos' ? 'active' : ''}`} onClick={() => setCat('complementos')}>{t('cat.comp.h')}</button>
                <button className={`filter-tag ${cat === 'bisuteria' ? 'active' : ''}`} onClick={() => setCat('bisuteria')}>{t('cat.bis.h')}</button>
              </div>
            </div>

            <div className="filter-group">
              <label>{t('cat.f.size')}</label>
              <div className="filter-options">
                <button className={`filter-tag ${size === 'all' ? 'active' : ''}`} onClick={() => setSize('all')}>{t('cat.f.sizes')}</button>
                {SIZES.map((s) => (
                  <button key={s} className={`filter-tag ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>
                    {s === 'U' ? t('cat.f.unique') : s}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label>{t('cat.f.pricemax')} <span style={{ color: 'var(--rust)' }}>{maxPrice}€</span></label>
              <div className="price-range">
                <input
                  type="range" min="0" max="200" value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
              <div className="price-display"><span>0€</span><span>200€</span></div>
            </div>

            <div className="filter-group">
              <label>{t('cat.f.sort')}</label>
              <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">{t('cat.f.sort.default')}</option>
                <option value="price-asc">{t('cat.f.sort.priceasc')}</option>
                <option value="price-desc">{t('cat.f.sort.pricedesc')}</option>
                <option value="name">{t('cat.f.sort.name')}</option>
              </select>
            </div>

            <button className="reset-btn" onClick={resetFilters}>{t('cat.f.reset')}</button>
          </aside>

          <div className="products-grid">
            {filtered.length === 0 ? (
              <div className="empty-state" style={{ gridColumn: '1/-1' }}>
                <h3>{t('empty.h')}</h3>
                <p>{t('empty.p')}</p>
                <button className="btn" onClick={resetFilters}>{t('empty.btn')}</button>
              </div>
            ) : (
              filtered.map((p) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
