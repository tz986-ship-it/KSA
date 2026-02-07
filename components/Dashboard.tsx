
import React from 'react';
import { User, PHASE_ORDER, KSAPhase } from '../types';

interface DashboardProps {
  user: User;
  onStartAssessment: (sector: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartAssessment }) => {
  return (
    <div className="space-y-8 pb-10">
      {/* Gamification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-morphism p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Total Badges</h3>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-100 dark:border-amber-800 shadow-sm">
                🎖️ {badge}
              </span>
            ))}
            {user.badges.length === 0 && <span className="text-slate-400 italic">No badges earned yet.</span>}
          </div>
        </div>

        <div className="glass-morphism p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Assessment Level</h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-slate-800 dark:text-white">{user.points}</span>
            <span className="text-slate-400 mb-1 text-sm font-medium">XP POINTS</span>
          </div>
          <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[65%]" />
          </div>
          <p className="text-[10px] mt-2 text-slate-400 font-medium">NEXT BADGE AT 2000 XP</p>
        </div>

        <div className="glass-morphism p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">Global Rank</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-2xl font-bold">
              #12
            </div>
            <div>
              <p className="text-lg font-bold">Top 5%</p>
              <p className="text-xs text-slate-500">+2 positions this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active KSAs */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Skill Path Progression</h2>
          <button className="text-sm font-semibold text-indigo-500 hover:text-indigo-600">+ New Assessment</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(user.currentPhases).map(([sector, phase]) => {
            // Fix: Cast phase to KSAPhase as Object.entries can sometimes infer values as unknown
            const currentPhase = phase as KSAPhase;
            const phaseIndex = PHASE_ORDER.indexOf(currentPhase);
            const progress = ((phaseIndex + 1) / PHASE_ORDER.length) * 100;

            return (
              <div key={sector} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white mb-1 group-hover:text-indigo-500 transition-colors">{sector}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider">{currentPhase}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xl">
                    {sector === 'Cloud Computing' ? '☁️' : sector === 'Project Management' ? '📅' : '🤝'}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">Progression</span>
                    <span className="text-slate-700 dark:text-slate-300">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <button 
                  onClick={() => onStartAssessment(sector)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Continue Assessment
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Learning (MVP Mock) */}
      <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-2xl font-bold mb-2">Ready to reach 'Champ' level?</h3>
          <p className="text-indigo-100 mb-6">Our AI identified a gap in your Cloud Infrastructure knowledge. Check out the latest resources curated just for you.</p>
          <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-indigo-900/20 hover:scale-105 transition-transform">
            View Prescriptions
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/10 pointer-events-none" />
        <span className="absolute -right-10 -bottom-10 text-[120px] opacity-10">🚀</span>
      </div>
    </div>
  );
};

export default Dashboard;
