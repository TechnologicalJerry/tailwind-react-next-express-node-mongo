'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { productService } from '@/services/product.service';
import { useAuthStore } from '@/store/auth.store';
import { formatCurrency } from '@/utils/helpers';
import type { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { user: currentUser } = useAuthStore();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await productService.getAllProducts();
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message 
        : undefined;
      setError(errorMessage || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = useCallback(async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await productService.deleteProduct(productId);
      if (response.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        alert('Failed to delete product');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to delete product';
      alert(errorMessage);
    }
  }, []);

  // Memoize columns configuration
  const columns = useMemo(
    () => [
      {
        key: 'id',
        header: 'ID',
        sortable: true,
      },
      {
        key: 'name',
        header: 'Name',
        sortable: true,
      },
      {
        key: 'description',
        header: 'Description',
        sortable: false,
        render: (value: string) => (
          <div className="max-w-xs">
            <span className="block overflow-hidden text-ellipsis" style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.4',
              maxHeight: '2.8em'
            }} title={value}>
              {value}
            </span>
          </div>
        ),
      },
      {
        key: 'category',
        header: 'Category',
        sortable: true,
        render: (value: string) => (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium whitespace-nowrap">
            {value}
          </span>
        ),
      },
      {
        key: 'price',
        header: 'Price',
        sortable: true,
        render: (value: number) => (
          <span className="font-semibold text-gray-900 whitespace-nowrap">{formatCurrency(value)}</span>
        ),
      },
      {
        key: 'stock',
        header: 'Stock',
        sortable: true,
        render: (value: number) => (
          <span
            className={`font-medium whitespace-nowrap ${
              value === 0
                ? 'text-red-600'
                : value < 10
                ? 'text-orange-600'
                : 'text-green-600'
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        key: 'createdAt',
        header: 'Created At',
        sortable: true,
        render: (value: string) => (
          <span className="whitespace-nowrap">{value ? new Date(value).toLocaleDateString() : '-'}</span>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6 w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="mt-2 text-gray-600">View and manage all products in the system</p>
        </div>
        {currentUser?.role === 'ADMIN' && (
          <Button
            variant="primary"
            onClick={() => (window.location.href = '/dashboard/products/create')}
          >
            Add Product
          </Button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="w-full overflow-hidden">
        <DataTable
          data={products}
          columns={columns}
          loading={loading}
          searchPlaceholder="Search products by name, category, or description..."
          actions={(row) =>
            currentUser?.role === 'ADMIN' ? (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Navigate to edit page
                    alert('Edit functionality coming soon');
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(row.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            ) : null
          }
        />
      </div>
    </div>
  );
}
