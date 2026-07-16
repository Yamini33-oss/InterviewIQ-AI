import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-glow [background-size:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/3 h-56 w-56 rounded-full bg-violetx-500/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <h1 className="font-display text-[8rem] font-bold leading-none gradient-text sm:text-[12rem]">
              404
            </h1>
            <div className="absolute inset-0 grid place-items-center">
              <Search className="h-24 w-24 text-white/5 sm:h-40 sm:w-40" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-2xl font-bold text-white">
            Page not found
          </h2>
          <p className="mx-auto mt-3 max-w-md text-slate-400">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              <Home className="h-4 w-4" />
              Back Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-ghost"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
