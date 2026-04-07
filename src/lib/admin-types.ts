/**
 * Admin System Types
 * Comprehensive type definitions for news management, authentication, and admin operations
 */

// ==================== Authentication Types ====================

export type AdminRole = 'super_admin' | 'admin' | 'news_editor';

export interface AdminProfile {
  id: string;
  displayName: string;
  role: AdminRole;
  createdAt?: string;
  createdBy?: string;
}

export interface AdminUser extends AdminProfile {
  username?: string;
  usernameHash?: string;
  passwordHash?: string;
}

export interface AuthResponse {
  token: string;
  admin: AdminProfile;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateAdminRequest {
  username: string;
  password: string;
  displayName: string;
  role: AdminRole;
}

// ==================== News Types ====================

export type NewsStatus = 'draft' | 'pending' | 'published';

export interface News {
  id: string;
  slug: string;
  title_mn: string;
  title_en: string;
  content_mn: string; // HTML from Tiptap
  content_en: string; // HTML from Tiptap
  image: string; // Cloudinary URL
  category?: string;
  author: string; // admin username or display name
  status: NewsStatus;
  createdBy: string; // admin UUID
  approvedBy?: string | null; // admin UUID
  approvedAt?: string | null; // ISO timestamp
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface CreateNewsRequest {
  title_mn: string;
  title_en: string;
  content_mn: string;
  content_en: string;
  image: string;
  category?: string;
  author?: string;
  status?: NewsStatus;
}

export interface UpdateNewsRequest {
  title_mn?: string;
  title_en?: string;
  content_mn?: string;
  content_en?: string;
  image: string;
  category?: string;
  author?: string;
  status?: NewsStatus;
}

export interface NewsFilters {
  status?: NewsStatus | 'all';
  search?: string;
  limit?: number;
  offset?: number;
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  ok?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ==================== Request/Response Payloads ====================

export interface NewsListResponse {
  data: News[];
  total?: number;
}

export interface AdminListResponse {
  admins: AdminProfile[];
}

export interface CloudinarySignResponse {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
  publicId: string;
  fallbackClouds?: string[];
}

export interface CloudinarySignRequest {
  folder: string;
  publicId: string;
  timestamp?: number;
  tags?: string;
  context?: string;
  overwrite?: boolean;
}

// ==================== Utility Types ====================

export interface AuthContextType {
  admin: AdminProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface UseNewsOptions {
  autoFetch?: boolean;
  status?: NewsStatus | 'all';
  enabled?: boolean;
}

export interface NewsEditorState {
  title_mn: string;
  title_en: string;
  content_mn: string;
  content_en: string;
  image: string | null;
  category: string;
  status: NewsStatus;
  author: string;
  isPreviewOpen: boolean;
  isSaving: boolean;
}
