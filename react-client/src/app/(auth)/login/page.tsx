import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
    title: "Login",
    description: "User login page",
};

export default function LoginPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <LoginForm />
        </div>
    );
}

