"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

export type CartItem = {
  productId: string;
  variantId: string | null;
  slug: string;
  name: string;
  variantName: string | null;
  price: number;
  quantity: number;
  image: string | null;
  stock: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (productId: string, variantId: string | null) => void;
  setQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const STORAGE_KEY = "papeleria-cart-v1";
const EMPTY: CartItem[] = [];

/* ---------- Store del carrito guardado en localStorage ----------
 * useSyncExternalStore evita errores de hidratación: en el servidor el carrito
 * siempre está vacío y en el navegador se lee de localStorage.
 */
let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: CartItem[]) {
  cache = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Sincroniza si el carrito cambia en otra pestaña.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const sameLine = (a: CartItem, productId: string, variantId: string | null) =>
  a.productId === productId && (a.variantId ?? null) === (variantId ?? null);

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);

  const add = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    const prev = read();
    const existing = prev.find((i) => sameLine(i, item.productId, item.variantId));
    if (existing) {
      write(
        prev.map((i) =>
          sameLine(i, item.productId, item.variantId)
            ? { ...i, quantity: Math.min(i.quantity + quantity, Math.max(1, item.stock)) }
            : i,
        ),
      );
    } else {
      write([...prev, { ...item, quantity }]);
    }
  }, []);

  const remove = useCallback((productId: string, variantId: string | null) => {
    write(read().filter((i) => !sameLine(i, productId, variantId)));
  }, []);

  const setQuantity = useCallback((productId: string, variantId: string | null, quantity: number) => {
    write(
      read().map((i) =>
        sameLine(i, productId, variantId) ? { ...i, quantity: Math.max(1, quantity) } : i,
      ),
    );
  }, []);

  const clear = useCallback(() => write(EMPTY), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return { items, add, remove, setQuantity, clear, count, subtotal };
  }, [items, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
