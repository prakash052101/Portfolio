'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  FolderIcon,
} from 'lucide-react';
import { ProjectModalProps } from '@/types/project';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const triggerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Store reference to trigger element when modal opens
  useEffect(() => {
    if (isOpen && document.activeElement) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Return focus to trigger element when modal closes
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Animation variants for backdrop
  // Disable fade animation if user prefers reduced motion
  const backdropVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: { opacity: 1 },
  };

  // Animation variants for modal content
  // Using transform (scale, translateY) and opacity for GPU acceleration
  // Disable animations if user prefers reduced motion
  const modalVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      scale: prefersReducedMotion ? 1 : 0.95,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
        duration: prefersReducedMotion ? 0 : 0.3, // Instant if reduced motion
      },
    },
    exit: {
      opacity: prefersReducedMotion ? 1 : 0,
      scale: prefersReducedMotion ? 1 : 0.95,
      y: prefersReducedMotion ? 0 : 20,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap
          focusTrapOptions={{
            initialFocus: '#modal-close-button',
            escapeDeactivates: true,
            clickOutsideDeactivates: true,
            allowOutsideClick: true,
          }}
        >
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={handleBackdropClick}
            />

            {/* Modal Content */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              className={cn(
                'relative bg-gray-900 rounded-2xl w-full max-w-4xl',
                'max-h-[90vh] overflow-y-auto',
                'border border-gray-800 shadow-2xl',
                // Performance optimization: will-change for animated properties
                'will-change-transform'
              )}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4 md:px-8 md:py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2
                      id="modal-title"
                      className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight"
                    >
                      {project.title}
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-2">
                      {project.shortDescription}
                    </p>
                  </div>
                  <button
                    id="modal-close-button"
                    onClick={onClose}
                    aria-label="Close project details"
                    className={cn(
                      'flex-shrink-0 p-2 rounded-lg',
                      'text-gray-400 hover:text-white hover:bg-gray-800',
                      'transition-colors focus:outline-none',
                      'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                    )}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div
                id="modal-description"
                className="px-6 py-6 md:px-8 md:py-8 space-y-8"
              >
                {/* Project Images Gallery */}
                {project.images && project.images.length > 0 && (
                  <section>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4 tracking-tight">
                      Gallery
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-video overflow-hidden rounded-lg bg-gray-800"
                        >
                          {!imageError[image] ? (
                            <>
                              {/* Loading skeleton */}
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                              <Image
                                src={image}
                                alt={`${project.title} screenshot ${index + 1}`}
                                fill
                                className="object-cover transition-opacity duration-500 opacity-0 data-[loaded=true]:opacity-100"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={80}
                                loading="lazy"
                                placeholder={
                                  project.blurDataURL ? 'blur' : 'empty'
                                }
                                blurDataURL={project.blurDataURL}
                                onError={() =>
                                  setImageError(prev => ({
                                    ...prev,
                                    [image]: true,
                                  }))
                                }
                                onLoad={e => {
                                  const img = e.target as HTMLImageElement;
                                  img.setAttribute('data-loaded', 'true');
                                }}
                              />
                            </>
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center animate-in fade-in duration-300">
                              <div className="text-center">
                                <FolderIcon className="w-12 h-12 mx-auto text-gray-600" />
                                <p className="mt-2 text-xs text-gray-500">
                                  Image unavailable
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Full Description */}
                <section>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-4 tracking-tight">
                    About This Project
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                </section>

                {/* Key Features */}
                {project.keyFeatures && project.keyFeatures.length > 0 && (
                  <section>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4 tracking-tight">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {project.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm md:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <section>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4 tracking-tight">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className={cn(
                            'px-4 py-2 text-sm font-medium rounded-lg',
                            'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                          )}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Modal Footer */}
              {(project.liveUrl || project.codeUrl) && (
                <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 px-6 py-4 md:px-8 md:py-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'inline-flex items-center justify-center gap-2',
                          'px-6 py-3 text-sm font-medium rounded-lg',
                          'bg-indigo-600 text-white hover:bg-indigo-700',
                          'transition-colors focus:outline-none',
                          'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                        )}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live Demo
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'inline-flex items-center justify-center gap-2',
                          'px-6 py-3 text-sm font-medium rounded-lg',
                          'border border-gray-700 text-gray-300 hover:bg-gray-800',
                          'transition-colors focus:outline-none',
                          'focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                        )}
                      >
                        <Github className="w-4 h-4" />
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Screen reader live region for modal state */}
            <div role="status" aria-live="polite" className="sr-only">
              {isOpen && `Opened project details for ${project.title}`}
            </div>
          </div>
        </FocusTrap>
      )}
    </AnimatePresence>
  );
}
