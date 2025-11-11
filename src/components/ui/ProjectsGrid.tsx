'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ProjectsGridProps } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * ProjectsGrid Component
 *
 * Desktop/tablet grid container with responsive columns and scroll-triggered animations.
 * Displays project cards in a responsive grid layout with staggered fade-in animations.
 *
 * Features:
 * - Responsive CSS Grid (1 col mobile, 2 col tablet, 3 col desktop)
 * - Consistent gap spacing (gap-6)
 * - Framer Motion animations with stagger effect
 * - Intersection Observer for viewport entry detection
 * - Smooth fade-in and slide-up animations
 *
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 6.2, 8.2
 */
export function ProjectsGrid({ projects, onOpenModal }: ProjectsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1, // No stagger if reduced motion
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  // Individual card animation variants
  // Using transform (translateY) and opacity for GPU acceleration
  // Disable animations if user prefers reduced motion
  const itemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20, // No movement if reduced motion
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5, // Instant if reduced motion
        ease: 'easeOut' as const, // Smooth easing for animation
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          className="will-change-transform"
        >
          <ProjectCard
            project={project}
            onOpenModal={onOpenModal}
            layout="grid"
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
