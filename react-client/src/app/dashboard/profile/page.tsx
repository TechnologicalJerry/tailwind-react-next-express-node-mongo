'use client';

import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/types';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name is too long'),
  userName: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().or(z.literal('')),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dob: z.string().optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user: currentUser, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      userName: currentUser?.userName || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      gender: currentUser?.gender || undefined,
      dob: currentUser?.dob || '',
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (currentUser) {
      reset({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        userName: currentUser.userName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        gender: currentUser.gender || undefined,
        dob: currentUser.dob || '',
      });
    }
  }, [currentUser, reset]);

  const onSubmit = useCallback(
    async (data: ProfileFormData) => {
      if (!currentUser) return;

      try {
        setLoading(true);
        setError('');
        setSuccess('');

        // Remove empty optional fields
        const updateData: Partial<User> = {
          firstName: data.firstName,
          lastName: data.lastName,
          userName: data.userName,
          email: data.email,
        };

        if (data.phone && data.phone.trim()) {
          updateData.phone = data.phone.trim();
        }
        if (data.gender) {
          updateData.gender = data.gender;
        }
        if (data.dob && data.dob.trim()) {
          updateData.dob = data.dob.trim();
        }

        const response = await userService.updateUser(currentUser.id, updateData);

        if (response.success && response.data) {
          // Update the user in the auth store
          setUser(response.data);
          setSuccess('Profile updated successfully!');
          reset(data); // Reset form state to mark as not dirty
        } else {
          setError(response.message || 'Failed to update profile');
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error && 'response' in err 
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to update profile. Please try again.'
          : 'Failed to update profile. Please try again.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [currentUser, setUser, reset]
  );

  if (!currentUser) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-gray-600">View and update your profile information</p>
        </div>
        <Card>
          <div className="p-6 text-center text-gray-500">Loading user data...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-2 text-gray-600">View and update your profile information</p>
      </div>

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

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="firstName"
                type="text"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="lastName"
                type="text"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                id="userName"
                type="text"
                {...register('userName')}
                error={errors.userName?.message}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                error={errors.phone?.message}
                placeholder="e.g., +1234567890"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                id="gender"
                {...register('gender')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
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

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <Input
                id="dob"
                type="date"
                {...register('dob')}
                error={errors.dob?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    currentUser.role === 'ADMIN'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">Role cannot be changed</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {currentUser.createdAt && (
                  <p>Member since: {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                )}
              </div>
              <Button type="submit" variant="primary" disabled={loading || !isDirty}>
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
