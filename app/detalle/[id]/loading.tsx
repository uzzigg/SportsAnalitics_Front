import { SkeletonLoader } from '../../../components/base/SkeletonLoader';

export default function Loading() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto py-12">
            <SkeletonLoader count={1} type="profile" />
        </div>
    );
}
