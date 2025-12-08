import { apiClient } from "@/lib/apiClient";
import { User } from "@/types/user";

interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

interface SignupResponse {
  success: boolean;
  user?: User;
  error?: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  error?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<{ user: User; token: string }>(
        "/auth/login",
        { email, password }
      );

      return {
        success: true,
        user: response.user,
        token: response.token,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Login failed",
      };
    }
  },

  async signup(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<SignupResponse> {
    try {
      const response = await apiClient.post<{ user: User }>(
        "/auth/signup",
        data
      );

      return {
        success: true,
        user: response.user,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Signup failed",
      };
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      await apiClient.post("/auth/forgot-password", { email });
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Failed to send reset email",
      };
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await apiClient.get<User>("/auth/me");
      return user;
    } catch (error) {
      return null;
    }
  },
};

