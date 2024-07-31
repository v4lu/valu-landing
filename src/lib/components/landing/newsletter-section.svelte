<script lang="ts">
	import { Button } from '../ui/button';
	import { TitleLayout } from '../ui/title-layout';
	function handleSubmit(event: Event) {
		event.preventDefault();
	}
</script>

<section class="relative py-14">
	<div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
		<div
			class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff9797] to-[#e54646] opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>

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

	<div
		class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
		aria-hidden="true"
	>
		<div
			class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff9797] to-[#e54646] opacity-10 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
		></div>
	</div>

	<svg
		class="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(90%_90%_at_top_right,white,transparent)]"
		aria-hidden="true"
	>
		<defs>
			<pattern
				id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
				width="200"
				height="200"
				x="50%"
				y="-1"
				patternUnits="userSpaceOnUse"
			>
				<path d="M.5 200V.5H200" fill="none" />
			</pattern>
		</defs>
		<svg x="50%" y="-1" class="overflow-visible fill-red-800/5">
			<path
				d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
				stroke-width="0"
			/>
		</svg>
		<rect
			width="100%"
			height="100%"
			stroke-width="0"
			fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
			mask="url(#fadeMask)"
		/>
	</svg>
</section>
