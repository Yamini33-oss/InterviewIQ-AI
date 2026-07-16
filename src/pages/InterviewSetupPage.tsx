import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check, Mic, Type, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import { interviewTypes, difficulties, type InterviewType, type Difficulty } from '../data/mockData';

export default function InterviewSetupPage() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<InterviewType>('React');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Intermediate');
  const [numQuestions, setNumQuestions] = useState(5);
  const [mode, setMode] = useState<'Text' | 'Voice'>('Text');

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="section-label">Interview Setup</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Configure your <span className="gradient-text">mock interview</span>
          </h1>
          <p className="mt-4 text-slate-400">
            Pick your topic, difficulty, and length. The AI will tailor questions to your selections.
          </p>
        </motion.div>

        {/* Interview Type */}
        <div className="mt-12">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">
            1. Choose Interview Type
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {interviewTypes.map((t, i) => {
              const active = selectedType === t.type;
              return (
                <motion.button
                  key={t.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedType(t.type)}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? 'border-brand-400/50 bg-white/[0.07] shadow-glow'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  {active && (
                    <div className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-brand-500">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${t.color} shadow-lg transition-transform group-hover:scale-110`}>
                    <t.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-white">{t.type}</h3>
                  <p className="mt-1 text-xs text-slate-400">{t.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Difficulty */}
        <div className="mt-10">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">
            2. Select Difficulty
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {difficulties.map((d, i) => {
              const active = selectedDifficulty === d.level;
              return (
                <motion.button
                  key={d.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setSelectedDifficulty(d.level)}
                  className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? 'border-brand-400/50 bg-white/[0.07] shadow-glow'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  {active && (
                    <div className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-brand-500">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${d.color}`} />
                  <h3 className="mt-3 font-display text-base font-semibold text-white">{d.level}</h3>
                  <p className="mt-1 text-xs text-slate-400">{d.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Number of Questions */}
        <div className="mt-10">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">
            3. Number of Questions
          </h2>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Questions per interview</span>
              <span className="font-display text-2xl font-bold gradient-text">{numQuestions}</span>
            </div>
            <input
              type="range"
              min={3}
              max={10}
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="mt-4 w-full accent-brand-500"
            />
            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>3</span>
              <span>10</span>
            </div>
            <div className="mt-4 flex gap-2">
              {[3, 5, 7, 10].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumQuestions(n)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    numQuestions === n
                      ? 'bg-brand-500 text-white shadow-glow'
                      : 'glass text-slate-300 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Interview Mode */}
        <div className="mt-10">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">
            4. Interview Mode
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => setMode('Text')}
              className={`relative overflow-hidden rounded-2xl border p-6 text-left transition-all ${
                mode === 'Text'
                  ? 'border-brand-400/50 bg-white/[0.07] shadow-glow'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20'
              }`}
            >
              {mode === 'Text' && (
                <div className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-brand-500">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
              )}
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violetx-600 shadow-glow">
                <Type className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-white">Text Mode</h3>
              <p className="mt-1 text-sm text-slate-400">Type your answers. Best for focused practice.</p>
            </button>

            <button
              disabled
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left opacity-60"
            >
              <div className="absolute right-4 top-4">
                <span className="chip text-amber-300">Coming Soon</span>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-700">
                <Mic className="h-6 w-6 text-slate-300" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-white">Voice Mode</h3>
              <p className="mt-1 text-sm text-slate-400">Speak naturally. Simulates real interviews.</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <Lock className="h-3 w-3" /> In development
              </div>
            </button>
          </div>
        </div>

        {/* Summary + Start */}
        <GlassCard delay={0.3} className="mt-10 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip">{selectedType}</span>
              <span className="chip">{selectedDifficulty}</span>
              <span className="chip">{numQuestions} Questions</span>
              <span className="chip">{mode} Mode</span>
            </div>
            <button
              onClick={() => navigate('/interview', { state: { type: selectedType, difficulty: selectedDifficulty, numQuestions, mode } })}
              className="btn-primary w-full sm:w-auto"
            >
              Start Interview
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
