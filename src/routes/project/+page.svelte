<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Heading from '$lib/components/ui/heading/heading.svelte';

	let container = $state<HTMLElement>();
</script>

<svelte:head>
	<title>Valu Media - Projects</title>
</svelte:head>
<main bind:this={container} class="container mt-32 flex-1">
	<div class="relative z-10">
		<div in:fly={{ y: 50, duration: 800 }}>
			<Heading size="title">Our Projects</Heading>
			<p class="mt-3 text-balance text-center text-muted-foreground lg:text-lg" in:fade={{ duration: 500, delay: 200 }}>
				Stay tuned
			</p>
		</div>
	</div>
</main>
