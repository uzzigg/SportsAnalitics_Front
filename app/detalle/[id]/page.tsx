'use client';

import { useParams, useRouter } from 'next/navigation';
import { useFetch } from '../../../hooks/useFetch';
import { Player, PlayerStats } from '../../../types';
import { ErrorMessage } from '../../../components/base/ErrorMessage';
import { LoadingSpinner } from '../../../components/base/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

export default function PlayerDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { data: player, loading: loadingPlayer, error: errorPlayer } = useFetch<Player>(`/players/${id}`);
    const { data: statsData } = useFetch<PlayerStats>(`/players/${id}/stats`);

    if (loadingPlayer) return <div className="flex justify-center flex-col items-center min-h-screen text-[#00d4ff]"><LoadingSpinner /></div>;
    if (errorPlayer) return <ErrorMessage message={errorPlayer} />;
    if (!player) return null;

    const stats = statsData?.mockedStats || { appearances: 0, goals: 0, assists: 0, rating: '0.0' };

    return (
        <main className="flex-1 overflow-y-auto relative w-full h-full bg-[#0f2023] text-slate-100 font-sans min-h-screen pb-20">
            <button
                onClick={() => router.back()}
                className="absolute top-6 left-6 z-50 flex items-center space-x-2 text-white hover:text-[#00d4ff] transition-colors group bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-lg"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Volver</span>
            </button>

            {/* Hero Banner Section */}
            <div className="relative h-[380px] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB60CBKb8vmX0dz5ZJBmcLovmyye9eraGdt_sCqZX0fY5Ly28qTuM5VgfkqAKB4lReplbTD7wqVx9yngnnQ31ARqgr0PskFhvohfTsCULt-t4gk8zHMp9ohkEpOsBuX5XhFHwaeJ8gzxMJ_b6l_-SZ8h5YNIiSFoSu6fxenZ_br52nSlHSzIdV7Ofxem8ZmDIeFQBWbulUTYZtbhK_L3Q_VHrR1KE3D5qDJTaSDXQZFoE_3BKbWWD4i6bEqfCaMv-XlBoBsJRg2X4LQ')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f2023]/70 to-[#0f2023]/95"></div>

                {/* Action Buttons Top Right removed */}

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#00d4ff] overflow-hidden shadow-2xl bg-[#0f2023]">
                                {player.photoUrl ? (
                                    <img src={player.photoUrl} alt={player.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-slate-800 text-slate-400">
                                        {player.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 right-4 bg-[#00d4ff] text-[#0f2023] px-2 py-0.5 rounded text-[10px] font-bold shadow-md">PRO</div>
                        </div>
                        <div className="text-center md:text-left mb-2">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-lg">{player.name}</h2>
                            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                                {player.team?.name && (
                                    <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#00d4ff] text-xs font-bold uppercase tracking-wider">{player.team.name}</span>
                                )}
                                <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider">{player.position}</span>
                                {player.shirtNumber && (
                                    <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider">#{player.shirtNumber}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="sticky top-0 z-20 bg-[#0f2023]/80 backdrop-blur-xl border-b border-white/10 px-8 shadow-sm">
                <div className="max-w-6xl mx-auto flex gap-8">
                    <button className="py-4 text-sm font-bold border-b-2 border-[#00d4ff] text-[#00d4ff]">Información</button>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-6xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Professional Photo */}
                    <div className="lg:col-span-5 hidden lg:block">
                        <div className="rounded-xl overflow-hidden shadow-2xl bg-white/5 border border-white/10 aspect-square relative flex items-center justify-center p-8 backdrop-blur-sm">
                            {/* Adjusted image layout for portrait API photos */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00d4ff]/10 to-transparent"></div>
                            {player.photoUrl ? (
                                <img src={player.photoUrl} alt={player.name} className="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] z-10 scale-110" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">No Photo</div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Bio & Info */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-[#00d4ff] rounded-full"></span>
                                Datos Biográficos
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                                <div className="flex flex-col gap-1 pb-4 border-b border-slate-800">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Nombre Completo</span>
                                    <span className="text-sm font-medium">{player.name}</span>
                                </div>
                                <div className="flex flex-col gap-1 pb-4 border-b border-slate-800">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Fecha de Nacimiento</span>
                                    <span className="text-sm font-medium">{player.dateOfBirth || 'No Registrada'}</span>
                                </div>
                                <div className="flex flex-col gap-1 pb-4 border-b border-slate-800">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Nacionalidad</span>
                                    <span className="text-sm font-medium">{player.nationality || 'Desconocida'}</span>
                                </div>
                                <div className="flex flex-col gap-1 pb-4 border-b border-slate-800">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Equipo Actual</span>
                                    <div className="flex items-center gap-2">
                                        {player.team?.crest && <img src={player.team.crest} alt="Crest" className="w-4 h-4" />}
                                        <span className="text-sm font-medium">{player.team?.name || 'Agente Libre'}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 pb-4 border-b border-slate-800">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Estado Actual</span>
                                    <span className="text-sm font-medium text-emerald-500 flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Activo
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-md">
                                <span className="text-xs text-slate-400 uppercase font-bold mb-1">Partidos</span>
                                <span className="text-2xl font-black text-white">{stats.appearances}</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-md">
                                <span className="text-xs text-slate-400 uppercase font-bold mb-1 text-[#00d4ff]">Goles</span>
                                <span className="text-2xl font-black text-[#00d4ff]">{stats.goals}</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-md">
                                <span className="text-xs text-slate-400 uppercase font-bold mb-1 text-[#00d4ff]">Asistencias</span>
                                <span className="text-2xl font-black text-[#00d4ff]">{stats.assists}</span>
                            </div>
                            <div className="bg-[#0f2023] border border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.1)] rounded-xl p-4 flex flex-col items-center justify-center text-center">
                                <span className="text-xs text-[#00d4ff] uppercase font-bold mb-1">Rating</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl font-black text-white">{stats.rating}</span>
                                    <span className="text-xs text-slate-400">/10</span>
                                </div>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-md mt-4">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-[#00d4ff]">Perfil Resumen</h4>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {player.name} es un {player.position.toLowerCase()} comprobado que actualmente milita en {player.team?.name || 'su liga'}. Conocido por su habilidad táctica en el campo y desempeño constante, aporta una enorme dinámica y experiencia técnica que lo convierte en un pilar esencial en cada partido que disputa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
