import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import type { CloudConfig, CreateCloudConfigRequest, UpdateCloudConfigRequest, CloudUsage } from "../lib/admin-types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

function authHeaders(token: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

// ── List all cloud configs ────────────────────────────────────────────────────

export function useCloudConfigs() {
  const { token } = useAuth();
  const { data, isLoading, error, refetch } = useQuery<CloudConfig[]>({
    queryKey: ["cloud-configs", token],
    queryFn: async () => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${BACKEND_URL}/api/cloud-configs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cloud configs");
      const json = await res.json();
      return json.data ?? [];
    },
    enabled: !!token,
    staleTime: 30_000,
  });
  return { data: data ?? [], isLoading, error, refetch };
}

// ── Per-cloud storage usage (cached 5 min — Cloudinary rate limits are generous) ──

export function useCloudUsage(id: string | null) {
  const { token } = useAuth();
  return useQuery<CloudUsage>({
    queryKey: ["cloud-usage", id, token],
    queryFn: async () => {
      if (!token || !id) return { ok: false };
      const res = await fetch(`${BACKEND_URL}/api/cloud-configs/${id}/usage`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
      return res.json();
    },
    enabled: !!token && !!id,
    staleTime: 5 * 60_000, // 5 minutes — storage doesn't change per-second
    retry: false,
  });
}

// ── Mutations ────────────────────────────────────────────────────────────────

export function useCreateCloudConfig() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCloudConfigRequest) => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${BACKEND_URL}/api/cloud-configs`, {
        method: "POST",
        headers: authHeaders(token),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to create cloud config");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cloud-configs"] });
    },
  });
}

export function useUpdateCloudConfig() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCloudConfigRequest }) => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${BACKEND_URL}/api/cloud-configs/${id}`, {
        method: "PUT",
        headers: authHeaders(token),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to update cloud config");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cloud-configs"] });
    },
  });
}

export function useDeleteCloudConfig() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${BACKEND_URL}/api/cloud-configs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to delete cloud config");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cloud-configs"] });
    },
  });
}

export function useSetPrimaryCloud() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${BACKEND_URL}/api/cloud-configs/${id}/primary`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to set primary cloud");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cloud-configs"] });
    },
  });
}

export function useTestCloudConfig() {
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (id: string): Promise<{ ok: boolean; error?: string }> => {
      if (!token) throw new Error("Not authenticated");
      const res = await fetch(`${BACKEND_URL}/api/cloud-configs/${id}/test`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  });
}
