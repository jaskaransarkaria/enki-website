<script context="module" lang="ts">
	import { refreshProductsFromServer } from '$lib/utils/requests';
	import type { Product } from '$lib/types/product' 

  export async function load({ fetch, params }) {
		// pull the category data from api
		const result = await refreshProductsFromServer(`${import.meta.env.VITE_SERVER_URL}/get-all-products`, fetch);
    const filteredResult = result.filter((obj) =>
        obj.ProductTags.filter((tag) => tag.Name.toLowerCase() === `${params.type}-${params.tag}`).length
          ? true
          : false
      );

    return {
      props: {
      	data: filteredResult
      }
    };
  }

  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import ProductView from '$lib/components/ProductView/ProductView.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs/Breadcrumbs.svelte';

  export let data: readonly Product[] = [];
</script>

<Breadcrumbs
  selectedCategoryId={parseInt($page.url.searchParams.get('catid'), 10)}
  extraCrumbs={[
    {
      Name: $page.params.tag,
      Id: parseInt($page.url.searchParams.get('tagid'), 0),
      tagUrl: $page.url.toString(),
      params: `?catId=${$page.url.searchParams.get('catid')}&tagid=${$page.url.searchParams.get('tagid')}`,
    },
  ]}
/>
<ProductView productArr={data} />
