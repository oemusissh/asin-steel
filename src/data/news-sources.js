// منابع خبری صفحه‌ی اخبار صنعت.
// آدرس RSS هر سایت را اینجا اضافه یا حذف کنید؛ بقیه‌ی کارها خودکار است.
//
// all: true   => همه‌ی خبرهای آن فید نمایش داده شود (مناسب فیدهای مخصوص فولاد/معدن)
// all: false  => فقط خبرهایی که یکی از کلمات KEYWORDS را دارند نمایش داده شود
// full: true  => متن کامل خبر هم ذخیره و در سایت خودمان نمایش داده شود
//                (فقط برای منبعی روشن کن که اجازه‌ی بازنشر دارد)
// license     => نام مجوز بازنشر؛ پایین صفحه‌ی خبر نمایش داده می‌شود

/** @type {{ name: string, url: string, all?: boolean, full?: boolean, license?: string }[]} */
export const FEEDS = [
  // می‌متالز (پایگاه خبری معادن و فلزات) - دسته‌ی آهن و فولاد
  { name: 'می‌متالز', url: 'https://felezatkhavarmianeh.ir/fa/rss/6', all: true, full: true },
  { name: 'می‌متالز', url: 'https://felezatkhavarmianeh.ir/fa/rss/7', all: true, full: true },
  { name: 'می‌متالز', url: 'https://felezatkhavarmianeh.ir/fa/rss/22', all: true, full: true },
  // خبرگزاری صداوسیما - بخش معدن و صنایع معدنی
  { name: 'خبرگزاری صداوسیما', url: 'https://www.iribnews.ir/fa/rss/6/341', all: false, full: true },
  // باشگاه خبرنگاران جوان - بخش صنعت، تجارت و کشاورزی
  { name: 'باشگاه خبرنگاران جوان', url: 'https://yjc.ir/fa/rss/6/41', all: false, full: true },
  // مهر و ایسنا - بخش اقتصادی
  { name: 'خبرگزاری مهر', url: 'https://www.mehrnews.com/rss/tp/25', all: false, full: true },
  { name: 'ایسنا', url: 'https://www.isna.ir/rss/tp/34', all: false, full: true },
  // تسنیم - بخش اقتصادی (مجوز CC BY 4.0)
  { name: 'خبرگزاری تسنیم', url: 'https://www.tasnimnews.com/fa/rss/feed/0/7/7/%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF%DB%8C', all: false, full: true, license: 'Creative Commons Attribution 4.0' },
];

export const KEYWORDS = [
  'فولاد', 'آهن', 'تیرآهن', 'میلگرد', 'ورق', 'شمش', 'بیلت', 'مقطع',
  'سنگ آهن', 'گندله', 'معدن', 'ذوب', 'نورد', 'کنسانتره', 'چدن',
  'آهن‌آلات', 'آهن آلات', 'فلزات', 'فلزی', 'استیل', 'ذوب‌آهن', 'فولادی',
  'مس', 'آلومینیوم', 'روی', 'سرب', 'بورس کالا', 'صنایع معدنی', 'مواد معدنی',
];

// خبرهایی که این کلمات را دارند نمایش داده نمی‌شوند (مثلاً راه‌آهن به صنعت فولاد ربطی ندارد)
export const EXCLUDE = ['راه‌آهن', 'راه آهن', 'قطار', 'مترو'];

export const SETTINGS = {
  perPage: 10,          // تعداد خبر در هر صفحه
  maxPerSource: 120,    // سهم هر منبع از آرشیو؛ تا یک منبع (مثل می‌متالز) همه‌چیز را پر نکند
  maxItems: 500,        // حداکثر خبر نگه‌داشته‌شده (آرشیو)
  maxAgeDays: 180,      // خبرهای قدیمی‌تر از این از آرشیو حذف می‌شوند
  maxFullPerRun: 30,    // در هر اجرا حداکثر چند خبر متن کامل دریافت شود
};
