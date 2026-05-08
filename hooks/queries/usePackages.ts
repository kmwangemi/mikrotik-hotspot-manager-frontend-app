import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { packageService } from '@/services/packageService';

export const usePackages = (vendorId?: string) => {
  return useQuery({
    queryKey: ['packages', vendorId],
    queryFn: () => packageService.getPackages(vendorId),
  });
};

export const useAddPackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: packageService.addPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};

export const useUpdatePackage = (packageId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => packageService.updatePackage(packageId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};

export const useDeletePackage = (packageId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => packageService.deletePackage(packageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
};
