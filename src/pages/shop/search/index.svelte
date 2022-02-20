<script lang="typescript">
  import { params } from '@roxi/routify';
  import GetProducts from '@/components/GetProducts/GetProducts.svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import { products } from '@/stores/products';
  import { searchProducts } from '@/libs/search';

  import type { Product } from '@/types/product';

  let data: readonly Product[] = [];
  let reg: RegExp;

  $: reg = new RegExp(`\\b${decodeURIComponent($params['search-term'])}`, 'i');
  $: if ($params['search-term'] && $products.length) {
    data = searchProducts(reg, $products);
  }
</script>

<GetProducts />
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
