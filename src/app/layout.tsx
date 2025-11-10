import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import {
  StructuredData,
  generatePersonStructuredData,
  generateWebSiteStructuredData,
} from '@/components/common/StructuredData';
import { generateHomeMetadata } from '@/components/common/SEOHead';
import { PerformanceMonitor } from '@/components/common/PerformanceMonitor';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// Optimize font loading with preload and display swap
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Only preload primary font
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = generateHomeMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content - Initialize theme before render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme and viewport */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured data */}
        <StructuredData data={generatePersonStructuredData()} />
        <StructuredData data={generateWebSiteStructuredData()} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="skip-to-main"
            aria-label="Skip to main content"
          >
            Skip to main content
          </a>

          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main id="main-content" className="relative flex-1" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
