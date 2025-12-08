"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "@/hooks/useForm";
import { authService } from "@/services/authService";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          router.push("/dashboard");
          router.refresh();
        } else {
          setError(data.error || "Login failed");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Input
        type="email"
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        required
      />

      <Input
        type="password"
        name="password"
        label="Password"
        value={values.password}
        onChange={handleChange}
        required
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center text-sm">
        <a
          href="/forgot-password"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
        >
          Forgot password?
        </a>
      </div>
    </form>
  );
}

