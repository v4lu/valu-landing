<script lang="ts">
	type FeatureCardProps = {
		title: string;
		desc: string;
		date: string;
	};

	let { title, desc, date }: FeatureCardProps = $props();
	let isHovering = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let cardElement = $state<HTMLElement>();

	function handleMouseMove(event: MouseEvent) {
		if (!cardElement) return;
		const rect = cardElement.getBoundingClientRect();
		mouseX = event.clientX - rect.left;
		mouseY = event.clientY - rect.top + 50;
	}

	function handleMouseEnter() {
		isHovering = true;
	}

	function handleMouseLeave() {
		isHovering = false;
	}
</script>

<li
	bind:this={cardElement}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onmousemove={handleMouseMove}
	class="relative grid h-[15rem] transform-gpu place-items-start content-end gap-3 overflow-hidden rounded-xl border bg-transparent p-4 transition-all duration-300 ease-in-out [border:1px_solid_rgba(255,255,255,.1)] hover:shadow-lg"
	style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px; --primary: 0 75% 59%;"
>
	<h4 class="px-2 text-lg font-bold">
		{title}
	</h4>
	<p class="px-2 pb-2 text-muted-foreground">{desc}</p>
	{#if isHovering}
		<div
			class="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
			style="background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,0,0,0.1) 0%, rgba(255,0,0,0.05) 45%, transparent 65%);"
		></div>
	{/if}
</li>
