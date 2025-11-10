import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Writing } from '@/components/sections/Writing';
import { Contact } from '@/components/sections/Contact';
import { getExperienceData, getEducationData } from '@/lib/experience';
import { getAllProjects } from '@/lib/data';
import {
  StructuredData,
  generateOrganizationStructuredData,
} from '@/components/common/StructuredData';

// Enable static generation for the home page
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// Generate static props at build time
async function getStaticData() {
  const experiences = getExperienceData();
  const education = getEducationData();
  const projects = getAllProjects();

  return {
    experiences,
    education,
    projects,
  };
}

export default async function Home() {
  // Get static data at build time
  const { experiences, education, projects } = await getStaticData();

  return (
    <>
      <Hero />
      <About education={education} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Writing />
      <Contact />
    </>
  );
}
