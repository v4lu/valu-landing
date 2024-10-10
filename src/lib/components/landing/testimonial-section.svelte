<script lang="ts">
	import { fly } from 'svelte/transition';
	import { TestimonialCard } from '../cards';
	import { TitleLayout } from '../ui/title-layout';

	interface Author {
		name: string;
		role: string;
		image: string;
	}

	interface Testimonial {
		content: string;
		author: Author;
	}

	const testimonials: Testimonial[][] = $state([
		[
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				author: {
					name: 'Vanessa Auer',
					role: 'Private Customer',
					image: './user.webp'
				}
			},
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				author: {
					name: 'Pero Brkovic',
					role: 'Private Customer',

					image: './user.webp'
				}
			}
		],
		[
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				author: {
					name: 'Johan Müller',
					role: 'Private Customer',
					image: './user.webp'
				}
			},
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
				author: {
					name: 'Johnny Guiter',
					role: 'COO at Armstrong Inc',
					image: './user.webp'
				}
			}
		],
		[
			{
				content: '',
				author: {
					name: 'T. Augustus Baker',
					role: 'Private Customer',
					image: './user.webp'
				}
			},
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				author: {
					name: 'Johnny Guiter',
					role: 'CEO at Lynch LLC',
					image: './user.webp'
				}
			}
		]
	]);

	let container = $state<HTMLElement>();
	let scrollContainer = $state<HTMLElement>();
	let titleVisible = $state(false);
	let visibleTestimonials = $state(testimonials.flat().map(() => false));

	function handleScroll() {
		if (container) {
			const rect = container.getBoundingClientRect();
			const triggerPoint = window.innerHeight * 0.8;

			if (!titleVisible && rect.top < triggerPoint) {
				titleVisible = true;
			}

			container.querySelectorAll('.testimonial-card').forEach((card, index) => {
				if (!visibleTestimonials[index]) {
					const cardRect = card.getBoundingClientRect();
					if (cardRect.top < triggerPoint) {
						visibleTestimonials[index] = true;
						visibleTestimonials = [...visibleTestimonials];
					}
				}
			});
		}
	}

	$effect(() => {
		setTimeout(() => {
			handleScroll();
		}, 100);
	});
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleScroll} />

<section
	bind:this={container}
	id="testimonials"
	class="relative min-h-[70vh] w-full flex-1 py-20 sm:py-10 lg:min-h-[90vh]"
>
	<!-- ... (keep the existing background SVGs and decorative elements) -->

	<div class="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
		<div class="title-container" style="min-height: 100px;">
			{#if titleVisible}
				<div in:fly={{ y: 50, duration: 800 }}>
					<TitleLayout
						title="What Our Clients Say"
						subtitle="Discover how our solutions have transformed businesses and delighted users across industries."
					/>
				</div>
			{/if}
		</div>

		<!-- Desktop/Tablet View -->
		<ul class="mx-auto mt-16 hidden max-w-2xl grid-cols-1 gap-6 sm:gap-8 md:grid lg:mt-20 lg:max-w-none lg:grid-cols-3">
			{#each testimonials as column, colIndex}
				<li>
					<ul class="flex flex-col gap-y-6 sm:gap-y-8">
						{#each column as testimonial, rowIndex}
							<div class="testimonial-card">
								{#if visibleTestimonials[colIndex * column.length + rowIndex]}
									<div in:fly={{ y: 50, duration: 800, delay: (colIndex * column.length + rowIndex) * 200 }}>
										<TestimonialCard
											content={testimonial.content}
											image={testimonial.author.image}
											name={testimonial.author.name}
											role={testimonial.author.role}
										/>
									</div>
								{:else}
									<div style="height: 200px;"></div>
								{/if}
							</div>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>

		<!-- Mobile View -->
		<div class="relative mt-16 md:hidden">
			<div class="overflow-hidden">
				<ul bind:this={scrollContainer} class="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto">
					{#each testimonials.flat() as testimonial, index}
						<li class="testimonial-card snap-center" style="min-width: 280px; max-width: 90vw;">
							{#if visibleTestimonials[index]}
								<div in:fly={{ y: 50, duration: 800, delay: index * 200 }}>
									<TestimonialCard
										content={testimonial.content}
										image={testimonial.author.image}
										name={testimonial.author.name}
										role={testimonial.author.role}
									/>
								</div>
							{:else}
								<div style="height: 200px;"></div>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<style>
	.hide-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
