'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ROUTES } from '@/utils/constants';

const signupSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    userName: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    dob: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { handleSignup } = useAuth();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    try {
      const result = await handleSignup(data);
      setIsLoading(false);

      if (result.success) {
        setSuccess(result.message || 'Account created successfully');
        // Redirect to login after showing success message
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href={ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                autoComplete="given-name"
                required
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                type="text"
                autoComplete="family-name"
                required
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
            <Input
              label="Username"
              type="text"
              autoComplete="username"
              required
              {...register('userName')}
              error={errors.userName?.message}
            />
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              required
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              required
              {...register('password')}
              error={errors.password?.message}
            />
            <Input
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              required
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <Input
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              {...register('phone')}
              error={errors.phone?.message}
              helperText="Optional"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
                <span className="text-gray-400 text-xs ml-1">(Optional)</span>
              </label>
              <select
                {...register('gender')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
              )}
            </div>
            <Input
              label="Date of Birth"
              type="date"
              {...register('dob')}
              error={errors.dob?.message}
              helperText="Optional"
            />
            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Sign up
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
