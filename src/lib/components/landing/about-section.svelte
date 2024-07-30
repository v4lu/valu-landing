<script lang="ts">
	import { FeatureCard } from '../cards';
	import { TitleLayout } from '../ui/title-layout';
	import { features } from '$lib/config';
</script>

<section class="container relative pb-20 pt-24 lg:py-14">
	<TitleLayout
		title="Transforming Your Digital Landscape"
		subtitle="Comprehensive web, software, and marketing solutions for your business"
	/>
	<div class="b relative mt-12 w-full">
		<ul class="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<FeatureCard {...feature} />
			{/each}
		</ul>
	</div>
</section>
