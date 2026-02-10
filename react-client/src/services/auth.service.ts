import axios from 'axios';
import { API_BASE_URL } from '@/utils/constants';
import { getAuthToken, removeAuthToken, removeUser } from '@/utils/helpers';
import type {
  SignupResponse,
  LoginResponse,
  ApiResponse,
  LoginCredentials,
  SignupData,
  ForgotPasswordData,
  ResetPasswordData,
  DashboardAnalytics,
} from '@/types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect
      if (typeof window !== 'undefined') {
        // Clear auth storage
        removeAuthToken();
        removeUser();
        
        // Clear Zustand store (lazy import to avoid circular dependency)
        import('@/store/auth.store').then(({ useAuthStore }) => {
          useAuthStore.getState().logout();
        }).catch(() => {
          // Store might not be initialized yet, continue anyway
        });
        
        // Redirect to login with current path as redirect param
        const currentPath = window.location.pathname;
        const loginUrl = currentPath.startsWith('/auth/') 
          ? '/auth/login' 
          : `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
        window.location.href = loginUrl;
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  signup: async (data: SignupData): Promise<SignupResponse> => {
    // Remove confirmPassword and filter out empty optional fields
    const { confirmPassword, ...rest } = data;
    const signupData: any = {
      firstName: rest.firstName,
      lastName: rest.lastName,
      userName: rest.userName,
      email: rest.email,
      password: rest.password,
    };
    
    // Only include optional fields if they have values
    if (rest.phone && rest.phone.trim()) {
      signupData.phone = rest.phone;
    }
    if (rest.gender) {
      signupData.gender = rest.gender;
    }
    if (rest.dob && rest.dob.trim()) {
      signupData.dob = rest.dob;
    }
    
    const response = await api.post<SignupResponse>('/auth/signup', signupData);
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/logout');
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordData): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordData): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/reset-password', data);
    return response.data;
  },

  getDashboardAnalytics: async (): Promise<ApiResponse<DashboardAnalytics>> => {
    const response = await api.get<ApiResponse<DashboardAnalytics>>('/analytics/dashboard');
    return response.data;
  },
};
