import { api } from '@/lib/api';
import { LoginFormData, SignupFormData } from '@/lib/validations/auth';
import { LoginResponse } from '@/types/user';

interface LogoutResponse {
  message: string;
}

export const authService = {
  login: async (payload: LoginFormData): Promise<LoginResponse> => {
    return api.post<LoginResponse>('/auth/login', payload);
  },
  register: async (payload: SignupFormData): Promise<LoginResponse> => {
    return api.post<LoginResponse>('/auth/register', payload);
  },
  logout: async (payload: {
    refresh_token: string;
  }): Promise<LogoutResponse> => {
    return api.post<LogoutResponse>('/auth/logout', payload);
  },
  verifyOtp: async (payload: {
    email?: string;
    code: string;
    prefillUser?: string | string[];
  }): Promise<LoginResponse> => {
    return api.post<LoginResponse>('/auth/verify-otp', payload);
  },
  resendOtp: async (payload: { email: string }): Promise<any> => {
    return api.post('/auth/resend-otp', payload);
  },
  resetPassword: async (payload: { email: string }): Promise<any> => {
    return api.post('/auth/reset-password', payload);
  },
};
