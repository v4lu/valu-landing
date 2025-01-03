<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { TitleLayout } from '../ui/title-layout';
	import { ProjectCard } from '../cards';
	import { projects } from '$lib/config';

	let scrollContainer: HTMLElement;
	let container: HTMLElement;
	let isInView = $state(false);
	let hasAnimated = $state(false);
	let canScrollLeft = $state(false);
	let canScrollRight = $state(false);
	let isMobile = $state(false);

	function checkScrollButtons() {
		if (!scrollContainer) return;
		canScrollLeft = scrollContainer.scrollLeft > 0;
		canScrollRight = scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth;
	}

	function handleScroll(direction: 'left' | 'right') {
		if (!scrollContainer) return;
		const scrollAmount = isMobile ? 320 : 650;
		const targetScroll = scrollContainer.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

		scrollContainer.scrollTo({
			left: targetScroll,
			behavior: 'smooth'
		});
	}

	function checkVisibility() {
		if (!container || hasAnimated) return;
		const rect = container.getBoundingClientRect();
		const triggerPoint = window.innerHeight * 0.8;

		if (rect.top < triggerPoint) {
			isInView = true;
			hasAnimated = true;
		}
	}

	function handleResize() {
		isMobile = window.innerWidth < 768;
		checkScrollButtons();
	}

	onMount(() => {
		checkVisibility();
		handleResize();
		checkScrollButtons();
		window.addEventListener('scroll', checkVisibility);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('scroll', checkVisibility);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<section bind:this={container} class="container relative py-12 md:py-24">
	{#if isInView}
		<div in:fly={{ y: 50, duration: 400 }}>
			<TitleLayout
				title="Our Latest Projects"
				subtitle="Explore our portfolio of innovative digital solutions and success stories"
			/>
		</div>
	{/if}

	<div class="relative mt-8 md:mt-16">
		<div
			bind:this={scrollContainer}
			onscroll={checkScrollButtons}
			class="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-8 pt-4 md:gap-6"
		>
			{#each projects as project, i}
				{#if isInView}
					<div
						in:fly={{
							x: 50,
							duration: 300,
							delay: i * 200
						}}
						class="relative w-[85vw] min-w-[310px] md:w-auto md:min-w-[510px]"
					>
						<ProjectCard {...project} />
					</div>
				{/if}
			{/each}
		</div>

		{#if !isMobile}
			{#if canScrollLeft}
				<button
					onclick={() => handleScroll('left')}
					class="absolute -left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-background/80 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-background"
					in:fly={{ x: -20, duration: 300 }}
				>
					<ArrowLeft class="size-5" />
				</button>
			{/if}

			{#if canScrollRight}
				<button
					onclick={() => handleScroll('right')}
					class="absolute -right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-background/80 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-background"
					in:fly={{ x: 20, duration: 300 }}
				>
					<ArrowRight class="size-5" />
				</button>
			{/if}
		{/if}

		<div
			class="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/80 to-transparent md:w-32"
		></div>
		<div
			class="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/80 to-transparent md:w-32"
		></div>
	</div>
</section>

<style>
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
