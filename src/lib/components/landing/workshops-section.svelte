<script lang="ts">
	import { fly } from 'svelte/transition';
	import { TitleLayout } from '../ui/title-layout';
	import { WorkshopsCard } from '../cards';
	import { cn } from '$lib/cn';
	import type { Post } from '$lib/types';

	type Props = {
		items: Post[];
	};

	let { items }: Props = $props();
	let container = $state<HTMLElement>();
	let scrollContainer = $state<HTMLElement>();
	let titleVisible = $state(false);
	let visibleItems = $state(items.map(() => false));

	function handleScroll() {
		if (container) {
			const rect = container.getBoundingClientRect();
			const triggerPoint = window.innerHeight * 0.8;
			if (!titleVisible && rect.top < triggerPoint) {
				titleVisible = true;
			}
			container.querySelectorAll('.workshop-item').forEach((item, index) => {
				if (!visibleItems[index]) {
					const itemRect = item.getBoundingClientRect();
					if (itemRect.top < triggerPoint) {
						visibleItems[index] = true;
						visibleItems = [...visibleItems];
					}
				}
			});
		}
	}

	$effect(() => {
		setTimeout(() => {
			handleScroll();
		}, 100);
	});
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleScroll} />

<section bind:this={container} class="container py-14">
	<div class="title-container" style="min-height: 100px;">
		{#if titleVisible}
			<div in:fly={{ y: 50, duration: 800 }}>
				<TitleLayout title="Empowering Innovation Through Technology" subtitle="Latest stuff from our workshops" />
			</div>
		{/if}
	</div>

	<!-- Desktop/Tablet View -->
	<div class="mt-8 hidden h-[600px] grid-cols-10 grid-rows-2 gap-6 md:grid">
		{#each items as item, i}
			<div
				class={cn(
					'workshop-item overflow-hidden rounded-lg',
					i === 0 && 'col-span-3 row-span-2',
					i === 1 && 'col-span-4 row-span-1',
					i === 2 && 'col-span-3 row-span-1',
					i === 3 && 'col-span-3 row-span-1',
					i === 4 && 'col-span-4 row-span-1'
				)}
			>
				{#if visibleItems[i]}
					<div class="h-full w-full" in:fly={{ y: 50, duration: 800, delay: i * 200 }}>
						<WorkshopsCard
							class={cn('h-full w-full', i === 0 && 'bg-cover bg-no-repeat')}
							date={item.date}
							title={item.title}
							desc={item.desc}
							path={item.path}
							coverImage={item.coverImage}
						/>
					</div>
				{:else}
					<div class="h-full w-full"></div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Mobile View -->
	<div class="relative mt-8 md:hidden">
		<div class="overflow-hidden">
			<ul bind:this={scrollContainer} class="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto">
				{#each items as item, i}
					<li class="workshop-item snap-center" style="min-width: 280px; max-width: 90vw;">
						{#if visibleItems[i]}
							<div in:fly={{ y: 50, duration: 800, delay: i * 200 }}>
								<WorkshopsCard
									class="h-[20rem] w-full"
									date={item.date}
									title={item.title}
									desc={item.desc}
									path={item.path}
									coverImage={item.coverImage}
								/>
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
