/**
 * Tipos y funciones puras del catálogo. Se pueden usar en servidor y cliente.
 * Las consultas a Supabase viven en src/lib/queries.ts (servidor).
 */

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
};

export type Variant = {
  id: string;
  product_id: string;
  name: string;
  option_type: string | null;
  price: number;
  stock: number;
  is_active: boolean;
};

export type ProductImage = { id: string; product_id: string; url: string; sort_order: number };

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  base_price: number;
  stock: number;
  low_stock_threshold: number;
  paper_type: string | null;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  product_variants: Variant[];
  product_images: ProductImage[];
  categories: { name: string; slug: string } | null;
};

export const PRODUCT_SELECT =
  "*, product_variants(*), product_images(*), categories(name, slug)";

export function normalize(row: Record<string, unknown>): Product {
  const p = row as unknown as Product;
  return {
    ...p,
    base_price: Number(p.base_price),
    product_variants: (p.product_variants ?? [])
      .map((v) => ({ ...v, price: Number(v.price) }))
      .sort((a, b) => a.price - b.price),
    product_images: (p.product_images ?? []).sort((a, b) => a.sort_order - b.sort_order),
  };
}

export function productPrices(product: Product): number[] {
  const active = product.product_variants.filter((v) => v.is_active);
  return active.length > 0 ? active.map((v) => v.price) : [product.base_price];
}

export function productStock(product: Product): number {
  const active = product.product_variants.filter((v) => v.is_active);
  return active.length > 0 ? active.reduce((s, v) => s + v.stock, 0) : product.stock;
}

export type OrderStatus =
  | "pendiente"
  | "pagado"
  | "en_preparacion"
  | "enviado"
  | "entregado"
  | "cancelado";

export type OrderRow = {
  id: string;
  order_number: number;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  department: string | null;
  province: string | null;
  district: string | null;
  address: string | null;
  notes: string | null;
  payment_method: string;
  status: OrderStatus;
  subtotal: number;
  shipping_cost: number;
  total: number;
  created_at: string;
  order_items: {
    id: string;
    product_name: string;
    variant_name: string | null;
    unit_price: number;
    quantity: number;
  }[];
};
