<script lang="ts">
	type TestimonialProps = {
		content: string;
		name: string;
		role: string;
		image: string;
	};

	let { content, image, name, role }: TestimonialProps = $props();

	let isHovering = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let testimonialElement = $state<HTMLElement>();

	function handleMouseMove(event: MouseEvent) {
		if (!testimonialElement) return;
		const rect = testimonialElement.getBoundingClientRect();
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

<li>
	<figure
		bind:this={testimonialElement}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onmousemove={handleMouseMove}
		class="relative rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.05)] p-6 shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl"
		style="--mouse-x: {mouseX}px; --mouse-y: {mouseY}px;"
	>
		<svg aria-hidden="true" width="105" height="78" class="absolute left-6 top-6 fill-red-500/10">
			<path
				d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"
			/>
		</svg>
		<blockquote class="relative">
			<p class="cursor-default text-lg tracking-tight text-foreground/70">{content}</p>
		</blockquote>
		<div class="relative mt-6 flex items-center justify-between border-t border-white/10 pt-6">
			<div>
				<h3>{name}</h3>
				<span class="mt-1 text-sm text-muted-foreground">{role}</span>
			</div>
			<div class="overflow-hidden rounded-full">
				<img class="h-14 w-14 object-cover" src={image} alt="" />
			</div>
		</div>
		{#if isHovering}
			<div
				class="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
				style="background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,0,0,0.1) 0%, rgba(255,0,0,0.05) 35%, transparent 60%);"
			></div>
		{/if}
	</figure>
</li>
