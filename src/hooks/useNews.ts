import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { News, CreateNewsRequest, UpdateNewsRequest, UseNewsOptions } from "../lib/admin-types";
import { useAuth } from "../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

export function useNews(options: UseNewsOptions = {}) {
  const { token } = useAuth();
  const { autoFetch = true, status = "all", enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery<News[]>({
    queryKey: ["news", status, token],
    queryFn: async () => {
      if (!token) throw new Error("Not authenticated");

      const url = new URL(`${BACKEND_URL}/api/news/fetch`);
      if (status !== "all") {
        url.searchParams.set("status", status);
      }

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const result = await response.json();
      return result.data || [];
    },
    enabled: autoFetch && enabled && !!token,
    staleTime: 30 * 1000,
  });

  return { data: data || [], isLoading, error, refetch };
}

export function useNewsById(id: string | null) {
  const { token } = useAuth();

  const { data, isLoading, error } = useQuery<News | null>({
    queryKey: ["news", id, token],
    queryFn: async () => {
      if (!token || !id) return null;

      const response = await fetch(`${BACKEND_URL}/api/news/fetch/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      return response.json();
    },
    enabled: !!token && !!id,
  });

  return { data, isLoading, error };
}

export function useCreateNews() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateNewsRequest) => {
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${BACKEND_URL}/api/news/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create news");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useUpdateNews(id: string) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateNewsRequest) => {
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${BACKEND_URL}/api/news/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update news");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      queryClient.invalidateQueries({ queryKey: ["news", id] });
    },
  });
}

export function useDeleteNews() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${BACKEND_URL}/api/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete news");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useSubmitNews() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${BACKEND_URL}/api/news/${id}/submit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit news");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useApproveNews() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${BACKEND_URL}/api/news/${id}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to approve news");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

export function useRejectNews() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`${BACKEND_URL}/api/news/${id}/reject`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to reject news");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
}

// ─── Public news hook (no auth required) ─────────────────────────────────────
export function usePublicNews() {
  const { data, isLoading, error } = useQuery<News[]>({
    queryKey: ["publicNews"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/news`);
      if (!response.ok) throw new Error("Failed to fetch news");
      const result = await response.json();
      return result.data || [];
    },
    staleTime: 60 * 1000,
  });

  return { data: data || [], isLoading, error };
}
