import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium transition-transform duration-150 hover:scale-110';

    const variants = {
      default:
        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md',
      accent:
        'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg border border-indigo-700',
      outline:
        'border-2 border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300 shadow-sm hover:shadow-md',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
