import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password",
  description: "Reset your password",
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
      <ForgotPasswordForm />
    </div>
  );
}

