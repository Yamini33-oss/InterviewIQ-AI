import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail, Calendar, Trophy, Target, Award, Settings,
  Camera, Bell, Globe, Shield, Check, Pencil,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import { badges, skillProgress } from '../data/mockData';

const stats = [
  { label: 'Interviews Completed', value: '6', icon: Target, color: 'from-brand-500 to-violetx-600' },
  { label: 'Highest Score', value: '91%', icon: Trophy, color: 'from-amber-500 to-orange-500' },
  { label: 'Average Score', value: '79%', icon: Award, color: 'from-cyanx-500 to-brand-500' },
];

const settings = [
  { icon: Bell, label: 'Notifications', desc: 'Email & push alerts', toggle: true },
  { icon: Globe, label: 'Language', desc: 'English (US)', toggle: false },
  { icon: Shield, label: 'Privacy', desc: 'Profile visibility', toggle: true },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="section-label">Profile</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">
            Your <span className="gradient-text">profile</span>
          </h1>
        </motion.div>

        {/* Profile header card */}
        <GlassCard delay={0.1} className="mt-8 overflow-hidden p-8">
          <div className="absolute -top-20 right-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-brand-gradient blur-xl opacity-50" />
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
                alt="Alex Morgan"
                className="relative h-28 w-28 rounded-full object-cover ring-2 ring-white/20"
              />
              <button className="absolute bottom-1 right-1 grid h-9 w-9 place-items-center rounded-full glass-strong text-white transition-transform hover:scale-110">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <h2 className="font-display text-2xl font-bold text-white">Alex Morgan</h2>
                <button className="grid h-8 w-8 place-items-center rounded-lg glass text-slate-300 hover:text-white">
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 sm:justify-start">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> alex.morgan@example.com
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Joined Jun 2026
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="chip text-amber-300">
                  <Trophy className="h-3 w-3" /> Pro Member
                </span>
                <span className="chip text-emerald-300">
                  <Check className="h-3 w-3" /> Verified
                </span>
                <span className="chip text-brand-300">
                  <Award className="h-3 w-3" /> Top 10%
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s, i) => (
            <GlassCard key={s.label} delay={0.15 + i * 0.08} hover className="flex items-center gap-4 p-5">
              <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.color} shadow-glow`}>
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Badges */}
        <GlassCard delay={0.3} className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-glow">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Badges</h3>
              <p className="text-sm text-slate-400">{badges.filter(b => b.earned).length} of {badges.length} earned</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {badges.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`flex flex-col items-center rounded-xl border p-4 text-center transition-all ${
                  b.earned
                    ? 'border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10'
                    : 'border-white/5 bg-white/[0.02] opacity-50'
                }`}
              >
                <div className={`text-3xl ${b.earned ? '' : 'grayscale'}`}>{b.icon}</div>
                <span className="mt-2 text-xs font-medium text-white">{b.name}</span>
                {b.earned ? (
                  <span className="mt-1 text-[10px] text-emerald-400">Earned</span>
                ) : (
                  <span className="mt-1 text-[10px] text-slate-500">Locked</span>
                )}
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Skill progress */}
        <GlassCard delay={0.35} className="mt-6 p-6">
          <h3 className="font-display text-lg font-semibold text-white">Skill Progress</h3>
          <p className="text-sm text-slate-400">Your proficiency across interview topics</p>
          <div className="mt-5 space-y-4">
            {skillProgress.map((s, i) => (
              <ProgressBar
                key={s.skill}
                label={s.skill}
                value={s.level}
                delay={i * 0.08}
                color={
                  s.level >= 85
                    ? 'from-emerald-500 to-cyanx-500'
                    : s.level >= 75
                    ? 'from-brand-500 to-violetx-500'
                    : 'from-amber-500 to-rose-500'
                }
              />
            ))}
          </div>
        </GlassCard>

        {/* Settings */}
        <GlassCard delay={0.4} className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 shadow-glow">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white">Settings</h3>
          </div>
          <div className="mt-5 space-y-3">
            {settings.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg glass">
                    <s.icon className="h-4 w-4 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.desc}</p>
                  </div>
                </div>
                <button
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    s.toggle ? 'bg-brand-500' : 'bg-white/10'
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${
                      s.toggle ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Back */}
        <div className="mt-8 flex justify-center">
          <Link to="/dashboard" className="btn-ghost">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
