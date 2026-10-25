export type ShapeKey = 'beam' | 'rebar' | 'channel' | 'angle' | 'tube' | 'plate' | 'pipe' | 'flat';

// اطلاعات صفحهٔ هر دسته.
// db: مقدار ستون category در جدول products (rebar, beam, sheet, profile, angle, pipe, billet, alloy, other)
// متن‌ها (desc / chips / facts) نمونه‌اند؛ هر چه می‌خواهید خودتان ویرایش کنید.
export type Category = {
  slug: string;
  name: string;
  en: string;
  color: string;
  shape: ShapeKey;
  db: string[];
  icon: string;
  desc: string;
  chips: [string, string, string];
  facts: { k: string; v: string }[];
};

export const categories: Category[] = [
  {
    slug: 'beam', name: 'تیرآهن', en: 'I-BEAM / IPE', color: '#2563eb', shape: 'beam', db: ['beam'],
    icon: '<path d="M5 4h14M5 20h14M12 4v16"/>',
    desc: 'تیرآهن IPE، IPB و سایزهای پرکاربرد ساختمانی؛ مناسب اسکلت فلزی، سوله و پل.',
    chips: ['IPE', 'IPB', 'ST37'],
    facts: [{ k: 'مقاطع', v: 'IPE / IPB / INP' }, { k: 'کاربرد', v: 'اسکلت و سوله' }, { k: 'تأمین', v: 'کارخانه‌های معتبر' }, { k: 'قیمت', v: 'استعلام روز' }]
  },
  {
    slug: 'rebar', name: 'میلگرد', en: 'REBAR', color: '#ea580c', shape: 'rebar', db: ['rebar'],
    icon: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/>',
    desc: 'میلگرد ساده و آجدار در رده‌های A2 و A3 برای بتن‌آرمه و ساخت‌وساز.',
    chips: ['A2', 'A3', 'آجدار'],
    facts: [{ k: 'رده‌ها', v: 'A1 / A2 / A3' }, { k: 'نوع', v: 'ساده و آجدار' }, { k: 'کاربرد', v: 'بتن‌آرمه' }, { k: 'قیمت', v: 'استعلام روز' }]
  },
  {
    slug: 'channel', name: 'ناودانی', en: 'CHANNEL / UPN', color: '#0891b2', shape: 'channel', db: ['angle'],
    icon: '<path d="M18 4H6v16h12"/>',
    desc: 'ناودانی استاندارد و UPN برای سازه‌ها، قاب‌ها و ساخت قطعات صنعتی.',
    chips: ['UPN', 'ناودانی', 'سازه'],
    facts: [{ k: 'مقاطع', v: 'UPN و استاندارد' }, { k: 'کاربرد', v: 'سازه و قاب' }, { k: 'تأمین', v: 'کارخانه‌های معتبر' }, { k: 'قیمت', v: 'استعلام روز' }]
  },
  {
    slug: 'angle', name: 'نبشی', en: 'ANGLE BAR', color: '#7c3aed', shape: 'angle', db: ['angle'],
    icon: '<path d="M6 4v16h12"/>',
    desc: 'نبشی بال‌مساوی در سایزهای مختلف برای اتصالات، قاب و سازه‌های سبک.',
    chips: ['L', 'بال‌مساوی', 'سازه'],
    facts: [{ k: 'نوع', v: 'بال‌مساوی' }, { k: 'کاربرد', v: 'اتصال و قاب' }, { k: 'تأمین', v: 'کارخانه‌های معتبر' }, { k: 'قیمت', v: 'استعلام روز' }]
  },
  {
    slug: 'tube', name: 'قوطی و پروفیل', en: 'BOX TUBE', color: '#e11d48', shape: 'tube', db: ['profile'],
    icon: '<rect x="4.5" y="4.5" width="15" height="15" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx=".5"/>',
    desc: 'قوطی و پروفیل ساختمانی و صنعتی در ابعاد و ضخامت‌های مختلف.',
    chips: ['قوطی', 'پروفیل', 'صنعتی'],
    facts: [{ k: 'نوع', v: 'مربع و مستطیل' }, { k: 'کاربرد', v: 'ساختمانی و صنعتی' }, { k: 'تأمین', v: 'کارخانه‌های معتبر' }, { k: 'قیمت', v: 'استعلام روز' }]
  },
  {
    slug: 'plate', name: 'ورق فولادی', en: 'STEEL PLATE', color: '#d97706', shape: 'plate', db: ['sheet'],
    icon: '<path d="M3 9l9-4.5L21 9l-9 4.5L3 9z"/><path d="M3 9v4l9 4.5 9-4.5V9"/>',
    desc: 'ورق سیاه، گالوانیزه و روغنی در ضخامت‌ها و ابعاد متنوع.',
    chips: ['سیاه', 'گالوانیزه', 'روغنی'],
    facts: [{ k: 'نوع', v: 'سیاه / گالوانیزه / روغنی' }, { k: 'کاربرد', v: 'صنعت و ساخت' }, { k: 'تأمین', v: 'کارخانه‌های معتبر' }, { k: 'قیمت', v: 'استعلام روز' }]
  },
  {
    slug: 'pipe', name: 'لوله', en: 'STEEL PIPE', color: '#059669', shape: 'pipe', db: ['pipe'],
    icon: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/>',
    desc: 'لوله مانیسمان، درزدار و گالوانیزه برای انتقال سیال و کاربردهای سازه‌ای.',
    chips: ['مانیسمان', 'درزدار', 'گالوانیزه'],
    facts: [{ k: 'نوع', v: 'مانیسمان و درزدار' }, { k: 'کاربرد', v: 'انتقال سیال و سازه' }, { k: 'تأمین', v: 'کارخانه‌های معتبر' }, { k: 'قیمت', v: 'استعلام روز' }]
  },
  {
    slug: 'flat', name: 'تسمه', en: 'FLAT BAR', color: '#4f46e5', shape: 'flat', db: ['other'],
    icon: '<rect x="3" y="9" width="18" height="6" rx="1"/>',
    desc: 'تسمه فولادی در ضخامت‌ها و عرض‌های مختلف.',
    chips: ['تسمه', 'ضخامت‌های متنوع', 'فولادی'],
    facts: [{ k: 'نوع', v: 'تسمه فولادی' }, { k: 'کاربرد', v: 'ساخت و صنعت' }, { k: 'تأمین', v: 'کارخانه‌های معتبر' }, { k: 'قیمت', v: 'استعلام روز' }]
  }
];