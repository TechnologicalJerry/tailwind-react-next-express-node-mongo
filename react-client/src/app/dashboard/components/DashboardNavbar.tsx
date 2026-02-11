'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

export const DashboardNavbar = () => {
  const pathname = usePathname();
  const { user, initialize } = useAuthStore();
  const { handleLogout } = useAuth();

  // Initialize auth store on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href={ROUTES.DASHBOARD} className="text-xl font-bold text-blue-600">
              Dashboard
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href={ROUTES.DASHBOARD}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(ROUTES.DASHBOARD)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Overview
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{user?.firstName} {user?.lastName}</span>
              {user?.role === 'ADMIN' && (
                <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                  Admin
                </span>
              )}
            </div>
            <Link href={ROUTES.HOME}>
              <Button variant="outline" size="sm">
                Home
              </Button>
            </Link>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
