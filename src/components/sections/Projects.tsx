'use client';

import { getAllProjects } from '@/lib/data';
import { ProjectCard } from '@/components/ui/ProjectCard';
import {
  AnimatedSection,
  AnimatedItem,
} from '@/components/common/DynamicAnimatedSection';

interface ProjectsProps {
  projects?: ReturnType<typeof getAllProjects>;
}

export function Projects({ projects: initialProjects }: ProjectsProps) {
  // Load all projects from projects.json
  const projects = initialProjects || getAllProjects();

  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 md:px-6 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <AnimatedSection>
          <header className="text-center mb-12">
            <h2
              id="projects-heading"
              className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
            >
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A showcase of my work in web development, DevOps, and AI. Each
              project demonstrates measurable impact and technical excellence.
            </p>
          </header>
        </AnimatedSection>

        {/* Projects Grid - 1 column mobile, 2 tablet, 3 desktop */}
        <AnimatedSection delay={0.2} staggerChildren>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min"
            role="list"
            aria-label="Featured projects"
          >
            {projects.map((project, index) => (
              <AnimatedItem key={project.id} className="h-fit">
                <ProjectCard project={project} index={index} />
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
