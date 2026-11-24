import Image from "next/image";
import { imageUrl } from "@/lib/storage";
import { cn } from "@/lib/utils";

/**
 * Imagen de producto optimizada con next/image.
 * El contenedor padre debe tener tamaño (por ejemplo "aspect-square") y position relative.
 */
export function ProductImage({
  src,
  alt,
  className,
  eager = false,
  sizes = "100vw",
}: {
  src?: string | null;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={imageUrl(src)}
      alt={alt}
      fill
      sizes={sizes}
      priority={eager}
      className={cn("object-cover", className)}
    />
  );
}
