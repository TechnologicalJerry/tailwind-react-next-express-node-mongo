"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={32}
            className="object-contain"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-gray-700 dark:text-gray-200">
          <button onClick={() => router.push("/")} className="hover:text-blue-600">
            Home
          </button>

          <button onClick={() => router.push("/about")} className="hover:text-blue-600">
            About
          </button>

          <button onClick={() => router.push("/login")} className="hover:text-blue-600">
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="hover:text-blue-600"
          >
            Signup
          </button>

        </nav>

      </div>
    </header>
  );
}
