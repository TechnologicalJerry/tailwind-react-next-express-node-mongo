"use client";

import { User } from "@/types/user";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth-token="))
    ?.split("=")[1];

  return token || null;
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;

  document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function removeAuthToken(): void {
  if (typeof window === "undefined") return;

  document.cookie = "auth-token=; path=/; max-age=0";
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const token = getAuthToken();
    if (!token) return null;

    // Decode JWT token (basic implementation)
    // In production, you should validate the token with your backend
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

