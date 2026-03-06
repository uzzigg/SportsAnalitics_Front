import React from 'react';
import { GlassmorphicCard } from '../base/GlassmorphicCard';
import { Player } from '../../types/player';
import Link from 'next/link';
import { User, Shield, Target } from 'lucide-react';

interface PlayerCardProps {
    player: Player;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    const getPositionIcon = (pos: string) => {
        if (!pos) return <User size={16} />;
        const p = pos.toLowerCase();
        if (p.includes('defence') || p.includes('back')) return <Shield size={16} className="text-accent-indigo" />;
        if (p.includes('offence') || p.includes('forward') || p.includes('winger')) return <Target size={16} className="text-accent-purple" />;
        return <User size={16} className="text-accent-blue" />;
    };

    return (
        <Link href={`/detalle/${player.id}`}>
            <GlassmorphicCard hoverEffect className="h-full flex flex-col group p-0 overflow-hidden">
                <div className="h-24 bg-gradient-to-br from-white/5 to-white/10 relative p-4 flex justify-between items-start">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-[40px] group-hover:bg-accent-blue/20 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-purple/10 rounded-full blur-[40px] group-hover:bg-accent-purple/20 transition-all duration-500" />

                    <div className="relative z-10 glass rounded-full p-3 border-white/20">
                        {getPositionIcon(player.position)}
                    </div>
                    {player.team?.crest && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={player.team.crest} alt="Teamcrest" className="w-10 h-10 object-contain drop-shadow-lg relative z-10 opacity-80" />
                    )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{player.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary mb-4">
                        <span className="capitalize">{player.position || 'Unknown Pos'}</span>
                        {player.nationality && (
                            <>
                                <span className="opacity-50">•</span>
                                <span>{player.nationality}</span>
                            </>
                        )}
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                        <span className="text-xs uppercase tracking-widest text-text-secondary font-semibold">
                            {player.team?.name || 'Agente Libre'}
                        </span>
                        <div className="text-accent-blue group-hover:-rotate-45 transition-transform duration-300">
                            →
                        </div>
                    </div>
                </div>
            </GlassmorphicCard>
        </Link>
    );
};
