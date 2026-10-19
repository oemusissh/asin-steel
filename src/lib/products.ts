import { supabase } from "./supabase";

export async function getActiveProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map((p) => ({
    id: String(p.id),
    slug: p.slug,
    name: p.name,
    category: p.category,
    categoryName: categoryNames[p.category] || "سایر",
    description: p.description || "",
    image: p.image || "",
    gallery: p.gallery || [],
    factory: p.factory || "",
    specifications: p.specifications || [],
    active: p.active,
    priceOnRequest: p.price_on_request,
    price: p.price,
    inventory: p.inventory,
  }));
}

const categoryNames: Record<string, string> = {
  rebar: "میلگرد",
  beam: "تیرآهن",
  sheet: "ورق",
  profile: "پروفیل",
  angle: "نبشی و ناودانی",
  pipe: "لوله",
  billet: "شمش",
  alloy: "فولاد آلیاژی",
  other: "سایر",
};