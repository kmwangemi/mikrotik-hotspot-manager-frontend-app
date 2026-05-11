import { api } from '@/lib/api';
import { Vendor } from '@/lib/api/mockData';

export const vendorService = {
  getVendors: () => api.get<Vendor[]>('/vendors'),
  getVendorById: (id: string) => api.get<Vendor>(`/vendors/${id}`),
  getVendorDetails: (id: string) => api.get<Vendor>(`/vendors/${id}/details`),
};
