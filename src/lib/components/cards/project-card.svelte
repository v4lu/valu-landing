<script lang="ts">
	import { buttonVariants } from '../ui/button';
	import { cn } from '$lib/cn';

	type ProjectCardProps = {
		title: string;
		description: string;
		image: string;
		link: string;
	};

	let { title, description, image, link }: ProjectCardProps = $props();
</script>

<div
	class="relative flex h-full w-full shrink-0 snap-center flex-col items-center justify-between gap-3 overflow-hidden rounded-md border border-white/10 bg-[rgba(255,255,255,0.05)] md:min-h-[450px] md:gap-5"
>
	<div class="relative w-full cursor-pointer">
		<img src={image} alt={title} width={510} height={286} class="aspect-video h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
	</div>
	<div class="flex h-full w-full flex-1 flex-col items-start justify-between p-4">
		<div>
			<h3 class="text-lg font-semibold text-white md:text-2xl">{title}</h3>
			<p class="mt-2 text-sm text-gray-300 md:text-base">{description}</p>
		</div>
		<div class="mt-4 flex w-full justify-end">
			<a href={link} class={cn(buttonVariants())}> Visit Project </a>
		</div>
	</div>
</div>
