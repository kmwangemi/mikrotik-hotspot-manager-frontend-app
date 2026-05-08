import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { sessionService } from '@/services/sessionService';

export const useSessions = (vendorId?: string) => {
  return useQuery({
    queryKey: ['sessions', vendorId],
    queryFn: () => sessionService.getSessions(vendorId),
    refetchInterval: 5000,
  });
};

export const useKickSession = (sessionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => sessionService.kickSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};
