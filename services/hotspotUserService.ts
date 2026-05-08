import { api } from '@/lib/api';
import { HotspotUser } from '@/lib/api/mockData';

export const hotspotUserService = {
  getHotspotUsers: (vendorId?: string) => api.get<HotspotUser[]>('/hotspot-users', { params: { vendorId } }),
  addHotspotUser: (data: any) => api.post<HotspotUser>('/hotspot-users', data),
  deleteHotspotUser: (id: string) => api.delete<{success: boolean}>(`/hotspot-users/${id}`),
};
