<script lang="ts">
	import { type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { buttonVariants } from '.';
	import { cn } from '$lib/cn';
	type Variant = VariantProps<typeof buttonVariants>['variant'];
	type Size = VariantProps<typeof buttonVariants>['size'];

	type ButtonPropsType = HTMLButtonAttributes & {
		class?: string;
		variant?: Variant;
		size?: Size;
	};

	let { class: className, variant, size, children, ...rest }: ButtonPropsType = $props();
</script>

<button {...rest} class={cn(buttonVariants({ variant, size, className }))}>
	{#if children}
		{@render children()}
	{/if}
</button>
