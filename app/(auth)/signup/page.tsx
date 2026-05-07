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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { signupSchema, type SignupFormData } from '@/lib/schemas/auth';
import { useAuthStore } from '@/lib/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'vendor_admin',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: data.role as 'superadmin' | 'vendor_admin',
        vendorId: data.role === 'vendor_admin' ? 'v_new' : undefined,
      };
      login(newUser);
      toast({
        title: 'Success',
        description: 'Account created successfully',
      });

      // Redirect based on role
      router.push(
        data.role === 'superadmin'
          ? '/dashboard/superadmin'
          : '/dashboard/vendor',
      );
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
              Create Account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Join HotSpot Manager today
            </p>
          </div>
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John Doe'
                        disabled={isLoading}
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='you@example.com'
                        type='email'
                        disabled={isLoading}
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
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-background border-border'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-card border-border'>
                        <SelectItem value='vendor_admin'>
                          Vendor Admin
                        </SelectItem>
                        <SelectItem value='superadmin'>
                          Platform Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='••••••'
                        type='password'
                        disabled={isLoading}
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
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='••••••'
                        type='password'
                        disabled={isLoading}
                        {...field}
                        className='bg-background border-border'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </Form>
          {/* Sign in link */}
          <div className='text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='text-primary hover:text-secondary transition-colors font-semibold'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
