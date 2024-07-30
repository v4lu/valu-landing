<script lang="ts">
	import { gsap } from 'gsap';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/cn';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { children, class: headerClassName = '' }: Props = $props();

	let headerElement: HTMLHeadingElement | undefined = $state();

	$effect(() => {
		if (!headerElement) return;
		const timeline = gsap.timeline({ defaults: { opacity: 0, y: 10 } });
		timeline.from(headerElement, { duration: 0.5, ease: 'power2.out' });
	});
</script>

<h1
	bind:this={headerElement}
	class={cn(
		headerClassName,
		'leading-0 md:leading-0 ml-2 mr-auto mt-1 max-w-md bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(100,_150,_200,_0.00)_142.18%)] bg-clip-text text-left text-3xl font-bold text-transparent drop-shadow-sm md:max-w-3xl md:pb-0 md:text-4xl lg:text-6xl xl:text-7xl'
	)}
>
	{#if children}
		{@render children()}
	{/if}
</h1>
