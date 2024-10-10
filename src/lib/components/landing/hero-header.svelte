<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Button } from '../ui/button';
	import { Heading } from '../ui/heading';
	import { scrollToSection } from '$lib/cn';
</script>

<div class="overflow-hidden">
	<div class="transform-gpu py-12">
		<div in:fade={{ duration: 300, delay: 300 }}>
			<Heading size="hero">Let us build great product for you!</Heading>
		</div>
		<div in:fade={{ duration: 300, delay: 600 }}>
			<p class="mt-4 max-w-3xl text-pretty text-muted-foreground lg:text-xl">
				Transform your ideas into reality with our expert team. We craft innovative solutions tailored to your unique
				needs, ensuring your product stands out in the market.
			</p>
		</div>
		<div in:fade={{ duration: 300, delay: 900 }}>
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
