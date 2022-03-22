<script lang="ts">
	import { onMount } from 'svelte';
	import { products } from '$lib/stores/products';
	import { refreshProducts } from '$lib/utils/requests';

	onMount(async () => {
		if ($products && $products.length === 0) {
			const fetchedData = await refreshProducts(
				`${import.meta.env.VITE_SERVER_URL}/get-all-products`
			);
			products.set(fetchedData);
		}
	});
</script>

<svelte:head>
	{#if $products && $products.length === 0}
		<link
			rel="preload"
			as="fetch"
			href={`${import.meta.env.VITE_SERVER_URL}/get-all-products`}
			crossorigin="anonymous"
		/>
	{/if}
</svelte:head>
