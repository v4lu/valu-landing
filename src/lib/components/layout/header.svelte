<script lang="ts">
	import { Button } from '../ui/button';
</script>

<div
	class="fixed inset-x-0 top-0 z-10 w-full bg-[rgba(3,0,20,0.08)] backdrop-blur-[12px] before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:content-[''] xl:before:bg-header-border"
>
	<header class="container flex w-full items-center justify-between py-5 lg:py-6">
		<a href="/" class="flex items-center"> Logo </a>
		<div class="flex items-center">
			<Button class="">Hello World</Button>
		</div>
	</header>
</div>
