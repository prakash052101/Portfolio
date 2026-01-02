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
        'bg-card border border-border',
        'transition-all duration-300 ease-out',
        // Hover effects - subtle lift and shadow
        'hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20',
        // Focus styles
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
        // Layout-specific styles
        layout === 'strip' && 'snap-center flex-shrink-0 w-[80vw]',
        layout === 'grid' && 'h-full',
        // Performance optimization
        'will-change-transform'
      )}
    >
      {/* Project Image */}
      <div className="relative z-10 aspect-video overflow-hidden bg-muted flex-shrink-0">
        {!imageError ? (
          <>
            {/* Loading skeleton */}
            <div className="absolute inset-0 bg-muted animate-pulse" />
            <Image
              src={thumbnail}
              alt={`Screenshot of ${project.title} showing ${project.shortDescription}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform opacity-0 data-[loaded=true]:opacity-100"
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
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-in fade-in duration-300">
            <div className="text-center">
              <FolderIcon className="w-16 h-16 mx-auto text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                Image unavailable
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="relative z-10 flex flex-col flex-1 p-6">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-card-foreground mb-3 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag, tagIndex) => (
            <span
              key={tag}
              className={cn(
                'px-2.5 py-0.5 text-xs font-medium rounded-md',
                'bg-primary/5 text-primary border border-primary/10',
                'transition-colors duration-300',
                'group-hover:bg-primary/10 group-hover:border-primary/20'
              )}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-border/50">
          {project.liveUrl && (
            <button
              onClick={e => {
                e.stopPropagation();
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background shadow-sm hover:shadow"
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
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background shadow-sm hover:shadow"
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
