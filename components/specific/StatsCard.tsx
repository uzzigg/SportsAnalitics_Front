import React from 'react';
import { GlassmorphicCard } from '../base/GlassmorphicCard';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    colorClass?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, colorClass = "text-accent-blue bg-accent-blue/10" }) => {
    return (
        <GlassmorphicCard hoverEffect className="flex items-center space-x-4 p-5">
            <div className={`p-4 rounded-2xl ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-text-secondary text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold tracking-tight text-white">{value}</p>
            </div>
        </GlassmorphicCard>
    );
};
