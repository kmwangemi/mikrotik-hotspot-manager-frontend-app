import { api } from '@/lib/api';

export const analyticsService = {
  getRevenueData: (vendorId?: string) => api.get<any[]>('/analytics/revenue', { params: { vendorId } }),
  getUserGrowthData: () => api.get<any[]>('/analytics/user-growth'),
  getSessionDistributionData: () => api.get<any[]>('/analytics/session-distribution'),
  getDailyActiveUsersData: () => api.get<any[]>('/analytics/daily-active-users'),
  getTopPackagesData: () => api.get<any[]>('/analytics/top-packages'),
  getConversionRateData: () => api.get<any[]>('/analytics/conversion-rate'),
  getTransactionVolumeData: () => api.get<any[]>('/analytics/transaction-volume'),
};
