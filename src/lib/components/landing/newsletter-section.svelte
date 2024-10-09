<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Button } from '../ui/button';
	import { TitleLayout } from '../ui/title-layout';

	let container: HTMLElement;
	let titleVisible = $state(false);
	let formVisible = $state(false);
	let policyVisible = $state(false);

	function handleSubmit(event: Event) {
		event.preventDefault();
		// Handle form submission logic here
	}

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
						onsubmit={handleSubmit}
						class="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500/50 sm:mx-auto sm:max-w-md lg:min-w-[35rem]"
					>
						<input
							type="email"
							placeholder="Enter your email"
							class="w-full bg-transparent p-2 text-white outline-none placeholder:text-gray-400"
						/>
						<Button type="submit" class="whitespace-nowrap">Subscribe</Button>
					</form>
				</div>
			{/if}
			{#if policyVisible}
				<div in:fly={{ y: 50, duration: 800, delay: 400 }}>
					<p class="mt-5 max-w-lg text-[15px] text-gray-300 sm:mx-auto">
						No spam ever, we care about the protection of your data. Read our <a
							class="underline transition-colors hover:text-white"
							href="/privacy"
						>
							Privacy Policy
						</a>
					</p>
				</div>
			{/if}
		</div>
	</div>
</section>
