'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/jugadores?search=${encodeURIComponent(search)}`);
        }
    };
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-white/10 bg-background-dark/80 backdrop-blur-md px-6 py-4 lg:px-20">
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-3 text-primary group">
                    <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">query_stats</span>
                    <h2 className="text-xl font-black leading-tight tracking-tight text-slate-100 uppercase group-hover:text-primary transition-colors">VISTA Sports</h2>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/jugadores" className="text-slate-300 hover:text-primary transition-colors text-sm font-semibold uppercase tracking-wider">Jugadores</Link>
                </nav>
            </div>

            <div className="flex flex-1 justify-end items-center">
                <form onSubmit={handleSearch} className="hidden lg:flex items-center relative w-64">
                    <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg bg-slate-800/50 border-white/10 text-slate-100 placeholder:text-slate-500 pl-10 py-2 focus:ring-primary focus:border-primary focus:outline-none text-sm"
                        placeholder="Buscar jugadores..."
                    />
                </form>
            </div>
        </header>
    );
};
