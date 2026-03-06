import { SkeletonLoader } from '../../components/base/SkeletonLoader';

export default function Loading() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full lg:w-72 hidden lg:block">
                    <SkeletonLoader count={1} type="row" />
                </div>
                <div className="flex-1 space-y-6">
                    <SkeletonLoader count={8} type="card" />
                </div>
            </div>
        </div>
    );
}
