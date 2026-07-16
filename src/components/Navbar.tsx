import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/#features' },
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname === to.replace('/#', '/');

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="mt-3 flex items-center justify-between rounded-2xl glass px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient shadow-glow"
            >
              <Brain className="h-5 w-5 text-white" />
            </motion.div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              InterviewIQ <span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(l.to) ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive(l.to) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/10 border border-white/10"
                  />
                )}
                {l.label}
              </Link>
            ))}
            <Link to="/login" className="btn-primary ml-3 px-5 py-2 text-sm">
              Login
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-lg glass glass-hover"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 rounded-2xl glass p-3"
          >
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </header>
  );
}
