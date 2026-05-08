'use client';

import { Button } from '@/components/ui/button';
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
import { usePathname, useRouter } from 'next/navigation';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const isSuperAdmin = user?.role === 'superadmin';

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const baseItems = [
    {
      label: 'Dashboard',
      href: isSuperAdmin ? '/superadmin' : '/vendor',
      icon: LayoutDashboard,
    },
  ];

  const superAdminItems = [
    {
      label: 'Vendors',
      href: '/superadmin/vendors',
      icon: Users,
    },
    {
      label: 'Routers',
      href: '/superadmin/routers',
      icon: Router,
    },
    {
      label: 'Analytics',
      href: '/superadmin/analytics',
      icon: BarChart3,
    },
    {
      label: 'Logs',
      href: '/superadmin/logs',
      icon: FileText,
    },
    {
      label: 'Profile',
      href: '/superadmin/profile',
      icon: User,
    },
  ];

  const vendorItems = [
    {
      label: 'Routers',
      href: '/vendor/routers',
      icon: Router,
    },
    {
      label: 'Packages',
      href: '/vendor/packages',
      icon: Package,
    },
    {
      label: 'Users',
      href: '/vendor/users',
      icon: Users,
    },
    {
      label: 'Sessions',
      href: '/vendor/sessions',
      icon: Activity,
    },
    {
      label: 'Transactions',
      href: '/vendor/transactions',
      icon: BarChart3,
    },
    {
      label: 'Analytics',
      href: '/vendor/analytics',
      icon: BarChart3,
    },
    {
      label: 'Profile',
      href: '/vendor/profile',
      icon: User,
    },
  ];

  const items = isSuperAdmin
    ? [...baseItems, ...superAdminItems]
    : [...baseItems, ...vendorItems];

  return (
    <div className='w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full'>
      {/* Logo */}
      <div className='h-16 border-b border-sidebar-border flex items-center px-6'>
        <Link href='/' className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center'>
            <div className='w-4 h-4 bg-sidebar-primary-foreground rounded'></div>
          </div>
          <span className='font-bold text-lg text-sidebar-foreground'>
            HotSpot
          </span>
        </Link>
      </div>
      {/* Navigation */}
      <nav className='flex-1 overflow-auto px-3 py-4 space-y-2'>
        {items.map(item => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/20',
                )}
              >
                <Icon className='w-4 h-4' />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
      {/* Footer */}
      <div className='border-t border-sidebar-border p-4 space-y-2'>
        <div className='px-2 py-2'>
          <p className='text-xs text-sidebar-foreground font-semibold'>
            {(user?.first_name ? user.first_name + ' ' + user.last_name : '')}
          </p>
          <p className='text-xs text-sidebar-foreground/70'>
            {user?.email}
          </p>
        </div>
        <Button
          variant='ghost'
          className='w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent/20'
          onClick={handleLogout}
        >
          <LogOut className='w-4 h-4' />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
