'use client';

import React from 'react';
import { ExternalLink, BookOpen, PenTool, Users } from 'lucide-react';

export function Writing() {
  return (
    <section
      id="writing"
      className="min-h-screen bg-background py-16"
      aria-labelledby="writing-heading"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <header className="text-center mb-16">
          <h2
            id="writing-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            Writing & Reflections
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto rounded-full"
            aria-hidden="true"
          />
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
            I share my thoughts, poems, and reflections on technology, life, and
            the creative side of engineering through my personal platform —
            <strong> BlogSage</strong>.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Description */}
          <div className="space-y-6">
            <article className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center mb-6">
                <BookOpen
                  className="w-6 h-6 text-indigo-500 mr-3"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Thoughts, Creativity & Exploration
                </h3>
              </div>

              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  Beyond code, I believe writing helps me connect logic with
                  emotion and technology with creativity. Through{' '}
                  <strong>BlogSage</strong>, I explore themes ranging from
                  motivation and poetry to reflections on AI and the human side
                  of innovation.
                </p>

                <p>
                  This platform is my way of blending analytical thinking with
                  creative expression — capturing lessons not just from
                  engineering, but from life itself.
                </p>
              </div>

              {/* Writing Themes */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Topics I Write About
                </h4>
                <ul
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  role="list"
                >
                  {[
                    'Poetry & Reflection',
                    'Motivational Insights',
                    'AI & Technology',
                    'Law & Society',
                    'Personal Growth',
                    'Human–Tech Balance',
                  ].map(topic => (
                    <li
                      key={topic}
                      className="flex items-center"
                      role="listitem"
                    >
                      <div
                        className="w-2 h-2 bg-teal-500 rounded-full mr-3"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            {/* Blog Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 rounded-lg p-8 border border-indigo-100 dark:border-slate-600 text-center">
              <div className="mb-6">
                <div
                  className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  <PenTool className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  BLOGSAGE
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  My live blog where I share poems, reflections, and thoughts on
                  technology, creativity, and life.
                </p>
              </div>

              <a
                href="https://blogsage.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[44px]"
                aria-label="Visit BLOGSAGE (opens in new tab)"
              >
                <span className="mr-2">Visit BlogSage</span>
                <ExternalLink
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                  aria-hidden="true"
                />
              </a>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                A space where creativity meets logic — in words and ideas.
              </p>
            </div>

            {/* Highlights */}
            <div
              className="grid grid-cols-2 gap-4"
              role="list"
              aria-label="Writing highlights"
            >
              <div
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center"
                role="listitem"
              >
                <BookOpen
                  className="w-8 h-8 text-indigo-500 mx-auto mb-3"
                  aria-hidden="true"
                />
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Creative
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Reflections
                </div>
              </div>

              <div
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 text-center"
                role="listitem"
              >
                <Users
                  className="w-8 h-8 text-teal-500 mx-auto mb-3"
                  aria-hidden="true"
                />
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Open
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Perspectives
                </div>
              </div>
            </div>

            {/* Current Focus Areas */}
            <aside className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Recent Writing Themes
              </h4>
              <ul
                className="space-y-2 text-sm text-slate-700 dark:text-slate-300"
                role="list"
              >
                <li className="flex items-start" role="listitem">
                  <span
                    className="text-indigo-500 mr-2 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>Poems exploring emotion and perspective</span>
                </li>
                <li className="flex items-start" role="listitem">
                  <span
                    className="text-indigo-500 mr-2 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>Motivational essays on growth and resilience</span>
                </li>
                <li className="flex items-start" role="listitem">
                  <span
                    className="text-indigo-500 mr-2 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>
                    Reflections on AI, creativity, and human innovation
                  </span>
                </li>
                <li className="flex items-start" role="listitem">
                  <span
                    className="text-indigo-500 mr-2 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>Law and social awareness perspectives</span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
