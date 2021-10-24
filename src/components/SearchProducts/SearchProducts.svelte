<script lang="typescript">
  import { onMount } from 'svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.svelte';
  import { products } from '@/stores/products';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  export let loading = true;

  const DEBOUNCE_CHAR_LIMIT = 2;
  let selectedTags: string[] = [];
  let searchValue = '';
  let data: readonly Product[] = [];

  onMount(async () => {
    await fetchAllProducts();
    loading = false;
  });

  const searchForProduct = (value: string) =>
    value.length < DEBOUNCE_CHAR_LIMIT
      ? []
      : $products.filter((obj) =>
          obj.Name.toLowerCase().match(value.toLowerCase())
        );

  const fetchAllProducts = async () => {
    if ($products && $products.length === 0) {
      const data = await refreshProducts(
        `${process.env.SERVER_URL}/get-all-products`
      );
      products.set(data);
      return data;
    }
  };
</script>

{#if loading}
  <LoadingSpinner />
{:else}
  <input
    data-testid="search-bar"
    type="search"
    bind:value={searchValue}
    on:input={(e) => {
      data = searchForProduct(e.currentTarget.value);
    }}
  />
  <ul>
    {#if searchValue.length > DEBOUNCE_CHAR_LIMIT || selectedTags.length > 0}
      <h1>Total matches: {data.length}</h1>
      {#if data.length}
        {#each data as prod}
          <ProductView productArr={[prod]} categoryId={prod.CategoryId} />
        {/each}
      {/if}
    {/if}
  </ul>
{/if}

<style>
</style>
