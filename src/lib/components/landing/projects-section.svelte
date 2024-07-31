<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { TitleLayout } from '../ui/title-layout';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';

	interface Project {
		title: string;
		description: string;
		image: string;
		badges: string[];
		mainBadge: string;
		link: string;
		github: string;
	}

	const projects: Project[] = [
		{
			title: 'AI-Powered Analytics Dashboard',
			description: 'Real-time data visualization with machine learning insights for business intelligence.',
			image: 'https://via.placeholder.com/510x286.png?text=AI+Analytics+Dashboard',
			badges: ['React', 'TensorFlow.js', 'D3.js'],
			mainBadge: 'AI',
			link: 'https://example.com/ai-dashboard',
			github: 'https://github.com/example/ai-dashboard'
		},
		{
			title: 'Blockchain-based Supply Chain',
			description: 'Transparent and secure supply chain management using blockchain technology.',
			image: 'https://via.placeholder.com/510x286.png?text=Blockchain+Supply+Chain',
			badges: ['Ethereum', 'Solidity', 'Web3.js'],
			mainBadge: 'Blockchain',
			link: 'https://example.com/blockchain-supply',
			github: 'https://github.com/example/blockchain-supply'
		},
		{
			title: 'AR Product Visualization',
			description: 'Augmented reality app for visualizing products in real-world environments.',
			image: 'https://via.placeholder.com/510x286.png?text=AR+Product+Viz',
			badges: ['Unity', 'ARKit', 'Vuforia'],
			mainBadge: 'AR',
			link: 'https://example.com/ar-product-viz',
			github: 'https://github.com/example/ar-product-viz'
		},
		{
			title: 'IoT Smart Home Hub',
			description: 'Central control system for managing various smart home devices and automations.',
			image: 'https://via.placeholder.com/510x286.png?text=IoT+Smart+Home',
			badges: ['Raspberry Pi', 'MQTT', 'Node.js'],
			mainBadge: 'IoT',
			link: 'https://example.com/iot-smart-home',
			github: 'https://github.com/example/iot-smart-home'
		},
		{
			title: 'Neural Network Music Composer',
			description: 'AI-powered application that generates original music compositions.',
			image: 'https://via.placeholder.com/510x286.png?text=AI+Music+Composer',
			badges: ['Python', 'TensorFlow', 'Magenta'],
			mainBadge: 'AI',
			link: 'https://example.com/ai-music-composer',
			github: 'https://github.com/example/ai-music-composer'
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
				<div
					class="relative flex w-full shrink-0 snap-center flex-col items-center justify-between gap-3 overflow-hidden rounded-md border border-white/10 bg-[rgba(255,255,255,0.05)] pb-4 backdrop-blur-sm md:min-w-[510px] md:basis-[calc(42.66%-12px)] md:gap-5"
				>
					<div class="absolute right-2 top-0 z-20 mt-2 flex flex-wrap justify-end gap-2 md:mt-3 md:max-w-[360px]">
						<Badge>{project.mainBadge}</Badge>
						{#each project.badges as badge}
							<span class="flex items-center justify-center rounded-md bg-primary px-1 text-xs">{badge}</span>
						{/each}
					</div>
					<a href={project.link} class="relative w-full cursor-pointer">
						<img
							src={project.image}
							alt={project.title}
							width={510}
							height={286}
							class="aspect-video h-full w-full lg:h-fit lg:w-fit"
						/>
						<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
					</a>
					<div class="flex h-fit flex-col justify-between px-4">
						<h3 class="text-xl text-white md:text-2xl">{project.title}</h3>
						<p class="md:text-md mt-1 text-sm text-gray-300">{project.description}</p>
						<Button>Visit Project</Button>
					</div>
				</div>
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
