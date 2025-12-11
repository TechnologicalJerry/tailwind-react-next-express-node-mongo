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
  const [showPassword, setShowPassword] = useState(false);

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");

      try {
        const response = await authService.login(
          values.email,
          values.password
        );

        router.push("/dashboard");
        router.refresh();

   
      } catch (error) {
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleShowPassword = () => {
    setShowPassword(true);

    // Auto-hide password after 3 seconds
    setTimeout(() => setShowPassword(false), 3000);
  };

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

      {/* Password Input with Show Button */}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          onClick={handleShowPassword}
          className="absolute right-3 top-9 text-sm text-blue-600 hover:text-blue-800"
        >
          Show
        </button>
      </div>

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
