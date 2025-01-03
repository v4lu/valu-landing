<script lang="ts">
	import { fly } from 'svelte/transition';
	import { z } from 'zod';
	import toast from 'sonner-svelte';
	import { Button } from '../ui/button';
	import { TitleLayout } from '../ui/title-layout';
	import { enhance } from '$app/forms';

	let container: HTMLElement;
	let titleVisible = $state(false);
	let formVisible = $state(false);
	let policyVisible = $state(false);

	let email = $state('');
	let pending = $state(false);
	function handleScroll() {
		if (container) {
			const rect = container.getBoundingClientRect();
			const triggerPoint = window.innerHeight * 0.8;

			if (!titleVisible && rect.top < triggerPoint) {
				titleVisible = true;
			}

			if (!formVisible && rect.top + 200 < triggerPoint) {
				formVisible = true;
			}

			if (!policyVisible && rect.top + 300 < triggerPoint) {
				policyVisible = true;
			}
		}
	}

	const schema = z.object({
		email: z.string().email('Please enter a valid email address')
	});

	function handleEnhance() {
		return async ({ result, update }) => {
			pending = true;

			const formData = {
				email
			};

			const validation = schema.safeParse(formData);

			if (!validation.success) {
				pending = false;
				toast.error(validation.error.errors[0].message);
				return;
			}

			if (result.type === 'success') {
				toast.success('Successfully signed in for newsletter. Thank you!');
				email = '';
			} else if (result.type === 'error') {
				toast.error('Failed to sign in for newsletter. Please try again.');
			}

			pending = false;
			await update();
		};
	}

	$effect(() => {
		setTimeout(() => {
			handleScroll();
		}, 100);
	});
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleScroll} />

<section bind:this={container} class="container relative py-14">
	<div class="relative z-10 mx-auto max-w-xl sm:text-center">
		{#if titleVisible}
			<div in:fly={{ y: 50, duration: 800 }}>
				<TitleLayout
					title="Subscribe to our newsletter"
					subtitle="Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email."
				/>
			</div>
		{/if}
		<div class="mt-6">
			{#if formVisible}
				<div in:fly={{ y: 50, duration: 800, delay: 200 }}>
					<form
						use:enhance={handleEnhance}
						method="POST"
						action="?/newsletter"
						class="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500/50 sm:mx-auto sm:max-w-md lg:min-w-[35rem]"
					>
						<input
							bind:value={email}
							name="email"
							type="email"
							placeholder="Enter your email"
							class="w-full bg-transparent p-2 text-white outline-none placeholder:text-gray-400"
						/>
						<Button type="submit" class="whitespace-nowrap">Subscribe</Button>
					</form>
				</div>
			{/if}
		</div>
	</div>
</section>
