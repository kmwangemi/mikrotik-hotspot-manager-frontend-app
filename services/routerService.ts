import { api } from '@/lib/api';
import { RouterStatus } from '@/lib/api/mockData';

export const routerService = {
  getRouters: (vendorId?: string) => api.get<RouterStatus[]>('/routers', { params: { vendorId } }),
  getRouterById: (id: string) => api.get<RouterStatus>(`/routers/${id}`),
  addRouter: (data: any) => api.post<RouterStatus>('/routers', data),
  updateRouter: (id: string, data: any) => api.patch<RouterStatus>(`/routers/${id}`, data),
  deleteRouter: (id: string) => api.delete<{success: boolean}>(`/routers/${id}`),
};
