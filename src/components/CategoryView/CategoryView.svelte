<script lang="ts">
  import { onMount } from 'svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import { refreshCategory } from '@/libs/requests';
  import { categories } from '@/stores/categories';
  import type { Category } from '@/types/category';

  export let categoryFn: (cat: Category) => void;
  export let categoryId: string;
  const JEWELLERY_CATEGORY = process.env.JEWELLERY_CATEGORY_ID;

  const refreshSetCategories = async (id: string) => {
    if (id) {
      const data = await refreshCategory(
        `${process.env.SERVER_URL}/category?id=${id}`
      );
      categories.set(data);
    }
  };

  onMount(async () => {
    if ($categories.hasOwnProperty('Id') && $categories.Id === '') {
      await refreshSetCategories(categoryId);
    }
  });

  $: refreshSetCategories(categoryId);
</script>

{#if $categories.hasOwnProperty('Id') && $categories.Id !== ''}
  {#if $categories.Id !== JEWELLERY_CATEGORY}
    <h1>{$categories.Id}</h1>
    <h1>{$categories.Name}</h1>
    {#if $categories.Children && $categories.Children.length > 0}
      {#each $categories.Children as cat}
        <button on:click={() => categoryFn(cat)}> {cat.Name} </button>
      {/each}
    {:else}
      <ProductView bind:categoryId />
    {/if}
  {/if}
{/if}
