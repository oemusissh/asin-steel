
export type PriceStatus = "on-request" | "available" | "unavailable";

export interface ProductPrice {
  productId: string;
  status: PriceStatus;
  price?: number;
  currency?: "IRR" | "IRT";
  unit?: string;
  updatedAt?: string;
}

export const prices: ProductPrice[] = [
  {
    productId: "rebar-14-a3",
    status: "on-request",
  },
  {
    productId: "rebar-16-a3",
    status: "on-request",
  },
  {
    productId: "rebar-18-a3",
    status: "on-request",
  },
  {
    productId: "beam-ipe-14",
    status: "on-request",
  },
  {
    productId: "beam-ipe-16",
    status: "on-request",
  },
  {
    productId: "sheet-black-2",
    status: "on-request",
  },
  {
    productId: "sheet-galvanized-1-5",
    status: "on-request",
  },
  {
    productId: "profile-box-40-40-2",
    status: "on-request",
  },
  {
    productId: "angle-50-50-5",
    status: "on-request",
  },
];

export function getPriceByProductId(productId: string) {
  return prices.find((item) => item.productId === productId);
}

export function getPriceLabel(productId: string) {
  const item = getPriceByProductId(productId);

  if (!item || item.status === "on-request") {
    return "استعلام قیمت";
  }

  if (item.status === "unavailable") {
    return "قیمت فعلاً موجود نیست";
  }

  if (typeof item.price !== "number") {
    return "استعلام قیمت";
  }

  return new Intl.NumberFormat("fa-IR").format(item.price);
}
