import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analyticsService';

export const useRevenueData = (vendorId?: string) => {
  return useQuery({
    queryKey: ['analytics', 'revenue', vendorId],
    queryFn: () => analyticsService.getRevenueData(vendorId),
  });
};

export const useUserGrowthData = () => {
  return useQuery({
    queryKey: ['analytics', 'user-growth'],
    queryFn: () => analyticsService.getUserGrowthData(),
  });
};

export const useSessionDistributionData = () => {
  return useQuery({
    queryKey: ['analytics', 'session-distribution'],
    queryFn: () => analyticsService.getSessionDistributionData(),
  });
};

export const useDailyActiveUsersData = () => {
  return useQuery({
    queryKey: ['analytics', 'daily-active-users'],
    queryFn: () => analyticsService.getDailyActiveUsersData(),
  });
};

export const useTopPackagesData = () => {
  return useQuery({
    queryKey: ['analytics', 'top-packages'],
    queryFn: () => analyticsService.getTopPackagesData(),
  });
};

export const useConversionRateData = () => {
  return useQuery({
    queryKey: ['analytics', 'conversion-rate'],
    queryFn: () => analyticsService.getConversionRateData(),
  });
};

export const useTransactionVolumeData = () => {
  return useQuery({
    queryKey: ['analytics', 'transaction-volume'],
    queryFn: () => analyticsService.getTransactionVolumeData(),
  });
};
