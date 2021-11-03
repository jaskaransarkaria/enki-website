<script lang="typescript">
  import { params } from '@roxi/routify';
  import { onMount } from 'svelte';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.svelte';
  import { products } from '@/stores/products';
  import { refreshProducts } from '@/libs/requests';
  import { searchProducts } from '@/libs/search';

  import type { Product } from '@/types/product';

  let data: readonly Product[] = [];
  let reg: RegExp;

  onMount(async () => {
    if ($products && $products.length === 0) {
      const fetchedData = await refreshProducts(
        `${process.env.SERVER_URL}/get-all-products`
      );
      products.set(fetchedData);
    }
  });

  $: reg = new RegExp(`\\b${decodeURIComponent($params['search-term'])}`, 'i');
  $: if ($params['search-term']) {
    data = searchProducts(reg, $products);
  }
</script>

<Breadcrumbs selectedCategoryId={1} />
{#if data.length}
  {#each data as prod (prod.Id)}
    <SingleProduct product={prod} showDetailedView />
  {/each}
{/if}
