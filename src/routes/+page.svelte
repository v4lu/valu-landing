<script lang="ts">
	import { HeroHeader, HeroPattern } from '$lib/components/ui/patters';
</script>

<HeroPattern>
	<section class="container mt-14 grid gap-10 lg:mt-44 lg:grid-cols-[1fr,45%]">
		<HeroHeader />
		<div class="animate-fade-left relative w-full rounded-lg bg-gray-200 lg:h-[350px]">
			<img src="https://placehold.co/600x400" alt="Product showcase" class="h-full w-full object-cover" />
			<div class="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20"></div>
		</div>
	</section>
</HeroPattern>
