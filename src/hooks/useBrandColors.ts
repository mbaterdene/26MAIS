import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import type { BrandColors, BrandColorsResponse, UpdateBrandColorsRequest } from "../lib/admin-types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

export function useBrandColors() {
  const { token } = useAuth();
  return useQuery<BrandColors | null>({
    queryKey: ["brand-colors", token],
    queryFn: async () => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${BACKEND_URL}/api/brand/colors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch brand colors");
      const json: BrandColorsResponse = await res.json();
      return json.colors ?? null;
    },
    enabled: !!token,
    staleTime: 60_000,
  });
}

export function useUpdateBrandColors() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateBrandColorsRequest) => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${BACKEND_URL}/api/brand/colors`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Failed to update brand colors");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-colors"] });
    },
  });
}
