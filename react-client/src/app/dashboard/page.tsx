'use client';

import { useEffect, useState } from 'react';
import { AnalyticsCard } from './components/AnalyticsCard';
import { UsersWidget } from './components/UsersWidget';
import { ProductsWidget } from './components/ProductsWidget';
import { RevenueWidget } from './components/RevenueWidget';
import { authService } from '@/services/auth.service';
import { formatCurrency } from '@/utils/helpers';
import type { DashboardAnalytics } from '@/types';

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await authService.getDashboardAnalytics();
        if (response.success && response.data) {
          setAnalytics(response.data);
        } else {
          setError('Failed to load analytics');
        }
      } catch (err: unknown) {
        setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Total Users"
          value={analytics?.totalUsers || 0}
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
          trend={{ value: 12, isPositive: true }}
        />
        <AnalyticsCard
          title="Total Products"
          value={analytics?.totalProducts || 0}
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          }
          trend={{ value: 8, isPositive: true }}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={analytics ? formatCurrency(analytics.totalRevenue) : formatCurrency(0)}
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UsersWidget />
        <ProductsWidget />
        <RevenueWidget />
      </div>
    </div>
  );
}
