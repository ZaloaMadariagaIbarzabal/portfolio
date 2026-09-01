import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { t, wishlist } = useShop();
  const favs = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <section className="view active">
      <div className="section">
        <div className="section-header">
          <h2><span>{t('wish.t1')}</span> <span className="underline">{t('wish.t2')}</span></h2>
          <div className="meta">{t('wish.meta')}</div>
        </div>

        {favs.length === 0 ? (
          <div className="empty-state">
            <h3>{t('wish.empty.h')}</h3>
            <p>{t('wish.empty.p')}</p>
            <Link to="/catalogo" className="btn">{t('wish.empty.btn')}</Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {favs.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
