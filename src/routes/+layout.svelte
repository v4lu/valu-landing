<script lang="ts">
	import { Header } from '$lib/components/layout';
	import Footer from '$lib/components/layout/footer.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<Header path={data.path} />
{@render children()}
<Footer />
