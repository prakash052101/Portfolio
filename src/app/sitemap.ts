import { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/data';
import { SEO_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects();

  // Base routes
  const routes = [
    {
      url: SEO_CONFIG.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/#experience`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/#projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SEO_CONFIG.siteUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Project routes
  const projectRoutes = projects.map(project => ({
    url: `${SEO_CONFIG.siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}
