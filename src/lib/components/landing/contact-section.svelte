<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Input, Textarea } from '../ui/forms';
	import { Icons } from '../icons';
	import { TitleLayout } from '../ui/title-layout';

	interface PlanFeature {
		name: string;
		desc: string;
	}

	const features: PlanFeature[] = [
		{
			name: 'Scalable',
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
		},
		{
			name: 'Flexible',
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
		},
		{
			name: 'Smooth',
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
		},
		{
			name: 'Secure',
			desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text"
		}
	];

	let firstName = '';
	let lastName = '';
	let email = '';
	let message = '';
	let pending = false;

	async function handleSubmit(event: Event) {
		event.preventDefault();
		pending = true;

		try {
			// Replace this with your actual form submission logic
			await new Promise((resolve) => setTimeout(resolve, 1000));
			firstName = '';
			lastName = '';
			email = '';
			message = '';
		} catch (error) {
		} finally {
			pending = false;
		}
	}
</script>

<section class="container py-14">
	<TitleLayout
		title="Get in touch with us for any inquiries"
		subtitle="Fill out the form below and we'll get back to you as soon as possible."
	/>
	<div class="mt-16 grid gap-8 md:grid-cols-[45%,1fr]">
		<ul class="max-w-md flex-1 space-y-10 px-4 md:px-0">
			{#each features as item}
				<li class="flex gap-x-3">
					<div
						class="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-white/10 bg-transparent text-red-500 shadow-lg"
					>
						<Icons.Seo class="size-5" />
					</div>
					<div>
						<h4 class="text-lg font-medium tracking-tight text-white">
							{item.name}
						</h4>
						<p class="mt-2 text-gray-400 md:text-sm">{item.desc}</p>
					</div>
				</li>
			{/each}
		</ul>
		<div
			class="mt-6 flex w-full transform-gpu flex-col bg-[rgba(3,0,20,0.08)] backdrop-blur-[12px] md:mt-0 md:rounded-xl md:border md:border-white/10 md:shadow-lg"
		>
			<form on:submit={handleSubmit} class="flex h-full w-full flex-col gap-4 p-6">
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div class="space-y-2">
						<label for="first-name" class="text-sm font-medium text-white">First Name</label>
						<Input bind:value={firstName} id="first-name" placeholder="Enter your first name" required />
					</div>
					<div class="space-y-2">
						<label for="last-name" class="text-sm font-medium text-white">Last Name</label>
						<Input bind:value={lastName} id="last-name" placeholder="Enter your last name" />
					</div>
				</div>
				<div class="space-y-2">
					<label for="email" class="text-sm font-medium text-white">Email</label>
					<Input bind:value={email} id="email" type="email" placeholder="Enter your email" required />
				</div>
				<div class="h-full space-y-2 pb-8">
					<label for="message" class="text-sm font-medium text-white">Message</label>
					<Textarea
						bind:value={message}
						id="message"
						class="h-full resize-none"
						placeholder="Enter your message"
						required
					/>
				</div>
				<Button type="submit" disabled={pending} class="w-full">
					{#if pending}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{:else}
						Submit
					{/if}
				</Button>
			</form>
		</div>
	</div>
</section>
