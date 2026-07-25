import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus, Trophy, Target, MessageSquare, TrendingUp,
  Activity, ArrowRight, Clock, Award, ChevronRight,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import LineChart from '../components/LineChart';

const stats = [
  { label: 'Total Interviews', value: '0', icon: Target, color: 'from-brand-500 to-violetx-600' },
  { label: 'Average Score', value: '0%', icon: Trophy, color: 'from-cyanx-500 to-brand-500' },
  { label: 'Highest Score', value: '0%', icon: Award, color: 'from-amber-500 to-orange-500' },
  { label: 'Hours Practiced', value: '0h', icon: Clock, color: 'from-emerald-500 to-cyanx-500' },
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [interviewHistory, setInterviewHistory] = useState<any[]>([]);
  const [skillProgress, setSkillProgress] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

useEffect(() => {
  async function loadData() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    setUser(user);

    const { data: interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && interviews) {
      setInterviewHistory(interviews);
    }
  }

  loadData();
}, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="section-label">Dashboard</span>
            <h1 className="mt-2 font-display text-3xl font-bold text-white">
              Welcome back, <span className="gradient-text">{user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"}</span> 👋
            </h1>
            <p className="mt-2 text-slate-400">Ready to crush your next interview?</p>
          </div>
          <Link to="/setup" className="btn-primary">
            <Plus className="h-4 w-4" />
            Start New Interview
          </Link>
        </motion.div>

        {/* Profile card + stats */}
        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {/* Profile card */}
          <GlassCard delay={0.1} className="p-6 lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-brand-gradient blur-xl opacity-50" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 text-3xl font-bold text-white ring-2 ring-white/20">
  {(user?.user_metadata?.full_name || user?.email || "U")
    .charAt(0)
    .toUpperCase()}
</div>
                <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-emerald-400 ring-2 ring-ink-900" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
  {user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "User"}
</h3>
              <p className="text-sm text-slate-400">{user?.email}</p>
              <div className="chip mt-3">
                <Trophy className="h-3 w-3 text-amber-400" />
                Pro Member
              </div>
            </div>
            <div className="mt-6 space-y-3 border-t border-white/5 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Member since</span>
                <span className="text-white">Jun 2026</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Streak</span>
                <span className="text-white">12 days 🔥</span>
              </div>
              <Link to="/profile" className="flex items-center justify-between text-sm text-brand-300 hover:text-brand-200">
                View profile <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-3 lg:grid-cols-4">
            {stats.map((s, i) => (
              <GlassCard key={s.label} delay={0.15 + i * 0.08} hover className="p-5">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} shadow-glow`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4 font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* AI Feedback Summary */}
        <GlassCard delay={0.3} className="mt-6 p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violetx-500 to-brand-600 shadow-glow">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">AI Feedback Summary</h3>
              <p className="text-sm text-slate-400">
No interviews completed yet
</p>
            </div>
          </div>
          <p className="mt-4 text-slate-400">
  Complete your first interview to receive AI feedback.
</p>
        </GlassCard>

        {/* Performance chart + skill progress */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard delay={0.35} className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-cyanx-500 shadow-glow">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">Performance Trend</h3>
                  <p className="text-sm text-slate-400">Score over last 7 months</p>
                </div>
              </div>
              <span className="chip text-emerald-300">No data</span>
            </div>
            {performanceData.length === 0 ? (
  <p className="text-center text-slate-400 py-10">
    No performance data available.
  </p>
) : (
  <LineChart data={performanceData} />
)}
          </GlassCard>

          <GlassCard delay={0.4} className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violetx-500 to-pink-500 shadow-glow">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">Skill Progress</h3>
                <p className="text-sm text-slate-400">Your strongest areas</p>
              </div>
            </div>
            <div className="space-y-4">
  {skillProgress.length === 0 ? (
    <p className="text-slate-400 text-center">
      No skill data yet.
    </p>
  ) : (
    skillProgress.map((s, i) => (
      <ProgressBar
        key={s.skill}
        label={s.skill}
        value={s.level}
        delay={i * 0.1}
      />
    ))
  )}
</div>
          </GlassCard>
        </div>

        {/* Recent activity + Interview history */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Recent activity */}
          <GlassCard delay={0.45} className="p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyanx-500 to-emerald-500 shadow-glow">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="space-y-3">
  {recentActivity.length === 0 ? (
    <p className="text-slate-400 text-center">
      No recent activity.
    </p>
  ) : (
    recentActivity.map((a, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/5"
      >
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg glass">
          {a.score ? (
            <Trophy className="h-4 w-4 text-amber-400" />
          ) : (
            <Award className="h-4 w-4 text-violetx-400" />
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm text-white">{a.action}</p>
          <p className="text-xs text-slate-500">{a.time}</p>
        </div>

        {a.score && (
          <span className="text-sm font-bold text-brand-300">
            {a.score}%
          </span>
        )}
      </motion.div>
    ))
  )}
</div>
          </GlassCard>

          {/* Interview history */}
          <GlassCard delay={0.5} className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violetx-600 shadow-glow">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">Interview History</h3>
              </div>
              <Link to="/result" className="text-sm text-brand-300 hover:text-brand-200">
                View all
              </Link>
            </div>
            <div className="space-y-3">
  {interviewHistory.length === 0 ? (
    <p className="text-slate-400 text-center">
      No interviews completed yet.
    </p>
  ) : (
    interviewHistory.slice(0, 4).map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
      >
        <Link
          to="/result"
          className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all hover:bg-white/5 hover:border-white/10"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500/20 to-violetx-500/20">
            <span className="text-xs font-bold text-brand-300">
              {item.interview_type?.slice(0, 2) || "--"}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {item.interview_type} · {item.difficulty}
            </p>

            <p className="text-xs text-slate-500">
              {new Date(item.created_at).toLocaleDateString()} · {item.duration}
            </p>
          </div>

          <div className="text-right">
            <span
              className={`text-sm font-bold ${
                item.score >= 85
                  ? "text-emerald-400"
                  : item.score >= 70
                  ? "text-amber-400"
                  : "text-rose-400"
              }`}
            >
              {item.score}%
            </span>

            <ArrowRight className="ml-1 inline h-3.5 w-3.5 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-300" />
          </div>
        </Link>
      </motion.div>
    ))
  )}
</div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
