<script lang="ts">
  import { params } from '@roxi/routify';
  import { onMount } from 'svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import SearchJewellery from '@/components/SearchJewellery/SearchJewellery.svelte';
  import { refreshCategory } from '@/libs/requests';
  import { categories } from '@/stores/categories';
  import type { Category } from '@/types/category';

  export let categoryFn: (cat: Category) => void;
  export let categoryId: string;
  const JEWELLERY_CATEGORY = process.env.JEWELLERY_CATEGORY_ID;

  let showJewellerySearch: boolean;

  const refreshSetCategories = async (id: string) => {
    if (id) {
      const data = await refreshCategory(
        `${process.env.SERVER_URL}/category?id=${id}`
      );
      categories.set(data as Category);
    }
  };

  onMount(async () => {
    if (!($categories.hasOwnProperty('Id') && $categories.Id !== '')) {
      refreshSetCategories(categoryId);
    }
    showJewellerySearch = !!$params.search;
  });

  $: refreshSetCategories(categoryId);
</script>

{#if $params.category === JEWELLERY_CATEGORY || showJewellerySearch}
  <SearchJewellery />
{/if}

{#if $categories.hasOwnProperty('Id') || $categories.Id !== ''}
  {#if $categories.Id !== JEWELLERY_CATEGORY}
    <h1>{$categories.Id}</h1>
    <h1>{$categories.Name}</h1>
    {#if $categories.Children.length > 0}
      {#each $categories.Children as cat}
        <button on:click={() => categoryFn(cat)}> {cat.Name} </button>
      {/each}
    {:else}
      <ProductView bind:categoryId />
    {/if}
  {/if}
{/if}
