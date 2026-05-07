'use client';

import { StatCard } from '@/components/dashboard/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVendors } from '@/lib/api/queries';
import { Building2, ChevronLeft, ChevronRight, DollarSign, Plus, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function VendorsPage() {
  const { data: vendors, isLoading } = useVendors();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginationData = useMemo(() => {
    if (!vendors) return { paginatedVendors: [], totalPages: 0 };
    const totalPages = Math.ceil(vendors.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return {
      paginatedVendors: vendors.slice(startIdx, endIdx),
      totalPages,
    };
  }, [vendors, currentPage]);

  const totalRevenue = vendors?.reduce((sum, v) => sum + v.revenue, 0) || 0;
  const totalUsers = vendors?.reduce((sum, v) => sum + v.activeUsers, 0) || 0;
  const activeVendors = vendors?.filter((v) => v.status === 'active').length || 0;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all vendors on the platform
          </p>
        </div>
        <Link href="/superadmin/vendors/add">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="w-4 h-4" />
            Add Vendor
          </Button>
        </Link>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Vendors"
          value={vendors?.length || 0}
          icon={Building2}
          trend={{ value: 2, direction: 'up' }}
        />
        <StatCard
          label="Platform Revenue"
          value={`$${(totalRevenue / 1000).toFixed(1)}k`}
          icon={DollarSign}
          trend={{ value: 18, direction: 'up' }}
        />
        <StatCard
          label="Total Users"
          value={totalUsers}
          icon={Users}
          trend={{ value: 12, direction: 'up' }}
        />
        <StatCard
          label="Active Vendors"
          value={activeVendors}
          icon={TrendingUp}
          trend={{ value: 1, direction: 'up' }}
        />
      </div>
      {/* Vendors Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">All Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Vendor Name
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Contact Email
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Revenue
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Users
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Sessions
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      Loading vendors...
                    </td>
                  </tr>
                ) : paginationData.paginatedVendors && paginationData.paginatedVendors.length > 0 ? (
                  paginationData.paginatedVendors.map((vendor) => (
                    <tr key={vendor.id} className="border-b border-border hover:bg-background/50">
                      <td className="py-3 px-4">
                        <span className="text-foreground font-semibold">{vendor.name}</span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{vendor.email}</td>
                      <td className="py-3 px-4 text-foreground font-semibold">
                        ${vendor.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-foreground">{vendor.activeUsers}</td>
                      <td className="py-3 px-4 text-foreground">{vendor.activeSessions}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            vendor.status === 'active'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-red-500/20 text-red-500'
                          }`}
                        >
                          {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/superadmin/vendors/${vendor.id}`}
                          className="text-primary hover:text-secondary transition-colors font-semibold text-xs"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No vendors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {paginationData.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {paginationData.totalPages} ({vendors?.length || 0} total vendors)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setCurrentPage(Math.min(paginationData.totalPages, currentPage + 1))}
                  disabled={currentPage === paginationData.totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
