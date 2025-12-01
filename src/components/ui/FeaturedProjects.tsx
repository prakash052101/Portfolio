'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Project, FeaturedProjectsProps } from '@/types/project';
import { ProjectsGrid } from './ProjectsGrid';
import { ProjectsStrip } from './ProjectsStrip';

// Dynamically import ProjectModal for code splitting
// Only loads when modal is needed (client-side only)
const ProjectModal = dynamic(
  () => import('./ProjectModal').then(mod => mod.ProjectModal),
  {
    ssr: false,
    loading: () => null,
  }
);

/**
 * FeaturedProjects Container Component
 *
 * Main orchestrator component that manages the Featured Projects section.
 * Handles responsive layout switching, modal state, and project interactions.
 *
 * Features:
 * - State management for selected project and modal visibility
 * - Responsive layout detection (mobile vs desktop)
 * - Window resize listener for dynamic layout switching
 * - Modal open/close handlers with body scroll lock
 * - Conditional rendering based on viewport width
 * - Hydration-safe rendering
 *
 * Requirements: 1.1, 2.1, 2.7, 3.1, 7.4
 */
export function FeaturedProjects({
  projects: projectsProp,
}: FeaturedProjectsProps) {
  // Use provided projects (should always be provided from server)
  const projects = projectsProp ?? [];

  // State for selected project and modal visibility
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for responsive layout detection
  // Initialize as null to prevent hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Responsive layout detection with window resize listener
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Function to check if viewport is mobile (<768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener for layout switching
    window.addEventListener('resize', checkMobile);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle opening modal with selected project
  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Lock body scroll when modal opens
    document.body.style.overflow = 'hidden';
  };

  // Handle closing modal with cleanup
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Restore body scroll when modal closes
    document.body.style.overflow = '';
  };

  // Cleanup on unmount to ensure body scroll is restored
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Prevent hydration mismatch by showing loading skeleton until layout is determined
  if (isMobile === null) {
    return (
      <section
        id="projects"
        className="relative w-full py-20 md:py-32 bg-background"
        aria-labelledby="projects-heading"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <header className="mb-12 text-center">
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight tracking-tight"
            >
              Featured Projects
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"
              aria-hidden="true"
            />
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Explore my latest work showcasing modern web development,
              full-stack applications, and creative solutions.
            </p>
          </header>

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <div className="aspect-video bg-muted" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded-full w-16" />
                    <div className="h-6 bg-muted rounded-full w-20" />
                    <div className="h-6 bg-muted rounded-full w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="relative w-full py-20 md:py-32 bg-background"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <header className="mb-12 text-center">
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight tracking-tight"
          >
            Featured Projects
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"
            aria-hidden="true"
          />
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Explore my latest work showcasing modern web development, full-stack
            applications, and creative solutions.
          </p>
        </header>

        {/* Conditional rendering based on viewport width */}
        <div className="animate-in fade-in duration-500">
          {isMobile ? (
            // Mobile: Horizontal scroll-snap strip (<768px)
            <ProjectsStrip projects={projects} onOpenModal={handleOpenModal} />
          ) : (
            // Desktop/Tablet: Responsive grid (≥768px)
            <ProjectsGrid projects={projects} onOpenModal={handleOpenModal} />
          )}
        </div>

        {/* Project Modal with conditional visibility */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
