'use client';

import { HeaderProfile } from '@/components/dashboard/header-profile';
import { MobileNav } from '@/components/dashboard/mobile-nav';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useProfile } from '@/hooks/queries/useProfile';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { checkAuth, hasHydrated } = useAuthStore();
  const { isLoading, isError } = useProfile();
  useEffect(() => {
    if (!hasHydrated) return;
    if (!checkAuth()) {
      router.push('/login');
    }
  }, [hasHydrated, checkAuth, router]);
  // Profile fetch failed — token likely expired or invalid
  useEffect(() => {
    if (isError) {
      router.push('/login');
    }
  }, [isError, router]);
  // Wait for persisted state to load
  if (!hasHydrated) return null;
  // Redirect if not authenticated
  if (!checkAuth()) return null;
  // Show loading spinner while fetching profile
  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-3'>
          <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
          <p className='text-sm text-muted-foreground'>Loading...</p>
        </div>
      </div>
    );
  }
  if (isError) return null;
  return (
    <div className='flex h-screen bg-background'>
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className='hidden md:block'>
        <Sidebar />
      </div>
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Mobile Navigation - Visible only on Mobile */}
        <div className='md:hidden border-b border-border'>
          <MobileNav />
        </div>
        {/* Desktop Header - Visible only on Desktop */}
        <div className='hidden md:flex items-center justify-end h-16 px-8 border-b border-border bg-card'>
          <HeaderProfile />
        </div>
        <main className='flex-1 overflow-auto'>{children}</main>
      </div>
    </div>
  );
}
