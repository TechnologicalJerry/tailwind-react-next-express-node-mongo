import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-4 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href={ROUTES.HOME}>
            <Button variant="primary">Go Home</Button>
          </Link>
          <Link href={ROUTES.DASHBOARD}>
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
