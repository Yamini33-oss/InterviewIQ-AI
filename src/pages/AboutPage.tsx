import { motion } from 'framer-motion';
import {
  Brain, Eye, Cpu, Code2, Atom, Server, Database, BarChart3,
  Sparkles, ShieldCheck, Zap, Layers,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlassCard from '../components/GlassCard';

const sections = [
  {
    icon: Brain,
    title: 'What is InterviewIQ AI?',
    desc: 'InterviewIQ AI is an AI-powered interview coaching platform that helps you practice technical and HR interviews in a realistic, low-pressure environment. Our AI interviewer adapts to your skill level, asks follow-up questions like a real interviewer, and provides instant, detailed feedback on every answer.',
    points: ['7 interview types', 'Adaptive difficulty', 'Instant scoring', 'Personalized insights'],
  },
  {
    icon: Cpu,
    title: 'How AI Evaluates Answers',
    desc: 'Our evaluation engine analyzes your answers across multiple dimensions: technical accuracy, clarity of explanation, problem-solving approach, communication effectiveness, and confidence. Each dimension is scored independently, then combined into an overall score with actionable feedback.',
    points: ['Technical accuracy', 'Communication clarity', 'Problem decomposition', 'Confidence & depth'],
  },
  {
    icon: Eye,
    title: 'Why Observability Matters',
    desc: 'Just like in software engineering, observability in interview prep means understanding not just the outcome, but the process. We give you full visibility into your performance — where you struggle, where you excel, and how you improve over time. This transparency turns guesswork into a data-driven improvement loop.',
    points: ['Full performance visibility', 'Trend tracking over time', 'Skill-level breakdowns', 'Data-driven improvement'],
  },
  {
    icon: Layers,
    title: 'Technologies Used',
    desc: 'InterviewIQ AI is built with a modern, performant tech stack designed for speed, scalability, and developer experience.',
    points: ['React + TypeScript', 'Vite build tool', 'Tailwind CSS', 'Framer Motion'],
  },
];

const techStack = [
  { icon: Atom, name: 'React', color: 'from-cyan-500 to-sky-500' },
  { icon: Code2, name: 'TypeScript', color: 'from-blue-500 to-indigo-500' },
  { icon: Zap, name: 'Vite', color: 'from-amber-500 to-yellow-500' },
  { icon: BarChart3, name: 'Tailwind CSS', color: 'from-teal-500 to-cyan-500' },
  { icon: Sparkles, name: 'Framer Motion', color: 'from-violet-500 to-purple-500' },
  { icon: Server, name: 'Node.js', color: 'from-green-500 to-emerald-600' },
  { icon: Database, name: 'Supabase', color: 'from-emerald-500 to-teal-500' },
  { icon: ShieldCheck, name: 'Lucide Icons', color: 'from-brand-500 to-violetx-600' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-16 sm:px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="section-label">About</span>
          <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
            Built to make you{' '}
            <span className="gradient-text">interview-ready</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400 leading-relaxed">
            InterviewIQ AI combines cutting-edge AI with proven interview methodology to give you
            the most realistic, effective interview practice available.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="mt-16 space-y-6">
          {sections.map((s, i) => (
            <GlassCard key={s.title} delay={i * 0.1} hover className="p-7 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="sm:w-16 sm:shrink-0">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient shadow-glow">
                    <s.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-semibold text-white">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <span key={p} className="chip">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display text-2xl font-bold text-white"
          >
            Powered by <span className="gradient-text">modern tech</span>
          </motion.h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {techStack.map((t, i) => (
              <GlassCard key={t.name} delay={i * 0.06} hover className="flex flex-col items-center p-6 text-center">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${t.color} shadow-glow`}>
                  <t.icon className="h-6 w-6 text-white" />
                </div>
                <span className="mt-3 text-sm font-medium text-white">{t.name}</span>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <GlassCard delay={0.3} className="mt-16 p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-white">
            Ready to start practicing?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-400">
            Join thousands of engineers who are landing their dream jobs with InterviewIQ AI.
          </p>
          <a href="/setup" className="btn-primary mt-6">
            <Sparkles className="h-4 w-4" />
            Start Your First Interview
          </a>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
}
