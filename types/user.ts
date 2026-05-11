export type UserRole = 'superadmin' | 'vendor';
export type VendorStatus = 'active' | 'pending' | 'suspended';
// ─────────────────────────────────────────────────────────────────────────────
// Auth / JWT
// ─────────────────────────────────────────────────────────────────────────────
export interface TokenPayload {
  sub: string;
  role: UserRole;
  subdomain: string | null;
  exp: number;
  iat: number;
  jti: string;
  type: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
// ─────────────────────────────────────────────────────────────────────────────
// Vendor
// ─────────────────────────────────────────────────────────────────────────────
export interface Vendor {
  id: string;
  business_name: string;
  business_email: string;
  business_phone_number: string;
  subdomain: string;
  business_address: string | null;
  logo_url: string | null;
  status: VendorStatus;
  referral_code: string | null;
  created_at: string;
  updated_at: string;
}
// ─────────────────────────────────────────────────────────────────────────────
// User
// ─────────────────────────────────────────────────────────────────────────────
export interface UserResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  role: UserRole;
  is_active: boolean;
  is_email_verified: boolean;
  profile_picture_url: string | null;
  vendor_id: string | null;
  vendor: Vendor | null;
  created_at: string;
  updated_at: string;
}
// Full profile
export type UserProfile = UserResponse;
// ─────────────────────────────────────────────────────────────────────────────
// Auth Store
// ─────────────────────────────────────────────────────────────────────────────
export interface AuthState {
  user: UserResponse | null;
  token: string | null;
  refreshToken: string | null;
  hasHydrated: boolean;
  setUser: (user: UserResponse | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  logout: () => void;
  checkAuth: () => boolean;
  setHasHydrated: (state: boolean) => void;
  // Helpers
  isSuperAdmin: () => boolean;
  isVendor: () => boolean;
  getSubdomain: () => string | null;
}
// ─────────────────────────────────────────────────────────────────────────────
// Profile Updates
// ─────────────────────────────────────────────────────────────────────────────
export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string | null;
  profile_picture_url?: string | null;
}
export interface UpdateVendorPayload {
  business_name?: string;
  business_email?: string;
  business_phone_number?: string;
  subdomain?: string;
  business_address?: string | null;
  logo_url?: string | null;
  referral_code?: string | null;
}
export interface UpdateProfilePayload {
  user?: UpdateUserPayload;
  vendor?: UpdateVendorPayload;
}
// ─────────────────────────────────────────────────────────────────────────────
// Password
// ─────────────────────────────────────────────────────────────────────────────
export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  confirm_password: string;
}
