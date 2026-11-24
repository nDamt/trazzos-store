import { Skeleton } from "@/components/ui/skeleton";

/** Se muestra mientras el servidor trae los datos de la página. */
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <Skeleton className="mb-6 h-8 w-56" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
