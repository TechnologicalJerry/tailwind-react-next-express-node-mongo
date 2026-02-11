'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardNavbar } from './components/DashboardNavbar';
import { DashboardSidebar } from './components/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <div className="flex">
          <DashboardSidebar />
          <main className="flex-1 lg:ml-64 px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
