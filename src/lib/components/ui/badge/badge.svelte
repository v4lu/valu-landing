<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let { children }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class="after:bg-hero-badge-gradient after:mask-hero-badge relative isolate mx-auto mb-4 mt-0 flex w-max items-center overflow-hidden rounded-[32px] py-1 pl-2 pr-[13px] shadow-badge-shadow backdrop-blur-[6px] transition-all ease-cubic after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:p-px after:content-['']"
>
	{#if children}
		{@render children()}
	{/if}
</div>
