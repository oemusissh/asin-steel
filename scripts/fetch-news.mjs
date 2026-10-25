// اجرا: node scripts/fetch-news.mjs
// فیدها را می‌خواند و خبرها را در src/data/news.json ذخیره می‌کند.
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { FEEDS, KEYWORDS, EXCLUDE, SETTINGS } from '../src/data/news-sources.js';

const FILE = fileURLToPath(new URL('../src/data/news.json', import.meta.url));
const UA = 'Mozilla/5.0 (compatible; AsinSteelNews/1.0)';

const idOf = (link) => createHash('sha1').update(link).digest('hex').slice(0, 12);

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');

const strip = (s) => decode(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? m[1] : '';
};

const attr = (block, name, a) => {
  const m = block.match(new RegExp(`<${name}\\s[^>]*${a}=["']([^"']+)["']`, 'i'));
  return m ? decode(m[1]) : '';
};

function findImage(block) {
  const enc = block.match(/<enclosure\s[^>]*>/i)?.[0] ?? '';
  if (/image/i.test(enc)) {
    const u = enc.match(/url=["']([^"']+)["']/i)?.[1];
    if (u) return decode(u);
  }
  const media = attr(block, 'media:thumbnail', 'url') || attr(block, 'media:content', 'url');
  if (media) return media;
  return decode(block).match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || undefined;
}

function paragraphs(html, minLen) {
  const seen = new Set();
  const out = [];
  for (const m of decode(html).matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = strip(m[1]);
    if (t.length >= minLen && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

// متن کامل را از صفحه‌ی خبر می‌گیرد؛ اگر ساختار صفحه قابل‌تشخیص نبود چیزی برنمی‌گرداند
async function fetchArticle(link) {
  try {
    const res = await fetch(link, { signal: AbortSignal.timeout(12000), headers: { 'User-Agent': UA } });
    if (!res.ok) return {};
    const html = await res.text();
    const scope = html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html;
    const content = paragraphs(scope, 40);
    const image = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1];
    return { content: content.join('').length >= 400 ? content : undefined, image };
  } catch {
    return {};
  }
}

function parseFeed(xml, feed) {
  const blocks = xml.match(/<(item|entry)[\s>][\s\S]*?<\/\1>/gi) ?? [];
  const out = [];
  for (const b of blocks) {
    const title = strip(tag(b, 'title'));
    const link = strip(tag(b, 'link')) || attr(b, 'link', 'href');
    const date = Date.parse(strip(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated') || tag(b, 'dc:date')));
    let excerpt = strip(tag(b, 'description') || tag(b, 'summary') || tag(b, 'content:encoded'));
    if (excerpt.length > 220) excerpt = excerpt.slice(0, 220).replace(/\s\S*$/, '') + '…';
    if (!title || !link || Number.isNaN(date)) continue;
    const item = { id: idOf(link), title, link, date, source: feed.name, excerpt, image: findImage(b) };
    if (feed.full) {
      const full = paragraphs(tag(b, 'content:encoded'), 40);
      if (full.join('').length >= 400) item.content = full;
    }
    out.push(item);
  }
  return out;
}

async function load(feed) {
  const res = await fetch(feed.url, {
    signal: AbortSignal.timeout(15000),
    headers: { 'User-Agent': UA, Accept: 'application/rss+xml, application/xml, text/xml' },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const items = parseFeed(await res.text(), feed);
  const kept = feed.all
    ? items
    : items.filter((i) => {
        const text = i.title + ' ' + i.excerpt;
        return KEYWORDS.some((k) => text.includes(k)) && !EXCLUDE.some((k) => text.includes(k));
      });
  console.log(`[news] ${feed.name} (${feed.url}): ${items.length} خبر در فید، ${kept.length} مرتبط`);
  return kept;
}

async function main() {
  let stored = [];
  try {
    stored = JSON.parse(await fs.readFile(FILE, 'utf-8'));
  } catch {}

  const results = await Promise.allSettled(FEEDS.map(load));
  results.forEach((r, n) => r.status === 'rejected' && console.warn('[news] failed:', FEEDS[n].url, r.reason?.message));

  const byId = new Map(stored.map((i) => [i.id, i]));
  for (const r of results) {
    if (r.status !== 'fulfilled') continue;
    for (const it of r.value) {
      const old = byId.get(it.id);
      byId.set(it.id, old ? { ...it, content: old.content ?? it.content, image: old.image ?? it.image } : it);
    }
  }

  // دریافت متن کامل برای خبرهای منابع full
  const fullSources = new Set(FEEDS.filter((f) => f.full).map((f) => f.name));
  const need = [...byId.values()]
    .filter((i) => fullSources.has(i.source) && !i.content)
    .sort((a, b) => b.date - a.date)
    .slice(0, SETTINGS.maxFullPerRun);
  for (const i of need) {
    const got = await fetchArticle(i.link);
    if (got.content) i.content = got.content;
    if (!i.image && got.image) i.image = got.image;
  }

  const minDate = Date.now() - SETTINGS.maxAgeDays * 86400000;
  const perSource = new Map();
  const seen = new Set();
  const items = [...byId.values()]
    .filter((i) => i.date >= minDate && i.date <= Date.now() + 86400000)
    .sort((a, b) => b.date - a.date)
    .filter((i) => {
      if (seen.has(i.title)) return false;
      seen.add(i.title);
      const n = (perSource.get(i.source) ?? 0) + 1;
      perSource.set(i.source, n);
      return n <= SETTINGS.maxPerSource;
    })
    .slice(0, SETTINGS.maxItems);

  await fs.writeFile(FILE, JSON.stringify(items, null, 1) + '\n', 'utf-8');
  console.log(`[news] ذخیره شد: ${items.length} خبر (${items.filter((i) => i.content).length} خبر با متن کامل)`);
}

main().catch((e) => {
  console.error('[news] خطا:', e);
  process.exit(1);
});
