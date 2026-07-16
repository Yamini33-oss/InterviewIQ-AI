import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download, RotateCcw, LayoutDashboard, TrendingUp, TrendingDown,
  CheckCircle2, AlertTriangle, Lightbulb, BookOpen, Award, Star,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import RadarChart from '../components/RadarChart';
import ProgressBar from '../components/ProgressBar';
import { resultData } from '../data/mockData';

const scoreCards = [
  { label: 'Technical', value: resultData.scores.technical, icon: TrendingUp, color: 'from-brand-500 to-violetx-600' },
  { label: 'Communication', value: resultData.scores.communication, icon: Star, color: 'from-cyanx-500 to-brand-500' },
  { label: 'Confidence', value: resultData.scores.confidence, icon: Award, color: 'from-amber-500 to-orange-500' },
  { label: 'Problem Solving', value: resultData.scores.problemSolving, icon: Lightbulb, color: 'from-emerald-500 to-cyanx-500' },
];

const radarData = [
  { label: 'Technical', value: resultData.scores.technical },
  { label: 'Communication', value: resultData.scores.communication },
  { label: 'Confidence', value: resultData.scores.confidence },
  { label: 'Problem Solving', value: resultData.scores.problemSolving },
  { label: 'Clarity', value: 79 },
  { label: 'Depth', value: 83 },
];

export default function ResultPage() {
  const scoreColor = (v: number) =>
    v >= 85 ? 'text-emerald-400' : v >= 70 ? 'text-amber-400' : 'text-rose-400';

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="section-label">Interview Results</span>
          <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Your <span className="gradient-text">performance report</span>
          </h1>
          <p className="mt-4 text-slate-400">
            React · Intermediate · Completed on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Overall score */}
        <GlassCard delay={0.1} className="mt-10 overflow-hidden p-8">
          <div className="absolute -top-20 right-0 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm text-slate-400">Overall Score</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-display text-6xl font-bold gradient-text">{resultData.overall}</span>
                <span className="mb-2 text-2xl text-slate-500">/100</span>
              </div>
              <p className="mt-2 text-sm text-emerald-400">+8% from last interview</p>
            </div>
            <div className="flex gap-3">
              <Link to="/setup" className="btn-ghost px-5 py-2.5 text-sm">
                <RotateCcw className="h-4 w-4" />
                Retake
              </Link>
              <Link to="/dashboard" className="btn-ghost px-5 py-2.5 text-sm">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button className="btn-primary px-5 py-2.5 text-sm">
                <Download className="h-4 w-4" />
                Download Report
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Score cards */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {scoreCards.map((s, i) => (
            <GlassCard key={s.label} delay={0.15 + i * 0.08} hover className="p-5">
              <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} shadow-glow`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-xs text-slate-400">{s.label}</span>
                <span className={`font-display text-2xl font-bold ${scoreColor(s.value)}`}>{s.value}</span>
              </div>
              <div className="mt-3">
                <ProgressBar value={s.value} delay={i * 0.1} color={
                  s.value >= 85 ? 'from-emerald-500 to-cyanx-500' :
                  s.value >= 70 ? 'from-brand-500 to-violetx-500' :
                  'from-amber-500 to-rose-500'
                } />
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Radar chart + progress bars */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard delay={0.3} className="p-6">
            <h3 className="mb-2 font-display text-lg font-semibold text-white">Skill Breakdown</h3>
            <p className="mb-4 text-sm text-slate-400">Radar view of your performance across dimensions</p>
            <RadarChart data={radarData} />
          </GlassCard>

          <GlassCard delay={0.35} className="p-6">
            <h3 className="mb-2 font-display text-lg font-semibold text-white">Score Breakdown</h3>
            <p className="mb-6 text-sm text-slate-400">Detailed score per evaluation dimension</p>
            <div className="space-y-5">
              {scoreCards.map((s, i) => (
                <ProgressBar
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  delay={i * 0.1}
                  color={
                    s.value >= 85 ? 'from-emerald-500 to-cyanx-500' :
                    s.value >= 70 ? 'from-brand-500 to-violetx-500' :
                    'from-amber-500 to-rose-500'
                  }
                />
              ))}
              <ProgressBar
                label="Clarity"
                value={79}
                delay={0.4}
                color="from-brand-500 to-cyanx-500"
              />
              <ProgressBar
                label="Depth"
                value={83}
                delay={0.45}
                color="from-violetx-500 to-brand-500"
              />
            </div>
          </GlassCard>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard delay={0.4} className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyanx-500 shadow-glow">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">Strengths</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {resultData.strengths.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3"
                >
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-sm text-slate-300">{s}</span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard delay={0.45} className="p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-glow">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">Weaknesses</h3>
            </div>
            <ul className="mt-5 space-y-3">
              {resultData.weaknesses.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-xl border border-rose-500/10 bg-rose-500/5 p-3"
                >
                  <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  <span className="text-sm text-slate-300">{s}</span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </div>

        {/* AI Suggestions */}
        <GlassCard delay={0.5} className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violetx-500 to-brand-600 shadow-glow">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">AI Suggestions</h3>
              <p className="text-sm text-slate-400">Personalized recommendations to improve</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {resultData.suggestions.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/5"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violetx-500/20 text-xs font-bold text-violetx-300">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-300">{s}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Learning resources */}
        <GlassCard delay={0.55} className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyanx-500 to-emerald-500 shadow-glow">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Recommended Learning Resources</h3>
              <p className="text-sm text-slate-400">Curated based on your performance gaps</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {resultData.resources.map((r, i) => (
              <motion.a
                key={i}
                href={r.url}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/5"
              >
                <div>
                  <p className="text-sm font-medium text-white">{r.title}</p>
                  <p className="text-xs text-slate-500">{r.type}</p>
                </div>
                <span className="chip text-brand-300 transition-transform group-hover:translate-x-1">
                  Open
                </span>
              </motion.a>
            ))}
          </div>
        </GlassCard>

        {/* Bottom actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/setup" className="btn-primary">
            <RotateCcw className="h-4 w-4" />
            Retake Interview
          </Link>
          <Link to="/dashboard" className="btn-ghost">
            <LayoutDashboard className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
