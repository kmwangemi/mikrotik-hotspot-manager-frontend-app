'use client';

import { DailyActiveUsersChart } from '@/components/charts/daily-active-users-chart';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { TopPackagesChart } from '@/components/charts/top-packages-chart';
import { TransactionVolumeChart } from '@/components/charts/transaction-volume-chart';
import { RouterStatusCard } from '@/components/dashboard/router-status-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  generateDailyActiveUsersData,
  generateTopPackagesData,
  generateTransactionVolumeData,
} from '@/lib/api/mockData';
import { useRevenueData, useRouters, useVendors } from '@/lib/api/queries';
import { useAuthStore } from '@/lib/store/auth';
import { useQuery } from '@tanstack/react-query';
import { Building2, DollarSign, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SuperAdminDashboard() {
  const { user } = useAuthStore();
  const { data: vendors } = useVendors();
  const { data: routers } = useRouters();
  const { data: revenueData } = useRevenueData();
  const [dateRange, setDateRange] = useState('30');

  const { data: dailyActiveUsersData } = useQuery({
    queryKey: ['analytics', 'daily-active-users'],
    queryFn: async () => generateDailyActiveUsersData(),
  });

  const { data: topPackagesData } = useQuery({
    queryKey: ['analytics', 'top-packages'],
    queryFn: async () => generateTopPackagesData(),
  });

  const { data: transactionVolumeData } = useQuery({
    queryKey: ['analytics', 'transaction-volume'],
    queryFn: async () => generateTransactionVolumeData(),
  });

  // Calculate totals
  const totalRevenue = vendors?.reduce((sum, v) => sum + v.revenue, 0) || 0;
  const totalUsers = vendors?.reduce((sum, v) => sum + v.activeUsers, 0) || 0;
  const totalActiveSessions = vendors?.reduce((sum, v) => sum + v.activeSessions, 0) || 0;
  const totalVendors = vendors?.length || 0;
  const onlineRouters = routers?.filter((r) => r.status === 'online').length || 0;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48 bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={`$${(totalRevenue / 1000).toFixed(1)}k`}
          icon={DollarSign}
          trend={{ value: 15, direction: 'up' }}
        />
        <StatCard
          label="Total Users"
          value={totalUsers}
          icon={Users}
          trend={{ value: 12, direction: 'up' }}
        />
        <StatCard
          label="Active Vendors"
          value={totalVendors}
          icon={Building2}
          trend={{ value: 8, direction: 'up' }}
        />
        <StatCard
          label="Online Routers"
          value={onlineRouters}
          icon={TrendingUp}
          trend={{ value: 2, direction: 'up' }}
        />
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData || []} title="Platform Revenue" />
        <DailyActiveUsersChart
          data={dailyActiveUsersData || []}
          title="Daily Active Users"
        />
        <TopPackagesChart data={topPackagesData || []} title="Top Packages" />
        <TransactionVolumeChart
          data={transactionVolumeData || []}
          title="Transaction Volume"
        />
      </div>
      {/* Routers Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Router Status</h2>
            <p className="text-sm text-muted-foreground mt-1">All platform routers</p>
          </div>
          <Link href="/superadmin/routers">
            <Button variant="outline" className="border-border hover:bg-background">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routers?.slice(0, 3).map((router) => (
            <RouterStatusCard key={router.id} router={router} />
          ))}
        </div>
      </div>
      {/* Vendors Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Top Vendors</h2>
            <p className="text-sm text-muted-foreground mt-1">Highest revenue vendors</p>
          </div>
          <Link href="/superadmin/vendors">
            <Button variant="outline" className="border-border hover:bg-background">
              View All
            </Button>
          </Link>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                      Vendor Name
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                      Revenue
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                      Active Users
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vendors?.slice(0, 5).map((vendor) => (
                    <tr key={vendor.id} className="border-b border-border hover:bg-background/50">
                      <td className="py-3 px-4">
                        <Link
                          href={`/superadmin/vendors/${vendor.id}`}
                          className="text-primary hover:text-secondary font-semibold transition-colors"
                        >
                          {vendor.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-foreground font-semibold">
                        ${vendor.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-foreground">{vendor.activeUsers}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            vendor.status === 'active'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {vendor.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
