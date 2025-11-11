import { Project } from '@/types/project';

/**
 * Sample featured projects data
 * This data structure follows the new Project interface for the Featured Projects section
 */
export const featuredProjects: Project[] = [
  {
    id: 'blogsage',
    title: 'Blogsage',
    shortDescription:
      'Full-stack blogging platform with MERN stack and automated CI/CD.',
    description:
      'A comprehensive blogging platform built with MERN stack, featuring real-time editing, user authentication, and content management. Deployed using Docker and Jenkins with automated CI/CD pipelines. The platform includes advanced features like markdown support, image optimization, and SEO-friendly URLs.',
    image: '/images/projects/blogsage-thumb.svg',
    images: [
      '/images/projects/blogsage-homepage.jpg',
      '/images/projects/blogsage-thumb.svg',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Docker', 'Jenkins'],
    keyFeatures: [
      'Real-time markdown editor with live preview',
      'User authentication and authorization with JWT',
      'Image optimization and CDN integration',
      'SEO-friendly URLs and meta tags',
      'Automated CI/CD pipeline with Docker and Jenkins',
    ],
    techStack: [
      'React',
      'Tailwind CSS',
      'Flowbite React',
      'Node.js',
      'Express',
      'MongoDB',
      'Firebase Auth',
      'Redis',
      'Docker',
      'Jenkins',
      'Nginx',
    ],
    liveUrl: 'https://www.blogsage.in/',
    codeUrl: '',
    featured: true,
    order: 1,
  },
  {
    id: 'fynli',
    title: 'Fynli',
    shortDescription:
      'Full-stack personal finance tracker with analytics and JWT-secured authentication.',
    description:
      'A full-stack MERN application designed to help users track, analyze, and visualize their expenses in an interactive and secure way. It features category-wise filtering, budget tracking, and detailed monthly/yearly insights presented through dynamic charts. The app provides real-time updates, secure authentication, and responsive UI for a seamless experience across devices.',
    image: '/images/projects/fynli.jpg',
    images: ['/images/projects/fynli.jpg'],
    tags: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    keyFeatures: [
      'Add, edit, and delete expense records with instant state updates',
      'Category and date range filters for targeted analysis',
      'Budget limit setup with progress indicators',
      'Dynamic visualizations using Chart.js (monthly/yearly summaries)',
      'JWT-based secure login and registration',
      'Responsive design with Tailwind CSS and modular React components',
    ],
    techStack: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
      'JWT Authentication',
      'Chart.js',
      'Axios',
      'Context API',
      'Tailwind CSS',
    ],
    liveUrl: '',
    codeUrl: 'https://github.com/prakash052101/expense-tracker-app',
    featured: true,
    order: 2,
  },
  {
    id: 'mayreneo',
    title: 'MayreneO',
    shortDescription:
      'Modern landing website with smooth UI, responsive layout, and elegant branding.',
    description:
      'MayreneO is a visually captivating landing website designed with React and Tailwind CSS. It focuses on elegant design, smooth transitions, and a modern component-based structure. Built with attention to detail, it demonstrates advanced front-end design practices, responsive layouts, and optimized asset management for performance and accessibility.',
    image: '/images/projects/mayreneo-thumb.svg',
    images: [
      '/images/projects/mayreneo-home.jpg',
      '/images/projects/mayreneo-thumb.svg',
    ],
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    keyFeatures: [
      'Responsive and adaptive layout for all screen sizes',
      'Animated transitions using Framer Motion',
      'Component-driven structure with reusable sections',
      'Optimized images and assets for fast loading',
      'Clean, minimalist design focusing on user experience',
    ],
    techStack: [
      'React.js',
      'Tailwind CSS',
      'JavaScript (ES6+)',
      'React Router',
      'Framer Motion',
    ],
    liveUrl: 'https://mayreneo.blogsage.in/',
    codeUrl: 'https://github.com/prakash052101/MayreneO',
    featured: true,
    order: 3,
  },
  {
    id: 'airbnb-clone',
    title: 'Airbnb Clone',
    shortDescription:
      'Full-stack property rental platform with booking flow and map integration.',
    description:
      'A modern full-stack web application inspired by Airbnb, allowing users to list, browse, and book properties with a real-world workflow. Built using Next.js and Prisma ORM with MongoDB, it includes secure authentication, property creation, image uploads via Cloudinary, and interactive map-based exploration powered by Mapbox. The project demonstrates a complete full-stack architecture, from database design to UI responsiveness.',
    image: '/images/projects/airbnb-clone-thumb.svg',
    images: ['/images/projects/airbnb-clone-thumb.svg'],
    tags: ['Next.js', 'MongoDB', 'Prisma', 'Mapbox'],
    keyFeatures: [
      'Property listing creation with image uploads',
      'Interactive map search using Mapbox',
      'Full booking flow with calendar-based date selection',
      'NextAuth-based authentication (credentials and OAuth)',
      'Favorite and saved listings management',
      'Responsive and mobile-friendly design',
    ],
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT Authentication',
      'Multer',
      'Axios',
      'Tailwind CSS',
      'bcryptjs',
    ],
    liveUrl: '',
    codeUrl: 'https://github.com/prakash052101/Airbnb-Clone',
    featured: true,
    order: 4,
  },
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard',
    shortDescription:
      'Comprehensive admin panel with analytics and data management.',
    description:
      'A feature-rich admin dashboard for managing applications, users, and data. Built with React and modern UI libraries, featuring real-time analytics, data tables with sorting and filtering, user management, and customizable widgets. Includes dark mode support and responsive design.',
    image: '/images/projects/admin-dashboard-thumb.svg',
    images: [
      '/images/projects/admin-dashboard-analytics.jpg',
      '/images/projects/admin-dashboard-thumb.svg',
    ],
    tags: ['React', 'TypeScript', 'Material-UI', 'Redux'],
    keyFeatures: [
      'Real-time analytics and data visualization',
      'User and role management',
      'Data tables with advanced filtering',
      'Customizable dashboard widgets',
      'Dark mode and responsive design',
    ],
    techStack: [
      'React',
      'TypeScript',
      'Material-UI',
      'Redux',
      'Chart.js',
      'Node.js',
      'Express',
    ],
    liveUrl: 'https://admin-frontend-ollu.onrender.com',
    codeUrl: 'https://github.com/prakash052101/MERN-fullstack-admin-dashboard',
    featured: true,
    order: 5,
  },
  {
    id: 'tradepaisa',
    title: 'TradePaisa',
    shortDescription:
      'Responsive company website for a financial services brand.',
    description:
      "TradePaisa is a modern, responsive homepage developed for a financial and trading consultancy brand. It features an elegant design, animated sections, and smooth navigation highlighting the company's services, strategies, and contact information. Built using React with TypeScript and Vite, it focuses on fast performance, scalability, and clean UI/UX design.",
    image: '/images/projects/tradepaisa-thumb.svg',
    images: [
      '/images/projects/tradepaisa-homepage.jpg',
      '/images/projects/tradepaisa-thumb.svg',
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    keyFeatures: [
      'Fully responsive layout optimized for all devices',
      'Animated hero and content sections with Framer Motion',
      'Dedicated pages for About, Education, and Strategies',
      'Modern component-based structure using React + TypeScript',
      'Fast builds and performance optimization via Vite',
      'Interactive WhatsApp widget for user engagement',
    ],
    techStack: [
      'React.js',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'React Router DOM',
      'Flowbite',
      'React Icons',
    ],
    liveUrl: 'https://www.tradepaisa.in',
    codeUrl: '',
    featured: true,
    order: 6,
  },
];

/**
 * Get all featured projects
 */
export const getFeaturedProjects = (): Project[] => {
  return featuredProjects.filter(project => project.featured);
};

/**
 * Get a single project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return featuredProjects.find(project => project.id === id);
};

/**
 * Get projects sorted by order
 */
export const getSortedProjects = (): Project[] => {
  return [...featuredProjects].sort((a, b) => (a.order || 0) - (b.order || 0));
};
