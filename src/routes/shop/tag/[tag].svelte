<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ProductView from '$lib/components/ProductView/ProductView.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs/Breadcrumbs.svelte';
  import { products } from '$lib/stores/products';
  import { refreshProducts } from '$lib/utils/requests';
  import type { Product } from '$lib/types/product';

  let data: readonly Product[] = [];

  onMount(async () => {
    if ($products && $products.length === 0) {
      data = await refreshProducts(
        `${import.meta.env.VITE_SERVER_URL}/get-all-products`
      );
      products.set(data);
    }
  });

  $: data = $products.filter((obj) =>
    obj.ProductTags.filter((tag) => tag.Name.toLowerCase() === $page.params.tag).length
      ? true
      : false
  );
</script>

<Breadcrumbs
  selectedCategoryId={parseInt($page.url.searchParams.get('catId'), 10)}
  extraCrumbs={[
    {
      Name: $page.params.tag,
      Id: parseInt($page.url.searchParams.get('tagId'), 0),
      tagUrl: $page.url.toString(),
      params: `?catId=${$page.url.searchParams.get('catId')}&tagId=${$page.url.searchParams.get('tagId')}`,
    },
  ]}
/>
{#if data.length}
  <ProductView productArr={data} />
{/if}
