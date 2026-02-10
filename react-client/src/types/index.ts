export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: 'USER' | 'ADMIN';
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

// Signup response: data is User directly
export interface SignupResponse {
  success: boolean;
  message: string;
  data: User;
}

// Login response: data has user and token
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Generic auth response (union type)
export type AuthResponse = SignupResponse | LoginResponse;

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface DashboardAnalytics {
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}
