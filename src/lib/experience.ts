import { Experience, Education } from '@/types';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';

/**
 * Get experience data sorted chronologically (most recent first)
 * Sorts by startDate in descending order
 */
export const getExperienceData = (): Experience[] => {
  const experiences = experienceData as Experience[];

  // Sort by startDate in descending order (most recent first)
  return experiences.sort((a, b) => {
    // Handle 'Present' endDate - these should come first
    if (a.endDate === 'Present' && b.endDate !== 'Present') return -1;
    if (a.endDate !== 'Present' && b.endDate === 'Present') return 1;

    // Compare start dates (YYYY-MM format)
    return b.startDate.localeCompare(a.startDate);
  });
};

export const getEducationData = (): Education => {
  return educationData as Education;
};
