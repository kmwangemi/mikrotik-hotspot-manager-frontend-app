import { useQuery } from '@tanstack/react-query';
import { transactionService } from '@/services/transactionService';

export const useTransactions = (vendorId?: string) => {
  return useQuery({
    queryKey: ['transactions', vendorId],
    queryFn: () => transactionService.getTransactions(vendorId),
  });
};
