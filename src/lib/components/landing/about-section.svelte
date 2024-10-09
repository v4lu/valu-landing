<script lang="ts">
	import { fly } from 'svelte/transition';
	import { FeatureCard } from '../cards';
	import { TitleLayout } from '../ui/title-layout';
	import { features } from '$lib/config';

	let container = $state<HTMLElement>();
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
	<div class="relative mt-12 w-full">
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
</section>
