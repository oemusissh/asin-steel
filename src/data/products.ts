
export type ProductCategory =
  | "rebar"
  | "beam"
  | "sheet"
  | "profile"
  | "angle"
  | "pipe"
  | "billet"
  | "alloy"
  | "other";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface SteelProduct {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  image: string;
  gallery: string[];
  factory?: string;
  specifications: ProductSpecification[];
  active: boolean;
  priceOnRequest: true;
}

export const products: SteelProduct[] = [
  {
    id: "rebar-14-a3",
    slug: "rebar-14-a3",
    name: "میلگرد ۱۴ آجدار A3",
    category: "rebar",
    categoryName: "میلگرد",
    description:
      "میلگرد آجدار مناسب پروژه‌های ساختمانی و عمرانی. برای اطلاع از قیمت روز، کارخانه و موجودی با آسین استیل تماس بگیرید.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=800&fit=crop",
    gallery: [],
    factory: "ذوب آهن اصفهان",
    specifications: [
      { label: "نوع محصول", value: "میلگرد آجدار" },
      { label: "سایز", value: "۱۴ میلی‌متر" },
      { label: "گرید", value: "A3" },
      { label: "کارخانه", value: "ذوب آهن اصفهان" },
      { label: "طول شاخه", value: "۱۲ متر" },
      { label: "واحد فروش", value: "شاخه" },
    ],
    active: true,
    priceOnRequest: true,
  },
  {
    id: "rebar-16-a3",
    slug: "rebar-16-a3",
    name: "میلگرد ۱۶ آجدار A3",
    category: "rebar",
    categoryName: "میلگرد",
    description:
      "میلگرد آجدار برای استفاده در سازه‌های بتنی و پروژه‌های عمرانی. قیمت و موجودی روز نیازمند استعلام است.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=800&fit=crop",
    gallery: [],
    factory: "ذوب آهن اصفهان",
    specifications: [
      { label: "نوع محصول", value: "میلگرد آجدار" },
      { label: "سایز", value: "۱۶ میلی‌متر" },
      { label: "گرید", value: "A3" },
      { label: "کارخانه", value: "ذوب آهن اصفهان" },
      { label: "طول شاخه", value: "۱۲ متر" },
      { label: "واحد فروش", value: "شاخه" },
    ],
    active: true,
    priceOnRequest: true,
  },
  {
    id: "rebar-18-a3",
    slug: "rebar-18-a3",
    name: "میلگرد ۱۸ آجدار A3",
    category: "rebar",
    categoryName: "میلگرد",
    description:
      "میلگرد آجدار برای پروژه‌های ساختمانی و عمرانی. برای دریافت قیمت روز و شرایط تأمین استعلام بگیرید.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=800&fit=crop",
    gallery: [],
    factory: "فولاد کویر یزد",
    specifications: [
      { label: "نوع محصول", value: "میلگرد آجدار" },
      { label: "سایز", value: "۱۸ میلی‌متر" },
      { label: "گرید", value: "A3" },
      { label: "کارخانه", value: "فولاد کویر یزد" },
      { label: "طول شاخه", value: "۱۲ متر" },
      { label: "واحد فروش", value: "شاخه" },
    ],
    active: true,
    priceOnRequest: true,
  },
  {
    id: "beam-ipe-14",
    slug: "beam-ipe-14",
    name: "تیرآهن IPE 14",
    category: "beam",
    categoryName: "تیرآهن",
    description:
      "تیرآهن IPE مناسب کاربردهای ساختمانی و سازه‌های فلزی. قیمت روز و موجودی از طریق استعلام مشخص می‌شود.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=800&fit=crop",
    gallery: [],
    factory: "ذوب آهن اصفهان",
    specifications: [
      { label: "نوع محصول", value: "تیرآهن IPE" },
      { label: "سایز", value: "۱۴" },
      { label: "کارخانه", value: "ذوب آهن اصفهان" },
      { label: "طول شاخه", value: "۱۲ متر" },
      { label: "واحد فروش", value: "شاخه" },
    ],
    active: true,
    priceOnRequest: true,
  },
  {
    id: "beam-ipe-16",
    slug: "beam-ipe-16",
    name: "تیرآهن IPE 16",
    category: "beam",
    categoryName: "تیرآهن",
    description:
      "تیرآهن IPE برای پروژه‌های ساختمانی و صنعتی. جهت اطلاع از قیمت و شرایط تحویل با واحد فروش تماس بگیرید.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=800&fit=crop",
    gallery: [],
    factory: "ذوب آهن اصفهان",
    specifications: [
      { label: "نوع محصول", value: "تیرآهن IPE" },
      { label: "سایز", value: "۱۶" },
      { label: "کارخانه", value: "ذوب آهن اصفهان" },
      { label: "طول شاخه", value: "۱۲ متر" },
      { label: "واحد فروش", value: "شاخه" },
    ],
    active: true,
    priceOnRequest: true,
  },
  {
    id: "sheet-black-2",
    slug: "sheet-black-2",
    name: "ورق سیاه ۲ میلی‌متر",
    category: "sheet",
    categoryName: "ورق فولادی",
    description:
      "ورق سیاه فولادی برای مصارف صنعتی و ساختمانی. قیمت نهایی با توجه به مشخصات، کارخانه و نوع سفارش اعلام می‌شود.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=800&fit=crop",
    gallery: [],
    factory: "فولاد مبارکه",
    specifications: [
      { label: "نوع محصول", value: "ورق سیاه" },
      { label: "ضخامت", value: "۲ میلی‌متر" },
      { label: "کارخانه", value: "فولاد مبارکه" },
      { label: "واحد فروش", value: "شیت" },
      { label: "ابعاد نمونه", value: "۱ × ۲ متر" },
    ],
    active: true,
    priceOnRequest: true,
  },
  {
    id: "sheet-galvanized-1-5",
    slug: "sheet-galvanized-1-5",
    name: "ورق گالوانیزه ۱.۵ میلی‌متر",
    category: "sheet",
    categoryName: "ورق فولادی",
    description:
      "ورق گالوانیزه برای کاربردهای صنعتی و ساختمانی. موجودی، ابعاد و قیمت روز نیازمند استعلام است.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&h=800&fit=crop",
    gallery: [],
    factory: "فولاد مبارکه",
    specifications: [
      { label: "نوع محصول", value: "ورق گالوانیزه" },
      { label: "ضخامت", value: "۱.۵ میلی‌متر" },
      { label: "کارخانه", value: "فولاد مبارکه" },
      { label: "واحد فروش", value: "رول" },
    ],
    active: true,
    priceOnRequest: true,
  },
  {
    id: "profile-box-40-40-2",
    slug: "profile-box-40-40-2",
    name: "قوطی پروفیل ۴۰×۴۰ ضخامت ۲",
    category: "profile",
    categoryName: "قوطی و پروفیل",
    description:
      "قوطی پروفیل فولادی برای مصارف ساختمانی و صنعتی. برای اطلاع از قیمت روز و شرایط تأمین استعلام بگیرید.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=800&fit=crop",
    gallery: [],
    factory: "فولاد فایکو",
    specifications: [
      { label: "نوع محصول", value: "قوطی پروفیل" },
      { label: "ابعاد", value: "۴۰ × ۴۰ میلی‌متر" },
      { label: "ضخامت", value: "۲ میلی‌متر" },
      { label: "طول شاخه", value: "۶ متر" },
      { label: "کارخانه", value: "فولاد فایکو" },
      { label: "واحد فروش", value: "شاخه" },
    ],
    active: true,
    priceOnRequest: true,
  },
  {
    id: "angle-50-50-5",
    slug: "angle-50-50-5",
    name: "نبشی ۵۰×۵۰×۵",
    category: "angle",
    categoryName: "نبشی و ناودانی",
    description:
      "نبشی فولادی برای سازه‌های فلزی و کاربردهای صنعتی. قیمت و موجودی بر اساس کارخانه و سفارش اعلام می‌شود.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=800&fit=crop",
    gallery: [],
    factory: "فولاد ناب تبریز",
    specifications: [
      { label: "نوع محصول", value: "نبشی" },
      { label: "ابعاد بال", value: "۵۰ × ۵۰ میلی‌متر" },
      { label: "ضخامت", value: "۵ میلی‌متر" },
      { label: "طول شاخه", value: "۶ متر" },
      { label: "کارخانه", value: "فولاد ناب تبریز" },
      { label: "واحد فروش", value: "شاخه" },
    ],
    active: true,
    priceOnRequest: true,
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getActiveProducts() {
  return products.filter((product) => product.active);
}
