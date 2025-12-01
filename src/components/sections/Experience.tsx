'use client';

import React from 'react';
import { ExperienceCard } from '@/components/ui/ExperienceCard';
import {
  AnimatedSection,
  AnimatedItem,
} from '@/components/common/DynamicAnimatedSection';
import { Experience as ExperienceType } from '@/types';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="min-h-screen bg-background py-16"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <AnimatedSection>
          <header className="text-center mb-16">
            <h2
              id="experience-heading"
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
            >
              Professional Experience
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto rounded-full mb-6"
              aria-hidden="true"
            />
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Building scalable solutions and delivering measurable performance
              improvements across enterprise applications and cloud
              infrastructure.
            </p>
          </header>
        </AnimatedSection>

        {/* Performance Metrics Highlight */}
        <AnimatedSection delay={0.1}>
          <div className="bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 mb-16 border border-teal-100 dark:border-slate-600">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Performance Impact
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Measurable improvements delivered across projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                  <div className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">
                    ~1600ms → ~400ms
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Cloud Function Optimization
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    75% Performance Improvement
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    ~1100ms → ~200ms
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Critical Functions
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    90% Latency Reduction
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    Zero
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Deploy Regressions
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    Enhanced CI/CD Pipeline
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Experience Timeline */}
        <AnimatedSection delay={0.2} staggerChildren>
          <div
            className="relative"
            role="list"
            aria-label="Work experience timeline"
          >
            {experiences.map((experience, index) => (
              <AnimatedItem key={`${experience.company}-${experience.role}`}>
                <ExperienceCard
                  experience={experience}
                  isLast={index === experiences.length - 1}
                />
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection delay={0.3}>
          <aside className="text-center mt-16">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Ready to Collaborate?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                I&apos;m always interested in discussing new opportunities and
                challenging projects that require scalable backend solutions and
                performance optimization.
              </p>
              <nav
                className="flex flex-col sm:flex-row gap-4 justify-center"
                aria-label="Contact actions"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[44px]"
                  aria-label="Navigate to contact section"
                >
                  Get In Touch
                </a>
                <a
                  href="/download-resume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[44px]"
                  aria-label="Download resume (opens in new tab)"
                >
                  Download Resume
                </a>
              </nav>
            </div>
          </aside>
        </AnimatedSection>
      </div>
    </section>
  );
}
