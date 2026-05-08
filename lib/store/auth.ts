import { AuthState } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      hasHydrated: false,

      setUser: user => set({ user }),
      setToken: token => set({ token }),
      setRefreshToken: token => set({ refreshToken: token }),

      logout: () => set({ user: null, token: null, refreshToken: null }),

      // checkAuth: () => !!get().token && !!get().user,

      // After — token is enough to be "authenticated"
      checkAuth: () => !!get().token,

      setHasHydrated: state => set({ hasHydrated: state }),

      // Helpers
      isSuperAdmin: () => get().user?.role === 'superadmin',
      isVendor: () => get().user?.role === 'vendor',
      getSubdomain: () => get().user?.subdomain ?? null,
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

// const { isSuperAdmin, getSubdomain } = useAuthStore();

// if (isSuperAdmin()) { ... }

// const subdomain = getSubdomain(); // "techflow" or null
