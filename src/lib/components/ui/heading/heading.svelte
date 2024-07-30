<script lang="ts">
	import type { VariantProps } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';
	import { headerStyles } from '.';
	import { cn } from '$lib/cn';

	type Size = VariantProps<typeof headerStyles>['size'];

	type HeaderPropsType = HTMLAttributes<HTMLElement> & {
		class?: string;
		size?: Size;
	};

	let { children, class: className, size, ...rest }: HeaderPropsType = $props();
	let element = $derived(size === 'hero' ? 'h1' : size === 'title' ? 'h2' : 'h3');
</script>

<svelte:element this={element} {...rest} class={cn(headerStyles({ size, className }))}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
