'use client';

import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright and Attribution */}
          <div className="text-center md:text-left">
            <p className="text-slate-700 dark:text-slate-300 text-sm">
              © {currentYear} {CONTACT_INFO.name}. All rights reserved.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">
              Built with Next.js & Tailwind CSS
            </p>
          </div>

          {/* Social Links */}
          <nav aria-label="Footer social media links">
            <div className="flex items-center gap-4">
              <a
                href={
                  CONTACT_INFO.socialLinks.find(
                    link => link.icon === 'linkedin'
                  )?.url || 'https://www.linkedin.com/in/prakash052101/'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Visit LinkedIn profile (opens in new tab)"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href={
                  CONTACT_INFO.socialLinks.find(link => link.icon === 'github')
                    ?.url || 'https://github.com/prakash052101'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Visit GitHub profile (opens in new tab)"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Send email to ${CONTACT_INFO.email}`}
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
