import { useQuery } from '@tanstack/react-query';
import { vendorService } from '@/services/vendorService';

export const useVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: () => vendorService.getVendors(),
  });
};

export const useVendor = (vendorId: string) => {
  return useQuery({
    queryKey: ['vendor', vendorId],
    queryFn: () => vendorService.getVendorById(vendorId),
  });
};

export const useVendorDetails = (vendorId: string) => {
  return useQuery({
    queryKey: ['vendor-details', vendorId],
    queryFn: () => vendorService.getVendorDetails(vendorId),
  });
};
