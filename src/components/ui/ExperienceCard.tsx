'use client';

import React from 'react';
import Image from 'next/image';
import { Experience } from '@/types';
import { formatDateRange, calculateDuration } from '@/lib/utils';
import { BLUR_DATA_URLS, IMAGE_SIZES, IMAGE_QUALITY } from '@/lib/image-utils';

interface ExperienceCardProps {
  experience: Experience;
  isLast?: boolean;
}

export function ExperienceCard({
  experience,
  isLast = false,
}: ExperienceCardProps) {
  const dateRange = formatDateRange(experience.startDate, experience.endDate);
  const duration = calculateDuration(experience.startDate, experience.endDate);

  return (
    <article
      className="relative"
      role="listitem"
      aria-labelledby={`experience-${experience.company.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Timeline Line - Hidden on mobile, visible on desktop with gradient border */}
      {!isLast && (
        <div
          className="hidden md:block absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 opacity-30"
          aria-hidden="true"
        />
      )}

      {/* Timeline Dot - Hidden on mobile */}
      <div
        className="hidden md:block absolute left-4 top-8 w-4 h-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full border-4 border-white dark:border-slate-900 shadow-lg"
        aria-hidden="true"
      />

      {/* Card Content - Full width on mobile, with left margin on desktop */}
      <div className="md:ml-16 pb-8 md:pb-12">
        <div className="group bg-white dark:bg-slate-800 rounded-2xl border-l-4 border-l-indigo-600 dark:border-l-purple-600 border-r border-t border-b border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
          {/* Header with Company Logo */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex items-start gap-4 flex-1">
              {/* Company Logo */}
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-slate-200 dark:border-slate-600 flex items-center justify-center p-3">
                {experience.logo ? (
                  experience.logo.endsWith('.svg') ? (
                    <img
                      src={experience.logo}
                      alt={`${experience.company} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        fill
                        className="object-contain"
                        sizes="80px"
                        loading="lazy"
                        quality={90}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )
                ) : (
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {experience.company.charAt(0)}
                  </span>
                )}
              </div>

              {/* Role and Company */}
              <div className="flex-1 min-w-0">
                <h3
                  id={`experience-${experience.company.replace(/\s+/g, '-').toLowerCase()}`}
                  className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-purple-400 transition-colors duration-200"
                >
                  {experience.role}
                </h3>
                <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                  {experience.company}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time dateTime={experience.startDate}>{dateRange}</time>
                  </span>
                  <span
                    className="text-slate-400 dark:text-slate-600"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>{duration}</span>
                  {experience.location && (
                    <>
                      <span
                        className="text-slate-400 dark:text-slate-600"
                        aria-hidden="true"
                      >
                        •
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {experience.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements with Custom Markers */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div>
              <h4 className="sr-only">Key Achievements</h4>
              <ul className="space-y-3" role="list">
                {experience.achievements.map((achievement, index) => {
                  // Handle both string achievements and Achievement objects
                  if (typeof achievement === 'string') {
                    return (
                      <li
                        key={index}
                        className="text-slate-700 dark:text-slate-300 flex items-start leading-relaxed"
                        role="listitem"
                      >
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3 mt-0.5"
                          aria-hidden="true"
                        >
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span className="flex-1">{achievement}</span>
                      </li>
                    );
                  }
                  // Legacy Achievement object format
                  return (
                    <li
                      key={index}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {achievement.metric}
                        </span>
                        {achievement.improvement.includes('→') ? (
                          <span className="text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded">
                            {achievement.improvement}
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            {achievement.improvement}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {achievement.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Legacy Description Support */}
          {experience.description && experience.description.length > 0 && (
            <div className="mt-4">
              <h4 className="sr-only">Responsibilities</h4>
              <ul className="space-y-3" role="list">
                {experience.description.map((item, index) => (
                  <li
                    key={index}
                    className="text-slate-700 dark:text-slate-300 flex items-start leading-relaxed"
                    role="listitem"
                  >
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3 mt-0.5"
                      aria-hidden="true"
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h4 className="sr-only">Technologies Used</h4>
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label="Technologies used"
              >
                {experience.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
                    role="listitem"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
