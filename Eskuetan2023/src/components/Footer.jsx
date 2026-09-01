import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { t } = useShop();
  const navigate = useNavigate();

  const goCatalogFiltered = (cat) => navigate(`/catalogo?cat=${cat}`);

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo-nav" style={{ marginBottom: '1rem' }}>
            <div className="name" style={{ color: 'var(--yellow)', WebkitTextStroke: '2px var(--cream)' }}>Eskuetan</div>
          </div>
          <p>
            <span>{t('foot.tag')}</span><br />
            <span>{t('foot.tag2')}</span>
          </p>
        </div>
        <div className="footer-col">
          <h4>{t('foot.col1')}</h4>
          <ul>
            <li onClick={() => navigate('/catalogo')}>{t('nav.catalog')}</li>
            <li onClick={() => goCatalogFiltered('ropa')}>{t('cat.ropa.h')}</li>
            <li onClick={() => goCatalogFiltered('complementos')}>{t('cat.comp.h')}</li>
            <li onClick={() => goCatalogFiltered('bisuteria')}>{t('cat.bis.h')}</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{t('foot.col2')}</h4>
          <ul>
            <li onClick={() => navigate('/login')}>{t('foot.login')}</li>
            <li onClick={() => navigate('/vender')}>{t('nav.sell')}</li>
            <li onClick={() => navigate('/favoritos')}>{t('nav.favs')}</li>
            <li onClick={() => navigate('/carrito')}>{t('nav.cart')}</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{t('foot.col3')}</h4>
          <ul>
            <li>📍 Botikazar 14 · Bilbo</li>
            <li>📧 hola@eskuetan.eus</li>
            <li>📞 944 12 34 56</li>
            <li>Lun-Sáb 10:00-20:00</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        ~ <span className="yellow">eskuetan</span> · © 2026 · bilbo · made with care ~
      </div>
    </footer>
  );
}
