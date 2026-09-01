import { IMG_MAP } from './imageMap';

const FALLBACK = 'https://images.pexels.com/photos/16891088/pexels-photo-16891088.jpeg?auto=compress&cs=tinysrgb&w=1600';

export function pImg(product) {
  return IMG_MAP[product.img] || FALLBACK;
}
