<script lang="ts">
	import { Heading } from '../heading';

	type TitleLayoutProps = {
		title: string;
		subtitle: string;
	};

	let { title, subtitle }: TitleLayoutProps = $props();
</script>

<div class="relative mx-auto pb-2 sm:text-center">
	<div class="relative z-10">
		<Heading size="title">{title}</Heading>
		<p class="mt-3 text-balance text-center text-muted-foreground lg:text-lg">
			{subtitle}
		</p>
	</div>
	<div
		class="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
		style="background: linear-gradient(152.92deg, rgba(255, 151, 151, 0.2) 4.54%, rgba(229, 70, 70, 0.26) 34.2%, rgba(255, 151, 151, 0.1) 77.55%);"
	></div>
	<!--	<div
		class="mx-auto mt-4 w-2/3 bg-[rgba(3,0,40,0.10)] backdrop-blur-[12px] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-blue-400/5 before:content-['']"
	></div>
	-->
</div>
