<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { BlogCard } from '$lib/components/cards';
	import Heading from '$lib/components/ui/heading/heading.svelte';

	let { data } = $props();

	let mounted = $state(false);
	let container = $state<HTMLElement>();
	let titleVisible = $state(false);
	let visibleCards = $state(data.posts.map(() => false));

	function handleScroll() {
		if (container && mounted) {
			const rect = container.getBoundingClientRect();
			const triggerPoint = window.innerHeight * 0.8;

			if (!titleVisible && rect.top < triggerPoint) {
				titleVisible = true;
			}

			container.querySelectorAll('.blog-card').forEach((card, index) => {
				if (!visibleCards[index]) {
					const cardRect = card.getBoundingClientRect();
					if (cardRect.top < triggerPoint) {
						visibleCards[index] = true;
						visibleCards = [...visibleCards];
					}
				}
			});
		}
	}

	$effect(() => {
		mounted = true;
		setTimeout(() => {
			handleScroll();
		}, 100);
	});
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleScroll} />

<main bind:this={container} class="container mt-32 flex-1">
	<div class="relative z-10">
		{#if titleVisible}
			<div in:fly={{ y: 50, duration: 800 }}>
				<Heading size="title">Latest Stuff</Heading>
				<p
					class="mt-3 text-balance text-center text-muted-foreground lg:text-lg"
					in:fade={{ duration: 500, delay: 200 }}
				>
					Here you can check what we are doing
				</p>
			</div>
		{/if}
	</div>
	<ul class="mt-8 grid gap-8 md:mt-16 xl:grid-cols-3">
		{#each data.posts as post, index}
			<li class="blog-card">
				{#if visibleCards[index]}
					<div in:fly={{ y: 50, duration: 800, delay: index * 200 }}>
						<BlogCard
							path={post.path}
							coverImage={post.coverImage}
							title={post.title}
							desc={post.desc}
							date={post.date}
						/>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</main>
