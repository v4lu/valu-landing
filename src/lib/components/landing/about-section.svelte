<script lang="ts">
	import { fly } from 'svelte/transition';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { FeatureCard } from '../cards';
	import { TitleLayout } from '../ui/title-layout';
	import { Button } from '../ui/button';
	import { features } from '$lib/config';

	let container = $state<HTMLElement>();
	let scrollContainer = $state<HTMLElement>();
	let titleVisible = $state(false);
	let visibleFeatures = $state(features.map(() => false));
	let pageLoaded = $state(false);

	function handleScroll() {
		if (container && pageLoaded) {
			const rect = container.getBoundingClientRect();
			const triggerPoint = window.innerHeight * 0.8; // 80% of viewport height
			if (!titleVisible && rect.top < triggerPoint) {
				titleVisible = true;
			}
			container.querySelectorAll('.feature-card').forEach((card, index) => {
				if (!visibleFeatures[index]) {
					const cardRect = card.getBoundingClientRect();
					if (cardRect.top < triggerPoint) {
						visibleFeatures[index] = true;
						visibleFeatures = [...visibleFeatures];
					}
				}
			});
		}
	}

	function scrollHorizontally(direction: 'left' | 'right') {
		if (scrollContainer) {
			const scrollAmount = direction === 'left' ? -300 : 300;
			scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	}

	$effect(() => {
		setTimeout(() => {
			pageLoaded = true;
			handleScroll();
		}, 100);
	});
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleScroll} />

<section bind:this={container} class="container relative pb-20 pt-24 lg:py-14">
	<div class="title-container" style="min-height: 120px;">
		{#if titleVisible}
			<div in:fly={{ y: 50, duration: 800 }}>
				<TitleLayout
					title="Transforming Your Digital Landscape"
					subtitle="Comprehensive web, software, and marketing solutions for your business"
				/>
			</div>
		{/if}
	</div>

	<!-- Desktop/Tablet View -->
	<div class="relative mt-12 hidden w-full md:block">
		<ul class="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature, index}
				<li class="feature-card" style="min-height: 200px;">
					{#if visibleFeatures[index]}
						<div in:fly={{ y: 50, duration: 800, delay: index * 200 }}>
							<FeatureCard {...feature} />
						</div>
					{:else}
						<div class="h-full w-full"></div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>

	<div class="relative mt-12 w-full md:hidden">
		<div class="overflow-hidden">
			<ul bind:this={scrollContainer} class="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto">
				{#each features as feature, index}
					<li class="feature-card snap-center" style="min-width: 280px; max-width: 90vw;">
						{#if visibleFeatures[index]}
							<div in:fly={{ y: 50, duration: 800, delay: index * 200 }}>
								<FeatureCard class="h-[20rem]" {...feature} />
							</div>
						{:else}
							<div class="h-full w-full"></div>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
		<Button
			onclick={() => scrollHorizontally('left')}
			class="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/50 p-2"
		>
			<ChevronLeft size={24} />
		</Button>
		<Button
			onclick={() => scrollHorizontally('right')}
			class="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-800/50 p-2"
		>
			<ChevronRight size={24} />
		</Button>
	</div>
</section>

<style>
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
