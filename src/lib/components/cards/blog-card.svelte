<script lang="ts">
	type FeatureCardProps = {
		title: string;
		desc: string;
		date: string;
		path: string;
		coverImage: string;
	};
	let { title, desc, path, coverImage }: FeatureCardProps = $props();
	let isHovering = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let cardElement = $state<HTMLElement>();

	function handleMouseMove(event: MouseEvent) {
		if (!cardElement) return;
		const rect = cardElement.getBoundingClientRect();
		mouseX = event.clientX - rect.left;
		mouseY = event.clientY - rect.top;
	}

	function handleMouseEnter() {
		isHovering = true;
	}

	function handleMouseLeave() {
		isHovering = false;
	}
</script>

<a href={path} class="block h-full w-full">
	<li
		bind:this={cardElement}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onmousemove={handleMouseMove}
		class="relative grid h-[15rem] transform-gpu place-items-start content-end gap-3 overflow-hidden rounded-xl border border-slate-800 bg-cover bg-center p-4 transition-all duration-300 ease-in-out hover:shadow-lg"
		style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px; --primary: 0 75% 59%;"
	>
		<div class="absolute inset-0 bg-cover bg-center" style="background-image: url('{coverImage}');"></div>
		<div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

		<!-- Grid pattern overlay -->
		<svg class="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<pattern id="grid-48" width="48" height="48" patternUnits="userSpaceOnUse">
					<path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.5" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid-48)" />
		</svg>

		<div class="relative z-10">
			<h4 class="px-2 text-lg font-bold text-white">
				{title}
			</h4>
			<p class="px-2 pb-2 text-white/80">{desc}</p>
		</div>

		{#if isHovering}
			<div
				class="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
				style="background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,0,0,0.1) 0%, rgba(255,0,0,0.05) 45%, transparent 65%);"
			></div>
		{/if}
	</li>
</a>
