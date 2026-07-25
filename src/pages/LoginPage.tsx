import { supabase } from "../lib/supabase";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brain, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';

const benefits = [
  'Unlimited AI mock interviews',
  'Real-time feedback & scoring',
  'Performance analytics dashboard',
  'Personalized learning resources',
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [fullName, setFullName] = useState("");
const [loading, setLoading] = useState(false);

const handleAuth = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Account created successfully! Please check your email.");
        setMode("login");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        navigate("/dashboard");
      }
    }
  } catch (err) {
    alert("Something went wrong.");
  }

  setLoading(false);
};

  return (
    <div className="relative min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand panel */}
      <div className="relative hidden overflow-hidden lg:flex flex-col justify-between p-12">
        <div className="absolute inset-0 bg-grid-glow [background-size:40px_40px] opacity-20" />
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violetx-500/30 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient shadow-glow">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              InterviewIQ <span className="gradient-text">AI</span>
            </span>
          </Link>
        </div>

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold leading-tight text-white"
          >
            Your AI interview coach,<br />
            <span className="gradient-text">available 24/7</span>
          </motion.h2>
          <p className="mt-4 max-w-md text-slate-400">
            Join thousands of engineers who landed their dream jobs with InterviewIQ AI.
          </p>
          <div className="mt-8 space-y-3">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-brand-500/20">
                  <Check className="h-3.5 w-3.5 text-brand-300" />
                </div>
                <span className="text-sm text-slate-300">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative text-sm text-slate-500">
          © {new Date().getFullYear()} InterviewIQ AI. All rights reserved.
        </div>
      </div>

      {/* Right: Form */}
      <div className="relative flex items-center justify-center p-6 sm:p-12">
        {/* Animated background blobs */}
        <div className="absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-cyanx-500/15 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong relative w-full max-w-md p-8 sm:p-10"
        >
          {/* Mobile logo */}
          <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient shadow-glow">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              InterviewIQ <span className="gradient-text">AI</span>
            </span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === 'login'
              ? 'Sign in to continue your interview prep journey.'
              : 'Start practicing interviews with AI today.'}
          </p>

          {/* Google sign-in */}
          <button
            onClick={async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/dashboard",
    },
  });

  if (error) {
    alert(error.message);
  }
}}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl glass glass-hover px-4 py-3 text-sm font-medium text-white"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form
            onSubmit={handleAuth}
            className="space-y-4"
          >
            {mode === 'signup' && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
className="input-field pl-11"
placeholder="John Doe"
value={fullName}
onChange={(e) => setFullName(e.target.value)}
/>
                </div>
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
   <input
type="email"
className="input-field pl-11"
placeholder="you@example.com"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
type="password"
className="input-field pl-11"
placeholder="••••••••"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-400">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5" />
                  Remember me
                </label>
                <a href="#" className="text-brand-300 hover:text-brand-200">Forgot password?</a>
              </div>
            )}

            <button
  type="submit"
  disabled={loading}
  className="btn-primary w-full"
>
              {loading
  ? "Please wait..."
  : mode === "login"
  ? "Sign In"
  : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="font-semibold text-brand-300 hover:text-brand-200"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}