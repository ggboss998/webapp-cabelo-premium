import { QuizAnswer, HairPack, UserProfile } from './types';
import { hairPacks } from './packs-data';

export function calculateRecommendation(answers: QuizAnswer[]): HairPack[] {
  // Converte respostas em perfil do usuário
  const profile: Partial<UserProfile> = {};
  answers.forEach((answer) => {
    profile[answer.questionId as keyof UserProfile] = answer.value;
  });

  // Sistema de pontuação para cada pack
  const scores: Record<string, number> = {
    'intensive-regrowth': 0,
    'fortify-restore': 0,
    'scalp-balance': 0,
    'prevention-care': 0,
  };

  // Lógica de recomendação baseada nas respostas

  // Problema principal
  if (profile.mainProblem === 'baldness' || profile.mainProblem === 'patches') {
    scores['intensive-regrowth'] += 10;
  } else if (profile.mainProblem === 'weak' || profile.mainProblem === 'thinning') {
    scores['fortify-restore'] += 10;
  } else if (profile.mainProblem === 'hairfall') {
    scores['intensive-regrowth'] += 7;
    scores['fortify-restore'] += 5;
  }

  // Intensidade
  if (profile.intensity === 'intense') {
    scores['intensive-regrowth'] += 8;
  } else if (profile.intensity === 'moderate') {
    scores['fortify-restore'] += 6;
    scores['intensive-regrowth'] += 4;
  } else if (profile.intensity === 'light') {
    scores['prevention-care'] += 8;
    scores['scalp-balance'] += 5;
  }

  // Duração do problema
  if (profile.duration === 'long') {
    scores['intensive-regrowth'] += 6;
  } else if (profile.duration === 'medium') {
    scores['fortify-restore'] += 5;
  } else if (profile.duration === 'recent') {
    scores['prevention-care'] += 6;
  }

  // Histórico familiar
  if (profile.familyHistory === 'yes') {
    scores['intensive-regrowth'] += 5;
  }

  // Condição do couro cabeludo
  if (profile.scalpCondition === 'oily' || profile.scalpCondition === 'sensitive' || profile.scalpCondition === 'dry') {
    scores['scalp-balance'] += 8;
  }

  // Tratamento anterior
  if (profile.previousTreatment === 'no-results' || profile.previousTreatment === 'few-results') {
    scores['intensive-regrowth'] += 5;
  } else if (profile.previousTreatment === 'never') {
    scores['prevention-care'] += 3;
  }

  // Objetivo principal
  if (profile.mainGoal === 'stop-fall') {
    scores['intensive-regrowth'] += 6;
  } else if (profile.mainGoal === 'stimulate-growth') {
    scores['intensive-regrowth'] += 7;
  } else if (profile.mainGoal === 'strengthen') {
    scores['fortify-restore'] += 7;
  } else if (profile.mainGoal === 'fill-patches') {
    scores['intensive-regrowth'] += 8;
  }

  // Situação de queda
  if (profile.fallSituation === 'constantly') {
    scores['intensive-regrowth'] += 5;
  }

  // Ordena packs por pontuação
  const sortedPacks = hairPacks
    .map((pack) => ({
      ...pack,
      score: scores[pack.id] || 0,
    }))
    .sort((a, b) => b.score - a.score);

  // Marca o primeiro como recomendado
  const recommendedPacks = sortedPacks.map((pack, index) => ({
    ...pack,
    recommended: index === 0,
  }));

  return recommendedPacks;
}

export function getPersonalizedHeadline(answers: QuizAnswer[]): string {
  const profile: Partial<UserProfile> = {};
  answers.forEach((answer) => {
    profile[answer.questionId as keyof UserProfile] = answer.value;
  });

  if (profile.intensity === 'intense') {
    return 'Criámos um tratamento intensivo personalizado para ti';
  } else if (profile.mainProblem === 'baldness') {
    return 'O teu plano de regeneração capilar está pronto';
  } else if (profile.mainProblem === 'weak') {
    return 'Preparámos o pack ideal para fortalecer o teu cabelo';
  } else if (profile.duration === 'recent') {
    return 'Vamos travar este problema antes que se agrave';
  } else {
    return 'Criámos o pack ideal para o teu cabelo';
  }
}
