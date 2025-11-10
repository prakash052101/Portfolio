import { Metadata } from 'next';
import { SITE_METADATA, SEO_CONFIG } from '@/lib/constants';
import { Project } from '@/types';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generate dynamic metadata for pages
 * This function creates comprehensive metadata including Open Graph and Twitter cards
 */
export function generateSEOMetadata({
  title,
  description = SEO_CONFIG.defaultDescription,
  keywords = SITE_METADATA.keywords,
  image = SEO_CONFIG.defaultImage,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOHeadProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_METADATA.author.name}`
    : SEO_CONFIG.defaultTitle;

  const pageUrl = url ? `${SEO_CONFIG.siteUrl}${url}` : SEO_CONFIG.siteUrl;
  const imageUrl = image.startsWith('http')
    ? image
    : `${SEO_CONFIG.siteUrl}${image}`;

  return {
    title: pageTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_METADATA.author.name, url: SEO_CONFIG.siteUrl }],
    creator: SITE_METADATA.author.name,
    publisher: SITE_METADATA.author.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: pageUrl,
      title: pageTitle,
      description,
      siteName: `${SITE_METADATA.author.name} Portfolio`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || SITE_METADATA.author.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [imageUrl],
      creator: SEO_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: pageUrl,
    },
    other: {
      'theme-color': '#6366f1',
      'color-scheme': 'light dark',
    },
  };
}

/**
 * Generate metadata specifically for project pages
 */
export function generateProjectMetadata(project: Project): Metadata {
  const projectKeywords = [
    ...(project.technologies || project.stack || []),
    project.category,
    'project',
    'portfolio',
    SITE_METADATA.author.name,
  ].filter(Boolean) as string[];

  return generateSEOMetadata({
    title: project.title,
    description: project.longDescription || project.description,
    keywords: projectKeywords,
    image: Array.isArray(project.images)
      ? project.images[0]
      : project.images.thumbnail,
    url: `/projects/${project.slug}`,
    type: 'article',
  });
}

/**
 * Generate metadata for the home page
 */
export function generateHomeMetadata(): Metadata {
  return generateSEOMetadata({
    title: undefined, // Use default title
    description: SITE_METADATA.description,
    keywords: SITE_METADATA.keywords,
    url: '/',
  });
}
