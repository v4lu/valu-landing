<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Icon from '@iconify/svelte';
	import { X } from 'lucide-svelte';
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
	let isToggledMenu = $state(false);

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

	function toggleMenu() {
		isToggledMenu = !isToggledMenu;
		document.body.style.overflow = isToggledMenu ? 'hidden' : '';
	}

	function closeMenu() {
		isToggledMenu = false;
		document.body.style.overflow = '';
	}
</script>

<div
	bind:this={headerElement}
	class="fixed inset-x-0 top-0 z-30 w-full transition-all duration-300 ease-in-out"
	class:bg-[rgba(3,0,20,0.08)]={isScrolled}
	class:backdrop-blur-[12px]={isScrolled}
	transition:fade={{ duration: 300 }}
>
	<header class="container flex w-full items-center justify-between px-4 py-4">
		<a href="/" class="z-50 flex items-center" in:slide={{ duration: 300, easing: cubicOut }}>
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
		<div class="hidden items-center md:flex" in:slide={{ duration: 300, delay: 150, easing: cubicOut }}>
			<Button onclick={(e) => scrollToSection(e, 'contact', -50)}>Contact</Button>
		</div>
		<Button size="icon" class="md:hidden" onclick={toggleMenu}>
			<Icon icon="mynaui:menu-solid" class="size-5" />
		</Button>
	</header>
	{#if isScrolled}
		<div class="absolute bottom-0 left-0 h-px w-full bg-header-border" transition:slide={{ duration: 300 }}></div>
	{/if}
</div>

{#if isToggledMenu}
	<div
		tabindex="0"
		role="button"
		aria-roledescription="close on click"
		class="fixed inset-0 z-40 bg-black bg-opacity-50"
		onclick={closeMenu}
		transition:fade={{ duration: 300 }}
	></div>
	<nav
		class="fixed inset-0 z-40 bg-[rgba(3,0,20,0.95)] backdrop-blur-lg"
		transition:fly={{ y: -100, duration: 300, easing: cubicOut }}
	>
		<div class="container flex items-center justify-between px-4 py-4">
			<div class="flex items-center">
				<Icons.Logo />
			</div>
			<button onclick={toggleMenu}>
				<X class="size-8" />
			</button>
		</div>
		<ul class="container mt-4 space-y-6 px-4">
			{#each navItems as item}
				<li>
					<a
						href={item.path}
						class={cn(
							'block text-lg font-medium text-gray-400 transition-colors duration-200 hover:text-white',
							path === item.path && 'text-white'
						)}
						onclick={closeMenu}
					>
						{item.label}
					</a>
				</li>
			{/each}
			<li>
				<Button
					class="w-full"
					onclick={(e) => {
						scrollToSection(e, 'contact', -50);
						closeMenu();
					}}
				>
					Contact
				</Button>
			</li>
		</ul>
	</nav>
{/if}
