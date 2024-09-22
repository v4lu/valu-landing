<script lang="ts">
	let { data } = $props();
</script>

<main class="container mt-40">
	<article class="prose prose-invert lg:prose-xl">
		<header class="mb-8">
			<h1
				class="mb-4 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-4xl font-bold text-transparent sm:text-5xl"
			>
				{data.title}
			</h1>
			{#if data.cover}
				<div class="mb-8 w-full">
					<img
						src={data.cover}
						alt="Cover image for {data.title}"
						class="h-[400px] w-full rounded-lg object-cover shadow-lg"
					/>
				</div>
			{/if}
			<p class="italic text-muted-foreground">Published on {data.date}</p>
			<p class="mt-4 text-lg text-accent">{data.desc}</p>
		</header>
		<div class="content">
			{@html data.content}
		</div>
	</article>
</main>

<style lang="postcss">
	@media (min-width: 1280px) {
		:global(.content p),
		:global(.content ul),
		:global(.content ol) {
			@apply mx-auto;
		}
	}

	:global(.content h1) {
		@apply mb-4 mt-8 text-3xl font-semibold text-foreground sm:text-4xl;
	}

	:global(.content h2) {
		@apply mb-4 mt-8 text-2xl font-semibold text-foreground sm:text-3xl;
	}

	:global(.content h3) {
		@apply mb-3 mt-6 text-xl font-semibold text-foreground sm:text-2xl;
	}

	:global(.content p) {
		@apply mb-4 text-foreground/80;
	}

	:global(.content ul),
	:global(.content ol) {
		@apply mb-4 pl-6;
	}

	:global(.content li) {
		@apply mb-2;
	}

	:global(.content img) {
		@apply my-4 h-auto max-w-full rounded-lg shadow-lg;
	}

	:global(.content blockquote) {
		@apply my-4 border-l-4 border-primary pl-4 italic text-muted-foreground;
	}

	:global(.content pre) {
		@apply my-4 overflow-x-auto rounded-lg bg-background/50 p-4;
	}

	:global(.content code) {
		@apply rounded bg-background/50 px-1 py-0.5 font-mono text-sm;
	}

	:global(.content a) {
		@apply text-primary transition-colors duration-200 hover:text-primary/80;
	}
</style>
