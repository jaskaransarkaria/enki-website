<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { products } from '$lib/stores/products';
	import SingleProduct from '$lib/components/SingleProduct/SingleProduct.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs/Breadcrumbs.svelte';
	import { refreshProducts } from '$lib/utils/requests';

	import type { Product } from '$lib/types/product';

	let productToShow: readonly Product[] = [];

	onMount(async () => {
		// check to see if we have a products store
		// if we do then search and display the correct product
		if ($products.length) {
			// will return the falsy value of 0 if product is not a variant
			const variantId = $products.find(
				(obj) => obj.Id === parseInt($page.params.product, 10)
			)?.VariantGroupId;

			if (variantId) {
				productToShow = $products.filter((obj) => obj.VariantGroupId === variantId);
			} else {
				productToShow = $products.filter((obj) => obj.Id === parseInt($page.params.product, 10));
			}
		} else {
			// if we don't pull the correct product by idToDisplay
			productToShow = await refreshProducts(
				`${import.meta.env.VITE_SERVER_URL}/product?id=${$page.params.product}`
			);
		}
	});
</script>

{#if productToShow.length}
	<Breadcrumbs selectedCategoryId={productToShow[0].CategoryId} />
	<div>
		<SingleProduct product={productToShow[0]} showDetailedView />
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 3em;
	}
</style>
