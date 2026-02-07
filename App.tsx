
import React, { useState, useEffect } from 'react';
import { User, UserRole, KSAPhase, Resource } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AssessmentView from './components/AssessmentView';
import Leaderboard from './components/Leaderboard';
import HRPanel from './components/HRPanel';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);

  // Mock authentication for MVP
  useEffect(() => {
    const mockUser: User = {
      id: 'emp-001',
      name: 'Alex Rivera',
      role: UserRole.END_USER,
      avatar: 'https://picsum.photos/seed/alex/200',
      badges: ['Beginner Python', 'Basic SQL'],
      points: 1250,
      currentPhases: {
        'Cloud Computing': KSAPhase.BEGINNER,
        'Project Management': KSAPhase.INTERMEDIATE,
        'Soft Skills': KSAPhase.BASIC
      }
    };
    setUser(mockUser);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!user) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p className="text-xl font-medium">Initializing KSA Portal...</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} onStartAssessment={(sector) => {
          setActiveTab(`assessment-${sector}`);
        }} />;
      case 'leaderboard':
        return <Leaderboard user={user} />;
      case 'hr-panel':
        return <HRPanel />;
      case 'admin-settings':
        return <AdminPanel />;
      default:
        if (activeTab.startsWith('assessment-')) {
          const sector = activeTab.split('assessment-')[1];
          return (
            <AssessmentView 
              user={user} 
              sector={sector} 
              onComplete={(updatedUser) => {
                setUser(updatedUser);
                setActiveTab('dashboard');
              }}
              onCancel={() => setActiveTab('dashboard')}
            />
          );
        }
        return <Dashboard user={user} onStartAssessment={() => {}} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userRole={user.role}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{user.points} XP</span>
              <div className="flex -space-x-1">
                {user.badges.slice(0, 3).map((b, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] shadow-sm" title={b}>
                    🏆
                  </div>
                ))}
              </div>
            </div>
            <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full ring-2 ring-indigo-500/20" />
          </div>
        </header>

        <div className="max-w-7xl mx-auto animate-fadeIn">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
