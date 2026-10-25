import raw from '../data/news.json';
import { SETTINGS } from '../data/news-sources.js';

export interface NewsItem {
  id: string;
  title: string;
  link: string; // آدرس خبر اصلی؛ فقط برای canonical استفاده می‌شود و در صفحه نمایش داده نمی‌شود
  date: number;
  source: string;
  excerpt: string;
  image?: string;
  content?: string[];
}

const sorted: NewsItem[] = [...(raw as NewsItem[])].sort((a, b) => b.date - a.date);

// ترتیب نمایش: به ترتیب تاریخ، ولی بیش از دو خبر پشت‌سرهم از یک منبع نیاید
function diversify(items: NewsItem[]): NewsItem[] {
  const pool = [...items];
  const out: NewsItem[] = [];
  while (pool.length) {
    const a = out[out.length - 1]?.source;
    const b = out[out.length - 2]?.source;
    let k = pool.findIndex((i) => !(i.source === a && i.source === b));
    if (k < 0) k = 0;
    out.push(pool.splice(k, 1)[0]);
  }
  return out;
}

const all = diversify(sorted);

export const getNews = () => all;
export const getNewsById = (id: string) => all.find((i) => i.id === id);

// اسلایدر: تازه‌ترین خبرهای دارای عکس، حداکثر دو خبر از هر منبع
export function getSlides(max = 5): NewsItem[] {
  const per = new Map<string, number>();
  const out: NewsItem[] = [];
  for (const it of sorted) {
    if (!it.image) continue;
    const c = per.get(it.source) ?? 0;
    if (c >= 2) continue;
    per.set(it.source, c + 1);
    out.push(it);
    if (out.length >= max) break;
  }
  return out;
}

export function getListing(page = 1) {
  const slides = getSlides();
  const ids = new Set(slides.map((s) => s.id));
  const pool = all.filter((n) => !ids.has(n.id));
  const pages = Math.max(1, Math.ceil(pool.length / SETTINGS.perPage));
  const current = Math.min(Math.max(page, 1), pages);
  return {
    slides: current === 1 ? slides : [],
    items: pool.slice((current - 1) * SETTINGS.perPage, current * SETTINGS.perPage),
    pages,
    current,
    empty: all.length === 0,
  };
}
