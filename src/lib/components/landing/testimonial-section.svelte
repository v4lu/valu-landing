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
					"I was amazed by the stunning nature page created for my ecotourism business. The vivid imagery and intuitive design truly capture the essence of our wildlife tours. It's not just a website; it's a portal that transports visitors into the heart of nature before they even book a trip. Our online bookings have increased by 40% since the launch!",
				author: {
					name: 'Vanessa Auer',
					role: 'Private Customer',
					image: './user.webp'
				}
			},
			{
				content:
					"The workshop page built for my carpentry business is a masterpiece of functionality and aesthetics. It showcases my craftsmanship perfectly and has streamlined the booking process for my woodworking classes. The interactive calendar and project gallery have been game-changers. I've seen a 50% increase in workshop sign-ups!",
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
					"I'm thoroughly impressed with the service I received. The attention to detail and personalized approach exceeded my expectations. The team was responsive, professional, and genuinely cared about meeting my needs. I feel like I've received exceptional value for my investment.",
				author: {
					name: 'Johan Müller',
					role: 'Private Customer',
					image: './user.webp'
				}
			},
			{
				content:
					"The level of customer care I experienced was outstanding. From the initial consultation to the final delivery, every interaction was smooth and pleasant. The team's expertise and willingness to go the extra mile truly set them apart. I'm delighted with the results and would highly recommend their services.",
				author: {
					name: 'Gabriella Mondvay',
					role: 'Private Customer',
					image: './user.webp'
				}
			}
		],
		[
			{
				content:
					"I couldn't be happier with my experience. The team's professionalism and dedication to customer satisfaction are unparalleled. They listened carefully to my requirements and delivered a solution that not only met but exceeded my expectations. The quality of their work is evident in every detail.",
				author: {
					name: 'T. Augustus Baker',
					role: 'Private Customer',
					image: './user.webp'
				}
			},
			{
				content:
					"Working with this team has been a pleasure from start to finish. Their commitment to excellence is evident in every aspect of their service. They were patient with my questions, flexible with changes, and delivered results that have made a real difference in my daily operations. I'm extremely satisfied and grateful for their expertise.",
				author: {
					name: 'Timm Martin',
					role: 'Private Customer',
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
	<div class="absolute inset-x-0 -top-0 opacity-30">
		<div class="absolute inset-0 mx-auto h-[27rem] max-w-lg sm:h-64">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				height="100%"
				preserveAspectRatio="none"
				viewBox="0 0 100 100"
				class="h-full w-full blur-[118px] filter"
			>
				<defs>
					<linearGradient id="gradient" x1="15.73%" y1="0%" x2="115.91%" y2="100%">
						<stop offset="0%" style="stop-color:rgba(255, 151, 151, 0.11);stop-opacity:1" />
						<stop offset="15.74%" style="stop-color:rgba(255, 47, 47, 0.31);stop-opacity:1" />
						<stop offset="56.49%" style="stop-color:rgba(126, 8, 8, 0.26);stop-opacity:1" />
						<stop offset="100%" style="stop-color:rgba(255, 0, 0, 0.3);stop-opacity:1" />
					</linearGradient>
				</defs>
				<rect width="100%" height="100%" fill="url(#gradient)" />
			</svg>
		</div>
	</div>

	<svg
		class="absolute inset-0 h-full w-full stroke-neutral-200/5"
		aria-hidden="true"
		style="mask-image: radial-gradient(60% 100% at top left, white 10%, rgba(255,255,255,0.5) 40%, transparent 70%);"
	>
		<defs>
			<pattern
				class="hidden md:block"
				id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
				width="200"
				height="200"
				x="50%"
				y="-1"
				patternUnits="userSpaceOnUse"
			>
				<path d="M.5 200V.5H200" fill="none" />
			</pattern>
			<pattern
				class="md:hidden"
				id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
				width="100"
				height="100"
				x="50%"
				y="-1"
				patternUnits="userSpaceOnUse"
			>
				<path d="M.5 120V.5H120" fill="none" />
			</pattern>
		</defs>
		<svg x="50%" y="-1" class="overflow-visible fill-red-800/5">
			<path
				d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
				stroke-width="1"
			/>
		</svg>
		<rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
	</svg>

	<div
		class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
		aria-hidden="true"
	>
		<div
			class="aspect-[1108/632] w-full bg-gradient-to-r from-[#ff9797] to-[#e54646] opacity-10 lg:w-[69.25rem]"
			style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%);"
		></div>
	</div>
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
