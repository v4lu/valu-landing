<script lang="ts">
	import { cn } from '$lib/cn';

	type Props = {
		ontoggle: () => void;
		isToggled: boolean;
	};

	let { ontoggle, isToggled }: Props = $props();
</script>

<button onclick={ontoggle} class="relative ml-4 h-9 w-8 cursor-pointer md:hidden">
	<span
		class={cn(
			'absolute h-[1.8px] w-full origin-center rounded-full bg-white transition-transform duration-500 ease-in-out ',
			isToggled ? 'top-1/2 rotate-45' : 'top-1/4 -rotate-0'
		)}
	></span>
	<span
		class={cn(
			'absolute h-[1.8px] w-full origin-center rounded-full bg-white transition-transform duration-300 ease-in-out ',
			isToggled ? 'top-1/2 opacity-0 duration-500' : 'top-1/2 opacity-100'
		)}
	></span>
	<span
		class={cn(
			'absolute h-[1.8px] w-full origin-center rounded-full bg-white transition-transform duration-500 ease-in-out ',
			isToggled ? 'top-1/2 -rotate-45' : 'top-3/4 -rotate-0'
		)}
	></span>
</button>
