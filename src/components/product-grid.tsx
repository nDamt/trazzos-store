"use client";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/data";
import { useWishlist } from "@/lib/use-wishlist";

/** Grilla de productos con botón de "deseos". Recibe los productos ya cargados desde el servidor. */
export function ProductGrid({
  products,
  className = "grid grid-cols-2 gap-4 md:grid-cols-4",
}: {
  products: Product[];
  className?: string;
}) {
  const wishlist = useWishlist();
  return (
    <div className={className}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          isWished={wishlist.isWished(p.id)}
          onToggleWish={wishlist.toggle}
        />
      ))}
    </div>
  );
}
