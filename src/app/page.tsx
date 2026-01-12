'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Check, Sparkles, Zap, Shield, TrendingUp, ShoppingCart, Star, Users, Award, Heart, Quote, ArrowRight, Play } from 'lucide-react';
import { quizQuestions } from '@/lib/quiz-data';
import { QuizAnswer, AppSection, HairPack } from '@/lib/types';
import { calculateRecommendation, getPersonalizedHeadline } from '@/lib/recommendation-engine';

export default function HairCarePage() {
  const [currentSection, setCurrentSection] = useState<AppSection>('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [recommendedPacks, setRecommendedPacks] = useState<HairPack[]>([]);
  const [personalizedHeadline, setPersonalizedHeadline] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const startQuiz = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSection('quiz');
      setIsAnimating(false);
    }, 300);
  };

  const handleAnswer = (questionId: string, answerId: string, value: string) => {
    const newAnswers = [...answers, { questionId, answerId, value }];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      // Última pergunta - iniciar análise
      setCurrentSection('analyzing');
      
      // Simular análise (2-4 segundos)
      setTimeout(() => {
        const packs = calculateRecommendation(newAnswers);
        const headline = getPersonalizedHeadline(newAnswers);
        setRecommendedPacks(packs);
        setPersonalizedHeadline(headline);
        setCurrentSection('results');
      }, 3000);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setAnswers(answers.slice(0, -1));
        setIsAnimating(false);
      }, 300);
    } else {
      setCurrentSection('landing');
      setCurrentQuestion(0);
      setAnswers([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] text-white">
      {/* Landing Page */}
      {currentSection === 'landing' && (
        <div className="min-h-screen flex flex-col">
          {/* Hero Section */}
          <div className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#00D9A3]/20 border border-[#D4AF37]/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-medium text-[#D4AF37]">Diagnóstico Científico Personalizado</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-[#D4AF37] to-[#00D9A3] bg-clip-text text-transparent">
                  Tratamentos Capilares
                </span>
                <br />
                <span className="text-white">Personalizados</span>
                <br />
                <span className="text-2xl sm:text-3xl md:text-4xl text-gray-400 font-normal">
                  para o teu tipo de cabelo
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Responde a 9 perguntas e recebe um diagnóstico capilar científico com os melhores tratamentos para{' '}
                <span className="text-[#00D9A3] font-semibold">queda, calvície e enfraquecimento</span>.
              </p>

              {/* CTA Button */}
              <button
                onClick={startQuiz}
                className="group relative inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] rounded-2xl font-bold text-lg text-black hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50"
              >
                <span>Fazer Diagnóstico Capilar Gratuito</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-sm text-gray-500">✓ 100% gratuito · ✓ Resultados em 2 minutos · ✓ Sem compromisso</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-y border-gray-800 bg-black/30 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-sm text-gray-400">Clientes Satisfeitos</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] bg-clip-text text-transparent">
                    87%
                  </div>
                  <div className="text-sm text-gray-400">Redução na Queda</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] bg-clip-text text-transparent">
                    4.9/5
                  </div>
                  <div className="text-sm text-gray-400">Avaliação Média</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] bg-clip-text text-transparent">
                    90 dias
                  </div>
                  <div className="text-sm text-gray-400">Garantia Total</div>
                </div>
              </div>
            </div>
          </div>

          {/* Credibility Section */}
          <div className="border-b border-gray-800 bg-black/30 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Porque Somos Diferentes</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Combinamos ciência avançada com personalização total para resultados reais</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#00D9A3]/20 flex items-center justify-center border border-[#D4AF37]/30">
                    <Zap className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Ciência Avançada</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Fórmulas com ativos clinicamente testados e aprovados por dermatologistas especializados
                  </p>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#00D9A3]/20 flex items-center justify-center border border-[#00D9A3]/30">
                    <TrendingUp className="w-8 h-8 text-[#00D9A3]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Resultados Comprovados</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Até 87% de redução na queda capilar em estudos clínicos controlados com 3 meses de uso
                  </p>
                </div>

                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#00D9A3]/20 flex items-center justify-center border border-[#D4AF37]/30">
                    <Shield className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">100% Personalizado</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Cada tratamento é selecionado especificamente para o teu perfil capilar único
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-gradient-to-b from-black/30 to-black/50 backdrop-blur-sm py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="text-sm font-medium text-[#D4AF37]">Avaliações Verificadas</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">O Que Dizem os Nossos Clientes</h2>
                <p className="text-gray-400">Mais de 50.000 pessoas já transformaram o seu cabelo</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Review 1 */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4 hover:border-[#D4AF37]/50 transition-all duration-300">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#D4AF37]/30" />
                  <p className="text-gray-300 leading-relaxed">
                    "Após 2 meses de uso, a queda reduziu drasticamente. Finalmente encontrei um tratamento que funciona de verdade!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#00D9A3] flex items-center justify-center text-black font-bold">
                      M
                    </div>
                    <div>
                      <div className="font-semibold text-white">Miguel Costa</div>
                      <div className="text-sm text-gray-500">Cliente verificado</div>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4 hover:border-[#D4AF37]/50 transition-all duration-300">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#D4AF37]/30" />
                  <p className="text-gray-300 leading-relaxed">
                    "O diagnóstico personalizado fez toda a diferença. Recebi exatamente o que o meu cabelo precisava. Recomendo!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#00D9A3] flex items-center justify-center text-black font-bold">
                      A
                    </div>
                    <div>
                      <div className="font-semibold text-white">Ana Silva</div>
                      <div className="text-sm text-gray-500">Cliente verificada</div>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 space-y-4 hover:border-[#D4AF37]/50 transition-all duration-300">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#D4AF37]/30" />
                  <p className="text-gray-300 leading-relaxed">
                    "Estava cético no início, mas os resultados são visíveis. O cabelo está mais forte e volumoso. Vale cada cêntimo!"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#00D9A3] flex items-center justify-center text-black font-bold">
                      R
                    </div>
                    <div>
                      <div className="font-semibold text-white">Ricardo Pereira</div>
                      <div className="text-sm text-gray-500">Cliente verificado</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Reviews Indicator */}
              <div className="text-center mt-12">
                <div className="inline-flex items-center gap-2 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>Junta-te a mais de 50.000 clientes satisfeitos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Section */}
          <div className="border-y border-gray-800 bg-black/30 backdrop-blur-sm py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Resultados Reais</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Transformações comprovadas em 90 dias de tratamento personalizado</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-[#00D9A3]/50 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Play className="w-16 h-16 text-[#00D9A3] mx-auto" />
                      <p className="text-gray-400">Antes: Queda intensa</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">João, 34 anos</span>
                      <span className="px-3 py-1 bg-[#00D9A3]/20 text-[#00D9A3] text-xs rounded-full">90 dias</span>
                    </div>
                    <p className="text-gray-400 text-sm">Reduziu 82% da queda com o Pack Intensivo</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-[#00D9A3]/50 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Play className="w-16 h-16 text-[#00D9A3] mx-auto" />
                      <p className="text-gray-400">Antes: Cabelo fino e fraco</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">Sofia, 29 anos</span>
                      <span className="px-3 py-1 bg-[#00D9A3]/20 text-[#00D9A3] text-xs rounded-full">60 dias</span>
                    </div>
                    <p className="text-gray-400 text-sm">Cabelo mais forte e volumoso com o Pack Fortalecimento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-black/50 backdrop-blur-sm py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Award className="w-10 h-10 text-[#D4AF37]" />
                  <p className="text-sm text-gray-400">Aprovado por Dermatologistas</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <Shield className="w-10 h-10 text-[#00D9A3]" />
                  <p className="text-sm text-gray-400">Garantia de 90 Dias</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <Heart className="w-10 h-10 text-[#D4AF37]" />
                  <p className="text-sm text-gray-400">Ingredientes Naturais</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <Sparkles className="w-10 h-10 text-[#00D9A3]" />
                  <p className="text-sm text-gray-400">Testado Clinicamente</p>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-[#D4AF37]/10 via-[#00D9A3]/10 to-transparent border-t border-gray-800 py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Pronto para Transformar o Teu Cabelo?
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Faz o diagnóstico gratuito agora e descobre qual o tratamento ideal para ti
              </p>
              <button
                onClick={startQuiz}
                className="group inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] rounded-2xl font-bold text-lg text-black hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#D4AF37]/30"
              >
                <span>Começar Diagnóstico Gratuito</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-gray-500">Sem cartão de crédito · Resultados instantâneos</p>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {currentSection === 'quiz' && (
        <div className="min-h-screen flex flex-col">
          {/* Progress Bar */}
          <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={goBack}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  ← Voltar
                </button>
                <span className="text-sm font-medium text-gray-400">
                  Pergunta {currentQuestion + 1} de {quizQuestions.length}
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className={`max-w-2xl w-full space-y-8 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <div className="text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {quizQuestions[currentQuestion].question}
                </h2>
                <p className="text-gray-400">Seleciona a opção que melhor se aplica a ti</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {quizQuestions[currentQuestion].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.id, option.value)}
                    className="group relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 rounded-2xl text-left hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-white group-hover:text-[#D4AF37] transition-colors">
                        {option.label}
                      </span>
                      <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analyzing Section */}
      {currentSection === 'analyzing' && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-8 animate-pulse-slow">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] opacity-20 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] opacity-40 blur-xl" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-black animate-spin-slow" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-[#D4AF37] to-[#00D9A3] bg-clip-text text-transparent">
                A analisar o teu perfil capilar
              </h2>
              <div className="space-y-2 text-gray-400 text-lg">
                <p className="animate-fade-in-delay-1">A processar as tuas respostas...</p>
                <p className="animate-fade-in-delay-2">A cruzar dados científicos...</p>
                <p className="animate-fade-in-delay-3">A selecionar os melhores tratamentos para ti...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {currentSection === 'results' && (
        <div className="min-h-screen py-12 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#00D9A3]/20 border border-[#D4AF37]/30">
                <Check className="w-5 h-5 text-[#00D9A3]" />
                <span className="text-sm font-medium text-[#00D9A3]">Diagnóstico Completo</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
                {personalizedHeadline}
              </h1>

              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Baseado nas tuas respostas, selecionámos os tratamentos mais eficazes para o teu perfil capilar
              </p>
            </div>

            {/* Packs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {recommendedPacks.map((pack, index) => (
                <div
                  key={pack.id}
                  className={`group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:scale-[1.02] animate-fade-in-up ${
                    pack.recommended
                      ? 'border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/30'
                      : 'border-gray-700 hover:border-[#00D9A3]'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Recommended Badge */}
                  {pack.recommended && (
                    <div className="absolute top-6 right-6 z-10 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] rounded-full flex items-center gap-2 shadow-lg">
                      <Star className="w-4 h-4 text-black fill-black" />
                      <span className="text-sm font-bold text-black">Recomendado</span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pack.image}
                      alt={pack.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">{pack.name}</h3>
                      <p className="text-[#D4AF37] font-medium">{pack.tagline}</p>
                      <p className="text-gray-400 leading-relaxed">{pack.description}</p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Benefícios</h4>
                      <ul className="space-y-2">
                        {pack.benefits.slice(0, 4).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <Check className="w-5 h-5 text-[#00D9A3] flex-shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal For */}
                    <div className="space-y-3 pt-4 border-t border-gray-700">
                      <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Ideal Para</h4>
                      <div className="flex flex-wrap gap-2">
                        {pack.idealFor.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-6 space-y-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-white">{pack.price.toFixed(2)}€</span>
                        {pack.originalPrice && (
                          <span className="text-xl text-gray-500 line-through">{pack.originalPrice.toFixed(2)}€</span>
                        )}
                      </div>

                      <button
                        onClick={() => window.open(pack.shopifyUrl, '_blank')}
                        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl ${
                          pack.recommended
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#00D9A3] text-black hover:shadow-[#D4AF37]/50'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Comprar Este Pack</span>
                      </button>

                      <p className="text-center text-xs text-gray-500">{pack.results}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="text-center space-y-6 pt-12 animate-fade-in">
              <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-3xl">
                <h3 className="text-2xl font-bold text-white mb-4">Ainda tens dúvidas?</h3>
                <p className="text-gray-400 mb-6">
                  Todos os nossos packs são desenvolvidos com base em estudos científicos e aprovados por dermatologistas
                </p>
                <button
                  onClick={() => {
                    setCurrentSection('landing');
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setRecommendedPacks([]);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all"
                >
                  ← Refazer Diagnóstico
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
