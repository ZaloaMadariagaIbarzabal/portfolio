import { useShop } from '../context/ShopContext';

export default function Sell() {
  const { t, showToast } = useShop();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(t('sell.toast'));
    e.target.reset();
  };

  return (
    <section className="view active">
      <div className="section">
        <form className="sell-container" onSubmit={handleSubmit}>
          <h2><span>{t('sell.h1')}</span> <span className="yellow">{t('sell.h2')}</span></h2>
          <p style={{ textAlign: 'center', fontFamily: "'Caveat',cursive", fontWeight: 700, fontSize: '1.3rem', color: 'var(--rust)', marginBottom: '2rem' }}>
            {t('sell.sub')}
          </p>

          <div className="form-group">
            <label>{t('sell.f.photos')}</label>
            <div className="upload-zone" onClick={() => showToast(t('sell.toast.file'))}>
              <div className="icon">+</div>
              <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.1rem' }}>{t('sell.upload.dnd')}</p>
              <p style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, color: 'var(--rust)', marginTop: '0.5rem' }}>{t('sell.upload.lim')}</p>
            </div>
          </div>

          <div className="form-group">
            <label>{t('sell.f.name')}</label>
            <input type="text" placeholder={t('sell.ph.name')} />
          </div>

          <div className="form-group">
            <label>{t('sell.f.cat')}</label>
            <select defaultValue="">
              <option value="" disabled>{t('sell.opt.choose')}</option>
              <option value="ropa">{t('sell.opt.clothes')}</option>
              <option value="complementos">{t('sell.opt.acc')}</option>
              <option value="bisuteria">{t('sell.opt.jewel')}</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>{t('sell.f.size')}</label>
              <select>
                <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
                <option>{t('cat.f.unique')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('sell.f.cond')}</label>
              <select>
                <option>{t('sell.cond.new')}</option>
                <option>{t('sell.cond.like')}</option>
                <option>{t('sell.cond.good')}</option>
                <option>{t('sell.cond.vint')}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>{t('sell.f.price')}</label>
            <input type="number" placeholder="25" />
          </div>

          <div className="form-group">
            <label>{t('sell.f.desc')}</label>
            <textarea rows="4" placeholder={t('sell.ph.desc')} />
          </div>

          <button className="btn" type="submit" style={{ width: '100%' }}>{t('sell.btn')}</button>
        </form>
      </div>
    </section>
  );
}
