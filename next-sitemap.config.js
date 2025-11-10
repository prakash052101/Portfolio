/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://prakash.blogsage.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/download-resume'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/download-resume'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };

    // Higher priority for main pages
    if (path === '/') {
      customConfig.priority = 1.0;
      customConfig.changefreq = 'weekly';
    }

    // Project pages
    if (path.startsWith('/projects/')) {
      customConfig.priority = 0.8;
      customConfig.changefreq = 'monthly';
    }

    return customConfig;
  },
};
