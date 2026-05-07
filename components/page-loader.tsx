interface PageLoaderProps {
  message?: string;
}

export default function PageLoader({
  message = 'Loading...',
}: PageLoaderProps) {
  return (
    <div className='min-h-screen bg-linear-to-br from-background via-background to-background/80 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-card border border-border rounded-lg p-8 space-y-6 text-center'>
          <div className='flex items-center justify-center'>
            <div className='w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin' />
          </div>
          <p className='text-muted-foreground'>{message}</p>
        </div>
      </div>
    </div>
  );
}
