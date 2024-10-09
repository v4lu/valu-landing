<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Button } from '../ui/button';
	import { Icons } from '../icons';
	import { cn, scrollToSection } from '$lib/cn';

	type Props = {
		path: string;
	};

	let { path }: Props = $props();
	const SCROLL_THRESHOLD = 50;
	let scrollY = $state(0);
	let isScrolled = $state(false);
	let headerElement: HTMLElement;

	const navItems = [
		{ path: '/', label: 'Home' },
		{ path: '/blog', label: 'Blogs' },
		{ path: '/project', label: 'Projects' }
	];

	$effect(() => {
		isScrolled = scrollY > SCROLL_THRESHOLD;
	});

	function handleScroll() {
		scrollY = window.scrollY;
	}

	$effect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div
	bind:this={headerElement}
	class="fixed inset-x-0 top-0 z-30 w-full transition-all duration-300 ease-in-out"
	class:bg-[rgba(3,0,20,0.08)]={isScrolled}
	class:backdrop-blur-[12px]={isScrolled}
	transition:fade={{ duration: 300 }}
>
	<header class="container flex w-full items-center justify-between py-4">
		<a href="/" class="flex items-center" in:slide={{ duration: 300, easing: cubicOut }}>
			<Icons.Logo />
		</a>
		<nav class="hidden md:block">
			<ul class="relative flex space-x-6">
				{#each navItems as item}
					<li>
						<a
							href={item.path}
							class={cn(
								'relative font-medium text-gray-400 transition-colors duration-200 hover:text-white',
								path === item.path && 'text-white'
							)}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="flex items-center" in:slide={{ duration: 300, delay: 150, easing: cubicOut }}>
			<Button onclick={(e) => scrollToSection(e, 'contact', -50)}>Contact</Button>
		</div>
	</header>
	{#if isScrolled}
		<div class="absolute bottom-0 left-0 h-px w-full bg-header-border" transition:slide={{ duration: 300 }}></div>
	{/if}
</div>
