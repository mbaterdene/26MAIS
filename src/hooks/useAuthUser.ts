import { useQuery } from "@tanstack/react-query";
import { AdminProfile } from "../lib/admin-types";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

export function useAuthUser() {
  const { token, isLoading: authLoading } = useAuth();

  const { data, isLoading, error } = useQuery<AdminProfile | null>({
    queryKey: ["authUser", token],
    queryFn: async () => {
      if (!token) return null;

      const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch auth user");
      }

      const result = await response.json();
      return result.admin;
    },
    enabled: !!token && !authLoading,
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    isLoading: isLoading || authLoading,
    error,
  };
}
