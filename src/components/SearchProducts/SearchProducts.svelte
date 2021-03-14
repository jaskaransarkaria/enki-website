<script lang="ts">
  import { onMount } from 'svelte';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.svelte';
  import { products } from '@/stores/products';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  const DEBOUNCE_CHAR_LIMIT = 2;
  let searchValue: string = '';
  let loading: boolean = false;
  let data: readonly Product[] = [];

  onMount(async () => {
    await fetchAllProducts();
  });

  const searchForProduct = (value: string) =>
    value.length < DEBOUNCE_CHAR_LIMIT
      ? []
      : $products.filter((obj) =>
          obj.Name.toLowerCase().match(value.toLowerCase())
        );

  const fetchAllProducts = async () => {
    if ($products && $products.length == 0) {
      loading = true;
      data = await refreshProducts(
        `${process.env.SERVER_URL}/get-all-products`
      );
      products.set(data);
      loading = false;
    }
  };
</script>

{#if loading}
  <LoadingSpinner />
{:else}
  <input
    type="search"
    bind:value={searchValue}
    on:input={(e) => (data = searchForProduct(e.currentTarget.value))} />

  <ul>
    {#if searchValue.length > DEBOUNCE_CHAR_LIMIT}
      <h1>Total matches: {data.length}</h1>
      {#each data as match}
        <SingleProduct product={match} />
      {/each}
    {/if}
  </ul>
{/if}
