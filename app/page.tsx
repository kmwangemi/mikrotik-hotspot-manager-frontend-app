'use client';

import LandingPage from '@/components/landing-page';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'superadmin') {
        router.push('/dashboard/superadmin');
      } else {
        router.push('/dashboard/vendor');
      }
    }
  }, [isAuthenticated, user, router]);
  // Show landing page if not authenticated
  if (isAuthenticated) {
    return null;
  }
  return <LandingPage />;
}
