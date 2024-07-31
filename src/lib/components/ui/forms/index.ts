import { cva } from 'class-variance-authority';

export const inputVariants = cva('', {
  variants: {
    variant: {
      default:
        'w-full min-w-0 flex appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-muted-foreground focus:ring-1 focus:ring-inset focus-visible:outline-none focus:ring-primary sm:text-sm sm:leading-6',
      empty: 'mr-3 w-full resize-none appearance-none  border-none bg-transparent px-2 py-1 focus:outline-none'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export { default as Input } from './input.svelte';
export { default as Textarea } from './textarea.svelte';
