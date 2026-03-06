'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useFetch } from '../../hooks/useFetch';
import { useFilters } from '../../hooks/useFilters';
import { PaginatedData, Player } from '../../types';
import { ErrorMessage } from '../../components/base/ErrorMessage';
import { LoadingSpinner } from '../../components/base/LoadingSpinner';

function JugadoresContent() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const { filters, updateFilter } = useFilters({
        search: initialSearch,
        position: '',
        sort: 'rating',
        page: 1
    });

    useEffect(() => {
        const urlSearch = searchParams.get('search');
        if (urlSearch !== null && urlSearch !== filters.search) {
            updateFilter('search', urlSearch);
            updateFilter('page', 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, updateFilter]);

    const { data, loading, error, refetch } = useFetch<PaginatedData<Player>>('/players', filters);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter('search', e.target.value);
        updateFilter('page', 1); // Reset page on search
    };

    const handlePositionToggle = (pos: string) => {
        // Simple toggle logic treating it almost like a radio for the backend capability
        const currentPos = filters.position === pos ? '' : pos;
        updateFilter('position', currentPos);
        updateFilter('page', 1);
    };

    return (
        <div className="flex h-screen overflow-hidden w-full">
            {/* Sidebar / Filters */}
            <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="p-6 flex items-center gap-3">
                    <Link href="/" className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined font-bold">query_stats</span>
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold leading-none">Sports Analytics</h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Panel</span>
                    </Link>
                    <div className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg">
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-sm font-medium">Jugadores</span>
                    </div>

                    <div className="pt-8 pb-4">
                        <h3 className="px-3 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Filtros Avanzados</h3>
                    </div>

                    <div className="space-y-6 px-3">
                        {/* Position Checks */}
                        <div>
                            <p className="text-sm font-semibold mb-3">Posición</p>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { value: 'POR', label: 'POR' },
                                    { value: 'DEF', label: 'DEF' },
                                    { value: 'MC', label: 'MC' },
                                    { value: 'DEL', label: 'DEL' },
                                ].map((pos) => (
                                    <label key={pos.value} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={filters.position === pos.value}
                                            onChange={() => handlePositionToggle(pos.value)}
                                            className="rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary"
                                        />
                                        <span className="text-xs">{pos.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                    </div>
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => refetch()}
                        className="w-full bg-primary py-2 rounded-lg text-background-dark font-bold text-sm transform transition-all active:scale-95 hover:brightness-110"
                    >
                        {loading ? 'Cargando...' : 'Aplicar Filtros'}
                    </button>
                </div>
            </aside>

            {/* Main view area */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header Search Area */}
                <header className="p-8 pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Jugadores</h2>
                            <p className="text-slate-500 dark:text-slate-400">Descubre los mejores futbolistas del mundo</p>
                        </div>
                        <div className="text-right flex items-center gap-4">
                            {data && (
                                <p className="text-sm font-medium text-slate-400">
                                    Mostrando <span className="text-primary">{data.players.length}</span> de {data.total}+ jugadores
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                type="text"
                                value={filters.search}
                                onChange={handleSearchChange}
                                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-4 pl-12 pr-4 text-base focus:ring-2 focus:ring-primary/50 outline-none transition-all placeholder:text-slate-500"
                                placeholder="Buscar por nombre, equipo o país..."
                            />
                        </div>
                    </div>
                </header>

                {error && <div className="px-8"><ErrorMessage message={error} /></div>}

                {/* Player Grid Content */}
                <section className="flex-1 overflow-y-auto p-8 pt-4">
                    {loading && !data ? (
                        <div className="flex justify-center items-center h-full">
                            <LoadingSpinner size={48} />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
                            {data?.players.map((player) => (
                                <div key={player.id} className="group bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-xl p-5 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:bg-primary/5 hover:border-primary/30 hover:-translate-y-1">
                                    <button className="absolute top-3 right-3 text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                                    </button>

                                    <div className="relative mb-4">
                                        <div className="size-24 rounded-full border-[3px] border-primary/50 group-hover:border-primary p-1 transition-colors">
                                            {player.photoUrl ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={player.photoUrl} alt={player.name} className="w-full h-full object-cover rounded-full bg-white/5 drop-shadow-md" />
                                            ) : player.team?.crest ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img src={player.team.crest} alt={player.name} className="w-full h-full object-contain rounded-full bg-white/5 drop-shadow-md p-1" />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-4xl text-slate-600">person</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-background-dark shadow-lg">
                                            #{player.shirtNumber || Math.floor(Math.random() * 99) + 1}
                                        </div>
                                    </div>

                                    <h4 className="font-bold text-lg leading-tight truncate w-full text-slate-100" title={player.name}>{player.name.split(' ').pop()}</h4>

                                    <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded-full">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase truncate max-w-[120px]">{player.team?.name || 'Agente Libre'}</span>
                                    </div>

                                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                        <span className="truncate">{player.position || 'Jugador'}</span>
                                        {player.nationality && (
                                            <span className="w-6 text-center text-[10px] bg-slate-800 rounded px-1 min-w-max truncate" title={player.nationality}>
                                                {player.nationality.substring(0, 3).toUpperCase()}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-3 flex gap-0.5 text-primary/70 group-hover:text-primary transition-colors">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: `'FILL' ${star <= 4 ? 1 : 0}` }}>star</span>
                                        ))}
                                    </div>

                                    <Link href={`/detalle/${player.id}`} className="mt-4 text-[10px] font-black text-primary/80 hover:text-primary transition-colors hover:underline flex items-center gap-1 tracking-widest">
                                        VER PERFIL <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                                    </Link>
                                </div>
                            ))}

                            {data?.players.length === 0 && (
                                <div className="col-span-full py-20 text-center text-slate-500">
                                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">search_off</span>
                                    <p className="text-lg">No se encontraron jugadores con estos filtros.</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* Loading overlay for subsequent fetches */}
                {loading && data && (
                    <div className="absolute inset-0 bg-background-dark/50 backdrop-blur-sm z-10 flex items-center justify-center">
                        <LoadingSpinner size={48} />
                    </div>
                )}

                {data && data.totalPages > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-slate-900/80 backdrop-blur border border-white/10 px-6 py-3 rounded-full shadow-2xl z-20">
                        <button
                            disabled={filters.page === 1}
                            onClick={() => updateFilter('page', filters.page - 1)}
                            className="p-1 rounded-full text-slate-400 hover:text-primary hover:bg-white/5 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span className="text-xs font-bold text-slate-300">
                            PÁGINA <span className="text-primary">{filters.page}</span> DE {data.totalPages}
                        </span>
                        <button
                            disabled={filters.page === data.totalPages}
                            onClick={() => updateFilter('page', filters.page + 1)}
                            className="p-1 rounded-full text-slate-400 hover:text-primary hover:bg-white/5 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function JugadoresPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-[#0f2023]">
                <LoadingSpinner size={48} />
            </div>
        }>
            <JugadoresContent />
        </Suspense>
    );
}
