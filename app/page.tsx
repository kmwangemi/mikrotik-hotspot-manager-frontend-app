'use client';

import LandingPage from '@/components/landing-page';
import { useAuthStore } from '@/lib/store/auth';
import { decodeToken } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const { checkAuth, user, token, hasHydrated } = useAuthStore();
  useEffect(() => {
    if (!hasHydrated) return;
    console.log('hasHydrated:', hasHydrated);
    console.log('checkAuth():', checkAuth());
    console.log('token:', token);
    console.log('user:', user);
    if (!checkAuth()) return;
    // Use stored user role if available, otherwise decode from token
    const role = user?.role ?? decodeToken(token!).role;
    if (role === 'superadmin') {
      router.push('/superadmin');
    } else {
      router.push('/vendor');
    }
  }, [hasHydrated, checkAuth, user, token, router]);
  // Wait for persisted state to load
  if (!hasHydrated) return null;
  // Already authenticated — return null while redirect happens
  if (checkAuth()) return null;
  return <LandingPage />;
}
