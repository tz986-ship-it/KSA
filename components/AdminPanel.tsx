
import React from 'react';

const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Platform Personalization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">Company App Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20" defaultValue="KSA AI Talent Portal" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">Welcome Message</label>
              <textarea className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 h-24" defaultValue="Elevate your career by identifying your Knowledge, Skills, and Abilities gaps with AI precision." />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">Corporate Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl">🏢</div>
                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold">Replace Image</button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all">
                  <span className="text-lg">🎖️</span>
                  <span className="text-[8px] font-bold text-slate-400">P{i+1} Logo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">Save Platform Changes</button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">System Maintenance</h3>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold">ALL SYSTEMS GO</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <h5 className="text-sm font-bold mb-1">Database Backup</h5>
            <p className="text-[10px] text-slate-400 mb-3">Last synced: 2 hours ago</p>
            <button className="text-xs text-indigo-500 font-bold">Run Manual Sync</button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <h5 className="text-sm font-bold mb-1">GDPR Compliance Audit</h5>
            <p className="text-[10px] text-slate-400 mb-3">Status: Fully Compliant</p>
            <button className="text-xs text-indigo-500 font-bold">Download Report</button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <h5 className="text-sm font-bold mb-1">AI Model Config</h5>
            <p className="text-[10px] text-slate-400 mb-3">Engine: Gemini-3-Flash</p>
            <button className="text-xs text-indigo-500 font-bold">Model Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
