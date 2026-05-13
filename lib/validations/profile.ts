import { z } from 'zod';

export const profileUpdateSchema = z.object({
  user: z.object({
    first_name: z.string().min(2, 'First name must be at least 2 characters'),
    last_name: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone_number: z.string().optional(),
    profile_picture_url: z.string().optional(),
  }),
  vendor: z.object({
    business_name: z
      .string()
      .min(2, 'Business name must be at least 2 characters'),
    business_email: z.string().email('Invalid business email'),
    business_phone_number: z.string().optional(),
    business_address: z.string().optional(),
  }),
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[0-9]/, 'Password must contain a number')
      .regex(/[!@#$%^&*]/, 'Password must contain a special character'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
export type PasswordChange = z.infer<typeof passwordChangeSchema>;
