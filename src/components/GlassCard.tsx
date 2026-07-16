import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  as?: 'div' | 'article' | 'section';
}

export default function GlassCard({
  children,
  className = '',
  hover = false,
  delay = 0,
  as = 'div',
}: GlassCardProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass ${hover ? 'glass-hover' : ''} ${className}`}
    >
      {children}
    </Comp>
  );
}
