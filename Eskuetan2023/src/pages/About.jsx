import { useShop } from '../context/ShopContext';

export default function About() {
  const { t } = useShop();

  return (
    <section className="view active">
      <div className="section" style={{ maxWidth: 800, textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '3.5rem', marginBottom: '1rem' }}>
          <span>{t('about.h1')}</span>{' '}
          <span style={{ color: 'var(--yellow)', WebkitTextStroke: '3px var(--black)', fontFamily: "'Alfa Slab One',serif" }}>
            {t('about.h2')}
          </span>
        </h1>
        <div className="meta" style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, color: 'var(--rust)', fontSize: '1.5rem', marginBottom: '2rem', transform: 'rotate(-1deg)', display: 'inline-block' }}>
          {t('about.meta')}
        </div>
        <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{t('about.p1')}</p>
        <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{t('about.p2')}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          <div style={{ background: 'var(--yellow-bright)', border: '3px solid var(--black)', padding: '1.5rem', boxShadow: '5px 5px 0 var(--black)' }}>
            <div style={{ fontFamily: "'Alfa Slab One',serif", fontSize: '2.5rem', color: 'var(--rust)' }}>2.500+</div>
            <div style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, fontSize: '1.1rem' }}>{t('about.stat1')}</div>
          </div>
          <div style={{ background: 'var(--cream)', border: '3px solid var(--black)', padding: '1.5rem', boxShadow: '5px 5px 0 var(--black)' }}>
            <div style={{ fontFamily: "'Alfa Slab One',serif", fontSize: '2.5rem', color: 'var(--rust)' }}>800+</div>
            <div style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, fontSize: '1.1rem' }}>{t('about.stat2')}</div>
          </div>
          <div style={{ background: 'var(--rust)', color: 'var(--cream)', border: '3px solid var(--black)', padding: '1.5rem', boxShadow: '5px 5px 0 var(--black)' }}>
            <div style={{ fontFamily: "'Alfa Slab One',serif", fontSize: '2.5rem', color: 'var(--yellow)' }}>1.200kg</div>
            <div style={{ fontFamily: "'Caveat',cursive", fontWeight: 700, fontSize: '1.1rem' }}>{t('about.stat3')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
