'use client';

import { useLogout } from '@/hooks/queries/useAuth';
import { useAuthStore } from '@/lib/store/auth';
import { cn } from '@/lib/utils';
import {
  Activity,
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Router,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { user, logout: clearAuth } = useAuthStore();
  const isSuperAdmin = user?.role === 'superadmin';

  const handleLogout = () => {
    const { refreshToken } = useAuthStore.getState();
    if (!refreshToken) {
      clearAuth();
      return;
    }
    logout({ refresh_token: refreshToken });
  };

  const baseItems = [
    {
      label: 'Dashboard',
      href: isSuperAdmin ? '/superadmin' : '/vendor',
      icon: LayoutDashboard,
    },
  ];

  const superAdminItems = [
    { label: 'Vendors', href: '/superadmin/vendors', icon: Users },
    { label: 'Routers', href: '/superadmin/routers', icon: Router },
    { label: 'Analytics', href: '/superadmin/analytics', icon: BarChart3 },
    { label: 'Logs', href: '/superadmin/logs', icon: FileText },
    { label: 'Profile', href: '/superadmin/profile', icon: User },
  ];

  const vendorItems = [
    { label: 'Routers', href: '/vendor/routers', icon: Router },
    { label: 'Packages', href: '/vendor/packages', icon: Package },
    { label: 'Users', href: '/vendor/users', icon: Users },
    { label: 'Sessions', href: '/vendor/sessions', icon: Activity },
    { label: 'Transactions', href: '/vendor/transactions', icon: BarChart3 },
    { label: 'Analytics', href: '/vendor/analytics', icon: BarChart3 },
    { label: 'Profile', href: '/vendor/profile', icon: User },
  ];

  const items = isSuperAdmin
    ? [...baseItems, ...superAdminItems]
    : [...baseItems, ...vendorItems];

  return (
    <div className='w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full'>
      {/* Logo */}
      <div className='h-16 border-b border-sidebar-border flex items-center px-6 shrink-0'>
        <Link href='/' className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center'>
            <div className='w-4 h-4 bg-sidebar-primary-foreground rounded' />
          </div>
          <span className='font-bold text-lg text-sidebar-foreground'>
            HotSpot
          </span>
        </Link>
      </div>
      {/* Navigation — scrollable, but constrained so footer is never covered */}
      <nav className='flex-1 min-h-0 overflow-y-auto px-3 py-4 space-y-2'>
        {items.map(item => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/20',
                )}
              >
                <Icon className='w-4 h-4' />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
      {/* Footer — shrink-0 ensures it's never pushed out of view */}
      <div className='shrink-0 border-t border-sidebar-border p-4 space-y-2'>
        <div className='px-2 py-2'>
          <p className='text-xs text-sidebar-foreground font-semibold'>
            {user?.first_name ? `${user.first_name} ${user.last_name}` : ''}
          </p>
          <p className='text-xs text-sidebar-foreground/70'>
            {user?.email || ''}
          </p>
        </div>
        <button
          type='button'
          onClick={handleLogout}
          disabled={isLoggingOut}
          className='w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <LogOut className='w-4 h-4' />
          <span>{isLoggingOut ? 'Signing out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
}
