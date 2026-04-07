import { useQuery } from "@tanstack/react-query";
import { News } from "../lib/admin-types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

/**
 * Fetch published news (public, no authentication required)
 */
export function usePublicNews() {
  const { data, isLoading, error } = useQuery<News[]>({
    queryKey: ["publicNews"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/news`);

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const result = await response.json();
      return result.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { data: data || [], isLoading, error };
}

/**
 * Fetch a single news article by slug (public, no authentication required)
 */
export function usePublicNewsBySlug(slug: string | undefined) {
  const { data, isLoading, error } = useQuery<News | null>({
    queryKey: ["publicNews", slug],
    queryFn: async () => {
      if (!slug) return null;

      const response = await fetch(`${BACKEND_URL}/api/news/${slug}`);

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Failed to fetch news");
      }

      const result = await response.json();
      console.log("Fetched article:", result); // Debug logging
      return result;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { data, isLoading, error };
}
