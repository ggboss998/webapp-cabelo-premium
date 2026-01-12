// Types para o sistema de diagnóstico capilar

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  category: 'profile' | 'problem' | 'goal';
}

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  weight?: number;
}

export interface QuizAnswer {
  questionId: string;
  answerId: string;
  value: string;
}

export interface HairPack {
  id: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  idealFor: string[];
  price: number;
  originalPrice?: number;
  image: string;
  recommended?: boolean;
  shopifyUrl?: string;
  ingredients?: string[];
  results?: string;
}

export interface UserProfile {
  gender: string;
  mainProblem: string;
  duration: string;
  fallSituation: string;
  intensity: string;
  familyHistory: string;
  scalpCondition: string;
  previousTreatment: string;
  mainGoal: string;
}

export type AppSection = 'landing' | 'quiz' | 'analyzing' | 'results';
