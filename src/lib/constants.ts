import { ContactInfo, SiteMetadata, SocialLink, NavigationItem } from '@/types';

// Contact Information
export const CONTACT_INFO: ContactInfo = {
  name: 'Prakash Kumar',
  title: 'Full-Stack Engineer & AI/ML Developer',
  tagline:
    'Full-stack and AI/ML engineer building scalable web apps, cloud functions, and CI/CD pipelines with performance-driven architecture.',
  email: 'prakash.kumar@blogsage.in',
  phone: '+91-790-365-4862',
  location: 'Bengaluru, Karnataka, India',
  profileImage: '/images/profile.jpg',

  socialLinks: [
    {
      label: 'GitHub',
      url: 'https://github.com/prakash052101',
      icon: 'github',
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/prakash052101/',
      icon: 'linkedin',
    },
    {
      label: 'Blog',
      url: 'https://blogsage.in/',
      icon: 'blog',
    },
  ],
};

// Social Links (for easy access)
export const SOCIAL_LINKS: SocialLink[] = CONTACT_INFO.socialLinks;

// Site Metadata
export const SITE_METADATA: SiteMetadata = {
  title: 'Prakash Kumar | Full-Stack Engineer & AI Developer',
  description:
    'Portfolio of Prakash Kumar - Full-Stack Engineer specializing in MERN stack, DevOps, and AI/ML. View projects, experience, and technical expertise.',
  url: 'https://prakash.blogsage.in',
  author: CONTACT_INFO,
  keywords: [
    'Full-Stack Developer',
    'MERN Stack',
    'DevOps',
    'AI Engineer',
    'Next.js',
    'React',
    'Node.js',
    'MongoDB',
    'TypeScript',
    'CI/CD',
    'Cloud Functions',
    'Performance Optimization',
    'Docker',
    'Jenkins',
    'Prakash Kumar',
  ],
};

// Navigation Items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
    section: 'hero',
  },
  {
    label: 'About',
    href: '/about',
    section: 'about',
  },
  {
    label: 'Experience',
    href: '/experience',
    section: 'experience',
  },
  {
    label: 'Projects',
    href: '/projects',
    section: 'projects',
  },
  {
    label: 'Writing & Talks',
    href: '/writing',
    section: 'writing',
  },
  {
    label: 'Contact',
    href: '/contact',
    section: 'contact',
  },
];

// Tech Stack for Hero Section
export const TECH_STACK: string[] = [
  'Python',
  'JavaScript',
  'C/C++',
  'Core Java',
  'MEAN Stack',
  'MERN Stack',
  'Angular',
  'Node.js',
  'Express',
  'React',
];

// Project Categories
export const PROJECT_CATEGORIES = {
  web: 'Web Development',
  mobile: 'Mobile Development',
  devops: 'DevOps & Infrastructure',
  ai: 'AI & Machine Learning',
} as const;

// Project Status Labels
export const PROJECT_STATUS = {
  live: 'Live',
  development: 'In Development',
  prototype: 'Prototype',
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: 'light' as const,
  storageKey: 'portfolio-theme',
};

// Resume Configuration
export const RESUME_CONFIG = {
  filename: 'PRAKASH_KUMAR_RESUME.pdf',
  downloadPath: '/download-resume',
  publicPath: '/resume/PRAKASH_KUMAR_RESUME.pdf',
};

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: 'Prakash Kumar | Full-Stack Engineer & AI Developer',
  titleTemplate: '%s | Prakash Kumar',
  defaultDescription: SITE_METADATA.description,
  siteUrl: SITE_METADATA.url,
  defaultImage: '/images/og-image.png',
  twitterHandle: '@prakash052101',
  structuredDataTypes: {
    person: 'Person',
    project: 'SoftwareApplication',
    organization: 'Organization',
    website: 'WebSite',
  },
};

// Contact Form Configuration
export const CONTACT_FORM_CONFIG = {
  maxMessageLength: 1000,
  requiredFields: ['name', 'email', 'subject', 'message'] as const,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Animation and UI Configuration
export const UI_CONFIG = {
  animationDuration: 150,
  scrollOffset: 80, // Offset for sticky navigation
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
};
