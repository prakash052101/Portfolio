// TypeScript interfaces for Featured Projects section

/**
 * Core Project interface for the Featured Projects section
 */
export interface Project {
  id: string; // Unique identifier
  title: string; // Project name
  description: string; // Full description (for modal)
  shortDescription: string; // Brief summary (for card)
  image: string; // Primary thumbnail image
  images?: string[]; // Additional gallery images
  tags: string[]; // Technology/category tags
  keyFeatures: string[]; // Bullet points of main features
  techStack: string[]; // Technologies used
  liveUrl?: string; // Live demo link
  codeUrl?: string; // GitHub/source code link
  featured?: boolean; // Whether to show in featured section
  order?: number; // Display order
  blurDataURL?: string; // Base64 blur placeholder for images
}

/**
 * Props for ProjectCard component
 */
export interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  layout: 'grid' | 'strip';
  index: number;
}

/**
 * Props for ProjectModal component
 */
export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Props for ProjectsGrid component (desktop/tablet)
 */
export interface ProjectsGridProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}

/**
 * Props for ProjectsStrip component (mobile)
 */
export interface ProjectsStripProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
}

/**
 * Props for FeaturedProjects container component
 */
export interface FeaturedProjectsProps {
  projects?: Project[];
}
