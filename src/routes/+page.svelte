<script>
	import { Badge } from '$lib/components/ui/badge';
</script>

<div
	class="
    relative
    h-screen
    w-screen
    overflow-hidden
    pt-[6.75rem]
    before:pointer-events-none
    before:absolute
    before:left-1/2
    before:top-[-173px]
    before:z-[1]
    before:block
    before:h-[900px]
    before:w-[1440px]
    before:-translate-x-1/2
    before:bg-[radial-gradient(37.74%_81.78%_at_50%_26.56%,rgba(255,47,47,0.08)_0%,rgba(20,0,0,0)_100%)]
    before:content-['']
    xl:pt-[11rem]
  "
>
	<div
		class="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(#cccccc33_1px,#00091d_1px)] bg-[size:32px_32px]"
	></div>
	<article class="mx-auto">
		<div class="relative">
			<Badge>
				<span class="bg-badge-text bg-clip-text text-sm text-transparent bg-blend-normal"> New: BLa </span>
			</Badge>

			<div class="relative mt-1 text-[2.75rem] leading-[3.25rem]">
				<span class="block bg-hero-title bg-clip-text text-center font-medium text-transparent"> Think better </span>
				<span class="block bg-hero-title bg-clip-text text-center font-medium text-transparent"> With us </span>
			</div>
		</div>
	</article>
</div>
