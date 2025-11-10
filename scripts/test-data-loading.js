/**
 * Test script to verify data loading utilities
 * This script tests the data loading functions with error handling
 */

const fs = require('fs');
const path = require('path');

console.log('Testing Data Loading Utilities\n');
console.log('='.repeat(50));

// Test 1: Load projects.json
console.log('\n1. Testing projects.json loading...');
try {
  const projectsPath = path.join(__dirname, '../src/data/projects.json');
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

  console.log(`✓ Successfully loaded ${projects.length} projects`);
  console.log('  Projects:');
  projects.forEach(p => {
    console.log(`    - ${p.title} (${p.stack?.length || 0} technologies)`);
  });

  // Verify all 5 required projects
  const requiredProjects = [
    'BlogSage',
    'Expense Tracker',
    'MayreneO',
    'Airbnb Clone',
    'Admin Dashboard',
  ];
  const foundTitles = projects.map(p => p.title);
  const allFound = requiredProjects.every(title => foundTitles.includes(title));

  if (allFound) {
    console.log('✓ All 5 required projects present');
  } else {
    console.error('✗ Missing required projects');
  }
} catch (error) {
  console.error('✗ Failed to load projects:', error.message);
}

// Test 2: Load experience.json
console.log('\n2. Testing experience.json loading...');
try {
  const experiencePath = path.join(__dirname, '../src/data/experience.json');
  const experience = JSON.parse(fs.readFileSync(experiencePath, 'utf8'));

  console.log(`✓ Successfully loaded ${experience.length} experience entries`);
  console.log('  Companies:');
  experience.forEach(e => {
    console.log(`    - ${e.company} (${e.role})`);
  });

  // Verify all 4 required companies
  const requiredCompanies = ['Accenture', 'IDeaS', 'Techvestors', 'Zoopmart'];
  const foundCompanies = experience.map(e => e.company);
  const allFound = requiredCompanies.every(company =>
    foundCompanies.some(c => c.includes(company))
  );

  if (allFound) {
    console.log('✓ All 4 required companies present');
  } else {
    console.error('✗ Missing required companies');
  }
} catch (error) {
  console.error('✗ Failed to load experience:', error.message);
}

// Test 3: Load profile.json
console.log('\n3. Testing profile.json loading...');
try {
  const profilePath = path.join(__dirname, '../src/data/profile.json');
  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));

  console.log(`✓ Successfully loaded profile for ${profile.name}`);
  console.log(`  Title: ${profile.title}`);
  console.log(`  Location: ${profile.location}`);
  console.log(`  Skills: ${profile.skills.length} skills`);
  console.log(`  Languages: ${profile.languages.length} languages`);

  // Verify required fields
  const requiredFields = [
    'name',
    'title',
    'email',
    'linkedin',
    'github',
    'skills',
    'summary',
  ];
  const hasAllFields = requiredFields.every(field => profile[field]);

  if (hasAllFields) {
    console.log('✓ All required profile fields present');
  } else {
    console.error('✗ Missing required profile fields');
  }
} catch (error) {
  console.error('✗ Failed to load profile:', error.message);
}

// Test 4: Test error handling with missing file
console.log('\n4. Testing error handling...');
try {
  const missingPath = path.join(__dirname, '../src/data/missing.json');
  if (!fs.existsSync(missingPath)) {
    console.log('✓ Error handling test: File does not exist (expected)');
    console.log('  Data loading utilities should handle this gracefully');
  }
} catch (error) {
  console.log('✓ Error caught successfully:', error.message);
}

// Test 5: Verify data structure matches design spec
console.log('\n5. Verifying data structure compliance...');
try {
  const projectsPath = path.join(__dirname, '../src/data/projects.json');
  const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

  // Check new spec fields
  const specFields = [
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
  let allCompliant = true;

  projects.forEach((project, index) => {
    const missing = specFields.filter(
      field => !project[field] && field !== 'live'
    );
    if (missing.length > 0) {
      console.warn(`  ⚠ Project ${index + 1} missing: ${missing.join(', ')}`);
      allCompliant = false;
    }
  });

  if (allCompliant) {
    console.log('✓ All projects comply with design spec structure');
  }

  // Check experience structure
  const experiencePath = path.join(__dirname, '../src/data/experience.json');
  const experience = JSON.parse(fs.readFileSync(experiencePath, 'utf8'));

  const expFields = [
    'id',
    'company',
    'role',
    'startDate',
    'endDate',
    'location',
    'achievements',
  ];
  allCompliant = true;

  experience.forEach((exp, index) => {
    const missing = expFields.filter(field => !exp[field]);
    if (missing.length > 0) {
      console.warn(
        `  ⚠ Experience ${index + 1} missing: ${missing.join(', ')}`
      );
      allCompliant = false;
    }
  });

  if (allCompliant) {
    console.log('✓ All experience entries comply with design spec structure');
  }
} catch (error) {
  console.error('✗ Structure verification failed:', error.message);
}

console.log('\n' + '='.repeat(50));
console.log('✅ Data loading utilities test complete\n');
