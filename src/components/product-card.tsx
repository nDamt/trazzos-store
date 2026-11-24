"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/product-image";
import { productPrices, productStock, type Product } from "@/lib/data";
import { priceRange } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  isWished,
  onToggleWish,
}: {
  product: Product;
  isWished?: boolean;
  onToggleWish?: (productId: string) => void;
}) {
  const stock = productStock(product);
  const lowStock = stock > 0 && stock <= product.low_stock_threshold;

  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <Link
        href={`/producto/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <ProductImage
          src={product.product_images[0]?.url}
          alt={product.name}
          sizes="(min-width: 768px) 25vw, 50vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {onToggleWish && (
        <button
          type="button"
          aria-label="Agregar a la lista de deseos"
          onClick={() => onToggleWish(product.id)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 text-muted-foreground shadow-soft transition-colors hover:text-primary"
        >
          <Heart className={cn("size-4", isWished && "fill-primary text-primary")} />
        </button>
      )}

      <div className="space-y-2 p-4">
        {product.categories && (
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {product.categories.name}
          </p>
        )}
        <h3 className="text-base leading-snug">
          <Link href={`/producto/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-primary">{priceRange(productPrices(product))}</span>
          {stock === 0 && <Badge variant="destructive">Agotado</Badge>}
          {lowStock && <Badge variant="secondary">Últimas {stock} unidades</Badge>}
        </div>
      </div>
    </article>
  );
}
