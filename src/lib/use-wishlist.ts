"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth";

const wishlistQuery = {
  queryKey: ["wishlist"],
  queryFn: async (): Promise<string[]> => {
    const { data, error } = await createClient().from("wishlist_items").select("product_id");
    if (error) throw error;
    return (data ?? []).map((r) => r.product_id);
  },
};

export function useWishlist() {
  const supabase = createClient();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: ids = [] } = useQuery({ ...wishlistQuery, enabled: Boolean(user) });

  const toggle = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error("no-session");
      if (ids.includes(productId)) {
        const { error } = await supabase
          .from("wishlist_items")
          .delete()
          .eq("product_id", productId)
          .eq("user_id", user.id);
        if (error) throw error;
        return "removed" as const;
      }
      const { error } = await supabase
        .from("wishlist_items")
        .insert({ product_id: productId, user_id: user.id });
      if (error) throw error;
      return "added" as const;
    },
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(result === "added" ? "Agregado a tus deseos" : "Quitado de tus deseos");
    },
    onError: (error: Error) => {
      if (error.message === "no-session") {
        toast.error("Inicia sesión para guardar tus favoritos");
        return;
      }
      toast.error("No pudimos actualizar tu lista de deseos");
    },
  });

  return {
    ids,
    isWished: (productId: string) => ids.includes(productId),
    toggle: (productId: string) => toggle.mutate(productId),
  };
}
