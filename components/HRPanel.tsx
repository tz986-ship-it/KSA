
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const HRPanel: React.FC = () => {
  const chartData = [
    { name: 'Python', users: 45, avgPhase: 4 },
    { name: 'React', users: 32, avgPhase: 3 },
    { name: 'AWS', users: 28, avgPhase: 2 },
    { name: 'DevOps', users: 15, avgPhase: 1 },
    { name: 'Management', users: 22, avgPhase: 5 },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Employees', val: '1,248', color: 'text-indigo-600' },
          { label: 'Avg Completion Rate', val: '72%', color: 'text-emerald-600' },
          { label: 'Identified Gaps', val: '142', color: 'text-rose-600' },
          { label: 'Skills Mastered', val: '890', color: 'text-amber-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">{stat.label}</p>
            <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-6">Skill Popularity & Proficiency</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="users" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-6">Critical Gaps Detected</h3>
          <div className="space-y-4">
            {[
              { skill: 'Cloud Security', level: 'Basic', count: 18, severity: 'High' },
              { skill: 'Data Ethics', level: 'Intermediate', count: 24, severity: 'Medium' },
              { skill: 'Agile Mentorship', level: 'Advance', count: 5, severity: 'Critical' },
            ].map((gap, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">{gap.skill}</h4>
                  <p className="text-xs text-slate-500">Need level: {gap.level}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    gap.severity === 'Critical' ? 'bg-rose-100 text-rose-600' : gap.severity === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {gap.severity}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{gap.count} employees impacted</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm">Generate Learning Plan</button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold">Learning Resource Manager</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <span className="text-3xl mb-2">📁</span>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Upload New Resource</p>
            <p className="text-[10px] text-slate-400 mt-1">PDF, DOC, Video, Excel</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎥</span>
              <div>
                <h5 className="text-sm font-bold">AWS Masterclass 2024</h5>
                <p className="text-[10px] text-slate-400">VIDEO • 1.2 GB</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-[10px] font-bold text-indigo-500 uppercase">Cloud Sector</span>
              <button className="text-xs text-slate-400 hover:text-rose-500">Remove</button>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📄</span>
              <div>
                <h5 className="text-sm font-bold">Team Leadership PDF</h5>
                <p className="text-[10px] text-slate-400">DOC • 250 KB</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-[10px] font-bold text-indigo-500 uppercase">Management</span>
              <button className="text-xs text-slate-400 hover:text-rose-500">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRPanel;
