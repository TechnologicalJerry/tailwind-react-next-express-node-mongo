import { Card } from '@/components/ui/Card';

export const UsersWidget = () => {
  return (
    <Card title="Users Overview">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Users</span>
          <span className="text-2xl font-bold text-gray-900">1,234</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Active Users</span>
          <span className="text-xl font-semibold text-green-600">892</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">New This Month</span>
          <span className="text-xl font-semibold text-blue-600">+142</span>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '72%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">72% active rate</p>
        </div>
      </div>
    </Card>
  );
};
