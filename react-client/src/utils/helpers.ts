import Cookies from 'js-cookie';
import { STORAGE_KEYS } from './constants';

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return Cookies.get(STORAGE_KEYS.AUTH_TOKEN) || null;
};

export const setAuthToken = (token: string): void => {
  Cookies.set(STORAGE_KEYS.AUTH_TOKEN, token, { expires: 7 }); // 7 days
};

export const removeAuthToken = (): void => {
  Cookies.remove(STORAGE_KEYS.AUTH_TOKEN);
};

export const getUser = (): any => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user: any): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const removeUser = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Check if JWT token is expired (basic check without verification)
 * Note: This is a client-side check. The server will verify the token.
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  
  try {
    // Decode JWT token (without verification)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    
    if (!exp) return false; // No expiration means token doesn't expire
    
    // Check if token is expired (with 60 second buffer)
    return Date.now() >= (exp * 1000) - 60000;
  } catch (error) {
    // If we can't parse the token, consider it invalid
    return true;
  }
};

/**
 * Validate token format (basic check)
 */
export const isValidTokenFormat = (token: string | null): boolean => {
  if (!token) return false;
  const parts = token.split('.');
  return parts.length === 3; // JWT has 3 parts: header.payload.signature
};
