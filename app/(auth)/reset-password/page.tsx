import PageLoader from '@/components/page-loader';
import { Suspense } from 'react';
import ResetPasswordClient from './Resetpasswordclient';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ResetPasswordClient />
    </Suspense>
  );
}
