<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import Icon from '@iconify/svelte';
	import * as z from 'zod';
	import toast from 'sonner-svelte';
	import { Button } from '../ui/button';
	import { Input, Textarea } from '../ui/forms';
	import { TitleLayout } from '../ui/title-layout';
	import { enhance } from '$app/forms';

	interface PlanFeature {
		name: string;
		desc: string;
		icon: string;
	}

	const features: PlanFeature[] = $state([
		{
			name: 'Innovative Solutions',
			desc: 'We craft cutting-edge web applications using the latest technologies to deliver exceptional digital experiences.',
			icon: 'mdi:lightbulb-on-outline'
		},
		{
			name: 'Scalable Architecture',
			desc: 'Our robust systems grow with your business, handling increased loads without compromising performance.',
			icon: 'mdi:scale-balance'
		},
		{
			name: 'Responsive Design',
			desc: 'We ensure seamless user experiences across all devices - desktop, tablet, and mobile.',
			icon: 'mdi:responsive'
		},
		{
			name: 'Security-First Approach',
			desc: "We implement best practices and cutting-edge measures to protect your data and users' information.",
			icon: 'mdi:shield-check-outline'
		},
		{
			name: 'Ongoing Support',
			desc: 'We provide continuous support to keep your application up-to-date, secure, and optimized.',
			icon: 'mdi:headphones'
		}
	]);

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let message = $state('');
	let pending = $state(false);

	let container: HTMLElement;
	let titleVisible = $state(false);
	let visibleFeatures = $state(features.map(() => false));
	let formVisible = $state(false);

	function handleScroll() {
		if (container) {
			const rect = container.getBoundingClientRect();
			const triggerPoint = window.innerHeight * 0.8;

			if (!titleVisible && rect.top < triggerPoint) {
				titleVisible = true;
			}

			container.querySelectorAll('.feature-item').forEach((item, index) => {
				if (!visibleFeatures[index]) {
					const itemRect = item.getBoundingClientRect();
					if (itemRect.top < triggerPoint) {
						visibleFeatures[index] = true;
						visibleFeatures = [...visibleFeatures];
					}
				}
			});

			if (!formVisible) {
				const formRect = container.querySelector('.contact-form')?.getBoundingClientRect();
				if (formRect && formRect.top < triggerPoint) {
					formVisible = true;
				}
			}
		}
	}

	$effect(() => {
		setTimeout(() => {
			handleScroll();
		}, 100);
	});

	//method="POST"
	//action="?/contact"

	const schema = z.object({
		firstName: z.string().min(2, 'Please enter a valid first name'),
		lastName: z.string().min(2, 'Please enter a valid last name'),
		email: z.string().email('Please enter a valid email address'),
		message: z.string().min(50, 'Please enter a message with at least 50 characters')
	});

	function handleEnhance() {
		return async ({ result, update }) => {
			pending = true;

			const formData = {
				firstName,
				lastName,
				email,
				message
			};

			const validation = schema.safeParse(formData);

			if (!validation.success) {
				pending = false;
				toast.error(validation.error.errors[0].message);
				return;
			}

			if (result.type === 'success') {
				toast.success('Message sent successfully!');
				firstName = '';
				lastName = '';
				email = '';
				message = '';
			} else if (result.type === 'error') {
				toast.error('Failed to send message. Please try again.');
			}

			pending = false;
			await update();
		};
	}
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleScroll} />

<section id="contact" bind:this={container} class="container py-8 md:py-14">
	<div class="title-container" style="min-height: 100px;">
		<div class:opacity-0={!titleVisible} class:translate-y-8={!titleVisible} class="duration-800 transition-all">
			<TitleLayout
				title="Get in touch with us"
				subtitle="Fill out the form below and we'll get back to you as soon as possible."
			/>
		</div>
	</div>

	<div class="mt-8 grid gap-8 md:mt-16 md:grid-cols-[45%,1fr]">
		<ul class="max-w-md flex-1 space-y-6 px-2 md:space-y-10 md:px-0">
			{#each features as item, i}
				<li class="feature-item">
					<div
						class:opacity-0={!visibleFeatures[i]}
						class:translate-y-8={!visibleFeatures[i]}
						class="duration-800 transition-all"
						style="transition-delay: {i * 200}ms"
					>
						<div class="flex gap-x-3">
							<div
								class="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/10 bg-transparent text-red-500 shadow-lg md:h-12 md:w-12"
							>
								<Icon icon={item.icon} class="size-4 md:size-5" />
							</div>
							<div>
								<h4 class="text-base font-medium tracking-tight text-white md:text-lg">
									{item.name}
								</h4>
								<p class="mt-1 text-sm text-gray-400 md:mt-2 md:text-base">{item.desc}</p>
							</div>
						</div>
					</div>
				</li>
			{/each}
		</ul>

		<div
			class:opacity-0={!formVisible}
			class:translate-y-8={!formVisible}
			class="contact-form mt-6 flex h-full w-full transform-gpu flex-col rounded-xl border border-white/10 bg-[rgba(3,0,20,0.08)] shadow-lg backdrop-blur-[12px] md:mt-0"
		>
			<div class="duration-800 h-full transition-all">
				<form
					use:enhance={handleEnhance}
					method="POST"
					action="?/contact"
					class="flex h-full w-full flex-1 flex-col justify-between gap-4 p-4 md:p-6"
				>
					<div class="flex flex-1 flex-col gap-6">
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div class="space-y-3">
								<label for="first-name" class=" font-medium text-white">First Name</label>
								<Input
									name="first-name"
									bind:value={firstName}
									id="first-name"
									placeholder="Enter your first name"
									required
								/>
							</div>
							<div class="space-y-3">
								<label for="last-name" class="font-medium text-white">Last Name</label>
								<Input name="last-name" bind:value={lastName} id="last-name" placeholder="Enter your last name" />
							</div>
						</div>
						<div class="space-y-3">
							<label for="email" class="font-medium text-white">Email</label>
							<Input bind:value={email} name="email" id="email" type="email" placeholder="Enter your email" required />
						</div>
						<div class=" flex-1 space-y-3">
							<label for="message" class="font-medium text-white">Message</label>
							<Textarea
								name="message"
								bind:value={message}
								id="message"
								class="h-40 resize-none md:h-full"
								placeholder="Enter your message"
								required
							/>
						</div>
					</div>
					<Button type="submit" disabled={pending} class="h-12 w-full md:mt-12">
						{#if pending}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{:else}
							Submit
						{/if}
					</Button>
				</form>
			</div>
		</div>
	</div>
</section>
