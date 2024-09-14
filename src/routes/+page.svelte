<script lang="ts">
	import {
		AboutSection,
		ContactSection,
		HeroHeader,
		HeroPattern,
		NewsletterSection,
		OfferingSection,
		TestimonialSection
	} from '$lib/components/landing';
</script>

<main>
	<HeroPattern>
		<section class="container grid gap-10 pt-24 lg:grid-cols-[1fr,20%] lg:pt-[220px]">
			<HeroHeader />
		</section>
	</HeroPattern>
	<AboutSection />
	<!-- <ProjectsSection /> -->
	<OfferingSection />
	<ContactSection />
	<TestimonialSection />
	<NewsletterSection />
</main>
