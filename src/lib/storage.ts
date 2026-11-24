const BUCKET = "product-images";
export const PLACEHOLDER_IMAGE = "/images/product-placeholder.jpg";

/**
 * Convierte lo que guardamos en product_images.url (URL completa o ruta dentro
 * del bucket) en una URL que se puede mostrar. El bucket es público, así que no
 * hace falta pedir URLs firmadas: basta con armar la URL pública.
 */
export function imageUrl(ref: string | null | undefined): string {
  if (!ref) return PLACEHOLDER_IMAGE;
  if (ref.startsWith("http") || ref.startsWith("/") || ref.startsWith("data:")) return ref;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/${BUCKET}/${ref}`;
}
