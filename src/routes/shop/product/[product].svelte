<script context="module" lang="ts">
	import { refreshProductsFromServer } from '$lib/utils/requests';
	import type { Product } from '$lib/types/product' 

  export async function load({ fetch, params, url }) {
		// pull the category data from api
		const result = await refreshProductsFromServer(`${import.meta.env.VITE_SERVER_URL}/product?id=${params.product}`, fetch);

    return {
      props: {
      	productToShow: result
      }
    };
  }

  export const prerender = true;
  export const browser = true;
</script>

<script lang="ts">
	import SingleProduct from '$lib/components/SingleProduct/SingleProduct.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs/Breadcrumbs.svelte';

	export let productToShow: readonly Product[] = [];
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
