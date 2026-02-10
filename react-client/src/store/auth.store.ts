import { create } from 'zustand';
import { User } from '@/types';
import {
  getUser as getUserFromStorage,
  setUser as setUserInStorage,
  removeUser as removeUserFromStorage,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  isTokenExpired,
  isValidTokenFormat,
} from '@/utils/helpers';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => {
    if (user) {
      setUserInStorage(user);
    } else {
      removeUserFromStorage();
    }
    set({ user });
  },

  setToken: (token) => {
    if (token) {
      setAuthToken(token);
    } else {
      removeAuthToken();
    }
    set({ token, isAuthenticated: !!token });
  },

  login: (user, token) => {
    setUserInStorage(user);
    setAuthToken(token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    removeUserFromStorage();
    removeAuthToken();
    set({ user: null, token: null, isAuthenticated: false });
  },

  initialize: () => {
    const storedUser = getUserFromStorage();
    const storedToken = getAuthToken();
    
    // Validate token format and expiration
    const isValidToken = storedToken && isValidTokenFormat(storedToken) && !isTokenExpired(storedToken);
    
    // If token is invalid or expired, clear everything
    if (!isValidToken) {
      removeUserFromStorage();
      removeAuthToken();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return;
    }
    
    set({
      user: storedUser,
      token: storedToken,
      isAuthenticated: !!storedToken && !!storedUser,
      isLoading: false,
    });
  },
}));
