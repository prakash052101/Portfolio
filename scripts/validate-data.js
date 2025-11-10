/**
 * Data validation script
 * Validates that all JSON data files are properly structured
 */

const fs = require('fs');
const path = require('path');

// Load data files
const projectsPath = path.join(__dirname, '../src/data/projects.json');
const experiencePath = path.join(__dirname, '../src/data/experience.json');
const profilePath = path.join(__dirname, '../src/data/profile.json');

let hasErrors = false;

// Validate projects
console.log('Validating projects.json...');
try {
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

  if (!Array.isArray(projects)) {
    console.error('✗ Projects data must be an array');
    hasErrors = true;
  } else {
    console.log(`✓ Found ${projects.length} projects`);

    // Check for required 5 projects
    if (projects.length !== 5) {
      console.warn(`⚠ Expected 5 projects, found ${projects.length}`);
    }

    // Validate each project
    const requiredFields = [
      'id',
      'title',
      'slug',
      'summary',
      'description',
      'stack',
      'features',
      'impact',
      'repo',
      'images',
    ];
    projects.forEach((project, index) => {
      const missing = requiredFields.filter(field => !project[field]);
      if (missing.length > 0) {
        console.error(
          `✗ Project ${index + 1} (${project.title || 'unknown'}) missing fields: ${missing.join(', ')}`
        );
        hasErrors = true;
      }
    });

    // Check for specific projects
    const expectedProjects = [
      'blogsage',
      'expense-tracker',
      'mayreneo',
      'airbnb-clone',
      'admin-dashboard',
    ];
    const foundSlugs = projects.map(p => p.slug);
    expectedProjects.forEach(slug => {
      if (!foundSlugs.includes(slug)) {
        console.warn(`⚠ Expected project not found: ${slug}`);
      }
    });

    console.log('✓ Projects validation complete');
  }
} catch (error) {
  console.error('✗ Error loading projects.json:', error.message);
  hasErrors = true;
}

// Validate experience
console.log('\nValidating experience.json...');
try {
  const experience = JSON.parse(fs.readFileSync(experiencePath, 'utf8'));

  if (!Array.isArray(experience)) {
    console.error('✗ Experience data must be an array');
    hasErrors = true;
  } else {
    console.log(`✓ Found ${experience.length} experience entries`);

    // Check for required 4 companies
    if (experience.length !== 4) {
      console.warn(
        `⚠ Expected 4 experience entries, found ${experience.length}`
      );
    }

    // Validate each experience
    const requiredFields = [
      'id',
      'company',
      'role',
      'startDate',
      'endDate',
      'location',
      'achievements',
    ];
    experience.forEach((exp, index) => {
      const missing = requiredFields.filter(field => !exp[field]);
      if (missing.length > 0) {
        console.error(
          `✗ Experience ${index + 1} (${exp.company || 'unknown'}) missing fields: ${missing.join(', ')}`
        );
        hasErrors = true;
      }

      // Validate achievements is an array
      if (exp.achievements && !Array.isArray(exp.achievements)) {
        console.error(
          `✗ Experience ${index + 1} achievements must be an array`
        );
        hasErrors = true;
      }
    });

    // Check for specific companies
    const expectedCompanies = ['Accenture', 'IDeaS', 'Techvestors', 'Zoopmart'];
    const foundCompanies = experience.map(e => e.company);
    expectedCompanies.forEach(company => {
      const found = foundCompanies.some(c =>
        c.toLowerCase().includes(company.toLowerCase())
      );
      if (!found) {
        console.warn(`⚠ Expected company not found: ${company}`);
      }
    });

    console.log('✓ Experience validation complete');
  }
} catch (error) {
  console.error('✗ Error loading experience.json:', error.message);
  hasErrors = true;
}

// Validate profile
console.log('\nValidating profile.json...');
try {
  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

  // Validate required fields
  const requiredFields = [
    'name',
    'title',
    'location',
    'email',
    'linkedin',
    'github',
    'portfolio',
    'skills',
    'languages',
    'summary',
  ];
  const missing = requiredFields.filter(field => !profile[field]);

  if (missing.length > 0) {
    console.error(`✗ Profile missing fields: ${missing.join(', ')}`);
    hasErrors = true;
  } else {
    console.log('✓ All required profile fields present');
  }

  // Validate arrays
  if (!Array.isArray(profile.skills)) {
    console.error('✗ Profile skills must be an array');
    hasErrors = true;
  } else {
    console.log(`✓ Found ${profile.skills.length} skills`);
  }

  if (!Array.isArray(profile.languages)) {
    console.error('✗ Profile languages must be an array');
    hasErrors = true;
  } else {
    console.log(`✓ Found ${profile.languages.length} languages`);
  }

  console.log('✓ Profile validation complete');
} catch (error) {
  console.error('✗ Error loading profile.json:', error.message);
  hasErrors = true;
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ Validation failed with errors');
  process.exit(1);
} else {
  console.log('✅ All data files validated successfully');
  process.exit(0);
}
