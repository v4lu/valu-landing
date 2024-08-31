import { cva } from 'class-variance-authority';

export const headerStyles = cva(
	'text-balance bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(100,_150,_200,_0.00)_142.18%)] bg-clip-text text-transparent drop-shadow-sm',
	{
		variants: {
			size: {
				hero: 'text-4xl font-bold md:text-5xl text-left lg:text-6xl xl:text-7xl',
				title: 'text-center text-3xl md:text-[48px] md:leading-[60px] font-semibold',
				subtitle: 'text-center text-xl md:text-2xl font-medium'
			}
		},
		defaultVariants: {
			size: 'title'
		}
	}
);

export { default as Heading } from './heading.svelte';
