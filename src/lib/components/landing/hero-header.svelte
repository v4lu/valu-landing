<script lang="ts">
	import { Button } from '../ui/button';
	import { Heading } from '../ui/heading';
	import { scrollToSection } from '$lib/cn';
</script>

<div class="overflow-hidden">
	<div class="hero-container transform-gpu py-12">
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

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-container {
		animation: fadeInUp 0.5s ease-out forwards;
	}

	.hero-heading {
		opacity: 0;
		animation: fadeInUp 0.5s ease-out 0.2s forwards;
	}

	.hero-description {
		opacity: 0;
		animation: fadeInUp 0.5s ease-out 0.4s forwards;
	}

	.hero-button {
		opacity: 0;
		animation: fadeInUp 0.5s ease-out 0.6s forwards;
	}
</style>
