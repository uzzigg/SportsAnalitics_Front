import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-auto border-t border-white/10 bg-background-dark py-12 px-6 lg:px-20">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div className="space-y-4 max-w-sm">
                    <div className="flex items-center gap-2 text-primary justify-center md:justify-start">
                        <span className="material-symbols-outlined text-2xl">query_stats</span>
                        <h2 className="text-lg font-black leading-tight tracking-tight text-slate-100 uppercase italic">VISTA Sports</h2>
                    </div>
                    <p className="text-slate-400 text-sm">La plataforma líder en análisis deportivo avanzado. Datos precisos, decisiones inteligentes.</p>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} VISTA Sports Analytics. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
