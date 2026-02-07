
import React, { useState, useEffect } from 'react';
import { User, Question, Scorecard, KSAPhase, PHASE_ORDER } from '../types';
import { generateAssessment, evaluateAssessment } from '../geminiService';

interface AssessmentViewProps {
  user: User;
  sector: string;
  onComplete: (updatedUser: User) => void;
  onCancel: () => void;
}

const AssessmentView: React.FC<AssessmentViewProps> = ({ user, sector, onComplete, onCancel }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const phase = user.currentPhases[sector] || KSAPhase.BEGINNER;

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const qData = await generateAssessment(sector, phase);
        setQuestions(qData);
      } catch (e) {
        console.error("AI error", e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [sector, phase]);

  const handleSelect = (optionIdx: number) => {
    setAnswers({ ...answers, [questions[currentIdx].id]: optionIdx });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await evaluateAssessment(sector, phase, questions, answers);
      setScorecard(result);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinish = () => {
    if (scorecard?.passed) {
      const updatedPhases = { ...user.currentPhases };
      const currentIdx = PHASE_ORDER.indexOf(phase);
      if (currentIdx < PHASE_ORDER.length - 1) {
        updatedPhases[sector] = PHASE_ORDER[currentIdx + 1];
      }
      
      const newBadge = `${phase} ${sector} Badge`;
      onComplete({
        ...user,
        points: user.points + 200,
        badges: user.badges.includes(newBadge) ? user.badges : [...user.badges, newBadge],
        currentPhases: updatedPhases
      });
    } else {
      onComplete(user);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold mb-2">AI is Crafting Your Assessment...</h2>
      <p className="text-slate-500 max-w-md">Generating 10 tricky questions specialized for your current level in {sector}.</p>
    </div>
  );

  if (scorecard) return (
    <div className="max-w-3xl mx-auto py-8 animate-fadeIn">
      <div className={`p-8 rounded-3xl border-2 ${scorecard.passed ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800'}`}>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{scorecard.passed ? '🏆' : '📚'}</div>
          <h2 className="text-3xl font-bold mb-2">Assessment {scorecard.passed ? 'Completed!' : 'Requires Review'}</h2>
          <p className="text-lg font-medium">Your Score: <span className="text-2xl text-indigo-600 dark:text-indigo-400">{scorecard.score}/100</span></p>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
            <h4 className="font-bold text-slate-800 dark:text-white mb-2">AI Gap Analysis</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{scorecard.gapAnalysis}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-indigo-600 mb-3 flex items-center gap-2">🌐 Online Prescriptions</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {scorecard.prescriptions.online.map((p, i) => <li key={i}>• {p}</li>)}
              </ul>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-emerald-600 mb-3 flex items-center gap-2">🏢 Offline Prescriptions</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {scorecard.prescriptions.offline.map((p, i) => <li key={i}>• {p}</li>)}
              </ul>
            </div>
          </div>

          <button 
            onClick={handleFinish}
            className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90"
          >
            {scorecard.passed ? 'Unlock Next Phase & Collect Badge' : 'Return to Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onCancel} className="text-slate-500 font-medium flex items-center gap-1">
          <span>←</span> Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question {currentIdx + 1} of {questions.length}</span>
          <div className="w-40 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full transition-all" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 animate-slideUp">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8 leading-snug">
          {currentQ.text}
        </h3>

        <div className="space-y-3">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                answers[currentQ.id] === idx
                  ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30'
                  : 'bg-slate-50 border-slate-50 dark:bg-slate-800 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  answers[currentQ.id] === idx ? 'bg-indigo-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={`font-medium ${answers[currentQ.id] === idx ? 'text-indigo-900 dark:text-indigo-100' : 'text-slate-600 dark:text-slate-300'}`}>
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-between gap-4">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="flex-1 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold disabled:opacity-30"
          >
            Previous
          </button>
          {currentIdx === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting || answers[currentQ.id] === undefined}
              className="flex-[2] py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Evaluating...</> : 'Complete Assessment'}
            </button>
          ) : (
            <button
              disabled={answers[currentQ.id] === undefined}
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="flex-[2] py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 disabled:opacity-50"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentView;
