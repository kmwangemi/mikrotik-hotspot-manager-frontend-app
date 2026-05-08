import { api } from '@/lib/api';
import { UserResponse } from '@/types/user';

export const profileService = {
  getProfile: () => api.get<UserResponse>('/profile'),
};
