<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	let { children }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="relative min-h-[70vh] w-full flex-1 lg:min-h-[80vh]">
	<div class="absolute inset-x-0 -top-0 opacity-30">
		<div class="absolute inset-0 mx-auto h-[27rem] max-w-lg sm:h-64">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				preserveAspectRatio="none"
				viewBox="0 0 100 100"
				class="h-full w-full blur-[118px] filter"
			>
				<defs>
					<linearGradient id="gradient" x1="15.73%" y1="0%" x2="115.91%" y2="100%">
						<stop offset="0%" style="stop-color:rgba(255, 151, 151, 0.11);stop-opacity:1" />
						<stop offset="15.74%" style="stop-color:rgba(255, 47, 47, 0.31);stop-opacity:1" />
						<stop offset="56.49%" style="stop-color:rgba(126, 8, 8, 0.26);stop-opacity:1" />
						<stop offset="100%" style="stop-color:rgba(255, 0, 0, 0.3);stop-opacity:1" />
					</linearGradient>
				</defs>
				<rect width="100%" height="100%" fill="url(#gradient)" />
			</svg>
		</div>
	</div>
	<svg
		class="z-1 absolute inset-0 h-full w-full stroke-neutral-200/15"
		aria-hidden="true"
		style="mask-image: radial-gradient(100% 100% at top left, white, transparent);"
	>
		<defs>
			<pattern
				class="hidden md:block"
				id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
				width="200"
				height="200"
				x="50%"
				y="-1"
				patternUnits="userSpaceOnUse"
			>
				<path d="M.5 200V.5H200" fill="none" />
			</pattern>
			<pattern
				class="md:hidden"
				id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
				width="100"
				height="100"
				x="50%"
				y="-1"
				patternUnits="userSpaceOnUse"
			>
				<path d="M.5 120V.5H120" fill="none" />
			</pattern>
		</defs>
		<svg x="50%" y="-1" class="overflow-visible fill-red-800/5">
			<path
				d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
				stroke-width="1"
			/>
		</svg>
		<rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
	</svg>
	<div
		class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
		aria-hidden="true"
	>
		<div
			class="aspect-[1108/632] w-full bg-gradient-to-r from-[#ff9797] to-[#e54646] opacity-10 lg:w-[69.25rem]"
			style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%);"
		></div>
	</div>
	{#if children}
		{@render children()}
	{/if}
</div>
