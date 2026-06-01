import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import type {
  AdminProfile,
  CreateAdminRequest,
  UpdateAdminRequest,
  ResetPasswordRequest,
} from "../lib/admin-types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

async function adminFetch<T>(url: string, token: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

// ── Queries ──────────────────────────────────────────────────────────────────

export function useAdminUsers() {
  const { token } = useAuth();
  return useQuery<AdminProfile[]>({
    queryKey: ["admin-users"],
    queryFn: () =>
      adminFetch<{ admins: AdminProfile[] }>(
        `${BACKEND_URL}/api/auth/admins`,
        token!
      ).then((r) => r.admins),
    enabled: !!token,
    staleTime: 30_000,
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function useCreateAdmin() {
  const { token } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAdminRequest) =>
      adminFetch(`${BACKEND_URL}/api/auth/admins`, token!, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}

export function useUpdateAdmin() {
  const { token } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminRequest }) =>
      adminFetch(`${BACKEND_URL}/api/auth/admins/${id}`, token!, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}

export function useResetAdminPassword() {
  const { token } = useAuth();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ResetPasswordRequest }) =>
      adminFetch(`${BACKEND_URL}/api/auth/admins/${id}/password`, token!, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  });
}

export function useDeleteAdmin() {
  const { token } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      adminFetch(`${BACKEND_URL}/api/auth/admins/${id}`, token!, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });
}
