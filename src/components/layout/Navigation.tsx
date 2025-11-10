'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NAVIGATION_ITEMS, UI_CONFIG } from '@/lib/constants';
import { NavigationItem } from '@/types';

// Dynamically import ThemeToggle to avoid SSR issues
const ThemeToggle = dynamic(
  () =>
    import('@/components/ui/ThemeToggle').then(mod => ({
      default: mod.ThemeToggle,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-10 rounded-lg border bg-background animate-pulse" />
    ),
  }
);

interface NavigationProps {
  currentSection?: string;
}

export function Navigation({ currentSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to update active section and navigation background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      // Find the current section based on scroll position
      const sections = NAVIGATION_ITEMS.map(item => item.section);
      let current = 'hero';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = UI_CONFIG.scrollOffset + 50; // Add some buffer

          if (rect.top <= offset && rect.bottom >= offset) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section from props if provided
  useEffect(() => {
    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, [currentSection]);

  // Handle smooth scroll to section
  const handleNavClick = (href: string, section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offsetTop = element.offsetTop - UI_CONFIG.scrollOffset;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false); // Close mobile menu
  };

  // Handle keyboard navigation
  const handleKeyDown = (
    event: React.KeyboardEvent,
    href: string,
    section: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavClick(href, section);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.getElementById('mobile-navigation');
      const button = document.getElementById('mobile-menu-button');

      if (
        isMenuOpen &&
        nav &&
        button &&
        !nav.contains(event.target as Node) &&
        !button.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-[background-color,backdrop-filter,box-shadow] duration-200 ease-out
        ${
          isMenuOpen
            ? 'bg-background/80 backdrop-blur-lg shadow-sm supports-[backdrop-filter]:bg-background/60'
            : isScrolled
              ? 'bg-background/80 md:backdrop-blur-lg shadow-sm md:supports-[backdrop-filter]:bg-background/60'
              : 'bg-transparent'
        }
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('#hero', 'hero')}
              onKeyDown={e => handleKeyDown(e, '#hero', 'hero')}
              className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-md px-2 py-1"
              aria-label="Go to top of page"
            >
              PK
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAVIGATION_ITEMS.map((item: NavigationItem) => (
                <button
                  key={item.section}
                  onClick={() => handleNavClick(item.href, item.section)}
                  onKeyDown={e => handleKeyDown(e, item.href, item.section)}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
                    ${
                      activeSection === item.section
                        ? 'text-accent bg-accent/10 border border-accent/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                  aria-current={
                    activeSection === item.section ? 'page' : undefined
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              id="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors duration-150"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-navigation"
        className={`
          md:hidden transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }
        `}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="mobile-menu-button"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg shadow-lg supports-[backdrop-filter]:bg-background/90">
          {NAVIGATION_ITEMS.map((item: NavigationItem) => (
            <button
              key={item.section}
              onClick={() => handleNavClick(item.href, item.section)}
              onKeyDown={e => handleKeyDown(e, item.href, item.section)}
              className={`
                block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-150 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
                ${
                  activeSection === item.section
                    ? 'text-accent bg-accent/10 border border-accent/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              role="menuitem"
              aria-current={activeSection === item.section ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
