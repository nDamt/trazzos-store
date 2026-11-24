import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { ProductGrid } from "@/components/product-grid";
import type { Product } from "@/lib/data";
import { getActiveProducts, getCategories } from "@/lib/queries";

export const metadata: Metadata = {
  title: { absolute: "Trazzos" },
  description:
    "Bitácoras cosidas a mano, cuadernillos, kits artísticos y complementos para dibujo y pintura. Envíos a todo el Perú.",
};

// Server Component: los datos llegan ya renderizados, sin "cargando…" en el navegador.
export default async function HomePage() {
  const [products, categories] = await Promise.all([getActiveProducts(), getCategories()]);

  const featured = products.filter((p) => p.is_featured).slice(0, 4);
  const newest = products.slice(0, 4);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-6 text-2xl">Categorías destacadas</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/tienda?categoria=${c.slug}`}
              className="group surface-paper rounded-2xl border p-5 transition-shadow hover:shadow-lift"
            >
              <p className="font-[family-name:var(--font-display)] text-lg">{c.name}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                Explorar{" "}
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ProductRow title="Los más pedidos" subtitle="Los favoritos de nuestra comunidad" products={featured} />
      <ProductRow title="Los más nuevos" subtitle="Recién salidos del taller" products={newest} />
    </>
  );
}

function ProductRow({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: Product[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Link href="/tienda" className="inline-flex items-center gap-1 text-sm text-primary">
          Ver todo <ArrowRight className="size-4" />
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
