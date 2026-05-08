import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { routerService } from '@/services/routerService';

export const useRouters = (vendorId?: string) => {
  return useQuery({
    queryKey: ['routers', vendorId],
    queryFn: () => routerService.getRouters(vendorId),
  });
};

export const useRouter = (routerId: string) => {
  return useQuery({
    queryKey: ['router', routerId],
    queryFn: () => routerService.getRouterById(routerId),
  });
};

export const useAddRouter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: routerService.addRouter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routers'] });
    },
  });
};

export const useUpdateRouter = (routerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => routerService.updateRouter(routerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['router', routerId] });
      queryClient.invalidateQueries({ queryKey: ['routers'] });
    },
  });
};

export const useDeleteRouter = (routerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => routerService.deleteRouter(routerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routers'] });
    },
  });
};
