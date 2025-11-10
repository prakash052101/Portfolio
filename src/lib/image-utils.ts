/**
 * Image optimization utilities for Next.js Image component
 * Provides blur placeholders and responsive sizing helpers
 */

/**
 * Generate a blur data URL for image placeholders
 * This prevents layout shift and provides a better loading experience
 *
 * @param width - Width of the placeholder
 * @param height - Height of the placeholder
 * @param color - Background color (default: light gray)
 * @returns Base64 encoded SVG data URL
 */
export function generateBlurDataURL(
  width: number = 400,
  height: number = 225,
  color: string = '#f1f5f9'
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial" 
        font-size="14" 
        fill="#94a3b8" 
        text-anchor="middle" 
        dy=".3em"
      >Loading...</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Predefined blur data URLs for common aspect ratios
 * Use these for consistent placeholder appearance across the app
 */
export const BLUR_DATA_URLS = {
  // 16:9 aspect ratio (video/project cards)
  video:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',

  // 1:1 aspect ratio (square/logos)
  square:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjVmOSIvPjwvc3ZnPg==',

  // 4:3 aspect ratio (standard images)
  standard:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',

  // Minimal placeholder (no text)
  minimal:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmNWY5Ii8+PC9zdmc+',
} as const;

/**
 * Responsive image sizes configuration
 * Use these with the Next.js Image component's sizes prop
 */
export const IMAGE_SIZES = {
  // Full width on mobile, 50% on tablet, 33% on desktop (project cards)
  projectCard: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',

  // Full width on mobile, 50% on desktop (two-column layout)
  twoColumn: '(max-width: 768px) 100vw, 50vw',

  // Fixed small sizes (logos, avatars)
  logo: '(max-width: 768px) 48px, 56px',
  avatar: '(max-width: 768px) 64px, 80px',

  // Full width (hero images, banners)
  fullWidth: '100vw',
} as const;

/**
 * Image quality settings for different use cases
 * Lower quality for thumbnails, higher for hero images
 */
export const IMAGE_QUALITY = {
  thumbnail: 75,
  standard: 85,
  high: 90,
  logo: 90,
} as const;

/**
 * Determine if an image should be prioritized for loading
 * Images above the fold should be prioritized
 *
 * @param index - Index of the image in a list
 * @param threshold - Number of images to prioritize (default: 3)
 * @returns Whether the image should be prioritized
 */
export function shouldPrioritizeImage(
  index: number,
  threshold: number = 3
): boolean {
  return index < threshold;
}

/**
 * Get loading strategy for an image based on its position
 *
 * @param index - Index of the image in a list
 * @param threshold - Number of images to load eagerly (default: 3)
 * @returns 'eager' or 'lazy'
 */
export function getImageLoadingStrategy(
  index: number,
  threshold: number = 3
): 'eager' | 'lazy' {
  return index < threshold ? 'eager' : 'lazy';
}
