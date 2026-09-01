import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { pImg } from '../data/pImg';

export default function ProductDetail() {
  const { id } = useParams();
  const { t, productName, productDesc, wishlist, toggleFav, addToCart } = useShop();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  const sizes = product && product.talla === 'U' ? ['Única'] : ['XS', 'S', 'M', 'L', 'XL'];
  const [selectedSize, setSelectedSize] = useState(product ? product.talla : null);

  if (!product) {
    return (
      <section className="view active">
        <div className="section">
          <div className="empty-state">
            <h3>{t('empty.h')}</h3>
            <Link to="/catalogo" className="btn">{t('cart.empty.btn')}</Link>
          </div>
        </div>
      </section>
    );
  }

  const isFav = wishlist.includes(product.id);

  return (
    <section className="view active">
      <div className="section">
        <div className="detail-layout">
          <div className="detail-img-main">
            <img src={pImg(product)} alt={productName(product)} />
          </div>
          <div className="detail-info">
            <div className="breadcrumb">~ {product.cat} ~</div>
            <h1>{productName(product)}</h1>
            <div className="price-block">
              {product.precio}€{product.antes && <span className="old">{product.antes}€</span>}
            </div>
            <p>{productDesc(product)}</p>
            <label style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, fontSize: '1.2rem', color: 'var(--rust)' }}>
              {t('det.size')}
            </label>
            <div className="size-selector">
              {sizes.map((s) => (
                <button
                  key={s}
                  className={`size-opt ${s === selectedSize || (product.talla === 'U' && s === 'Única') ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="detail-actions">
              <button className="btn" onClick={() => addToCart(product.id)}>{t('det.addcart')}</button>
              <button className="btn btn-outline" onClick={() => toggleFav(product.id)}>
                {isFav ? t('det.favyes') : t('det.favadd')}
              </button>
            </div>
            <div className="seller-info">
              <h4>{t('det.seller')}</h4>
              <p style={{ marginTop: '0.3rem' }}>Eskuetan Bilbo · ⭐ 4.9 (450+ ventas)</p>
            </div>
            <div className="delivery-info">
              ✦ envío en 24-48h<br />
              ✦ devolución gratis 14 días<br />
              ✦ pago seguro · visa, paypal, bizum<br />
              ✦ también en tienda · botikazar 14, bilbo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
