import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { pImg } from '../data/pImg';

export default function Cart() {
  const { t, productName, cart, changeQty, removeFromCart, checkout, cartTotals } = useShop();
  const navigate = useNavigate();

  const handleCheckout = () => {
    checkout();
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <section className="view active">
      <div className="section">
        <div className="section-header">
          <h2><span>{t('cart.t1')}</span> <span className="underline">{t('cart.t2')}</span></h2>
          <div className="meta">{t('cart.meta')}</div>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <h3>{t('cart.empty.h')}</h3>
            <p>{t('cart.empty.p')}</p>
            <Link to="/catalogo" className="btn">{t('cart.empty.btn')}</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div>
              {cart.map((c) => {
                const p = PRODUCTS.find((x) => x.id === c.id);
                if (!p) return null;
                return (
                  <div className="cart-item" key={c.id}>
                    <img src={pImg(p)} alt={productName(p)} />
                    <div>
                      <h4>{productName(p)}</h4>
                      <div style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, color: 'var(--rust)' }}>
                        talla {p.talla}
                      </div>
                      <div className="price">{(p.precio * c.qty).toFixed(2)}€</div>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => changeQty(c.id, -1)}>−</button>
                        <span>{c.qty}</span>
                        <button className="qty-btn" onClick={() => changeQty(c.id, 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(c.id)}>✕</button>
                  </div>
                );
              })}
            </div>
            <div className="cart-summary">
              <h3>{t('cart.summary')}</h3>
              <div className="summary-row"><span>{t('cart.subtotal')}</span><span>{cartTotals.subtotal.toFixed(2)}€</span></div>
              <div className="summary-row">
                <span>{t('cart.shipping')}</span>
                <span>{cartTotals.shipping === 0 ? t('cart.shipfree').toUpperCase() : `${cartTotals.shipping.toFixed(2)}€`}</span>
              </div>
              <div className="summary-row total"><span>{t('cart.total').toUpperCase()}</span><span>{cartTotals.total.toFixed(2)}€</span></div>
              <button className="btn" style={{ width: '100%', marginTop: '1rem' }} onClick={handleCheckout}>
                {t('cart.checkout')}
              </button>
              <p style={{ textAlign: 'center', fontFamily: "'Caveat',cursive", fontWeight: 700, marginTop: '0.8rem' }}>
                {cartTotals.subtotal < 50
                  ? `~ faltan ${(50 - cartTotals.subtotal).toFixed(2)}€ para envío gratis ~`
                  : '~ tienes envío gratis ~'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
