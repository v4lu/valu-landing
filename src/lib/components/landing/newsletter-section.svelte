<script lang="ts">
	import { Button } from '../ui/button';
	import { TitleLayout } from '../ui/title-layout';
	function handleSubmit(event: Event) {
		event.preventDefault();
	}
</script>

<section class="relative py-14">
	<div class="relative z-10 mx-auto max-w-xl sm:text-center">
		<TitleLayout
			title="Subscribe to our newsletter"
			subtitle="Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email."
		/>
		<div class="mt-6">
			<form
				on:submit={handleSubmit}
				class="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500/50 sm:mx-auto sm:max-w-md lg:min-w-[35rem]"
			>
				<input
					type="email"
					placeholder="Enter your email"
					class="w-full bg-transparent p-2 text-white outline-none placeholder:text-gray-400"
				/>
				<Button type="submit" class="whitespace-nowrap">Subscribe</Button>
			</form>
			<p class="mt-5 max-w-lg text-[15px] text-gray-300 sm:mx-auto">
				No spam ever, we care about the protection of your data. Read our <a
					class="underline transition-colors hover:text-white"
					href="/privacy"
				>
					Privacy Policy
				</a>
			</p>
		</div>
	</div>
</section>
