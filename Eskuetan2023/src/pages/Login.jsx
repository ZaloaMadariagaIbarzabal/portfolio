import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function Login() {
  const { t, showToast } = useShop();
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');

  const fakeLogin = (e) => {
    e.preventDefault();
    showToast(t('login.toast.ok'));
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <section className="view active">
      <div className="section">
        <div className="auth-container">
          <h2><span>{t('login.h1')}</span> <span className="yellow">{t('login.h2')}</span></h2>
          <p className="subtitle">{t('login.sub')}</p>
          <div className="auth-tabs">
            <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>
              {t('login.tab1')}
            </button>
            <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>
              {t('login.tab2')}
            </button>
          </div>

          {tab === 'login' ? (
            <form onSubmit={fakeLogin}>
              <div className="form-group">
                <label>{t('login.email')}</label>
                <input type="email" placeholder="tu@email.com" required />
              </div>
              <div className="form-group">
                <label>{t('login.pass')}</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button className="btn" type="submit" style={{ width: '100%' }}>{t('login.btn1')}</button>
              <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: "'Caveat',cursive", fontWeight: 700 }}>
                <span>{t('login.forgot')}</span> <a style={{ color: 'var(--rust)', cursor: 'pointer' }}>{t('login.recover')}</a>
              </p>
            </form>
          ) : (
            <form onSubmit={fakeLogin}>
              <div className="form-group">
                <label>{t('login.name')}</label>
                <input type="text" placeholder={t('login.ph.name')} required />
              </div>
              <div className="form-group">
                <label>{t('login.email')}</label>
                <input type="email" placeholder="tu@email.com" required />
              </div>
              <div className="form-group">
                <label>{t('login.pass')}</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <button className="btn" type="submit" style={{ width: '100%' }}>{t('login.btn2')}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
