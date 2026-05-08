'use client';

import { RouterStatusCard } from '@/components/dashboard/router-status-card';
import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouters } from '@/hooks/queries/useRouters';
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Router,
  Wifi,
  WifiOff,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function SuperAdminRoutersPage() {
  const { data: routers, isLoading } = useRouters();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginationData = useMemo(() => {
    if (!routers) return { paginatedRouters: [], totalPages: 0 };
    const totalPages = Math.ceil(routers.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return {
      paginatedRouters: routers.slice(startIdx, endIdx),
      totalPages,
    };
  }, [routers, currentPage]);

  const onlineCount = routers?.filter(r => r.status === 'online').length || 0;
  const offlineCount = routers?.filter(r => r.status === 'offline').length || 0;
  const errorCount = routers?.filter(r => r.status === 'error').length || 0;
  const totalActiveUsers =
    routers?.reduce((sum, r) => sum + r.activeUsers, 0) || 0;

  return (
    <div className='p-8 space-y-8'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>
            Router Management
          </h1>
          <p className='text-sm text-muted-foreground mt-1'>
            All platform routers and status
          </p>
        </div>
        <Link href='/superadmin/routers/add'>
          <Button className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2'>
            <Plus className='w-4 h-4' />
            Add Router
          </Button>
        </Link>
      </div>
      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard
          label='Total Routers'
          value={routers?.length || 0}
          icon={Router}
        />
        <StatCard
          label='Online Routers'
          value={onlineCount}
          icon={Wifi}
          trend={{ value: 5, direction: 'up' }}
        />
        <StatCard label='Offline Routers' value={offlineCount} icon={WifiOff} />
        <StatCard
          label='Active Users'
          value={totalActiveUsers}
          icon={AlertCircle}
          trend={{ value: 3, direction: 'up' }}
        />
      </div>
      {/* Router Status Overview Table */}
      <Card className='bg-card border-border'>
        <CardHeader>
          <CardTitle className='text-lg'>Router Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-border'>
                  <th className='text-left py-3 px-4 text-muted-foreground font-semibold'>
                    Router Name
                  </th>
                  <th className='text-left py-3 px-4 text-muted-foreground font-semibold'>
                    IP Address
                  </th>
                  <th className='text-left py-3 px-4 text-muted-foreground font-semibold'>
                    Status
                  </th>
                  <th className='text-left py-3 px-4 text-muted-foreground font-semibold'>
                    Uptime
                  </th>
                  <th className='text-left py-3 px-4 text-muted-foreground font-semibold'>
                    Active Users
                  </th>
                  <th className='text-left py-3 px-4 text-muted-foreground font-semibold'>
                    CPU / Memory
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className='py-8 text-center text-muted-foreground'
                    >
                      Loading routers...
                    </td>
                  </tr>
                ) : paginationData.paginatedRouters &&
                  paginationData.paginatedRouters.length > 0 ? (
                  paginationData.paginatedRouters.map(router => (
                    <tr
                      key={router.id}
                      className='border-b border-border hover:bg-background/50'
                    >
                      <td className='py-3 px-4 text-foreground font-semibold'>
                        {router.name}
                      </td>
                      <td className='py-3 px-4 text-muted-foreground'>
                        {router.ipAddress}
                      </td>
                      <td className='py-3 px-4'>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            router.status === 'online'
                              ? 'bg-green-500/20 text-green-500'
                              : router.status === 'offline'
                                ? 'bg-red-500/20 text-red-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                          }`}
                        >
                          {router.status.charAt(0).toUpperCase() +
                            router.status.slice(1)}
                        </span>
                      </td>
                      <td className='py-3 px-4 text-foreground'>
                        {router.uptime}%
                      </td>
                      <td className='py-3 px-4 text-foreground'>
                        {router.activeUsers}
                      </td>
                      <td className='py-3 px-4 text-muted-foreground'>
                        {router.cpuUsage}% / {router.memoryUsage}%
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className='py-8 text-center text-muted-foreground'
                    >
                      No routers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {paginationData.totalPages > 1 && (
            <div className='flex items-center justify-between mt-6 pt-6 border-t border-border'>
              <p className='text-sm text-muted-foreground'>
                Page {currentPage} of {paginationData.totalPages} (
                {routers?.length || 0} total routers)
              </p>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className='w-4 h-4' />
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  className='gap-2'
                  onClick={() =>
                    setCurrentPage(
                      Math.min(paginationData.totalPages, currentPage + 1),
                    )
                  }
                  disabled={currentPage === paginationData.totalPages}
                >
                  Next
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Router Cards Grid */}
      <div>
        <h2 className='text-2xl font-bold text-foreground mb-6'>
          Router Details
        </h2>
        {isLoading ? (
          <div className='flex items-center justify-center h-64'>
            <p className='text-muted-foreground'>Loading routers...</p>
          </div>
        ) : routers && routers.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {routers.map(router => (
              <RouterStatusCard key={router.id} router={router} />
            ))}
          </div>
        ) : (
          <div className='flex items-center justify-center h-64 rounded-lg border border-border bg-card'>
            <p className='text-muted-foreground'>No routers available</p>
          </div>
        )}
      </div>
    </div>
  );
}
