import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: number;
    className?: string;
    fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, className = '', fullScreen = false }) => {
    const spinner = (
        <Loader2
            size={size}
            className={`animate-spin text-accent-blue opacity-80 ${className}`}
        />
    );

    if (fullScreen) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
                {spinner}
                <p className="text-text-secondary animate-pulse text-sm tracking-widest uppercase">Cargando datos</p>
            </div>
        );
    }

    return spinner;
};
