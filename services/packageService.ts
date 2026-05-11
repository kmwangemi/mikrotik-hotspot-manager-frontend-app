import { api } from '@/lib/api';
import { Package } from '@/lib/api/mockData';

export const packageService = {
  getPackages: (vendorId?: string) => api.get<Package[]>('/packages', { params: { vendorId } }),
  addPackage: (data: any) => api.post<Package>('/packages', data),
  updatePackage: (id: string, data: any) => api.patch<Package>(`/packages/${id}`, data),
  deletePackage: (id: string) => api.delete<{success: boolean}>(`/packages/${id}`),
};
