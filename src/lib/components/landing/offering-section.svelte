<script lang="ts">
	import { TitleLayout } from '../ui/title-layout';
	import { cn } from '$lib/cn';

	interface CellProps {
		i: number;
	}

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
	<div>
		<div class="grid gap-2 md:grid-cols-4">
			{#each cells as i}
				<div
					class={cn(
						'rounded-lg p-1',
						i === 0 && 'h-full md:row-span-2',
						i === 1 && 'col-span-1 row-span-2',
						i === 2 && 'col-span-2',
						i === 3 && 'col-span-1',
						i === 4 && 'col-span-2'
					)}
				>
					<div class="flex size-full items-center justify-center rounded-lg bg-zinc-200 text-xl dark:bg-zinc-900">
						{i}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
