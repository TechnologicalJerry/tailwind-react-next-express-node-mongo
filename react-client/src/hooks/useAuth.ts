'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import type { LoginCredentials, SignupData, ForgotPasswordData } from '@/types';

export const useAuth = () => {
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, login, logout, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleLogin = async (credentials: LoginCredentials, redirectTo?: string) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data.user && response.data.token) {
        login(response.data.user, response.data.token);
        // Redirect to the specified path or default to dashboard
        router.push(redirectTo || '/dashboard');
        return { success: true };
      }
      return { success: false, error: response.message || 'Login failed' };
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string; error?: string } }; message?: string }).response?.data?.message || 
                          (error as { response?: { data?: { message?: string; error?: string } } }).response?.data?.error ||
                          (error as { message?: string }).message || 
                          'Login failed. Please try again.';
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const handleSignup = async (data: SignupData) => {
    try {
      const response = await authService.signup(data);
      if (response.success) {
        // Don't redirect here - let the component handle it after showing success message
        return { success: true, message: 'Account created successfully! Redirecting to login...' };
      }
      return { success: false, error: response.message || 'Signup failed' };
    } catch (error: unknown) {
      // Handle axios errors
      const errorMessage = (error as { response?: { data?: { message?: string; error?: string } }; message?: string }).response?.data?.message || 
                          (error as { response?: { data?: { message?: string; error?: string } } }).response?.data?.error ||
                          (error as { message?: string }).message || 
                          'Signup failed. Please try again.';
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout error:', error);
    } finally {
      logout();
      router.push('/');
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    try {
      const response = await authService.forgotPassword(data);
      return {
        success: response.success,
        message: response.message || 'Password reset email sent.',
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: (error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to send reset email.',
      };
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    handleLogin,
    handleSignup,
    handleLogout,
    handleForgotPassword,
  };
};
