<script lang="ts">
	import {
		AboutSection,
		ContactSection,
		HeroHeader,
		HeroPattern,
		NewsletterSection,
		OfferingSection,
		ProjectsSection
	} from '$lib/components/landing';
</script>

<main>
	<HeroPattern>
		<section class="container grid gap-10 pt-24 lg:grid-cols-[1fr,45%] lg:pt-[190px]">
			<HeroHeader />
			<div class="relative w-full rounded-lg lg:h-[350px]">
				<img src="https://placehold.co/600x400" alt="Product showcase" class="w-full object-cover" />
				<div class="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20"></div>
			</div>
		</section>
	</HeroPattern>
	<AboutSection />
	<ProjectsSection />
	<OfferingSection />
	<ContactSection />

	<NewsletterSection />
</main>
