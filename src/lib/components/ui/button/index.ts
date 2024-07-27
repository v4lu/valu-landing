import { cva } from 'class-variance-authority';

export { default as Button } from './button.svelte';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: [
          'text-primary-foreground backdrop-blur-[8px] before:absolute before:inset-0 before:z-[-1]',
          'before:rounded-[inherit] before:transition-opacity before:duration-200 before:ease-cubic',
          'after:absolute after:inset-0 after:z-[-1] after:rounded-[inherit] after:transition-opacity',
          'after:duration-200 after:ease-cubic',
          // Before pseudo-element styles (lighter red)
          'before:bg-gradient-to-b before:from-[rgba(126,8,8,0)] before:to-[rgba(126,8,8,0.32)]',
          'before:bg-[rgba(255,47,47,0.12)]',
          'before:shadow-[inset_0_0_12px_rgba(255,151,151,0.24)]',
          'before:border before:border-[rgba(255,151,151,0.5)]',
          // After pseudo-element styles (darker red)
          'after:bg-gradient-to-b after:from-[rgba(126,8,8,0)] after:to-[rgba(126,8,8,0.42)]',
          'after:bg-[rgba(255,47,47,0.24)]',
          'after:shadow-[inset_0_0_12px_rgba(255,151,151,0.44)]',
          'after:border after:border-[rgba(255,151,151,0.6)]',
          // Hover states
          'after:opacity-0 hover:before:opacity-0 hover:after:opacity-100'
        ]
      },
      size: {
        default: 'text-sm px-4 rounded-md py-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);
