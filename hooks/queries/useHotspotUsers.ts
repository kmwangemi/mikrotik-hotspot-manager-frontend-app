import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { hotspotUserService } from '@/services/hotspotUserService';

export const useHotspotUsers = (vendorId?: string) => {
  return useQuery({
    queryKey: ['hotspot-users', vendorId],
    queryFn: () => hotspotUserService.getHotspotUsers(vendorId),
  });
};

export const useAddHotspotUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hotspotUserService.addHotspotUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotspot-users'] });
    },
  });
};

export const useDeleteHotspotUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => hotspotUserService.deleteHotspotUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotspot-users'] });
    },
  });
};
