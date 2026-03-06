import React from 'react';
import { GlassmorphicCard } from './GlassmorphicCard';

interface SkeletonLoaderProps {
    count?: number;
    type?: 'card' | 'row' | 'profile';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 4, type = 'card' }) => {
    const items = Array.from({ length: count }, (_, i) => i);

    if (type === 'row') {
        return (
            <div className="space-y-4 w-full">
                {items.map(i => (
                    <div key={i} className="glass rounded-xl h-16 w-full animate-pulse bg-white/5" />
                ))}
            </div>
        );
    }

    if (type === 'profile') {
        return (
            <GlassmorphicCard className="animate-pulse flex flex-col items-center p-8 space-y-6">
                <div className="w-32 h-32 rounded-full bg-white/10" />
                <div className="h-8 bg-white/10 w-48 rounded" />
                <div className="h-4 bg-white/10 w-32 rounded" />
                <div className="w-full grid grid-cols-2 gap-4 mt-8">
                    <div className="h-20 bg-white/10 rounded-xl" />
                    <div className="h-20 bg-white/10 rounded-xl" />
                </div>
            </GlassmorphicCard>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {items.map(i => (
                <GlassmorphicCard key={i} className="animate-pulse space-y-4 h-64 flex flex-col">
                    <div className="h-12 w-12 rounded-full bg-white/10" />
                    <div className="h-6 bg-white/10 w-3/4 rounded" />
                    <div className="h-4 bg-white/10 w-1/2 rounded" />
                    <div className="flex-1" />
                    <div className="h-10 bg-white/10 w-full rounded-lg" />
                </GlassmorphicCard>
            ))}
        </div>
    );
};
