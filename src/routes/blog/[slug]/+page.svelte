<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-bash';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-docker';
	import 'prismjs/components/prism-go';
	import 'prismjs/components/prism-java';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-kotlin';
	import 'prismjs/components/prism-markup';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-jsx.js';
	import 'prismjs/components/prism-rust';
	import 'prism-svelte';
	import 'prismjs/themes/prism-okaidia.css';

	let { data } = $props();
	type TocType = {
		id: string;
		text: string | null;
		level: number;
	};
	let toc = $state<TocType[]>([]);
	let activeSection = $state('');

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '');
	}

	$effect(() => {
		const headers = document.querySelectorAll<HTMLHeadingElement>('.content h2, .content h3');
		toc = Array.from(headers).map((header, index) => {
			const text = header.textContent;
			const id = text ? slugify(text) : `section-${index}`;
			header.id = id;
			return {
				id,
				text,
				level: header.tagName === 'H2' ? 2 : 3
			};
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{ rootMargin: '-100px 0px -66% 0px' }
		);

		headers.forEach((header) => observer.observe(header));
	});

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	$effect(() => Prism.highlightAll());
</script>

<svelte:head>
	<title>Valu Media - {data.title}</title>
</svelte:head>
<main class="xl:-full container mx-auto mt-40 flex w-full flex-col xl:flex-row">
	<article class="mx-auto w-full max-w-3xl px-4 xl:px-0">
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
			<p class="w-full text-right italic text-muted-foreground">Published on {data.date}</p>
		</header>
		<div class="content prose prose-invert max-w-none lg:prose-xl">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.content}
		</div>
	</article>
	<aside class="sticky right-12 top-40 ml-12 hidden w-64 self-start xl:block">
		<nav class="rounded-lg border border-primary/10 bg-slate-800/10 p-6 shadow-lg backdrop-blur-2xl">
			<h2 class="mb-4 text-xl font-bold text-primary">Table of Contents</h2>
			<ul
				class="scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-background/50 hover:scrollbar-thumb-primary max-h-[calc(100vh-200px)] space-y-2 overflow-y-auto pr-2"
			>
				{#each toc as item (item.id)}
					<li>
						<button
							class="w-full cursor-pointer text-left text-sm font-medium text-foreground/70 transition-all duration-200 ease-in-out hover:font-semibold hover:text-primary"
							class:font-bold={activeSection === item.id}
							class:text-primary={activeSection === item.id}
							style="padding-left: {(item.level - 2) * 1}rem"
							onclick={() => scrollToSection(item.id)}
						>
							{item.text}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
</main>

<style lang="postcss">
	:global(.content) {
		@apply text-base text-foreground/80 lg:text-lg;
	}

	:global(.content > *) {
		@apply mx-auto max-w-full;
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
		@apply mb-4;
	}

	:global(.content ul),
	:global(.content ol) {
		@apply mb-4 pl-6;
	}

	:global(.content li) {
		@apply mb-2;
	}

	:global(.content img) {
		@apply my-4 h-auto max-w-full rounded-lg bg-cover bg-center object-cover object-center shadow-lg;
	}

	:global(.content blockquote) {
		@apply my-4 border-l-4 border-primary pl-4 italic text-muted-foreground;
	}

	:global(.content pre) {
		@apply my-4 overflow-x-auto rounded-lg border border-white/10 bg-slate-900/20 p-4;
	}

	:global(.content code) {
		@apply rounded px-1 py-0.5 font-mono text-sm;
	}

	:global(.content a) {
		@apply text-primary transition-colors duration-200 hover:text-primary/80;
	}
</style>
