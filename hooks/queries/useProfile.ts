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
        role: profile.role,
        subdomain: profile.subdomain ?? null,
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number ?? null,
        profile_picture_url: profile.profile_picture_url ?? null,
        vendor_id: profile.vendor_id ?? null,
        is_active: profile.is_active,
        is_email_verified: profile.is_email_verified,
      });
      return profile;
    },
    enabled: checkAuth(), // only fetch if token exists
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: false,
  });
}
