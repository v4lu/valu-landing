<script lang="ts">
	type Props = {
		width: number;
		height: number;
	};

	let { width, height }: Props = $props();
</script>

<div style="width: {width}px; height: {height}px;">
	<svg {width} {height} viewBox="0 0 70 68" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
				<stop offset="100%" style="stop-color:#e02f2f;stop-opacity:1" />
			</linearGradient>
		</defs>
		<style>
			.st0 {
				fill: url(#logoGradient);
			}
		</style>
		<g>
			<polygon class="st0" points="0,0 68.6,67.8 0,33.9" />
			<path class="st0" d="M41.4,37.1l27.3,27v-64.1L41.4,37.1z M63.9,52.6l-16.2-16l21-36.6L63.9,52.6z" />
		</g>
	</svg>
</div>
