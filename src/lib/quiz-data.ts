import { QuizQuestion } from './types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'gender',
    question: 'Qual é o teu género?',
    category: 'profile',
    options: [
      { id: 'male', label: 'Homem', value: 'male' },
      { id: 'female', label: 'Mulher', value: 'female' },
    ],
  },
  {
    id: 'mainProblem',
    question: 'Qual o teu principal problema capilar?',
    category: 'problem',
    options: [
      { id: 'hairfall', label: 'Queda de cabelo', value: 'hairfall', weight: 5 },
      { id: 'baldness', label: 'Entradas / calvície', value: 'baldness', weight: 5 },
      { id: 'thinning', label: 'Afinamento dos fios', value: 'thinning', weight: 4 },
      { id: 'patches', label: 'Falhas no couro cabeludo', value: 'patches', weight: 4 },
      { id: 'weak', label: 'Cabelo fraco e quebradiço', value: 'weak', weight: 3 },
    ],
  },
  {
    id: 'duration',
    question: 'Há quanto tempo notas esse problema?',
    category: 'problem',
    options: [
      { id: 'recent', label: 'Menos de 6 meses', value: 'recent', weight: 2 },
      { id: 'medium', label: '6 meses a 1 ano', value: 'medium', weight: 3 },
      { id: 'long', label: 'Mais de 1 ano', value: 'long', weight: 5 },
    ],
  },
  {
    id: 'fallSituation',
    question: 'O teu cabelo cai mais em que situações?',
    category: 'problem',
    options: [
      { id: 'washing', label: 'Ao lavar', value: 'washing' },
      { id: 'combing', label: 'Ao pentear', value: 'combing' },
      { id: 'daytime', label: 'Durante o dia', value: 'daytime' },
      { id: 'constantly', label: 'Constantemente', value: 'constantly', weight: 5 },
    ],
  },
  {
    id: 'intensity',
    question: 'Como classificas o teu nível de queda atualmente?',
    category: 'problem',
    options: [
      { id: 'light', label: 'Leve', value: 'light', weight: 2 },
      { id: 'moderate', label: 'Moderada', value: 'moderate', weight: 4 },
      { id: 'intense', label: 'Intensa', value: 'intense', weight: 5 },
    ],
  },
  {
    id: 'familyHistory',
    question: 'Tens histórico familiar de queda ou calvície?',
    category: 'profile',
    options: [
      { id: 'yes', label: 'Sim', value: 'yes', weight: 4 },
      { id: 'no', label: 'Não', value: 'no', weight: 1 },
      { id: 'unknown', label: 'Não sei', value: 'unknown', weight: 2 },
    ],
  },
  {
    id: 'scalpCondition',
    question: 'Como está o teu couro cabeludo?',
    category: 'profile',
    options: [
      { id: 'oily', label: 'Oleoso', value: 'oily' },
      { id: 'dry', label: 'Seco', value: 'dry' },
      { id: 'sensitive', label: 'Sensível', value: 'sensitive' },
      { id: 'normal', label: 'Normal', value: 'normal' },
    ],
  },
  {
    id: 'previousTreatment',
    question: 'Já usaste algum tratamento antes?',
    category: 'profile',
    options: [
      { id: 'never', label: 'Nunca', value: 'never' },
      { id: 'no-results', label: 'Sim, sem resultados', value: 'no-results', weight: 3 },
      { id: 'few-results', label: 'Sim, com poucos resultados', value: 'few-results', weight: 2 },
      { id: 'good-results', label: 'Sim, com bons resultados', value: 'good-results', weight: 1 },
    ],
  },
  {
    id: 'mainGoal',
    question: 'Qual o teu principal objetivo?',
    category: 'goal',
    options: [
      { id: 'stop-fall', label: 'Travar a queda', value: 'stop-fall' },
      { id: 'stimulate-growth', label: 'Estimular crescimento', value: 'stimulate-growth' },
      { id: 'strengthen', label: 'Fortalecer fios', value: 'strengthen' },
      { id: 'fill-patches', label: 'Preencher falhas', value: 'fill-patches' },
    ],
  },
];
