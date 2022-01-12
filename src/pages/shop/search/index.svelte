<script lang="typescript">
  import { params } from '@roxi/routify';
  import { onMount } from 'svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
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

{#if data.length}
  <h2>
    we found {data.length} results for "{decodeURIComponent(
      $params['search-term']
    )}"
  </h2>
  <ProductView productArr={data} />
{/if}

<style>
  h2 {
    margin-top: 40%;
    text-align: center;
    font-family: 'Caviar Dreams';
  }

  @media (min-width: 360px) {
    h2 {
      margin-top: 37.5%;
    }
  }

  @media (min-width: 700px) {
    h2 {
      margin-top: 12%;
    }
  }

  @media (min-width: 1600px) {
    h2 {
      margin-top: 6%;
    }
  }

  @media (min-width: 1960px) {
    h2 {
      margin-top: 6%;
    }
  }
</style>
