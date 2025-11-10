#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build...\n');

// Set production environment
process.env.NODE_ENV = 'production';

try {
  // 1. Type checking
  console.log('📝 Running TypeScript type check...');
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ Type check passed\n');

  // 2. Linting
  console.log('🔍 Running ESLint...');
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed\n');

  // 3. Format check
  console.log('💅 Checking code formatting...');
  execSync('npm run format:check', { stdio: 'inherit' });
  console.log('✅ Format check passed\n');

  // 4. Clean previous build
  console.log('🧹 Cleaning previous build...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }
  console.log('✅ Clean completed\n');

  // 5. Build application
  console.log('🏗️  Building application...');
  const startTime = Date.now();
  execSync('npm run build', { stdio: 'inherit' });
  const buildTime = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ Build completed in ${buildTime}s\n`);

  // 6. Analyze bundle size (if requested)
  if (process.argv.includes('--analyze')) {
    console.log('📊 Analyzing bundle size...');
    execSync('npm run build:analyze', { stdio: 'inherit' });
  }

  // 7. Generate build report
  console.log('📋 Generating build report...');
  const buildInfo = {
    timestamp: new Date().toISOString(),
    buildTime: `${buildTime}s`,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
  };

  fs.writeFileSync(
    path.join('.next', 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
  );
  console.log('✅ Build report generated\n');

  console.log('🎉 Production build completed successfully!');
  console.log(`📦 Build artifacts are in the .next directory`);
  console.log(`⏱️  Total build time: ${buildTime}s`);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
