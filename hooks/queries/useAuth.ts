import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/lib/store/auth';
import { decodeToken } from '@/lib/utils';
import { authService } from '@/services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const { setToken, setRefreshToken, setUser } = useAuthStore();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: data => {
      const payload = decodeToken(data.access_token);
      // Store tokens
      setToken(data.access_token);
      setRefreshToken(data.refresh_token);
      // Set user from token immediately so checkAuth() returns true
      // Profile fetch in dashboard layout will overwrite this with full data
      setUser({
        id: payload.sub,
        email: '',
        first_name: '',
        last_name: '',
        phone_number: null,
        role: payload.role,
        is_active: true,
        is_email_verified: true,
        profile_picture_url: null,
        vendor_id: null,
        vendor: payload.subdomain
          ? {
              id: '',
              business_name: '',
              business_email: '',
              business_phone_number: '',
              subdomain: payload.subdomain,
              business_address: null,
              logo_url: null,
              status: 'active',
              referral_code: null,
              created_at: '',
              updated_at: '',
            }
          : null,
        created_at: '',
        updated_at: '',
      });
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      if (payload.role === 'superadmin') {
        router.push('/superadmin');
      } else {
        router.push('/vendor');
      }
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const clearSession = () => {
    logout();
    queryClient.clear();
    router.push('/login');
  };
  return useMutation({
    mutationFn: (payload: { refresh_token: string }) => {
      return authService.logout(payload);
    },
    onSuccess: clearSession,
    onError: clearSession,
  });
}

export function useRegister() {
  const router = useRouter();
  const { toast } = useToast();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: data => {
      router.push('/(tabs)');
      toast({
        title: 'Success',
        description: 'Your account has been created.',
      });
    },
  });
}

export function useVerifyOtp() {
  const router = useRouter();
  // const { setUser, setToken, setRefreshToken } = useAuthStore();
  return useMutation({
    mutationFn: authService.verifyOtp,
    onSuccess: data => {
      // setUser(data.user);
      // setToken(data.access_token);
      // setRefreshToken(data.refresh_token);
      router.push('/(tabs)');
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: authService.resendOtp,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: authService.resetPassword,
  });
}
