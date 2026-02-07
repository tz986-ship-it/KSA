
export enum UserRole {
  END_USER = 'END_USER',
  HR = 'HR',
  ADMIN = 'ADMIN'
}

export enum KSAPhase {
  BEGINNER = 'Beginner',
  BASIC = 'Basic',
  PRE_INTERMEDIATE = 'Pre-intermediate',
  INTERMEDIATE = 'Intermediate',
  UPPER_INTERMEDIATE = 'Upper-intermediate',
  ADVANCE = 'Advance',
  MASTER = 'Master',
  CHAMP = 'Champ'
}

export const PHASE_ORDER: KSAPhase[] = [
  KSAPhase.BEGINNER,
  KSAPhase.BASIC,
  KSAPhase.PRE_INTERMEDIATE,
  KSAPhase.INTERMEDIATE,
  KSAPhase.UPPER_INTERMEDIATE,
  KSAPhase.ADVANCE,
  KSAPhase.MASTER,
  KSAPhase.CHAMP
];

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  badges: string[];
  points: number;
  currentPhases: Record<string, KSAPhase>; // e.g. { "Python": "Basic" }
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  sector: string;
  phase: KSAPhase;
  questions: Question[];
  status: 'pending' | 'completed';
  score?: number;
}

export interface Scorecard {
  assessmentId: string;
  score: number;
  gapAnalysis: string;
  prescriptions: {
    online: string[];
    offline: string[];
  };
  passed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'PDF' | 'VIDEO' | 'EXCEL' | 'DOC';
  url: string;
  sector: string;
}
