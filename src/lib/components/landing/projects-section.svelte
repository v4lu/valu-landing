<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { TitleLayout } from '../ui/title-layout';
	import { ProjectCard } from '../cards';

	interface Project {
		title: string;
		description: string;
		image: string;
	}

	const projects: Project[] = [
		{
			title: 'AI-Powered Analytics Dashboard',
			description: 'Real-time data visualization with machine learning insights for business intelligence.',
			image: 'https://via.placeholder.com/510x286.png?text=AI+Analytics+Dashboard'
		},
		{
			title: 'Blockchain-based Supply Chain',
			description: 'Transparent and secure supply chain management using blockchain technology.',
			image: 'https://via.placeholder.com/510x286.png?text=Blockchain+Supply+Chain'
		},
		{
			title: 'AR Product Visualization',
			description: 'Augmented reality app for visualizing products in real-world environments.',
			image: 'https://via.placeholder.com/510x286.png?text=AR+Product+Viz'
		},
		{
			title: 'IoT Smart Home Hub',
			description: 'Central control system for managing various smart home devices and automations.',
			image: 'https://via.placeholder.com/510x286.png?text=IoT+Smart+Home'
		},
		{
			title: 'Neural Network Music Composer',
			description: 'AI-powered application that generates original music compositions.',
			image: 'https://via.placeholder.com/510x286.png?text=AI+Music+Composer'
		}
	];

	let scrollContainer: HTMLElement;
	let isInView = false;
	let hasAnimated = false;

	function handleScroll(scrollOffset: number) {
		if (scrollContainer) {
			const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
			const newScrollLeft = scrollContainer.scrollLeft + scrollOffset;
			scrollContainer.scrollTo({
				left: Math.max(0, Math.min(maxScrollLeft, newScrollLeft)),
				behavior: 'smooth'
			});
		}
	}

	function handleResize() {
		const viewport = document.getElementById('projects-section');
		if (viewport && !hasAnimated) {
			const rect = viewport.getBoundingClientRect();
			const triggerPoint = viewport.offsetHeight * 0.5;
			isInView = rect.top < window.innerHeight - triggerPoint && rect.bottom >= 0;
			if (isInView) {
				hasAnimated = true;
			}
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('scroll', handleResize);
		};
	});
</script>

<section class="container py-14">
	<TitleLayout
		title="Crafting Digital Excellence"
		subtitle="From concept to execution, see how we've brought groundbreaking ideas to life."
	/>
	<div
		class="relative mt-4 flex gap-6 overflow-x-auto {isInView ? 'animate-fade-in' : ''}"
		style="--animation-delay: 300ms;"
	>
		<div
			bind:this={scrollContainer}
			class="hide-scrollbar flex transform gap-4 overflow-x-scroll px-5 py-6 transition-transform md:gap-7 md:px-0"
		>
			{#each projects as project}
				<ProjectCard {...project} />
			{/each}
		</div>
		<button
			on:click={() => handleScroll(-400)}
			aria-label="scroll left"
			class="absolute left-3 top-[45%] z-30 hidden rounded-md bg-white/10 p-1 transition-colors duration-300 hover:bg-white/20 md:block"
		>
			<ArrowLeft class="h-7 text-white" />
		</button>
		<button
			on:click={() => handleScroll(400)}
			aria-label="scroll right"
			class="absolute right-3 top-[45%] z-30 hidden rounded-md bg-white/10 p-1 transition-colors duration-300 hover:bg-white/20 md:block"
		>
			<ArrowRight class="h-7 text-white" />
		</button>
	</div>
</section>
