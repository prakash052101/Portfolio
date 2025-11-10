'use client';

import { Project } from '@/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ExternalLink, Github, ChevronDown, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { useState, useCallback } from 'react';
import {
  IMAGE_SIZES,
  IMAGE_QUALITY,
  shouldPrioritizeImage,
  getImageLoadingStrategy,
} from '@/lib/image-utils';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAllTech, setShowAllTech] = useState(false);

  const toggleFeatures = useCallback(() => {
    setShowFeatures(prev => !prev);
  }, []);

  const toggleTech = useCallback(() => {
    setShowAllTech(prev => !prev);
  }, []);

  const imageUrl = Array.isArray(project.images)
    ? project.images[0]
    : project.images.thumbnail;

  const displaySummary = project.summary || project.description;
  const techStack = project.stack || project.technologies || [];
  const hasLiveDemo = Boolean(project.live && project.live.trim() !== '');
  const repoUrl = project.repo || project.links?.github || '';
  const features = project.features || [];
  const hasFeatures = features.length > 0;

  return (
    <article
      className={cn(
        'group relative flex flex-col h-fit overflow-hidden rounded-2xl bg-card',
        'border-2 border-border shadow-lg',
        'transition-shadow duration-200 ease-out',
        'hover:shadow-2xl hover:border-indigo-500/50',
        'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2'
      )}
      role="listitem"
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${project.title} project screenshot`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={shouldPrioritizeImage(index)}
            loading={getImageLoadingStrategy(index)}
            sizes={IMAGE_SIZES.projectCard}
            quality={IMAGE_QUALITY.standard}
            onError={e => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 opacity-20">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3
          id={`project-title-${project.id}`}
          className="text-xl font-semibold text-foreground mb-2 leading-tight"
        >
          {project.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {displaySummary}
        </p>

        {/* Tech Stack */}
        <div className="mb-4">
          {techStack.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2" role="list">
                {(showAllTech ? techStack : techStack.slice(0, 6)).map(tech => (
                  <Badge key={tech} variant="default" role="listitem">
                    {tech}
                  </Badge>
                ))}
              </div>
              {techStack.length > 6 && (
                <button
                  type="button"
                  onClick={toggleTech}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors font-medium"
                >
                  {showAllTech ? 'Show Less' : `Show All (${techStack.length})`}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Key Features */}
        {hasFeatures && (
          <div className="mb-4">
            <button
              type="button"
              onClick={toggleFeatures}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md px-2 py-1 -ml-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Key Features</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showFeatures && 'rotate-180'
                )}
              />
            </button>

            {showFeatures && (
              <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium bg-foreground text-background transition-all duration-150 hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[44px]"
            >
              <Github className="h-4 w-4" />
              View Code
            </a>
          )}

          {hasLiveDemo && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium border-2 border-foreground text-foreground transition-all duration-150 hover:bg-foreground hover:text-background hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 min-h-[44px]"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
