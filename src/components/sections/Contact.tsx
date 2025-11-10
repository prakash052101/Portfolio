import { ContactForm } from '@/components/ui/ContactForm';
import { Button } from '@/components/ui/Button';
import {
  AnimatedSection,
  AnimatedItem,
} from '@/components/common/DynamicAnimatedSection';
import { CONTACT_INFO, RESUME_CONFIG } from '@/lib/constants';

export function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen bg-muted/30 py-16"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <AnimatedSection>
          <header className="text-center mb-16">
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Let&apos;s Work Together
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I&apos;m always interested in new opportunities and exciting
              projects. Whether you have a question, want to collaborate, or
              just want to say hello, I&apos;d love to hear from you.
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection
          delay={0.2}
          staggerChildren
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Contact Information */}
          <AnimatedItem>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
                  Get In Touch
                </h3>

                {/* Contact Details */}
                <address className="not-italic space-y-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-5 h-5 text-accent flex-shrink-0"
                      aria-hidden="true"
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-foreground hover:text-accent focus:text-accent transition-colors min-h-[44px] flex items-center break-all"
                      aria-label={`Send email to ${CONTACT_INFO.email}`}
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className="w-5 h-5 text-accent flex-shrink-0"
                      aria-hidden="true"
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">
                      {CONTACT_INFO.location}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className="w-5 h-5 text-accent flex-shrink-0"
                      aria-hidden="true"
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-foreground hover:text-accent focus:text-accent transition-colors min-h-[44px] flex items-center"
                      aria-label={`Call ${CONTACT_INFO.phone}`}
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </address>
              </div>

              {/* Social Links */}
              <nav aria-label="Social media profiles">
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                  Connect With Me
                </h4>
                <div className="flex flex-wrap gap-4">
                  {CONTACT_INFO.socialLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-background border border-border hover:border-accent hover:text-accent focus:border-accent focus:text-accent transition-colors min-h-[44px]"
                      aria-label={`Visit my ${link.label} profile (opens in new tab)`}
                    >
                      <SocialIcon
                        icon={link.icon}
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>

              {/* Resume Download */}
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                  Resume
                </h4>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  Download my resume to learn more about my experience and
                  skills.
                </p>
                <Button asChild>
                  <a
                    href={RESUME_CONFIG.downloadPath}
                    download={RESUME_CONFIG.filename}
                    className="inline-flex items-center"
                    aria-describedby="resume-download-description"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Download Resume
                  </a>
                </Button>
                <span id="resume-download-description" className="sr-only">
                  Downloads PDF resume with detailed work experience, skills,
                  and education
                </span>
              </div>

              {/* Response Time */}
              <aside className="bg-background rounded-lg p-4 sm:p-6 border border-border">
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  Quick Response
                </h4>
                <p className="text-muted-foreground text-sm">
                  I typically respond to messages within 24 hours. For urgent
                  inquiries, feel free to reach out via email or LinkedIn.
                </p>
              </aside>
            </div>
          </AnimatedItem>

          {/* Contact Form */}
          <AnimatedItem>
            <div className="bg-background rounded-lg p-6 sm:p-8 border border-border shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">
                Send a Message
              </h3>
              <ContactForm />

              {/* Social Icon Buttons */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Or connect with me on:
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/prakash052101/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-purple-500 hover:bg-indigo-50 dark:hover:bg-purple-950/20 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Visit my LinkedIn profile (opens in new tab)"
                  >
                    <svg
                      className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-purple-400 transition-colors duration-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/prakash052101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-purple-500 hover:bg-indigo-50 dark:hover:bg-purple-950/20 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Visit my GitHub profile (opens in new tab)"
                  >
                    <svg
                      className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-purple-400 transition-colors duration-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Social Icon Component
interface SocialIconProps {
  icon?: string;
  className?: string;
}

function SocialIcon({ icon, className = 'w-5 h-5' }: SocialIconProps) {
  switch (icon) {
    case 'github':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'blog':
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      );
  }
}
