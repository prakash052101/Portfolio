'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui';
import { CONTACT_INFO } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';

export function Hero() {
  const [imageError, setImageError] = useState(false);

  const handleViewProjects = () => {
    scrollToSection('projects');
  };

  const handleContactMe = () => {
    scrollToSection('contact');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden isolate"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-slate-900 dark:via-indigo-950/30 dark:to-purple-950/20 -z-10" />

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Professional Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-indigo-600 dark:border-indigo-400 shadow-2xl">
            {!imageError ? (
              <Image
                src={CONTACT_INFO.profileImage || '/images/profile.jpg'}
                alt={`Professional photo of ${CONTACT_INFO.name}`}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(CONTACT_INFO.name)}&size=256&background=4f46e5&color=fff&bold=true`}
                alt={`Avatar for ${CONTACT_INFO.name}`}
                fill
                className="object-cover"
                unoptimized
              />
            )}
          </div>
        </div>

        {/* Animated Name with Gradient */}
        <div className="mb-6">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {CONTACT_INFO.name}
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            {CONTACT_INFO.title}
          </h2>
        </div>

        {/* Professional Tagline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed px-4">
          {CONTACT_INFO.tagline}
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 mb-16">
          <Button
            onClick={handleViewProjects}
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
            aria-label="View my projects"
          >
            View Projects
          </Button>

          <Button
            onClick={handleContactMe}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
            aria-label="Contact me"
          >
            Contact Me
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg p-2"
            aria-label="Scroll to about section"
          >
            <span className="text-sm font-medium">Scroll</span>
            <ChevronDown className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
