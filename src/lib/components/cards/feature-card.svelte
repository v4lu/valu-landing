<script lang="ts">
	import type { Component } from 'svelte';

	type FeatureCardProps = {
		title: string;
		desc: string;
		Icon: Component;
	};

	let { title, desc, Icon }: FeatureCardProps = $props();
</script>

<li
	class="relative transform-gpu space-y-3 overflow-hidden rounded-xl border bg-transparent p-4 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ff97971f_inset]"
>
	<svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<pattern id="grid-48" width="48" height="48" patternUnits="userSpaceOnUse">
				<path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#grid-48)" />
	</svg>
	<div
		class="w-fit transform-gpu rounded-full p-4 [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ff97971f_inset]"
	>
		<Icon class="size-6 text-primary" />
	</div>
	<h4 class="px-2 text-lg font-bold">
		{title}
	</h4>
	<p class="px-2 pb-2 text-muted-foreground">{desc}</p>
</li>
