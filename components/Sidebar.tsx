
import React from 'react';
import { UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole, isDarkMode, toggleDarkMode }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
  ];

  if (userRole === UserRole.HR || userRole === UserRole.ADMIN) {
    navItems.push({ id: 'hr-panel', label: 'HR Insights', icon: '👥' });
  }

  if (userRole === UserRole.ADMIN) {
    navItems.push({ id: 'admin-settings', label: 'Admin Panel', icon: '⚙️' });
  }

  return (
    <aside className="w-20 md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full transition-all duration-300">
      <div className="p-4 md:p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-white font-bold text-xl">K</span>
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight text-slate-800 dark:text-white">KSA AI Portal</span>
      </div>

      <nav className="flex-1 px-3 mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id
                ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-medium'
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          <span className="text-xl">{isDarkMode ? '☀️' : '🌙'}</span>
          <span className="hidden md:block">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl hidden md:block">
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Help & Support</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Need help with your KSA assessments?</p>
          <button className="text-xs font-bold text-indigo-500 mt-2 hover:underline">Contact Support</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
