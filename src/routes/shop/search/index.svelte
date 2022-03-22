<script lang="ts">
  import { page } from '$app/stores';
  import GetProducts from '$lib/components/GetProducts/GetProducts.svelte';
  import ProductView from '$lib/components/ProductView/ProductView.svelte';
  import { products } from '$lib/stores/products';
  import { searchProducts } from '$lib/utils/search';

  import type { Product } from '$lib/types/product';

  let data: readonly Product[] = [];
  let reg: RegExp;

  $: reg = new RegExp(`\\b${decodeURIComponent($page.url.searchParams.get('search-term'))}`, 'i');
  $: if ($page.url.searchParams.get('search-term') && $products.length) {
    data = searchProducts(reg, $products);
  }
</script>

<GetProducts />
{#if data.length}
  <h2>
    we found {data.length} results for "{decodeURIComponent(
      $page.url.searchParams.get('search-term')
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
