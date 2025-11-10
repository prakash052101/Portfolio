import { SITE_METADATA, CONTACT_INFO } from '@/lib/constants';
import { Project, ExperienceItem, Experience } from '@/types';

/**
 * Generate Person structured data for the main profile
 */
export function generatePersonStructuredData() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: CONTACT_INFO.name,
    jobTitle: CONTACT_INFO.title,
    description: CONTACT_INFO.tagline,
    url: SITE_METADATA.url,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'India',
    },
    sameAs: CONTACT_INFO.socialLinks.map(link => link.url),
    knowsAbout: [
      'Backend Development',
      'Full-Stack Engineering',
      'Node.js',
      'React',
      'TypeScript',
      'MongoDB',
      'DevOps',
      'CI/CD',
      'Cloud Functions',
      'Performance Optimization',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Visvesvaraya Technological University',
      description: 'Bachelor of Engineering in Computer Science',
    },
  };

  return JSON.stringify(person);
}

/**
 * Generate Project structured data for individual projects
 */
export function generateProjectStructuredData(project: Project) {
  const projectData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.longDescription || project.description,
    url:
      project.links?.live ||
      project.live ||
      `${SITE_METADATA.url}/projects/${project.slug}`,
    author: {
      '@type': 'Person',
      name: CONTACT_INFO.name,
      url: SITE_METADATA.url,
    },
    programmingLanguage: project.technologies || project.stack,
    applicationCategory: project.category,
    operatingSystem: 'Web Browser',
    ...(project.links?.github && {
      codeRepository: project.links.github,
    }),
    ...(project.repo && {
      codeRepository: project.repo,
    }),
    ...(project.links?.demo && {
      downloadUrl: project.links.demo,
    }),
    screenshot:
      !Array.isArray(project.images) && project.images.gallery
        ? project.images.gallery.map(image => ({
            '@type': 'ImageObject',
            url: `${SITE_METADATA.url}${image}`,
            description: `${project.title} screenshot`,
          }))
        : [],
  };

  return JSON.stringify(projectData);
}

/**
 * Generate Organization structured data for work experience
 */
export function generateOrganizationStructuredData(
  experience: ExperienceItem | Experience
) {
  // Handle both Experience and ExperienceItem types
  const period =
    'period' in experience && experience.period
      ? experience.period
      : 'startDate' in experience
        ? `${experience.startDate} – ${experience.endDate}`
        : '';

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: experience.company,
    employee: {
      '@type': 'Person',
      name: CONTACT_INFO.name,
      jobTitle: experience.role,
      startDate: period.split(' – ')[0],
      ...(period.includes('Present')
        ? {}
        : {
            endDate: period.split(' – ')[1],
          }),
    },
  };

  return JSON.stringify(organization);
}

/**
 * Generate WebSite structured data for the main site
 */
export function generateWebSiteStructuredData() {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${CONTACT_INFO.name} Portfolio`,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    author: {
      '@type': 'Person',
      name: CONTACT_INFO.name,
      url: SITE_METADATA.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_METADATA.url}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return JSON.stringify(website);
}

/**
 * Generate BreadcrumbList structured data for navigation
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_METADATA.url}${item.url}`,
    })),
  };

  return JSON.stringify(breadcrumb);
}

/**
 * Component to render structured data as JSON-LD script tag
 */
interface StructuredDataProps {
  data: string;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}
