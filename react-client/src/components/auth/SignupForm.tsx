"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useForm } from "@/hooks/useForm";
import { authService } from "@/services/authService";

export default function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          router.push("/login");
        } else {
          setError(data.error || "Signup failed");
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
        type="text"
        name="name"
        label="Name"
        value={values.name}
        onChange={handleChange}
        required
      />

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

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        value={values.confirmPassword}
        onChange={handleChange}
        required
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
        >
          Sign in
        </a>
      </div>
    </form>
  );
}

