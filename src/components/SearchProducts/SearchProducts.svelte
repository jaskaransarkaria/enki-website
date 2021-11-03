<script lang="typescript">
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.svelte';
  import { products } from '@/stores/products';
  import { refreshProducts } from '@/libs/requests';
  import { searchProducts } from '@/libs/search';

  import type { Product } from '@/types/product';

  export let loading = true;

  const DEBOUNCE_CHAR_LIMIT = 2;
  let selectedTags: string[] = [];
  let searchValue = '';
  let data: readonly Product[] = [];
  let showSearchView = false;

  onMount(async () => {
    await fetchAllProducts();
    loading = false;
  });

  const searchForProduct = (value: string) => {
    const reg = new RegExp(`\\b${value}`, 'i');
    return value.length < DEBOUNCE_CHAR_LIMIT
      ? []
      : searchProducts(reg, $products);
  };

  const displaySearchView = (value: string) =>
    value.length > DEBOUNCE_CHAR_LIMIT
      ? (showSearchView = true)
      : (showSearchView = false);

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
      displaySearchView(e.currentTarget.value);
    }}
    on:keydown={(e) => {
      if (e.key === 'Escape') {
        showSearchView = false;
        searchValue = '';
      }
      if (e.key === 'Enter') {
        showSearchView = false;
        $goto(`/shop/search`, {
          'search-term': encodeURIComponent(searchValue),
        });
        searchValue = '';
      }
    }}
  />
  {#if showSearchView}
    <div class="search-view" transition:slide|local>
      <ul transition:fade|local>
        {#if searchValue.length > DEBOUNCE_CHAR_LIMIT || selectedTags.length > 0}
          <h1>Total matches: {data.length}</h1>
          <div class="matches-container">
            {#if data.length}
              {#each data as prod}
                <SingleProduct product={prod} />
              {/each}
            {/if}
          </div>
        {/if}
      </ul>
    </div>
    <button
      class="close-search"
      transition:fade|local
      on:click={() => {
        showSearchView = false;
        searchValue = '';
      }}
    >
      x
    </button>
  {/if}
{/if}

<style>
  .search-view {
    background-color: white;
    z-index: 99;
    width: 100vw;
    position: absolute;
  }

  .matches-container {
    display: grid;
    grid-gap: 16px;
    padding: 16px;
    grid-auto-flow: column;
    overflow-x: auto;
  }

  .close-search {
    position: absolute;
    right: 0;
    margin: 0.15%;
    background: none;
    cursor: pointer;
  }

  @media (min-width: 960px) {
    .matches-container {
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-flow: row;
      overflow-x: none;
    }
  }
</style>
