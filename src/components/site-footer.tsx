import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t surface-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg">Trazzos</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Bitácoras, cuadernillos y kits artísticos hechos a mano en Perú, pensados para tu
            práctica diaria.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Tienda</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link href="/tienda" className="hover:text-foreground">
                Catálogo completo
              </Link>
            </li>
            <li>
              <Link href="/deseos" className="hover:text-foreground">
                Lista de deseos
              </Link>
            </li>
            <li>
              <Link href="/pedidos" className="hover:text-foreground">
                Mis pedidos
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-semibold text-foreground">Envíos</p>
          <p>Entregas a todo el Perú en 2 a 5 días hábiles.</p>
          <p className="mt-2">Envío gratis en compras desde S/ 150.</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Trazzos. Hecho a mano con cariño.
      </div>
    </footer>
  );
}
