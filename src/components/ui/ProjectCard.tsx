'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, FolderIcon } from 'lucide-react';
import { ProjectCardProps } from '@/types/project';
import { cn } from '@/lib/utils';

export function ProjectCard({
  project,
  onOpenModal,
  layout,
  index,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const thumbnail = project.images?.[0] ?? project.image;

  // Determine if this is one of the first 3 cards for priority loading
  const isPriority = index < 3;
  const isSvgImage = thumbnail.toLowerCase().endsWith('.svg');
  const placeholderType = isSvgImage || !project.blurDataURL ? 'empty' : 'blur';

  // Handle click to open modal
  const handleClick = () => {
    onOpenModal(project);
  };

  // Handle keyboard navigation (Enter/Space)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenModal(project);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        // Base styles
        'group relative flex flex-col overflow-hidden rounded-xl cursor-pointer',
        'bg-gray-900 border border-gray-800',
        'transition-all duration-300',
        // Hover effects (desktop only) - lift effect with scale and enhanced shadow
        'hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/30 hover:border-indigo-500/50',
        // Gradient border glow effect using pseudo-element (outer glow)
        'before:absolute before:inset-0 before:rounded-xl before:p-[1px]',
        'before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-indigo-500',
        'before:opacity-0 before:transition-opacity before:duration-300',
        'hover:before:opacity-100 before:-z-10 before:blur-xl',
        // Additional inner glow effect using after pseudo-element
        'after:absolute after:inset-0 after:rounded-xl',
        'after:bg-gradient-to-br after:from-indigo-500/5 after:via-transparent after:to-purple-500/5',
        'after:opacity-0 after:transition-opacity after:duration-300',
        'hover:after:opacity-100 after:pointer-events-none',
        // Focus styles
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-950',
        // Layout-specific styles
        layout === 'strip' && 'snap-center flex-shrink-0 w-[85vw]',
        layout === 'grid' && 'h-full',
        // Performance optimization: will-change for animated properties
        'will-change-transform'
      )}
    >
      {/* Project Image */}
      <div className="relative z-10 aspect-video overflow-hidden bg-gray-800 flex-shrink-0">
        {!imageError ? (
          <>
            {/* Loading skeleton - shown while image loads */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
            <Image
              src={thumbnail}
              alt={`Screenshot of ${project.title} showing ${project.shortDescription}`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105 will-change-transform opacity-0 data-[loaded=true]:opacity-100"
              priority={isPriority}
              loading={isPriority ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
              quality={80}
              placeholder={placeholderType}
              blurDataURL={isSvgImage ? undefined : project.blurDataURL}
              unoptimized={isSvgImage}
              onError={() => setImageError(true)}
              onLoad={e => {
                const img = e.target as HTMLImageElement;
                img.setAttribute('data-loaded', 'true');
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 animate-in fade-in duration-300">
            <div className="text-center">
              <FolderIcon className="w-16 h-16 mx-auto text-gray-600" />
              <p className="mt-2 text-sm text-gray-500">Image unavailable</p>
            </div>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="relative z-10 flex flex-col flex-1 p-6">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight tracking-tight">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag, tagIndex) => (
            <span
              key={tag}
              className={cn(
                'relative px-3 py-1 text-xs font-medium rounded-full',
                'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10',
                'text-indigo-400 border border-indigo-500/20',
                'transition-all duration-300',
                'hover:border-indigo-400/40 hover:shadow-sm hover:shadow-indigo-500/20'
              )}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-400">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          {project.liveUrl && (
            <button
              onClick={e => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </button>
          )}
          {project.codeUrl && (
            <button
              onClick={e => {
                e.stopPropagation();
                window.open(project.codeUrl, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Github className="w-4 h-4" />
              View Code
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
