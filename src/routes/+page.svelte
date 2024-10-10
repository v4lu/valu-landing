<script lang="ts">
	import {
		AboutSection,
		ContactSection,
		HeroHeader,
		HeroPattern,
		HeroPatternMobile,
		NewsletterSection,
		TestimonialSection,
		WorkshopsSection
	} from '$lib/components/landing';

	let { data } = $props();
</script>

<svelte:head>
	<title>Valu Media</title>
</svelte:head>

<main>
	<HeroPattern>
		<section class="container grid gap-10 pt-24 lg:grid-cols-[1fr,20%] lg:pt-[220px]">
			<HeroHeader />
		</section>
	</HeroPattern>
	<HeroPatternMobile>
		<section class="container grid gap-10 pt-24 lg:grid-cols-[1fr,20%] lg:pt-[220px]">
			<HeroHeader />
		</section>
	</HeroPatternMobile>
	<AboutSection />
	<!-- <ProjectsSection /> -->
	<WorkshopsSection items={data.posts} />
	<ContactSection />
	<TestimonialSection />
	<NewsletterSection />
</main>
