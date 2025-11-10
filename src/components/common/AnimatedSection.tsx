'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  staggerChildren?: boolean;
}

/**
 * AnimatedSection wrapper component with intersection observer
 * Implements fadeInUp animation with respect for prefers-reduced-motion
 */
export function AnimatedSection({
  children,
  delay = 0,
  className = '',
  staggerChildren = false,
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is preferred, render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
        ...(staggerChildren && {
          staggerChildren: 0.1,
        }),
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -100px 0px' }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedItem component for use within AnimatedSection when staggerChildren is enabled
 */
export function AnimatedItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is preferred, render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Item animation variants (for stagger effect)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
