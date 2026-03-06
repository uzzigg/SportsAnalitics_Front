import React from 'react';
import { AlertCircle } from 'lucide-react';
import { GlassmorphicCard } from './GlassmorphicCard';

interface ErrorMessageProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message = 'Ha ocurrido un error al cargar los datos.',
    onRetry
}) => {
    return (
        <GlassmorphicCard className="max-w-md mx-auto text-center border-red-500/20 bg-red-500/5 my-12">
            <div className="flex justify-center mb-4">
                <AlertCircle className="text-red-400" size={48} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ups, algo salió mal</h3>
            <p className="text-text-secondary mb-6">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors border border-red-500/30 text-sm font-medium"
                >
                    Intentar de nuevo
                </button>
            )}
        </GlassmorphicCard>
    );
};
