import React from 'react';
import { Match } from '../../types';
import { GlassmorphicCard } from '../base/GlassmorphicCard';

interface MatchCardProps {
    match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
    const isFinished = match.status === 'FINISHED';

    return (
        <GlassmorphicCard hoverEffect className="w-full relative overflow-hidden">
            {isFinished && <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-[40px]" />}
            <div className="flex items-center justify-between space-x-4">
                <div className="flex-1 flex flex-col items-center">
                    <span className="text-lg font-bold text-center text-white">{match.homeTeam.name}</span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-1 glass px-6 py-3 rounded-2xl border-white/10 backdrop-blur-xl">
                    <span className="text-xs text-text-secondary tracking-widest uppercase font-semibold">
                        {isFinished ? 'Finalizado' : new Date(match.utcDate).toLocaleDateString()}
                    </span>
                    <div className="text-3xl font-extrabold flex space-x-3 text-gradient">
                        <span>{match.score?.fullTime?.home ?? '-'}</span>
                        <span>:</span>
                        <span>{match.score?.fullTime?.away ?? '-'}</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center">
                    <span className="text-lg font-bold text-center text-white">{match.awayTeam.name}</span>
                </div>
            </div>
        </GlassmorphicCard>
    );
};
