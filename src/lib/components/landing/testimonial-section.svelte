<script lang="ts">
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

	const testimonials: Testimonial[][] = [
		[
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				author: {
					name: 'Johnny Guiter',
					role: 'CEO at Lynch LLC',
					image:
						'https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80'
				}
			},
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				author: {
					name: 'Johnny Guiter',
					role: 'Director at Velocity Industries',
					image:
						'https://images.unsplash.com/photo-1623605931891-d5b95ee98459?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=80'
				}
			}
		],
		[
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				author: {
					name: 'Johnny Guiter',
					role: 'Founder of Kiehn and Sons',
					image:
						'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
				}
			},
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
				author: {
					name: 'Johnny Guiter',
					role: 'COO at Armstrong Inc',
					image:
						'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
				}
			}
		],
		[
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
				author: {
					name: 'Johnny Guiter',
					role: 'Founder of West Inc',
					image:
						'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
				}
			},
			{
				content:
					"Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
				author: {
					name: 'Johnny Guiter',
					role: 'Director at Velocity Industries',
					image:
						'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
				}
			}
		]
	];
</script>

<section id="testimonials" class="relative min-h-[70vh] w-full flex-1 py-20 sm:py-10 lg:min-h-[90vh]">
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
		<TitleLayout
			title="What Our Clients Say"
			subtitle="Discover how our solutions have transformed businesses and delighted users across industries."
		/>

		<ul class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
			{#each testimonials as column}
				<li>
					<ul class="flex flex-col gap-y-6 sm:gap-y-8">
						{#each column as testimonial}
							<li>
								<figure
									class="relative rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.05)] p-6 shadow-xl backdrop-blur-sm"
								>
									<svg aria-hidden="true" width="105" height="78" class="absolute left-6 top-6 fill-red-500/10">
										<path
											d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"
										/>
									</svg>
									<blockquote class="relative">
										<p class="text-lg tracking-tight text-gray-100">{testimonial.content}</p>
									</blockquote>
									<figcaption class="relative mt-6 flex items-center justify-between border-t border-white/10 pt-6">
										<div>
											<div class="font-display text-base text-white">{testimonial.author.name}</div>
											<div class="mt-1 text-sm text-gray-400">{testimonial.author.role}</div>
										</div>
										<div class="overflow-hidden rounded-full bg-gray-50">
											<img class="h-14 w-14 object-cover" src={testimonial.author.image} alt="" />
										</div>
									</figcaption>
								</figure>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</div>
</section>
