'use client';

import { useMemo } from 'react';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/helpers';

export default function AnalyticsPage() {
  // Dummy data - memoized to prevent recalculation
  const userGrowthData = useMemo(
    () => [
      { label: 'Jan', value: 120 },
      { label: 'Feb', value: 135 },
      { label: 'Mar', value: 150 },
      { label: 'Apr', value: 165 },
      { label: 'May', value: 180 },
      { label: 'Jun', value: 195 },
      { label: 'Jul', value: 210 },
      { label: 'Aug', value: 225 },
      { label: 'Sep', value: 240 },
      { label: 'Oct', value: 255 },
      { label: 'Nov', value: 270 },
      { label: 'Dec', value: 285 },
    ],
    []
  );

  const revenueData = useMemo(
    () => [
      { label: 'Q1', value: 45000, color: '#3b82f6' },
      { label: 'Q2', value: 52000, color: '#10b981' },
      { label: 'Q3', value: 48000, color: '#f59e0b' },
      { label: 'Q4', value: 55000, color: '#ef4444' },
    ],
    []
  );

  const categoryDistribution = useMemo(
    () => [
      { label: 'Electronics', value: 45 },
      { label: 'Clothing', value: 30 },
      { label: 'Books', value: 15 },
      { label: 'Home', value: 10 },
    ],
    []
  );

  const topProducts = useMemo(
    () => [
      { label: 'Laptop Pro', value: 1250 },
      { label: 'Smartphone X', value: 980 },
      { label: 'Tablet Air', value: 750 },
      { label: 'Headphones', value: 320 },
      { label: 'Keyboard', value: 150 },
    ],
    []
  );

  // Memoized statistics
  const statistics = useMemo(
    () => ({
      totalRevenue: 200000,
      averageOrderValue: 89.5,
      conversionRate: 3.2,
      activeUsers: 1250,
      newUsersThisMonth: 145,
      returningUsers: 1105,
    }),
    []
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">Comprehensive analytics and insights</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(statistics.totalRevenue)}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-600 mb-1">Avg Order Value</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(statistics.averageOrderValue)}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900">{statistics.conversionRate}%</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
            <p className="text-2xl font-bold text-gray-900">{statistics.activeUsers.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-600 mb-1">New Users</p>
            <p className="text-2xl font-bold text-green-600">+{statistics.newUsersThisMonth}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-600 mb-1">Returning Users</p>
            <p className="text-2xl font-bold text-blue-600">{statistics.returningUsers.toLocaleString()}</p>
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart data={userGrowthData} title="User Growth Over Time" height={300} />
        <BarChart data={revenueData} title="Revenue by Quarter" height={300} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={categoryDistribution} title="Products by Category" height={300} />
        <BarChart data={topProducts} title="Top 5 Products (Sales)" height={300} />
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Recent Activity">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">New user registered</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Product added</span>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Order completed</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">User profile updated</span>
              <span className="text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </Card>

        <Card title="Performance Metrics">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Server Uptime</span>
                <span className="font-medium">99.9%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '99.9%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">API Response Time</span>
                <span className="font-medium">120ms</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Database Performance</span>
                <span className="font-medium">Excellent</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
