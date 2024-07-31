<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { VariantProps } from 'class-variance-authority';
	import { inputVariants } from '.';
	import { cn } from '$lib/cn';

	type Variant = VariantProps<typeof inputVariants>['variant'];

	type InputProps = HTMLTextareaAttributes & {
		class?: string;
		value?: string;
		variant?: Variant;
		lineGlow?: boolean;
	};

	let { variant, class: className, value = $bindable(), ...rest }: InputProps = $props();
</script>

<textarea bind:value class={cn(inputVariants({ variant, className }))} {...rest}></textarea>
