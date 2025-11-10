'use client';

import React from 'react';
import { MapPin, Mail, Linkedin, Github } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  AnimatedSection,
  AnimatedItem,
} from '@/components/common/AnimatedSection';
import profileData from '@/data/profile.json';
import { Education } from '@/types';

interface AboutProps {
  education?: Education;
}

export function About({ education }: AboutProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen bg-slate-50 dark:bg-slate-900 py-20 md:py-32 isolate z-10"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <header className="text-center mb-16">
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight"
          >
            About Me
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"
            aria-hidden="true"
          />
        </header>

        {/* About Content */}
        <AnimatedSection
          staggerChildren
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Profile Information */}
          <AnimatedItem>
            <article className="space-y-6">
              {/* Name and Title Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {profileData.name}
                </h3>
                <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-6">
                  {profileData.title}
                </p>

                {/* Contact Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <MapPin
                      className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-base">
                      {profileData.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail
                      className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-sm sm:text-base text-indigo-600 dark:text-indigo-400 hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded transition-colors"
                      aria-label={`Send email to ${profileData.email}`}
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-label="Visit LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-label="Visit GitHub profile"
                  >
                    <Github className="w-5 h-5" aria-hidden="true" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Professional Summary
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {profileData.summary}
                </p>
              </div>
            </article>
          </AnimatedItem>

          {/* Skills and Education */}
          <AnimatedItem>
            <aside className="space-y-6">
              {/* Skills Section */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {typeof profileData.skills === 'object' &&
                  !Array.isArray(profileData.skills) ? (
                    Object.entries(profileData.skills).map(
                      ([category, skills]) => (
                        <div key={category}>
                          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            {category}
                          </h4>
                          <div
                            className="flex flex-wrap gap-2"
                            role="list"
                            aria-label={category}
                          >
                            {(skills as string[]).map(skill => (
                              <Badge
                                key={skill}
                                variant="default"
                                className="cursor-default"
                                role="listitem"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <div
                      className="flex flex-wrap gap-2"
                      role="list"
                      aria-label="Technical skills"
                    >
                      {Array.isArray(profileData.skills) &&
                        profileData.skills.map(skill => (
                          <Badge
                            key={skill}
                            variant="default"
                            className="cursor-default"
                            role="listitem"
                          >
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Education Timeline */}
              {education && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                    Education
                  </h3>

                  <div className="relative">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 top-2 w-3 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                      aria-hidden="true"
                    />

                    <div className="ml-8">
                      <div className="mb-4">
                        <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {education.degree}
                        </h4>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm sm:text-base">
                          {education.institution}
                        </p>
                        <time className="text-sm text-slate-600 dark:text-slate-400 mt-1 block">
                          {education.period}
                        </time>
                      </div>

                      {/* CGPA Highlight */}
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Academic Performance
                          </span>
                          <span className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">
                            CGPA {education.cgpa}
                          </span>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 uppercase tracking-wide">
                          Highlights
                        </h5>
                        <ul className="space-y-2" role="list">
                          {education.achievements.map((achievement, index) => (
                            <li
                              key={index}
                              className="text-sm text-slate-700 dark:text-slate-300 flex items-start"
                              role="listitem"
                            >
                              <span
                                className="text-indigo-600 dark:text-indigo-400 mr-2 mt-1 flex-shrink-0"
                                aria-hidden="true"
                              >
                                •
                              </span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </aside>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
