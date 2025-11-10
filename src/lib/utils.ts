import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(sectionId: string, offset: number = 80) {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Format a date string in YYYY-MM format to a readable format
 * @param dateString - Date in YYYY-MM format (e.g., "2024-04")
 * @returns Formatted date string (e.g., "Apr 2024")
 */
export function formatMonthYear(dateString: string): string {
  if (dateString === 'Present') return 'Present';

  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(date);
}

/**
 * Format a date range from start to end
 * @param startDate - Start date in YYYY-MM format
 * @param endDate - End date in YYYY-MM format or 'Present'
 * @returns Formatted date range (e.g., "Apr 2024 – Present")
 */
export function formatDateRange(
  startDate: string,
  endDate: string | 'Present'
): string {
  const start = formatMonthYear(startDate);
  const end = endDate === 'Present' ? 'Present' : formatMonthYear(endDate);
  return `${start} – ${end}`;
}

/**
 * Calculate duration between two dates
 * @param startDate - Start date in YYYY-MM format
 * @param endDate - End date in YYYY-MM format or 'Present'
 * @returns Duration string (e.g., "1 year 3 months")
 */
export function calculateDuration(
  startDate: string,
  endDate: string | 'Present'
): string {
  const [startYear, startMonth] = startDate.split('-').map(Number);

  let endYear: number;
  let endMonth: number;

  if (endDate === 'Present') {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  } else {
    [endYear, endMonth] = endDate.split('-').map(Number);
  }

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} year${years > 1 ? 's' : ''}`);
  }
  if (months > 0) {
    parts.push(`${months} month${months > 1 ? 's' : ''}`);
  }

  return parts.length > 0 ? parts.join(' ') : '0 months';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Debounce function for performance optimization
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
