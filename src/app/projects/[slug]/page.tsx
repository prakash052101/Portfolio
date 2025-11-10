import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, BarChart3 } from 'lucide-react';
import {
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
} from '@/lib/data';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import { generateProjectMetadata } from '@/components/common/SEOHead';
import {
  StructuredData,
  generateProjectStructuredData,
  generateBreadcrumbStructuredData,
} from '@/components/common/StructuredData';
import {
  BLUR_DATA_URLS,
  IMAGE_SIZES,
  IMAGE_QUALITY,
  getImageLoadingStrategy,
} from '@/lib/image-utils';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

// Enable ISR with revalidation
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day (24 hours)

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map(project => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return generateProjectMetadata(project);
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Generate breadcrumb structured data
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/#projects' },
    { name: project.title, url: `/projects/${project.slug}` },
  ];

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={generateProjectStructuredData(project)} />
      <StructuredData
        data={generateBreadcrumbStructuredData(breadcrumbItems)}
      />

      <div className="min-h-screen bg-background">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Project Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {project.title}
                </h1>
                <StatusBadge status={project.status} />
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                {project.longDescription}
              </p>

              {/* Project Links */}
              <div className="flex flex-wrap gap-4">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                )}
              </div>
            </div>

            {/* Project Images */}
            {!Array.isArray(project.images) &&
              project.images.gallery.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes={IMAGE_SIZES.twoColumn}
                          priority={index === 0}
                          loading={getImageLoadingStrategy(index, 1)}
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URLS.video}
                          quality={IMAGE_QUALITY.standard}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Performance Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Performance & Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="p-6 border border-border rounded-lg bg-card"
                    >
                      <h3 className="font-semibold text-lg mb-2">
                        {metric.label}
                      </h3>
                      <div className="text-2xl font-bold text-primary mb-2">
                        {metric.value}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {metric.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Used */}
            {(project.technologies || project.stack) && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || project.stack || []).map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Category</h3>
                    <p className="text-muted-foreground capitalize">
                      {project.category}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Status</h3>
                    <StatusBadge status={project.status} />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation to Other Projects */}
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-semibold mb-4">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getRelatedProjects(project, 3).map(otherProject => (
                  <Link
                    key={otherProject.slug}
                    href={`/projects/${otherProject.slug}`}
                    className="group p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="relative aspect-video mb-3 rounded overflow-hidden bg-muted">
                      <Image
                        src={
                          Array.isArray(otherProject.images)
                            ? otherProject.images[0]
                            : otherProject.images.thumbnail
                        }
                        alt={otherProject.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes={IMAGE_SIZES.projectCard}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URLS.minimal}
                        quality={IMAGE_QUALITY.thumbnail}
                      />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {otherProject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {otherProject.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: Project['status'] }) {
  const statusConfig = {
    live: {
      label: 'Live',
      className:
        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    },
    development: {
      label: 'In Development',
      className:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    },
    prototype: {
      label: 'Prototype',
      className:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    },
  };

  const config = status ? statusConfig[status] : statusConfig.live;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
