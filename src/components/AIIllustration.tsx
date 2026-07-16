import { motion } from 'framer-motion';
import { Brain, Sparkles, Cpu, Zap } from 'lucide-react';

export default function AIIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-3xl animate-pulse-slow" />
      <div className="absolute inset-8 rounded-full bg-violetx-500/20 blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-16 rounded-full bg-cyanx-500/20 blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full border border-dashed border-white/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-12 rounded-full border border-dashed border-white/[0.07]"
      />

      {/* Orbiting icons */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 grid h-12 w-12 place-items-center rounded-xl glass">
          <Sparkles className="h-5 w-5 text-cyanx-400" />
        </div>
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-xl glass">
          <Cpu className="h-5 w-5 text-violetx-400" />
        </div>
      </motion.div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 grid h-12 w-12 place-items-center rounded-xl glass">
          <Zap className="h-5 w-5 text-brand-400" />
        </div>
      </motion.div>

      {/* Central brain */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 grid place-items-center"
      >
        <div className="relative grid h-32 w-32 place-items-center rounded-3xl bg-brand-gradient shadow-glow">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent" />
          <Brain className="h-16 w-16 text-white" />
          {/* Pulsing dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white/60"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
              }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
