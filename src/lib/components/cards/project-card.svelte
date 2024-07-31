<script lang="ts">
	import { Button } from '../ui/button';

	type ProjectCardProps = {
		title: string;
		description: string;
		image: string;
	};

	let { title, description, image }: ProjectCardProps = $props();
</script>

<div
	class="relative flex w-full shrink-0 snap-center flex-col items-center justify-between gap-3 overflow-hidden rounded-md border border-white/10 bg-[rgba(255,255,255,0.05)] pb-4 backdrop-blur-sm md:min-w-[510px] md:basis-[calc(42.66%-12px)] md:gap-5"
>
	<div class="relative w-full cursor-pointer">
		<img src={image} alt={title} width={510} height={286} class="aspect-video h-full w-full lg:h-fit lg:w-fit" />
		<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
	</div>
	<div class="flex h-fit flex-col justify-between px-4">
		<h3 class="text-xl text-white md:text-2xl">{title}</h3>
		<p class="md:text-md mt-1 text-sm text-gray-300">{description}</p>
		<div class="mt-2 flex w-full justify-end">
			<Button class="w-fit ">Visit Project</Button>
		</div>
	</div>
</div>
