import { api } from '@/lib/api';
import { Session } from '@/lib/api/mockData';

export const sessionService = {
  getSessions: (vendorId?: string) => api.get<Session[]>('/sessions', { params: { vendorId } }),
  kickSession: (id: string) => api.post<{success: boolean}>(`/sessions/${id}/kick`),
};
