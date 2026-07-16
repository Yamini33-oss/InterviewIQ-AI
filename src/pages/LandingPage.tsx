import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bot, Gauge, BarChart3, History, Lightbulb, TrendingUp,
  Star, ArrowRight, Sparkles, ShieldCheck, Clock, Target,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';
import AIIllustration from '../components/AIIllustration';
import { testimonials } from '../data/mockData';

const features = [
  { icon: Bot, title: 'AI Interview', desc: 'Realistic mock interviews powered by AI that adapts to your skill level in real time.', color: 'from-brand-500 to-violetx-600' },
  { icon: Gauge, title: 'Instant Feedback', desc: 'Get immediate, detailed feedback on every answer with actionable improvement tips.', color: 'from-cyanx-500 to-brand-500' },
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Track your progress with comprehensive charts and performance metrics over time.', color: 'from-violetx-500 to-pink-500' },
  { icon: History, title: 'Interview History', desc: 'Review past interviews, compare answers, and see how far you have come.', color: 'from-emerald-500 to-cyanx-500' },
  { icon: Lightbulb, title: 'AI Insights', desc: 'Personalized recommendations that target your weak areas and accelerate growth.', color: 'from-amber-500 to-orange-500' },
  { icon: TrendingUp, title: 'Progress Tracking', desc: 'Visualize skill development across topics with detailed progress indicators.', color: 'from-rose-500 to-violetx-500' },
];

const stats = [
  { value: '50K+', label: 'Mock Interviews' },
  { value: '12K+', label: 'Active Learners' },
  { value: '94%', label: 'Success Rate' },
  { value: '7', label: 'Interview Types' },
];

const trustFeatures = [
  { icon: ShieldCheck, text: 'Privacy-first — your answers stay yours' },
  { icon: Clock, text: 'Practice anytime, on your schedule' },
  { icon: Target, text: 'Targeted prep for your dream role' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-glow [background-size:40px_40px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="chip mb-6">
                <Sparkles className="h-3.5 w-3.5 text-cyanx-400" />
                <span>AI-Powered Interview Coaching</span>
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight text-white text-balance sm:text-5xl lg:text-6xl">
                Master Your Interviews with{' '}
                <span className="gradient-text">AI</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
                Practice technical and HR interviews with real-time AI feedback, scoring,
                and performance analytics.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/setup" className="btn-primary">
                  Start Interview
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/about" className="btn-ghost">
                  Learn More
                </Link>
              </div>

              <div className="mt-10 space-y-3">
                {trustFeatures.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-slate-400"
                  >
                    <div className="grid h-8 w-8 place-items-center rounded-lg glass">
                      <f.icon className="h-4 w-4 text-brand-300" />
                    </div>
                    {f.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <AIIllustration />
            </motion.div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <GlassCard key={s.label} delay={i * 0.1} className="p-6 text-center" hover>
                <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
                <div className="mt-1 text-sm text-slate-400">{s.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Features</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Everything you need to{' '}
              <span className="gradient-text">ace your interview</span>
            </h2>
            <p className="mt-4 text-slate-400">
              From your first mock interview to your final offer, InterviewIQ AI covers every step.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.08} hover className="group p-7">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} shadow-glow transition-transform duration-300 group-hover:scale-110`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Testimonials</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Loved by job seekers{' '}
              <span className="gradient-text">worldwide</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <GlassCard key={t.name} delay={i * 0.1} hover className="p-7">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <GlassCard className="relative overflow-hidden p-10 text-center sm:p-16">
            <div className="absolute inset-0 bg-brand-gradient opacity-10" />
            <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-500/30 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Ready to land your dream job?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Start your first AI-powered mock interview today. No credit card required.
              </p>
              <Link to="/setup" className="btn-primary mt-8">
                Start Interview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </div>
  );
}
