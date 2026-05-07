'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Download, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  category:
    | 'user_management'
    | 'vendor_management'
    | 'router_management'
    | 'auth'
    | 'settings';
  details: string;
  status: 'success' | 'error' | 'warning';
  ipAddress: string;
}

const mockLogs: ActivityLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
    user: 'Admin User',
    action: 'Created New Vendor',
    category: 'vendor_management',
    details: 'Vendor "TechFlow Communications" created successfully',
    status: 'success',
    ipAddress: '192.168.1.100',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
    user: 'Admin User',
    action: 'Updated Router Configuration',
    category: 'router_management',
    details: 'Router "Main-Router-01" configuration updated',
    status: 'success',
    ipAddress: '192.168.1.100',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    user: 'Vendor Admin',
    action: 'Failed Login Attempt',
    category: 'auth',
    details: 'Failed login attempt for user: vendor@example.com',
    status: 'error',
    ipAddress: '203.0.113.42',
  },
];

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLogs = useMemo(() => {
    let filtered = mockLogs;
    if (searchTerm) {
      filtered = filtered.filter(
        log =>
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(log => log.category === categoryFilter);
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter);
    }
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    return {
      logs: filtered.slice(startIdx, startIdx + itemsPerPage),
      totalPages,
      totalCount: filtered.length,
    };
  }, [searchTerm, categoryFilter, statusFilter, currentPage]);

  return (
    <div className='p-8 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-foreground'>Activity Logs</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Monitor system and user activities
          </p>
        </div>
        <Button className='bg-primary hover:bg-primary/90 text-primary-foreground gap-2'>
          <Download className='w-4 h-4' />
          Export
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
          <Input
            placeholder='Search logs...'
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className='bg-card border-border pl-10'
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={value => {
            setCategoryFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className='bg-card border-border'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='bg-card border-border'>
            <SelectItem value='all'>All Categories</SelectItem>
            <SelectItem value='vendor_management'>Vendor Management</SelectItem>
            <SelectItem value='auth'>Authentication</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={value => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className='bg-card border-border'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className='bg-card border-border'>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='success'>Success</SelectItem>
            <SelectItem value='error'>Error</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card className='bg-card border-border'>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-border bg-background/50'>
                  <th className='py-3 px-4 text-left text-xs font-semibold text-muted-foreground'>
                    Timestamp
                  </th>
                  <th className='py-3 px-4 text-left text-xs font-semibold text-muted-foreground'>
                    User
                  </th>
                  <th className='py-3 px-4 text-left text-xs font-semibold text-muted-foreground'>
                    Action
                  </th>
                  <th className='py-3 px-4 text-left text-xs font-semibold text-muted-foreground'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.logs.length > 0 ? (
                  filteredLogs.logs.map(log => (
                    <tr
                      key={log.id}
                      className='border-b border-border hover:bg-background/50'
                    >
                      <td className='py-3 px-4 text-sm text-muted-foreground whitespace-nowrap'>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className='py-3 px-4 text-sm text-foreground font-semibold'>
                        {log.user}
                      </td>
                      <td className='py-3 px-4 text-sm text-foreground'>
                        {log.action}
                      </td>
                      <td className='py-3 px-4'>
                        <Badge
                          className={
                            log.status === 'success'
                              ? 'bg-green-500/20 text-green-500 border-0'
                              : 'bg-red-500/20 text-red-500 border-0'
                          }
                        >
                          {log.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className='py-8 text-center text-muted-foreground'
                    >
                      No logs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredLogs.totalPages > 1 && (
            <div className='flex items-center justify-between p-4 border-t border-border'>
              <p className='text-sm text-muted-foreground'>
                Page {currentPage} of {filteredLogs.totalPages}
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
                      Math.min(filteredLogs.totalPages, currentPage + 1),
                    )
                  }
                  disabled={currentPage === filteredLogs.totalPages}
                >
                  Next
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
