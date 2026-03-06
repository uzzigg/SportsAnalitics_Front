import React from 'react';

interface Tab {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface TabNavigationProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onChange }) => {
    return (
        <div className="flex p-1 space-x-1 glass rounded-2xl w-max mx-auto mb-8 border-white/10">
            {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`
                            flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                            ${isActive
                                ? 'bg-white/10 text-white shadow-lg border border-white/5'
                                : 'text-text-secondary hover:text-white hover:bg-white/5'}
                        `}
                    >
                        {tab.icon && <span>{tab.icon}</span>}
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
