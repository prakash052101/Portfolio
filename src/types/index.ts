// Core type definitions for the portfolio application

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  // New spec fields (optional for backward compatibility)
  summary?: string; // Brief description (1-2 sentences)
  stack?: string[]; // Technology stack
  features?: string[]; // Key features list
  impact?: string; // Quantified impact statement
  live?: string; // Live demo URL (empty string if none)
  repo?: string; // GitHub repository URL
  // Legacy fields (kept for backward compatibility)
  description: string;
  longDescription?: string;
  technologies?: string[];
  category?: 'web' | 'mobile' | 'devops' | 'ai';
  status?: 'live' | 'development' | 'prototype';
  links?: {
    live?: string;
    github?: string;
    demo?: string;
  };
  images:
    | {
        thumbnail: string;
        gallery: string[];
      }
    | string[]; // Support both formats
  metrics?: ProjectMetric[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string; // YYYY-MM format
  endDate: string | 'Present'; // YYYY-MM format or 'Present'
  location: string; // City, Country
  achievements: string[] | Achievement[]; // Achievement bullet points or detailed achievements
  logo?: string; // Optional company logo path
  // Legacy fields for backward compatibility
  period?: string;
  type?: 'employment' | 'freelance' | 'founder';
  description?: string[];
  technologies?: string[];
}

// Keep legacy interface for backward compatibility
export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: 'employment' | 'freelance' | 'founder';
  description: string[];
  achievements: Achievement[];
  technologies: string[];
}

export interface Achievement {
  metric: string;
  improvement: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  achievements: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  section: string;
}

export interface ThemeContextType {
  theme: 'light' | 'dark' | undefined;
  toggleTheme: () => void;
  mounted: boolean;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string; // LinkedIn URL
  github: string; // GitHub URL
  portfolio: string; // Portfolio URL
  skills: Record<string, string[]> | string[]; // Categorized skills object or array of skill names
  languages: { language: string; proficiency: string }[];
  summary: string; // Professional summary
}

export interface ContactInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  profileImage?: string;
  socialLinks: SocialLink[];
}

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  author: ContactInfo;
  keywords: string[];
}
