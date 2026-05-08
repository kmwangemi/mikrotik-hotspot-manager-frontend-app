import { api } from '@/lib/api';
import { Transaction } from '@/lib/api/mockData';

export const transactionService = {
  getTransactions: (vendorId?: string) => api.get<Transaction[]>('/transactions', { params: { vendorId } }),
};
