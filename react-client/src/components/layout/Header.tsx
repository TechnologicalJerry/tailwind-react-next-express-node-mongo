'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

export const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading, initialize } = useAuthStore();
  const { handleLogout } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Initialize auth store on mount
  useEffect(() => {
    initialize();
    setMounted(true);
  }, [initialize]);

  // Hide header on auth pages and dashboard (only after mount to avoid hydration issues)
  if (mounted) {
    const isAuthPage = pathname?.startsWith('/auth');
    const isDashboardPage = pathname?.startsWith('/dashboard');
    
    if (isAuthPage || isDashboardPage) {
      return null;
    }
  }

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href={ROUTES.HOME} className="text-2xl font-bold text-blue-600">
              Logo
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link
                href={ROUTES.HOME}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(ROUTES.HOME)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link
                href={ROUTES.ABOUT}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(ROUTES.ABOUT)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                About
              </Link>
              <Link
                href={ROUTES.CONTACT}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(ROUTES.CONTACT)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="text-sm text-gray-500">Loading...</div>
            ) : isAuthenticated ? (
              <>
                <Link href={ROUTES.DASHBOARD}>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="hidden sm:block text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </div>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href={ROUTES.LOGIN}>
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href={ROUTES.SIGNUP}>
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
