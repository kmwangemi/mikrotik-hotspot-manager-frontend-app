export interface TokenPayload {
  sub: string;
  role: 'superadmin' | 'vendor';
  subdomain: string | null;
  exp: number;
  iat: number;
  jti: string;
  type: string;
}

export interface UserResponse {
  id: string;
  role: 'superadmin' | 'vendor';
  subdomain: string | null;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  profile_picture_url: string | null;
  vendor_id: string | null;
  is_active: boolean;
  is_email_verified: boolean;
}

export interface AuthState {
  user: UserResponse | null;
  token: string | null;
  refreshToken: string | null;
  hasHydrated: boolean;

  setUser: (user: UserResponse) => void;
  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
  setHasHydrated: (state: boolean) => void;
  // Helpers
  isSuperAdmin: () => boolean;
  isVendor: () => boolean;
  getSubdomain: () => string | null;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

// ─── User / profile domain types ─────────────────────────────────────────────
// Aligned to backend UserResponse, UserProfileUpdate, UserPerformanceStats

// Full profile — GET /users/profile
export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  is_admin: boolean;
  is_email_verified: boolean;
  is_phone_number_verified: boolean;
  is_active: boolean;
  profile_picture_url: string | null;
  createdAt: string;
  updatedAt: string;
}

// PATCH /auth/password
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ─── Payloads ─────────────────────────────────────────────────────────────────

/** PATCH /users/profile — own profile only */
export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string | null;
}
