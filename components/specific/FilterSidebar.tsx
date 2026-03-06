import React from 'react';
import { Search, Filter } from 'lucide-react';
import { GlassmorphicCard } from '../base/GlassmorphicCard';

interface FilterSidebarProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFilterChange: (key: string, value: any) => void;
    onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, onReset }) => {
    return (
        <GlassmorphicCard className="sticky top-24 h-max w-full lg:w-72 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Filter size={18} /> Filtros
                </h3>
                <button
                    onClick={onReset}
                    className="text-xs text-text-secondary hover:text-white transition-colors uppercase tracking-wider font-semibold"
                >
                    Limpiar
                </button>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm text-text-secondary font-medium">Buscar por nombre</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all font-light"
                            placeholder="Ej. Lionel Messi..."
                            value={filters.search || ''}
                            onChange={(e) => onFilterChange('search', e.target.value)}
                        />
                        <Search className="absolute left-3 top-3.5 text-white/30" size={18} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-text-secondary font-medium">Posición</label>
                    <select
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
                        value={filters.position || ''}
                        onChange={(e) => onFilterChange('position', e.target.value)}
                    >
                        <option value="">Todas las posiciones</option>
                        <option value="goalkeeper">Arquero / POR</option>
                        <option value="defence">Defensa / DEF</option>
                        <option value="midfield">Mediocampista / MC</option>
                        <option value="offence">Delantero / DEL</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-text-secondary font-medium">Ordenar por</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => onFilterChange('sort', '')}
                            className={`p-2 text-sm rounded-lg border transition-all ${!filters.sort
                                ? 'bg-accent-blue/20 border-accent-blue/50 text-white'
                                : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10'
                                }`}
                        >
                            Defecto
                        </button>
                        <button
                            onClick={() => onFilterChange('sort', 'name')}
                            className={`p-2 text-sm rounded-lg border transition-all ${filters.sort === 'name'
                                ? 'bg-accent-blue/20 border-accent-blue/50 text-white'
                                : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10'
                                }`}
                        >
                            Nombre A-Z
                        </button>
                    </div>
                </div>
            </div>
        </GlassmorphicCard>
    );
};
