import { Project, Experience, ProfileData } from '@/types';

/**
 * Data loading utilities with error handling for missing or invalid JSON
 * Requirements: 1.2, 1.3, 1.4, 9.1, 9.2
 */

// Safe JSON loading with error handling
function loadJsonData<T>(
  dataLoader: () => T,
  fallback: T,
  dataName: string
): T {
  try {
    const data = dataLoader();
    if (!data) {
      console.error(`${dataName} is empty or undefined, using fallback`);
      return fallback;
    }
    return data;
  } catch (error) {
    console.error(`Error loading ${dataName}:`, error);
    return fallback;
  }
}

// Lazy load data files
let projectsCache: Project[] | null = null;
let experienceCache: Experience[] | null = null;
let profileCache: ProfileData | null = null;

/**
 * Load projects data with error handling
 */
function loadProjects(): Project[] {
  if (projectsCache) return projectsCache;

  try {
    const data = require('@/data/projects.json');
    projectsCache = Array.isArray(data) ? data : [];

    if (projectsCache.length === 0) {
      console.warn('Projects data is empty');
    }

    return projectsCache;
  } catch (error) {
    console.error('Failed to load projects.json:', error);
    return [];
  }
}

/**
 * Load experience data with error handling
 */
function loadExperience(): Experience[] {
  if (experienceCache) return experienceCache;

  try {
    const data = require('@/data/experience.json');
    experienceCache = Array.isArray(data) ? data : [];

    if (experienceCache.length === 0) {
      console.warn('Experience data is empty');
    }

    return experienceCache;
  } catch (error) {
    console.error('Failed to load experience.json:', error);
    return [];
  }
}

/**
 * Load profile data with error handling
 */
function loadProfile(): ProfileData {
  if (profileCache) return profileCache;

  const fallbackProfile: ProfileData = {
    name: 'Prakash Kumar',
    title: 'Full-Stack Engineer & AI Developer',
    location: 'Bengaluru, India',
    email: 'prakash.kumar@blogsage.in',
    linkedin: 'https://www.linkedin.com/in/prakash052101/',
    github: 'https://github.com/prakash052101',
    portfolio: 'https://prakash.blogsage.in',
    skills: [],
    languages: [],
    summary: '',
  };

  try {
    const data = require('@/data/profile.json');
    profileCache = data || fallbackProfile;
    return profileCache as ProfileData;
  } catch (error) {
    console.error('Failed to load profile.json:', error);
    return fallbackProfile;
  }
}

// Project data utilities
export const getAllProjects = (): Project[] => {
  return loadProjects();
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  const projects = loadProjects();
  return projects.find(project => project.slug === slug);
};

export const getProjectsByCategory = (
  category: Project['category']
): Project[] => {
  const projects = loadProjects();
  return projects.filter(project => project.category === category);
};

export const getFeaturedProjects = (limit?: number): Project[] => {
  const projects = loadProjects();

  // Return projects with live demos first
  const sorted = [...projects].sort((a, b) => {
    const aHasLive = Boolean(a.live || a.links?.live);
    const bHasLive = Boolean(b.live || b.links?.live);

    if (aHasLive && !bHasLive) return -1;
    if (!aHasLive && bHasLive) return 1;

    // Then by status if available
    if (a.status && b.status) {
      const statusOrder = { live: 0, development: 1, prototype: 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    }

    return 0;
  });

  return limit ? sorted.slice(0, limit) : sorted;
};

// Experience data utilities
export const getAllExperience = (): Experience[] => {
  return loadExperience();
};

export const getExperienceByCompany = (
  company: string
): Experience | undefined => {
  const experience = loadExperience();
  return experience.find(
    exp => exp.company.toLowerCase() === company.toLowerCase()
  );
};

// Profile data utilities
export const getProfile = (): ProfileData => {
  return loadProfile();
};

// Project statistics
export const getProjectStats = () => {
  const projects = getAllProjects();
  return {
    total: projects.length,
    live: projects.filter(p => p.status === 'live' || p.live || p.links?.live)
      .length,
    development: projects.filter(p => p.status === 'development').length,
    prototype: projects.filter(p => p.status === 'prototype').length,
    categories: {
      web: projects.filter(p => p.category === 'web').length,
      mobile: projects.filter(p => p.category === 'mobile').length,
      devops: projects.filter(p => p.category === 'devops').length,
      ai: projects.filter(p => p.category === 'ai').length,
    },
  };
};

// Technology extraction utilities
export const getAllTechnologies = (): string[] => {
  const projects = getAllProjects();
  const profile = getProfile();

  const projectTechs = projects.flatMap(p => p.stack || p.technologies || []);
  const profileSkills = profile.skills || [];

  // Handle both array and object formats for skills
  const skillsArray = Array.isArray(profileSkills)
    ? profileSkills
    : Object.values(profileSkills).flat();

  return [...new Set([...projectTechs, ...skillsArray])].filter(Boolean).sort();
};

export const getTechnologiesByCategory = (
  category: Project['category']
): string[] => {
  const projects = getProjectsByCategory(category);
  const techs = projects.flatMap(p => p.stack || p.technologies || []);
  return [...new Set(techs)].filter(Boolean).sort();
};

// Project navigation utilities
export const getNextProject = (currentSlug: string): Project | null => {
  const projects = getAllProjects();
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);

  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return null;
  }

  return projects[currentIndex + 1];
};

export const getPreviousProject = (currentSlug: string): Project | null => {
  const projects = getAllProjects();
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);

  if (currentIndex <= 0) {
    return null;
  }

  return projects[currentIndex - 1];
};

export const getRelatedProjects = (
  currentProject: Project,
  limit: number = 3
): Project[] => {
  const allProjects = getAllProjects();

  // Filter out current project
  const otherProjects = allProjects.filter(p => p.slug !== currentProject.slug);

  // Find projects with overlapping technologies
  const currentTechs = new Set(
    currentProject.stack || currentProject.technologies || []
  );

  const sorted = otherProjects.sort((a, b) => {
    const aTechs = new Set(a.stack || a.technologies || []);
    const bTechs = new Set(b.stack || b.technologies || []);

    // Count overlapping technologies
    const aOverlap = [...currentTechs].filter(tech => aTechs.has(tech)).length;
    const bOverlap = [...currentTechs].filter(tech => bTechs.has(tech)).length;

    if (aOverlap !== bOverlap) {
      return bOverlap - aOverlap;
    }

    // Then prioritize by category match
    if (
      a.category === currentProject.category &&
      b.category !== currentProject.category
    ) {
      return -1;
    }
    if (
      b.category === currentProject.category &&
      a.category !== currentProject.category
    ) {
      return 1;
    }

    return 0;
  });

  return sorted.slice(0, limit);
};

// Validation utilities
export const validateProjectData = (project: Project): boolean => {
  return Boolean(
    project.id &&
      project.title &&
      project.slug &&
      (project.summary || project.description) &&
      (project.stack || project.technologies) &&
      (project.repo || project.links?.github)
  );
};

export const validateExperienceData = (experience: Experience): boolean => {
  return Boolean(
    experience.id &&
      experience.company &&
      experience.role &&
      experience.startDate &&
      experience.endDate &&
      experience.location &&
      experience.achievements &&
      experience.achievements.length > 0
  );
};

export const validateProfileData = (profile: ProfileData): boolean => {
  const hasSkills = profile.skills
    ? Array.isArray(profile.skills)
      ? profile.skills.length > 0
      : Object.keys(profile.skills).length > 0
    : false;

  return Boolean(profile.name && profile.title && profile.email && hasSkills);
};
