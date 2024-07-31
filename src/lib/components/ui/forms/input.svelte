<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { VariantProps } from 'class-variance-authority';
	import { inputVariants } from '.';
	import { cn } from '$lib/cn';

	type Variant = VariantProps<typeof inputVariants>['variant'];

	type InputProps = HTMLInputAttributes & {
		class?: string;
		value?: string;
		variant?: Variant;
		lineGlow?: boolean;
	};

	let { variant, class: className, value = $bindable(), ...rest }: InputProps = $props();
</script>

<input bind:value class={cn(inputVariants({ variant, className }))} {...rest} />
