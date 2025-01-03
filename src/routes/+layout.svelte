<script lang="ts">
	import { Toaster } from 'sonner-svelte';
	import { Header } from '$lib/components/layout';
	import Footer from '$lib/components/layout/footer.svelte';
	import '../app.css';

	let { children, data } = $props();
</script>

<Toaster richColors />
<Header path={data.path} />
{@render children()}
<Footer />
