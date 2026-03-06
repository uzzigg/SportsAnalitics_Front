import React from 'react';

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hoverEffect?: boolean;
    className?: string;
}

export const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
    children,
    hoverEffect = false,
    className = '',
    ...props
}) => {
    return (
        <div
            className={`glass rounded-2xl p-6 ${hoverEffect ? 'glass-hover cursor-pointer' : ''} ${className}`}
            {...props}
        >
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
