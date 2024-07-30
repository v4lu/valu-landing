<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '../ui/button';

	let scrollY: number;
	let headerElement: HTMLElement;

	const SCROLL_THRESHOLD = 50;

	function handleScroll() {
		scrollY = window.scrollY;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	$: isScrolled = scrollY > SCROLL_THRESHOLD;
</script>

<svelte:window bind:scrollY />

<div
	bind:this={headerElement}
	class="fixed inset-x-0 top-0 z-30 w-full transition-all duration-300 ease-in-out"
	class:bg-[rgba(3,0,20,0.08)]={isScrolled}
	class:backdrop-blur-[12px]={isScrolled}
>
	<header class="container flex w-full items-center justify-between py-4">
		<a href="/" class="flex items-center"> Logo </a>
		<div class="flex items-center">
			<Button class="">Hello World</Button>
		</div>
	</header>
	{#if isScrolled}
		<div class="absolute bottom-0 left-0 h-px w-full bg-header-border"></div>
	{/if}
</div>
