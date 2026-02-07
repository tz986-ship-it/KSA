
import React from 'react';
import { User } from '../types';

interface LeaderboardProps {
  user: User;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
  const mockRankings = [
    { id: '1', name: 'Sarah Jenkins', points: 4850, badges: 12, avatar: 'https://picsum.photos/seed/sarah/100', trend: 'up' },
    { id: '2', name: 'Marcus Wong', points: 4500, badges: 10, avatar: 'https://picsum.photos/seed/marcus/100', trend: 'down' },
    { id: '3', name: 'Elena Rodriguez', points: 4210, badges: 9, avatar: 'https://picsum.photos/seed/elena/100', trend: 'stable' },
    { id: '4', name: 'David Smith', points: 3900, badges: 8, avatar: 'https://picsum.photos/seed/david/100', trend: 'up' },
    { id: '12', name: 'Alex Rivera', points: 1250, badges: 2, avatar: 'https://picsum.photos/seed/alex/100', trend: 'up', isSelf: true },
    { id: '13', name: 'Zoe Kemp', points: 1100, badges: 2, avatar: 'https://picsum.photos/seed/zoe/100', trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Top 20 Performers</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold">This Month</button>
            <button className="px-3 py-1 rounded-full text-slate-500 text-xs font-bold">All Time</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Points</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Badges</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockRankings.map((rank, idx) => (
                <tr key={rank.id} className={`${rank.isSelf ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {idx < 3 ? (
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          idx === 0 ? 'bg-amber-100 text-amber-600' : idx === 1 ? 'bg-slate-200 text-slate-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {idx + 1}
                        </span>
                      ) : (
                        <span className="w-8 h-8 flex items-center justify-center text-slate-500 font-bold">{rank.id}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={rank.avatar} alt="" className="w-8 h-8 rounded-full border border-slate-200" />
                      <div>
                        <p className="text-sm font-bold">{rank.name}</p>
                        {rank.isSelf && <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded uppercase font-bold">You</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{rank.points.toLocaleString()} XP</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {[...Array(Math.min(rank.badges, 5))].map((_, i) => (
                        <span key={i} className="text-xs">🎖️</span>
                      ))}
                      {rank.badges > 5 && <span className="text-xs text-slate-400">+{rank.badges - 5}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {rank.trend === 'up' && <span className="text-emerald-500">▲</span>}
                    {rank.trend === 'down' && <span className="text-rose-500">▼</span>}
                    {rank.trend === 'stable' && <span className="text-slate-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-slate-900 dark:bg-white p-6 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-2xl">💡</div>
          <div>
            <h4 className="text-white dark:text-slate-900 font-bold">Ready to climb higher?</h4>
            <p className="text-slate-400 dark:text-slate-500 text-sm">Completing one advanced assessment can boost you by 5 positions!</p>
          </div>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm">Find Advanced Test</button>
      </div>
    </div>
  );
};

export default Leaderboard;
