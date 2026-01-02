'use client';

import { ProjectsStripProps } from '@/types/project';
import { ProjectCard } from './ProjectCard';

/**
 * ProjectsStrip Component
 *
 * Mobile-optimized horizontal scroll container with scroll-snap behavior.
 * Displays project cards in a horizontal strip with smooth card-to-card navigation.
 *
 * Features:
 * - Horizontal scrolling with CSS scroll-snap
 * - Cards at 85% viewport width with peek effect
 * - Smooth momentum scrolling
 * - Hidden scrollbar for clean appearance
 * - Touch-optimized for mobile devices
 *
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.4
 */
export function ProjectsStrip({ projects, onOpenModal }: ProjectsStripProps) {
  return (
    <div className="w-full overflow-hidden -mx-4">
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide will-change-scroll px-[10vw]"
        style={{
          // Ensure smooth scrolling on iOS with momentum
          WebkitOverflowScrolling: 'touch',
          // Hide scrollbar for all browsers
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={onOpenModal}
            layout="strip"
            index={index}
          />
        ))}
      </div>

      {/* Visual Swipe Indicator */}
      <div className="mt-6 flex flex-col items-center justify-center gap-2 text-muted-foreground animate-pulse">
        <span className="text-sm font-medium">Swipe to explore</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
        </div>
      </div>
    </div>
  );
}
