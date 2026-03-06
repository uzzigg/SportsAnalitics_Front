'use client';

import React from 'react';
import Link from 'next/link';
import { useFetch } from '../hooks/useFetch';
import { Player, PaginatedData } from '../types';

export default function Dashboard() {
  const { data: playersData, loading: loadingPlayers } = useFetch<PaginatedData<Player>>('/players');

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] w-full flex flex-col justify-center px-6 lg:px-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDW9-jy2bsLaxQ_pTljV8GEdPPeW72Fk1RGhcBicF33whQWn3HbFOd5w3cgPlvQvyUClCAQeVweUHe2z3nhoKxZnfbPylAhSmde-FPdnyI1pvAua18uJpxFlYWmhlwOnJW8uHQmMvT8Ey3ajPqoHvdcceeqFf6hN8BaZ93tNwVR8VtgrBmzH4e-QUlUNGZJ13FtBv8yRbjJCDRoP0geYoq8xIb97LBgEMJMFlP91S8bZi43T0D65h3uppT4LS2x-O6WrIEZ0dZxRch_')" }}
        />
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 px-4 py-1.5 rounded-full">
            <span className="text-primary text-xs font-black uppercase tracking-widest leading-none">⚽ DESCUBRE EL FÚTBOL COMO NUNCA</span>
          </div>
          <div>
            <h1 className="text-slate-100 text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              SPORTS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue">ANALYTICS</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium mt-4 max-w-xl">
              Descubre a los mejores Jugadores de Fútbol con analítica de precisión en tiempo real.
            </p>
          </div>
          <div className="pt-4">
            <Link href="/jugadores">
              <button className="bg-gradient-to-r from-primary to-accent-blue text-slate-900 px-8 py-4 rounded-lg font-black text-base uppercase tracking-widest transition-transform hover:scale-105">
                EXPLORAR JUGADORES
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="w-full max-w-[1400px] mx-auto px-6 lg:px-20 py-8 space-y-16">

        {/* Highlight Grid - Configured for Players only */}
        <div className="max-w-5xl mx-auto">

          {/* Top Jugadores */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-l-4 border-primary pl-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-100 uppercase italic">Jugadores Destacados</h2>
              <Link href="/jugadores" className="text-primary text-xs font-bold hover:underline">VER TODOS</Link>
            </div>
            <div className="space-y-4">
              {loadingPlayers ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-24 bg-slate-800/50 rounded-xl" />
                  ))}
                </div>
              ) : playersData?.players && playersData.players.length > 0 ? (
                playersData.players.slice(0, 5).map(player => (
                  <div key={player.id} className="group relative bg-slate-900/40 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 transition-all hover:border-primary/50">
                    <div className="h-14 w-14 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center">
                      {player.team?.crest ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img alt={player.team.name} className="w-10 h-10 object-contain drop-shadow-md" src={player.team.crest} />
                      ) : (
                        <span className="material-symbols-outlined text-slate-500">person</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-100">{player.name}</h3>
                      <div className="flex gap-4 mt-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Posición: <span className="text-slate-200">{player.position || 'N/A'}</span></span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">País: <span className="text-slate-200">{player.nationality || 'N/A'}</span></span>
                      </div>
                    </div>
                    <Link href={`/detalle/${player.id}`}>
                      <button className="text-[10px] font-black text-primary border border-primary/40 px-3 py-1 rounded hover:bg-primary hover:text-background-dark transition-colors">VER DETALLE</button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 text-sm italic">No hay jugadores disponibles.</div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
