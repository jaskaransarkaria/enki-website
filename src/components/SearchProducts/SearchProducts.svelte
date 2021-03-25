<script lang="ts">
  import { onMount } from 'svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.svelte';
  import { products } from '@/stores/products';
  import { refreshProducts, refreshTags } from '@/libs/requests';

  import type { Product } from '@/types/product';
  import type { Tag } from '@/types/tag';

  const DEBOUNCE_CHAR_LIMIT = 2;
  let selectedTags: string[] = [];
  let searchValue: string = '';
  let loading: boolean = false;
  let data: readonly Product[] = [];
  let tags: readonly Tag[] = [];

  $: data = $products.filter((obj) =>
    obj.ProductTags.filter((tag) => selectedTags.includes(tag.Id)).length > 0
      ? true
      : false
  );

  $: console.log('data', data);

  onMount(async () => {
    await fetchAllTags();
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

  const fetchAllTags = async () => {
    tags = await refreshTags(`${process.env.SERVER_URL}/tags`);
  };

  const removeTag = (tagId: string, tagArr: string[]): string[] => {
    const idx = tagArr.findIndex((tag) => tag === tagId);
    return [...tagArr.slice(0, idx), ...tagArr.slice(idx + 1)];
  };

  const toggleSelected = (tagId: string, tagArr: string[]): string[] =>
    tagArr.includes(tagId)
      ? removeTag(tagId, selectedTags)
      : [...tagArr.slice(), tagId];
</script>

<style>
  .tag-container {
    display: flex;
  }

  .tag-container > * {
    padding: 1rem;
  }

  .tag-container > *:hover {
    cursor: pointer;
  }

  .selected-tag {
    border: cornflowerblue 0.25rem solid;
    border-radius: 45%;
  }
</style>

{#if loading}
  <LoadingSpinner />
{:else}
  <input
    type="search"
    bind:value={searchValue}
    on:input={(e) => (data = searchForProduct(e.currentTarget.value))} />
  <div class="tag-container">
    {#each tags as tag}
      <h4
        class={selectedTags.includes(tag.Id) ? 'selected-tag' : undefined}
        on:click={() => (selectedTags = toggleSelected(tag.Id, selectedTags))}>
        {tag.Name}
      </h4>
    {/each}
  </div>
  <ul>
    {#if searchValue.length > DEBOUNCE_CHAR_LIMIT || selectedTags.length > 0}
      <h1>Total matches: {data.length}</h1>
      {#if data.length}
        <ProductView productArr={data} categoryId="" />
      {/if}
    {/if}
  </ul>
{/if}
