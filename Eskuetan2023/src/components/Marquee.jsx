import { useShop } from '../context/ShopContext';

export default function Marquee() {
  const { t } = useShop();
  const items = [t('mq.ship'), t('mq.shop'), t('mq.since'), t('mq.tagline')];
  const doubled = [...items, ...items];

  return (
    <div className="marquee">
      <div className="marquee-content">
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            <span className="dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
