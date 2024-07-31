<script lang="ts">
	import { TitleLayout } from '../ui/title-layout';
	import { cn } from '$lib/cn';

	const cells = [1, 2, 3, 4, 5];
	const expertiseAreas = [
		{
			title: 'AI & Machine Learning',
			description: 'Cutting-edge AI solutions to drive intelligent decision-making and automation.'
		},
		{
			title: 'Blockchain Development',
			description: 'Secure and transparent blockchain applications for various industries.'
		},
		{
			title: 'Cloud Architecture',
			description: 'Scalable and robust cloud solutions for optimal performance and reliability.'
		},
		{
			title: 'UX/UI Design',
			description: 'Intuitive and visually appealing interfaces that enhance user engagement.'
		},
		{
			title: 'Cybersecurity',
			description: 'Advanced security measures to protect your digital assets and data.'
		}
	];
</script>

<section class="container py-14">
	<TitleLayout
		title="Empowering Innovation Through Technology"
		subtitle="Discover our core competencies that drive digital transformation and business growth."
	/>
	<div class="mt-8 grid h-[600px] grid-cols-10 grid-rows-2 gap-2">
		{#each cells as i}
			<div
				class={cn(
					'rounded-lg p-1',
					i === 1 && 'col-span-3 row-span-2',
					i === 2 && 'col-span-4 row-span-1',
					i === 3 && 'col-span-3 row-span-1',
					i === 4 && 'col-span-3 row-span-1',
					i === 5 && 'col-span-4 row-span-1'
				)}
			>
				<div class="flex size-full items-center justify-center rounded-lg bg-zinc-900 text-xl">
					{i}
				</div>
			</div>
		{/each}
	</div>
</section>
