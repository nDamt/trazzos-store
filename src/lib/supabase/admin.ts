import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Cliente con la clave secreta: SALTA las políticas RLS.
 * Úsalo solo en el servidor y solo cuando de verdad haga falta
 * (por ejemplo, para leer precios reales al crear un pedido).
 */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
