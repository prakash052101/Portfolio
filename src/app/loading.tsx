import { LoadingState } from '@/components/common/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingState message="Loading portfolio..." />
    </div>
  );
}
