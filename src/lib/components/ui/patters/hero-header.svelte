<script lang="ts">
	import { Button } from '../button';
	import { cn } from '$lib/cn';
</script>

<div class="animate-fade-down lg:animate-fade-up animate-once">
	<h1
		class={cn(
			'text-balance bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(100,_150,_200,_0.00)_142.18%)] bg-clip-text text-left text-4xl font-bold text-transparent drop-shadow-sm md:text-5xl lg:text-6xl xl:text-7xl'
		)}
	>
		Let us build great product for you!
	</h1>
	<p class="mt-4 max-w-xl text-pretty text-muted-foreground lg:text-lg">
		Transform your ideas into reality with our expert team. We craft innovative solutions tailored to your unique needs,
		ensuring your product stands out in the market.
	</p>
	<div class="mt-8 space-x-4">
		<button>Learn More</button>
		<Button variant="default">Get Started</Button>
	</div>
</div>
