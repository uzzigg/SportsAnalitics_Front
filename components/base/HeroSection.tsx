import React from 'react';

interface HeroSectionProps {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    icon?: React.ReactNode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, icon }) => {
    return (
        <section className="relative py-20 px-6 rounded-3xl overflow-hidden mb-12 glass group max-w-7xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent-indigo/30 transition-colors duration-700" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                {icon && (
                    <div className="p-4 rounded-full glass animate-float border-white/20">
                        {icon}
                    </div>
                )}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl font-light">
                    {subtitle}
                </p>
            </div>
        </section>
    );
};
