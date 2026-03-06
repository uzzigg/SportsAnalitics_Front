'use client';

import React from 'react';
import { Navbar } from '../specific/Navbar';
import { Footer } from '../specific/Footer';
import { usePathname } from 'next/navigation';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const isDashboardApp = pathname === '/jugadores';

    if (isDashboardApp) {
        return <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 h-screen overflow-hidden">{children}</div>;
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};
