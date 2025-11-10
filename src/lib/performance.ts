// Performance monitoring utilities

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

function getRating(
  value: number,
  thresholds: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

// Measure and report Core Web Vitals
export function measureWebVitals() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver(list => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
      renderTime?: number;
      loadTime?: number;
    };

    if (lastEntry) {
      const value = lastEntry.renderTime || lastEntry.loadTime || 0;
      reportMetric({
        name: 'LCP',
        value,
        rating: getRating(value, THRESHOLDS.LCP),
      });
    }
  });

  try {
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    // LCP not supported
  }

  // First Input Delay (FID)
  const fidObserver = new PerformanceObserver(list => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      const fidEntry = entry as PerformanceEntry & { processingStart?: number };
      if (fidEntry.processingStart) {
        const value = fidEntry.processingStart - entry.startTime;
        reportMetric({
          name: 'FID',
          value,
          rating: getRating(value, THRESHOLDS.FID),
        });
      }
    });
  });

  try {
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    // FID not supported
  }

  // Cumulative Layout Shift (CLS)
  let clsValue = 0;
  let clsEntries: PerformanceEntry[] = [];

  const clsObserver = new PerformanceObserver(list => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      const layoutShiftEntry = entry as PerformanceEntry & {
        value?: number;
        hadRecentInput?: boolean;
      };
      if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
        clsValue += layoutShiftEntry.value;
        clsEntries.push(entry);
      }
    });

    reportMetric({
      name: 'CLS',
      value: clsValue,
      rating: getRating(clsValue, THRESHOLDS.CLS),
    });
  });

  try {
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    // CLS not supported
  }

  // First Contentful Paint (FCP)
  const fcpObserver = new PerformanceObserver(list => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      if (entry.name === 'first-contentful-paint') {
        reportMetric({
          name: 'FCP',
          value: entry.startTime,
          rating: getRating(entry.startTime, THRESHOLDS.FCP),
        });
      }
    });
  });

  try {
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    // FCP not supported
  }
}

// Report metric to analytics (placeholder for future implementation)
function reportMetric(metric: PerformanceMetric) {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[Performance] ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`
    );
  }

  // TODO: Send to analytics service
  // Example: gtag('event', 'web_vitals', {
  //   event_category: 'Web Vitals',
  //   event_label: metric.name,
  //   value: Math.round(metric.value),
  //   custom_map: { metric_rating: metric.rating }
  // });
}

// Measure resource loading performance
export function measureResourceTiming() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    // Get navigation timing
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      reportMetric({
        name: 'TTFB',
        value: ttfb,
        rating: getRating(ttfb, THRESHOLDS.TTFB),
      });

      const domContentLoaded =
        navigation.domContentLoadedEventEnd - navigation.fetchStart;
      const loadComplete = navigation.loadEventEnd - navigation.fetchStart;

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[Performance] DOM Content Loaded: ${domContentLoaded.toFixed(2)}ms`
        );
        console.log(
          `[Performance] Load Complete: ${loadComplete.toFixed(2)}ms`
        );
      }
    }

    // Get resource timing for images
    const resources = performance.getEntriesByType(
      'resource'
    ) as PerformanceResourceTiming[];
    const imageResources = resources.filter(
      resource =>
        resource.initiatorType === 'img' ||
        resource.name.includes('/images/') ||
        resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)
    );

    imageResources.forEach(resource => {
      const loadTime = resource.responseEnd - resource.requestStart;
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[Performance] Image ${resource.name.split('/').pop()}: ${loadTime.toFixed(2)}ms`
        );
      }
    });
  });
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  measureWebVitals();
  measureResourceTiming();
}

// Utility to preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = ['/images/headshot.svg', '/images/og-default.svg'];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Preload critical fonts (already handled by next/font)
  // But we can add additional font preloading if needed
}
