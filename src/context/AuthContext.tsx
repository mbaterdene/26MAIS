import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AdminProfile, AuthContextType } from "../lib/admin-types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8787";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");

    if (savedToken) {
      setToken(savedToken);
      fetchProfile(savedToken).catch(() => {
        localStorage.removeItem("auth_token");
        setToken(null);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  async function fetchProfile(authToken: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setAdmin(data.admin);
      setIsLoading(false);
    } catch {
      setAdmin(null);
      setToken(null);
      localStorage.removeItem("auth_token");
      setIsLoading(false);
    }
  }

  async function login(username: string, password: string) {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      const data = await response.json();
      setToken(data.token);
      setAdmin(data.admin);
      localStorage.setItem("auth_token", data.token);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("auth_token");
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!admin && !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
