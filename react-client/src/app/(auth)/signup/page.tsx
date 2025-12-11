import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <SignupForm />
    </div>
  );
}