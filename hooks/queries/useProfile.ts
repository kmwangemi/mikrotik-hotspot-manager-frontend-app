import { useAuthStore } from '@/lib/store/auth';
import { profileService } from '@/services/profileService';
import { useQuery } from '@tanstack/react-query';

export function useProfile() {
  const { setUser, checkAuth } = useAuthStore();
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const profile = await profileService.getProfile();
      // Set full user object from profile response
      setUser({
        id: profile.id,
        email: profile.email ?? '',
        first_name: profile.first_name ?? '',
        last_name: profile.last_name ?? '',
        phone_number: profile.phone_number ?? null,
        role: profile.role,
        is_active: profile.is_active ?? false,
        is_email_verified: profile.is_email_verified ?? false,
        profile_picture_url: profile.profile_picture_url ?? null,
        vendor_id: profile.vendor_id ?? null,
        vendor: profile.vendor
          ? {
              id: profile.vendor.id ?? '',
              business_name: profile.vendor.business_name ?? '',
              business_email: profile.vendor.business_email ?? '',
              business_phone_number: profile.vendor.business_phone_number ?? '',
              subdomain: profile.vendor.subdomain ?? '',
              business_address: profile.vendor.business_address ?? null,
              logo_url: profile.vendor.logo_url ?? null,
              status: profile.vendor.status ?? 'active',
              referral_code: profile.vendor.referral_code ?? null,
              created_at: profile.vendor.created_at ?? '',
              updated_at: profile.vendor.updated_at ?? '',
            }
          : null,
        created_at: profile.created_at ?? '',
        updated_at: profile.updated_at ?? '',
      });
      return profile;
    },
    enabled: checkAuth(), // only fetch if token exists
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: false,
  });
}
