<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { Button } from '../ui/button';
	import { Heading } from '../ui/heading';
	import { scrollToSection } from '$lib/cn';

	let container: HTMLElement;

	onMount(() => {
		const timeline = gsap.timeline({ defaults: { opacity: 0, y: 50 } });

		timeline
			.from(container, { duration: 0.5, opacity: 0 })
			.from('.hero-heading', { duration: 0.5 })
			.from('.hero-description', { duration: 0.5 }, '-=0.2')
			.from('.hero-button', { duration: 0.5 }, '-=0.2');
	});
</script>

<div class="overflow-hidden" bind:this={container}>
	<div class="transform-gpu py-12">
		<div class="hero-heading">
			<Heading size="hero">Let us build great product for you!</Heading>
		</div>
		<div class="hero-description">
			<p class="mt-4 max-w-3xl text-pretty text-muted-foreground lg:text-xl">
				Transform your ideas into reality with our expert team. We craft innovative solutions tailored to your unique
				needs, ensuring your product stands out in the market.
			</p>
		</div>
		<div class="hero-button">
			<div class="mt-8 space-x-4">
				<Button
					onclick={(e) => scrollToSection(e, 'contact', -50)}
					size="lg"
					variant="default"
					class="px-8 py-3 text-base"
				>
					Contact Us
				</Button>
			</div>
		</div>
	</div>
</div>
