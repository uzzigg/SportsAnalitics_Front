import React from 'react';
import { GlassmorphicCard } from '../base/GlassmorphicCard';

interface RosterTableProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    players: any[];
}

export const RosterTable: React.FC<RosterTableProps> = ({ players }) => {
    return (
        <GlassmorphicCard className="overflow-x-auto p-0">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-text-secondary">
                        <th className="p-4 font-semibold text-sm uppercase tracking-wider">Nombre</th>
                        <th className="p-4 font-semibold text-sm uppercase tracking-wider hidden md:table-cell">Nacionalidad</th>
                        <th className="p-4 font-semibold text-sm uppercase tracking-wider">Nacimiento</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {players.map((p) => (
                        <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                            <td className="p-4 font-medium text-white group-hover:text-accent-blue transition-colors">
                                {p.name}
                            </td>
                            <td className="p-4 text-text-secondary hidden md:table-cell">{p.nationality || '-'}</td>
                            <td className="p-4 text-text-secondary">{p.dateOfBirth || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </GlassmorphicCard>
    );
};
