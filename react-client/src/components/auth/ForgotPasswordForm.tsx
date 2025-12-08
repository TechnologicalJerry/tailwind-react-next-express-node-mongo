"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "@/hooks/useForm";

export default function ForgotPasswordForm() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");
      setSuccess(false);

      try {
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
        } else {
          setError(data.error || "Failed to send reset email");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (success) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <p className="font-semibold">Email sent!</p>
        <p className="text-sm mt-1">
          Please check your email for password reset instructions.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <Input
        type="email"
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}
        required
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Sending..." : "Send Reset Link"}
      </Button>

      <div className="text-center text-sm">
        <a
          href="/login"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
        >
          Back to login
        </a>
      </div>
    </form>
  );
}

