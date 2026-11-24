"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/tienda", label: "Tienda" },
  { to: "/deseos", label: "Deseos" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  async function signOut() {
    // AuthProvider escucha SIGNED_OUT y limpia la caché de React Query.
    await createClient().auth.signOut();
    router.replace("/auth");
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Abrir menú">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetTitle className="px-1 text-lg">Menú</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/pedidos"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm hover:bg-secondary"
              >
                Mis pedidos
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-auto flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">
            Trazzos
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            papelería
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                isActive(l.to) && "font-semibold text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Button asChild variant="ghost" size="icon" aria-label="Lista de deseos">
          <Link href="/deseos">
            <Heart className="size-5" />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Mi cuenta">
              <User className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {user ? (
              <>
                <DropdownMenuItem disabled className="opacity-100">
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/pedidos">Mis pedidos</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Panel de administración</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void signOut()}>Cerrar sesión</DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/auth">Iniciar sesión</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button asChild variant="default" size="sm" className="relative">
          <Link href="/carrito">
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Carrito</span>
            {count > 0 && (
              <span className="ml-1 rounded-full bg-primary-foreground/20 px-1.5 text-xs">
                {count}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </header>
  );
}
