'use client';

import { DailyActiveUsersChart } from '@/components/charts/daily-active-users-chart';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { TopPackagesChart } from '@/components/charts/top-packages-chart';
import { TransactionVolumeChart } from '@/components/charts/transaction-volume-chart';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  generateDailyActiveUsersData,
  generateRevenueData,
  generateTopPackagesData,
  generateTransactionVolumeData,
} from '@/lib/api/mockData';
import { useVendorDetails } from '@/hooks/queries/useVendors';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  DollarSign,
  Mail,
  Phone,
  Router,
  TrendingUp,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function VendorDetailsPage() {
  const params = useParams();
  const vendorId = params['vendor-id'] as string;
  const [dateRange, setDateRange] = useState('30');

  const { data: vendor, isLoading } = useVendorDetails(vendorId);

  const { data: revenueData } = useQuery({
    queryKey: ['vendor', vendorId, 'revenue', dateRange],
    queryFn: async () => generateRevenueData(),
  });

  const { data: dailyActiveUsersData } = useQuery({
    queryKey: ['vendor', vendorId, 'dau', dateRange],
    queryFn: async () => generateDailyActiveUsersData(),
  });

  const { data: topPackagesData } = useQuery({
    queryKey: ['vendor', vendorId, 'packages', dateRange],
    queryFn: async () => generateTopPackagesData(),
  });

  const { data: transactionVolumeData } = useQuery({
    queryKey: ['vendor', vendorId, 'transactions', dateRange],
    queryFn: async () => generateTransactionVolumeData(),
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading vendor details...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="p-8">
        <Link href="/superadmin/vendors">
          <Button variant="outline" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Vendors
          </Button>
        </Link>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Vendor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <Link href="/superadmin/vendors">
          <Button variant="outline" className="gap-2 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Vendors
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{vendor.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{vendor.description}</p>
          </div>
          <Badge
            variant="outline"
            className={`text-sm font-semibold ${
              vendor.status === 'active'
                ? 'bg-green-500/20 text-green-500 border-green-500/30'
                : 'bg-red-500/20 text-red-500 border-red-500/30'
            }`}
          >
            {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
          </Badge>
        </div>
      </div>
      {/* Business Information */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Company Email</p>
              <div className="flex items-center gap-2 mt-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${vendor.email}`} className="text-primary hover:underline">
                  {vendor.email}
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <div className="flex items-center gap-2 mt-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${vendor.phone || 'N/A'}`} className="text-foreground">
                  {vendor.phone || 'N/A'}
                </a>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Subdomain</p>
              <p className="text-foreground font-semibold mt-2">
                {vendor.subdomain || 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Referral Code</p>
              <p className="text-foreground font-semibold mt-2">
                {vendor.referralCode || 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value={`KES ${(vendor.revenue / 1000).toFixed(1)}k`}
          icon={DollarSign}
          trend={{ value: 12, direction: 'up' }}
        />
        <StatCard
          label="Active Users"
          value={vendor.activeUsers}
          icon={Users}
          trend={{ value: 8, direction: 'up' }}
        />
        <StatCard
          label="Routers"
          value={vendor.totalRouters || 0}
          icon={Router}
        />
        <StatCard
          label="Active Sessions"
          value={vendor.activeSessions}
          icon={TrendingUp}
          trend={{ value: 5, direction: 'up' }}
        />
      </div>
      {/* Date Range Filter */}
      <div className="flex justify-end">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48 bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Charts Grid */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={revenueData || []} title="Revenue Trend" />
          <DailyActiveUsersChart
            data={dailyActiveUsersData || []}
            title="Daily Active Users"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopPackagesChart data={topPackagesData || []} title="Top Packages" />
          <TransactionVolumeChart
            data={transactionVolumeData || []}
            title="Transaction Volume"
          />
        </div>
      </div>
    </div>
  );
}
