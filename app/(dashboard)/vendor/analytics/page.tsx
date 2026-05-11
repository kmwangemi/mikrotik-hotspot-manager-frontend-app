'use client';

import { ConversionRateChart } from '@/components/charts/conversion-rate-chart';
import { DailyActiveUsersChart } from '@/components/charts/daily-active-users-chart';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { SessionDistributionChart } from '@/components/charts/session-distribution-chart';
import { TopPackagesChart } from '@/components/charts/top-packages-chart';
import { TransactionVolumeChart } from '@/components/charts/transaction-volume-chart';
import { UserGrowthChart } from '@/components/charts/user-growth-chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useConversionRateData, useDailyActiveUsersData, useRevenueData, useSessionDistributionData, useTopPackagesData, useTransactionVolumeData, useUserGrowthData } from '@/hooks/queries/useAnalytics';
import { useAuthStore } from '@/lib/store/auth';
import { useState } from 'react';

export default function VendorAnalyticsPage() {
  const { user } = useAuthStore();
  const [dateRange, setDateRange] = useState('30');

  const { data: revenueData } = useRevenueData(user?.vendor_id ?? undefined);
  const { data: userGrowthData } = useUserGrowthData();
  const { data: sessionDistributionData } = useSessionDistributionData();
  const { data: conversionRateData } = useConversionRateData();
  const { data: dailyActiveUsersData } = useDailyActiveUsersData();
  const { data: topPackagesData } = useTopPackagesData();
  const { data: transactionVolumeData } = useTransactionVolumeData();

  return (
    <div className='p-8 space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Analytics</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Comprehensive business analytics
          </p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className='w-48 bg-card border-border'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='bg-card border-border'>
            <SelectItem value='7'>Last 7 days</SelectItem>
            <SelectItem value='30'>Last 30 days</SelectItem>
            <SelectItem value='90'>Last 90 days</SelectItem>
            <SelectItem value='custom'>Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Charts Grid */}
      <div className='space-y-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <RevenueChart data={revenueData || []} title='Revenue Trend' />
          <ConversionRateChart
            data={conversionRateData || []}
            title='Conversion Rate'
          />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <DailyActiveUsersChart
            data={dailyActiveUsersData || []}
            title='Daily Active Users'
          />
          <UserGrowthChart data={userGrowthData || []} title='User Growth' />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <TopPackagesChart data={topPackagesData || []} title='Top Packages' />
          <SessionDistributionChart
            data={sessionDistributionData || []}
            title='Session Duration Distribution'
          />
        </div>
        <div className='w-full'>
          <TransactionVolumeChart
            data={transactionVolumeData || []}
            title='Transaction Volume'
          />
        </div>
      </div>
    </div>
  );
}
