<script lang="ts">
	import { fly } from 'svelte/transition';
	import { FeatureCard } from '../cards';
	import { TitleLayout } from '../ui/title-layout';
	import { features } from '$lib/config';
	import { cn } from '$lib/cn';

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
					<li
						class={cn('feature-card', index === 0 ? 'snap-start' : 'snap-center')}
						style="min-width: 280px; max-width: 90vw;"
					>
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
