// ============================================================
// جستجوی هوشمند هدر (دسکتاپ + موبایل)
// این بلوک را جایگزین کدهای قدیمی جستجو در <script> هدر کنید.
// ============================================================

const siteBase = import.meta.env.BASE_URL.replace(/\/$/, '');
const priceListPath = `${siteBase}/price-list`;

// میان‌برهای دسته‌بندی؛ بدون نیاز به سرور و فوراً نمایش داده می‌شوند
const categoryShortcuts = [
  { label: 'میلگرد', id: 'rebar' },
  { label: 'تیرآهن', id: 'beam' },
  { label: 'پروفیل و قوطی', id: 'profile' },
  { label: 'ورق', id: 'sheet' },
  { label: 'نبشی و ناودانی', id: 'angle' },
  { label: 'لوله', id: '' },
  { label: 'تسمه', id: '' },
];

const categoryLabels: Record<string, string> = {
  rebar: 'میلگرد',
  beam: 'تیرآهن',
  profile: 'پروفیل',
  sheet: 'ورق',
  angle: 'نبشی و ناودانی',
  pipe: 'لوله',
  channel: 'ناودانی',
};

// یکسان‌سازی متن: ارقام فارسی/عربی، ي و ك عربی، نیم‌فاصله، فاصله‌های اضافه
const normalize = (value: string) =>
  value
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\u200c/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
  );

const listUrl = (q: string) => `${priceListPath}?search=${encodeURIComponent(q)}`;

async function fetchProducts(q: string) {
  // کاراکترهایی که فیلتر Supabase را خراب می‌کنند حذف می‌شوند
  const clean = q.replace(/[,()%*\\]/g, ' ').trim();
  if (!clean) return [];

  // دیتابیس ممکن است «ي/ك» عربی داشته باشد؛ هر دو حالت جستجو می‌شود
  const variants = [...new Set([clean, clean.replace(/ی/g, 'ي').replace(/ک/g, 'ك')])];
  const filters = variants
    .flatMap((v) => [`name.ilike.%${v}%`, `factory.ilike.%${v}%`])
    .join(',');

  const { data, error } = await supabase
    .from('products')
    .select('id,name,category,factory')
    .eq('active', true)
    .or(filters)
    .limit(6);

  if (error) throw error;
  return data ?? [];
}

function setupSearch(input: HTMLInputElement | null, box: HTMLElement | null) {
  if (!input || !box) return;

  box.setAttribute('dir', 'rtl');

  let timer: number | undefined;
  let requestId = 0;
  let activeIndex = -1;

  const items = () => Array.from(box.querySelectorAll<HTMLElement>('.search-item'));

  const close = () => {
    box.classList.add('hidden');
    box.innerHTML = '';
    activeIndex = -1;
  };

  const goToList = () => {
    const q = input.value.trim();
    if (q) window.location.assign(listUrl(q));
  };

  const setActive = (index: number) => {
    const list = items();
    list.forEach((el) => el.classList.remove('bg-gray-100', 'dark:bg-dark-700'));
    if (!list.length) return;
    activeIndex = (index + list.length) % list.length;
    list[activeIndex].classList.add('bg-gray-100', 'dark:bg-dark-700');
    list[activeIndex].scrollIntoView({ block: 'nearest' });
  };

  const row = (href: string, title: string, sub = '') => `
    <a href="${href}" class="search-item flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 text-sm transition-colors last:border-0 hover:bg-gray-50 dark:border-dark-700 dark:hover:bg-dark-700">
      <span class="font-medium text-gray-900 dark:text-white">${title}</span>
      ${sub ? `<span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">${sub}</span>` : ''}
    </a>`;

  const heading = (text: string) =>
    `<div class="bg-gray-50 px-4 py-2 text-[11px] font-bold text-gray-400 dark:bg-dark-900/60">${text}</div>`;

  const render = (q: string, products: any[], loading: boolean) => {
    const nq = normalize(q);
    const cats = categoryShortcuts.filter((c) => normalize(c.label).includes(nq));
    let html = '';

    if (cats.length) {
      html += heading('دسته‌بندی');
      html += cats
        .map((c) =>
          row(
            c.id
              ? `${priceListPath}?category=${c.id}`
              : listUrl(c.label),
            escapeHtml(c.label),
            'مشاهده دسته'
          )
        )
        .join('');
    }

    if (products.length) {
      html += heading('محصولات');
      html += products
        .map((p) =>
          row(
            `${siteBase}/products/detail/?id=${encodeURIComponent(String(p.id))}`,
            escapeHtml(p.name),
            escapeHtml(p.factory || categoryLabels[p.category] || '')
          )
        )
        .join('');
    }

    if (!cats.length && !products.length) {
      html += `<div class="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">${
        loading ? 'در حال جستجو…' : 'محصولی با این نام پیدا نشد.'
      }</div>`;
    }

    html += `
      <a href="${listUrl(q)}" class="search-item flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-primary-600 transition-colors hover:bg-gray-50 dark:text-primary-400 dark:hover:bg-dark-700">
        مشاهده همه نتایج «${escapeHtml(q)}»
      </a>`;

    box.innerHTML = html;
    box.classList.remove('hidden');
    activeIndex = -1;
  };

  input.addEventListener('input', () => {
    const q = input.value.trim();
    window.clearTimeout(timer);

    if (normalize(q).length < 2) {
      close();
      return;
    }

    // نتیجه‌ی فوری (دسته‌ها) و بعد جستجوی محصولات با کمی تأخیر
    render(q, [], true);

    const current = ++requestId;
    timer = window.setTimeout(async () => {
      try {
        const products = await fetchProducts(normalize(q));
        if (current !== requestId) return; // پاسخ قدیمی نادیده گرفته می‌شود
        render(q, products, false);
      } catch (error) {
        if (current !== requestId) return;
        console.error('خطا در جستجوی محصولات:', error);
        render(q, [], false);
      }
    }, 250);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(activeIndex - 1);
    } else if (event.key === 'Escape') {
      close();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const list = items();
      if (activeIndex >= 0 && list[activeIndex]) list[activeIndex].click();
      else goToList();
    }
  });

  // جلوگیری از رفرش صفحه هنگام ارسال فرم
  input.form?.addEventListener('submit', (event) => {
    event.preventDefault();
    goToList();
  });

  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    if (!input.contains(target) && !box.contains(target)) close();
  });
}

setupSearch(
  document.getElementById('smart-search') as HTMLInputElement | null,
  document.getElementById('search-results')
);

setupSearch(
  document.getElementById('mobile-search-input') as HTMLInputElement | null,
  document.getElementById('mobile-search-results')
);


// ============================================================
// اصلاح باگ شمارنده‌ی پیش‌فاکتور
// (در کد قبلی متغیر badge تعریف نشده بود و خطا می‌داد)
// این بلوک را جایگزین هندلر قبلی 'asin:proforma-count' کنید.
// ============================================================

document.addEventListener('asin:proforma-count', (event) => {
  const count = Number((event as CustomEvent).detail?.count) || 0;

  const desktopBadge = document.getElementById('proforma-count');
  const mobileBadge = document.getElementById('proforma-count-mobile');
  const dot = document.getElementById('proforma-active-dot');

  if (desktopBadge) {
    desktopBadge.textContent = count.toLocaleString('fa-IR');
    desktopBadge.classList.add('scale-110');
    setTimeout(() => desktopBadge.classList.remove('scale-110'), 200);
  }

  if (mobileBadge) {
    mobileBadge.textContent = count.toLocaleString('fa-IR');
  }

  dot?.classList.toggle('opacity-0', count <= 0);
  dot?.classList.toggle('scale-0', count <= 0);
  dot?.classList.toggle('opacity-100', count > 0);
  dot?.classList.toggle('scale-100', count > 0);
});
