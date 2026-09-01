import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { pImg } from '../data/pImg';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { productName, wishlist, toggleFav } = useShop();
  const isFav = wishlist.includes(product.id);
  const hasDiscount = Boolean(product.antes);
  const discountPct = hasDiscount ? Math.round((1 - product.precio / product.antes) * 100) : 0;

  return (
    <div className="product-card" onClick={() => navigate(`/producto/${product.id}`)}>
      <div className="product-img">
        <img src={pImg(product)} alt={productName(product)} loading="lazy" />
        {hasDiscount && <span className="product-tag sale">-{discountPct}%</span>}
        <button
          className={`fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleFav(product.id); }}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
      <div className="product-info">
        <h3>{productName(product)}</h3>
        <div className="product-meta">talla {product.talla} · {product.marca}</div>
        <div className="product-price">
          {product.precio}€{hasDiscount && <span className="old">{product.antes}€</span>}
        </div>
      </div>
    </div>
  );
}
