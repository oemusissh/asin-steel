// ASIN STEEL SEO patch — اجرا از ریشه‌ی پروژه:  node apply-seo.mjs   (برای پیش‌نمایش: node apply-seo.mjs --dry)
import fs from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry');
const root = process.cwd();
const pagesDir = path.join(root, 'src', 'pages');
if (!fs.existsSync(path.join(root, 'package.json')) || !fs.existsSync(pagesDir)) {
  console.error('❌ این فایل را در ریشه‌ی پروژه (کنار package.json) اجرا کنید.');
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupDir = path.join(root, `.seo-backup-${stamp}`);
const changed = [];
const notes = [];

function save(file, content) {
  const rel = path.relative(root, file);
  if (!DRY) {
    const dest = path.join(backupDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(file, dest);
    fs.writeFileSync(file, content, 'utf8');
  }
  changed.push(rel);
}
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith('.astro') ? [p] : [];
  });
}

// ---------- 1) noindex برای صفحه‌های خصوصی ----------
const privateFiles = ['login', 'register', 'account', 'cart', 'checkout', 'wishlist', 'track-order', 'shipping-info-combined', 'supabase-test']
  .map((n) => path.join(pagesDir, `${n}.astro`));
const privateDirs = ['account', 'admin'].map((d) => path.join(pagesDir, d));
const privateAll = [...privateFiles.filter(fs.existsSync), ...privateDirs.filter(fs.existsSync).flatMap(walk)];

for (const f of privateAll) {
  let src = fs.readFileSync(f, 'utf8');
  const m = src.match(/<BaseLayout\b[^>]*>/);
  if (!m) { notes.push(`⚠️ ${path.relative(root, f)}: تگ BaseLayout پیدا نشد؛ دستی noindex بگذارید.`); continue; }
  if (/\bnoindex\b/.test(m[0])) continue;
  src = src.replace('<BaseLayout', '<BaseLayout noindex={true}');
  save(f, src);
}

// ---------- 2) توضیح (description) برای صفحه‌های عمومی که ندارند ----------
const descriptions = {
  'index': 'آسین استیل: استعلام قیمت روز ورق، میلگرد، تیرآهن، پروفیل و نبشی، ماشین‌حساب وزن فولاد و ثبت سفارش آنلاین.',
  'products': 'فهرست ورق، میلگرد، تیرآهن، نبشی، ناودانی و پروفیل با مشخصات فنی و امکان استعلام و ثبت سفارش از آسین استیل.',
  'Price-list': 'لیست قیمت روز ورق و مقاطع فولادی آسین استیل با تاریخ به‌روزرسانی.',
  'deals': 'پیشنهادهای ویژه ورق و آهن‌آلات آسین استیل را ببینید و استعلام بگیرید.',
  'news': 'آخرین اخبار قیمت و بازار آهن، ورق و فولاد در ایران از آسین استیل.',
  'blog': 'راهنمای خرید و مقالات آموزشی درباره‌ی ورق، میلگرد و مقاطع فولادی.',
  'solutions': 'راهکارهای تأمین ورق و آهن‌آلات برای پروژه‌های ساختمانی و صنعتی.',
  'faq': 'پاسخ سؤالات رایج درباره‌ی ثبت سفارش، پرداخت، ارسال و استعلام قیمت.',
  'about-us': 'آسین استیل تأمین‌کننده‌ی ورق و مقاطع فولادی است.',
  'contact': 'راه‌های ارتباط با آسین استیل برای استعلام و ثبت سفارش.',
  'shipping-info': 'شرایط ارسال سفارش‌های ورق و آهن‌آلات، هزینه و زمان تحویل.',
  'returns': 'شرایط و مراحل مرجوع کردن سفارش در آسین استیل.',
  'support': 'راه‌های ارتباط با پشتیبانی آسین استیل.',
  'help': 'راهنمای استفاده از سایت آسین استیل.',
  'terms': 'قوانین و مقررات استفاده از سایت آسین استیل.',
  'privacy': 'نحوه‌ی نگهداری و استفاده از اطلاعات کاربران در آسین استیل.',
  'press': 'آخرین اخبار رسانه‌ای آسین استیل.',
  'careers': 'فرصت‌های شغلی آسین استیل.',
};
for (const [name, desc] of Object.entries(descriptions)) {
  const f = path.join(pagesDir, `${name}.astro`);
  if (!fs.existsSync(f)) continue;
  let src = fs.readFileSync(f, 'utf8');
  const m = src.match(/<BaseLayout\b[^>]*>/);
  if (!m) { notes.push(`⚠️ ${name}.astro: BaseLayout پیدا نشد؛ description را دستی بگذارید.`); continue; }
  if (/\bdescription\s*=/.test(m[0])) continue;
  src = src.replace('<BaseLayout', `<BaseLayout description="${desc}"`);
  save(f, src);
}

// ---------- 3) فیلتر sitemap ----------
const cfg = ['astro.config.mjs', 'astro.config.ts', 'astro.config.js'].map((n) => path.join(root, n)).find(fs.existsSync);
if (cfg) {
  let src = fs.readFileSync(cfg, 'utf8');
  if (/sitemap\(\s*\)/.test(src)) {
    src = src.replace(/sitemap\(\s*\)/, `sitemap({\n      filter: (page) => !/\\/(account|admin|cart|checkout|wishlist|login|register|track-order|supabase-test|shipping-info-combined)(\\/|$)/.test(page),\n    })`);
    save(cfg, src);
  } else if (!/filter\s*:/.test(src)) {
    notes.push('⚠️ astro.config: sitemap() ساده نبود؛ فیلتر را دستی اضافه کنید (راهنما در پیام).');
  }
} else notes.push('⚠️ فایل astro.config پیدا نشد.');

// ---------- 4) BaseLayout: عنوان با برند، Open Graph، Organization ----------
const layout = path.join(root, 'src', 'layouts', 'BaseLayout.astro');
if (fs.existsSync(layout)) {
  let src = fs.readFileSync(layout, 'utf8');
  if (!src.includes('og:title') && !src.includes('__full')) {
    const lines = src.split('\n');
    const fences = lines.map((l, i) => (l.trim() === '---' ? i : -1)).filter((i) => i >= 0);
    if (fences.length >= 2 && src.includes('</head>')) {
      const addFront = [
        "const __siteName = 'آسین استیل';",
        "const __title = String(Astro.props.title ?? '');",
        "const __desc = String(Astro.props.description ?? '');",
        'const __base = Astro.site ?? Astro.url.origin;',
        'const __url = new URL(Astro.url.pathname, __base).href;',
        "const __img = new URL('/og-default.jpg', __base).href;",
        'const __full = __title.includes(__siteName) ? __title : `${__title} | ${__siteName}`;',
        "const __org = { '@context': 'https://schema.org', '@type': 'Organization', name: __siteName, alternateName: 'ASIN STEEL', url: new URL('/', __base).href, logo: new URL('/favicon.svg', __base).href };",
      ];
      lines.splice(fences[1], 0, ...addFront);
      src = lines.join('\n');
      const og = [
        '    <meta property="og:locale" content="fa_IR" />',
        '    <meta property="og:site_name" content={__siteName} />',
        '    <meta property="og:type" content="website" />',
        '    <meta property="og:title" content={__full} />',
        '    <meta property="og:description" content={__desc} />',
        '    <meta property="og:url" content={__url} />',
        '    <meta property="og:image" content={__img} />',
        '    <meta name="twitter:card" content="summary_large_image" />',
        '    <meta name="twitter:title" content={__full} />',
        '    <meta name="twitter:description" content={__desc} />',
        '    <meta name="twitter:image" content={__img} />',
        '    <script type="application/ld+json" set:html={JSON.stringify(__org)} />',
      ].join('\n');
      src = src.replace('</head>', `${og}\n  </head>`);
      if (/<title>\s*\{title\}\s*<\/title>/.test(src)) src = src.replace(/<title>\s*\{title\}\s*<\/title>/, '<title>{__full}</title>');
      else notes.push('⚠️ BaseLayout: خط <title>{title}</title> پیدا نشد؛ عنوان را دستی به {__full} تغییر دهید.');
      save(layout, src);
    } else notes.push('⚠️ BaseLayout: ساختار غیرمنتظره بود؛ دست نخورد.');
  }
} else notes.push('⚠️ src/layouts/BaseLayout.astro پیدا نشد.');

// ---------- گزارش ----------
console.log(DRY ? '— پیش‌نمایش (چیزی نوشته نشد) —' : '— انجام شد —');
console.log(changed.length ? changed.map((c) => '  ✔ ' + c).join('\n') : '  (تغییری لازم نبود)');
if (!DRY && changed.length) console.log(`\nنسخه‌ی پشتیبان: ${path.relative(root, backupDir)}`);
if (notes.length) console.log('\n' + notes.join('\n'));
console.log('\nدستی باقی مانده: ۱) public/og-default.jpg (۱۲۰۰×۶۳۰)  ۲) حذف supabase-test.astro از نسخه‌ی منتشرشده  ۳) npm run build');
