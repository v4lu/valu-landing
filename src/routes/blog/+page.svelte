<script lang="ts">
	import { BlogCard } from '$lib/components/cards';
	import Heading from '$lib/components/ui/heading/heading.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="container flex-1 pt-24">
	<div class="relative z-10">
		<Heading size="title">Latest Stuff</Heading>
		<p class="mt-3 text-balance text-center text-muted-foreground lg:text-lg">Here you can check what are we doing</p>
	</div>

	<ul class="mt-12 grid gap-8 xl:grid-cols-3">
		{#each data.posts as post}
			<BlogCard path={post.path} coverImage={post.coverImage} title={post.title} desc={post.desc} date={post.date} />
		{/each}
	</ul>
</main>
