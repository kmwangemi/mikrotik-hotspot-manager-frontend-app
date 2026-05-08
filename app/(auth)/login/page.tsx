'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/queries/useAuth';
import { handleApiError } from '@/lib/api';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending, error } = useLogin();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (values: LoginFormData) => login(values);
  return (
    <div className='min-h-screen bg-linear-to-br from-background via-background to-background/80 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-card border border-border rounded-lg p-8 space-y-6'>
          {/* Header */}
          <div className='text-center space-y-2'>
            <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 mx-auto mb-4'>
              <div className='w-6 h-6 bg-primary rounded-md'></div>
            </div>
            <h1 className='text-2xl font-bold text-foreground'>
              HotSpot Manager
            </h1>
            <p className='text-sm text-muted-foreground'>
              Sign in to your account
            </p>
          </div>
          {error && (
            <div className='p-3 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded flex gap-2'>
              <AlertCircle className='w-5 h-5 text-[#ef4444] shrink-0 mt-0.5' />
              <p className='text-sm text-[#ef4444]'>{handleApiError(error)}</p>
            </div>
          )}
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='you@example.com'
                        type='email'
                        disabled={isPending}
                        {...field}
                        className='bg-background border-border'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Password</FormLabel>
                      <Link
                        href='/forgot-password'
                        className='text-xs text-primary hover:text-secondary transition-colors'
                      >
                        Forgot?
                      </Link>
                    </div>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Enter new password'
                          {...field}
                          className='bg-background border-border pr-10'
                          disabled={isPending}
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                        >
                          {showPassword ? (
                            <EyeOff className='w-4 h-4' />
                          ) : (
                            <Eye className='w-4 h-4' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={isPending}
                className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
              >
                {isPending ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </Form>
          {/* Sign up link */}
          <div className='text-center text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link
              href='/signup'
              className='text-primary hover:text-secondary transition-colors font-semibold'
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
