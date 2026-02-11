'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { userService } from '@/services/user.service';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { user: currentUser } = useAuthStore();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getAllUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError('Failed to load users');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as Error & { response?: { data?: { message?: string } } }).response?.data?.message 
        : undefined;
      setError(errorMessage || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter out the current logged-in admin from the list
  const filteredUsers = useMemo(() => {
    if (!currentUser) return users;
    return users.filter((user) => user.id !== currentUser.id);
  }, [users, currentUser]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = useCallback(async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await userService.deleteUser(userId);
      if (response.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } else {
        alert('Failed to delete user');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as Error & { response?: { data?: { message?: string } } }).response?.data?.message 
        : undefined;
      alert(errorMessage || 'Failed to delete user');
    }
  }, []);

  const columns = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
    },
    {
      key: 'firstName',
      header: 'First Name',
      sortable: true,
    },
    {
      key: 'lastName',
      header: 'Last Name',
      sortable: true,
    },
    {
      key: 'userName',
      header: 'Username',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
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
      render: (value: string) => (value ? new Date(value).toLocaleDateString() : '-'),
    },
  ];

  // Admin-only access check
  if (currentUser?.role !== 'ADMIN') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="mt-2 text-gray-600">Manage all users in the system</p>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Access denied. Admin privileges required to view this page.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="mt-2 text-gray-600">Manage all users in the system</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <DataTable
        data={filteredUsers}
        columns={columns}
        loading={loading}
        searchPlaceholder="Search users by name, email, or username..."
        actions={(row) => (
          <div className="flex space-x-2">
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
        )}
      />
    </div>
  );
}
