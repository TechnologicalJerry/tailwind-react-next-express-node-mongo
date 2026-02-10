import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/helpers';

export const RevenueWidget = () => {
  return (
    <Card title="Revenue Overview">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Revenue</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(125000)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">This Month</span>
          <span className="text-xl font-semibold text-green-600">
            {formatCurrency(34200)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Last Month</span>
          <span className="text-xl font-semibold text-gray-700">
            {formatCurrency(28900)}
          </span>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Order Value</span>
              <span className="font-medium">{formatCurrency(89.50)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Orders This Month</span>
              <span className="font-medium">382</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Growth Rate</span>
              <span className="font-medium text-green-600">+18.3%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
