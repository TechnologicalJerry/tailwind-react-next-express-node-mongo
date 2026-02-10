import { Card } from '@/components/ui/Card';

export const ProductsWidget = () => {
  return (
    <Card title="Products Overview">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Total Products</span>
          <span className="text-2xl font-bold text-gray-900">456</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">In Stock</span>
          <span className="text-xl font-semibold text-green-600">389</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Low Stock</span>
          <span className="text-xl font-semibold text-yellow-600">45</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Out of Stock</span>
          <span className="text-xl font-semibold text-red-600">22</span>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Electronics</span>
              <span className="font-medium">156</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Clothing</span>
              <span className="font-medium">134</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Books</span>
              <span className="font-medium">166</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
