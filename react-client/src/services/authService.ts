import { apiService } from "@/services/appService";
import { User } from "@/types/user";
import { get } from "http";

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

function getErrorMessage(error: unknown, message?: string): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return message || "Something went wrong";
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    console.log("Attempting login with", { email, password });
    try {
      const response = await apiService.post<{ user: User; token: string }>(
        "/auth/login",
        { email, password }
      );

      return {
        success: true,
        user: response.user,
        token: response.token,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }

  },

  async signup(data: {
    email: string;
    password: string;
    name?: string;
  }): Promise<SignupResponse> {
    try {
      const response = await apiService.post<{ user: User }>(
        "/auth/signup",
        data
      );

      return {
        success: true,
        user: response.user,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessage(error, "Signup failed"),
      };
    }
  },

  async logout(): Promise<void> {
    try {
      await apiService.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
      await apiService.post("/auth/forgot-password", { email });
      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessage(error, "Failed to send reset email"),
      };
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await apiService.get<User>("/auth/me");
      return user;
    } catch (error) {
      return null;
    }
  },
};

export { apiService };

