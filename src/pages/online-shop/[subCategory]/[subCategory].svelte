<script lang="ts">
  import { params } from '@roxi/routify';
  import { onMount } from 'svelte';
  import ProductView from '../../../components/ProductView/ProductView.svelte';
  import { categories } from '../../../stores/categories';
  import { refreshCategory } from '../../../libs/requests';

  export let subCategory: string;
  let showProduct = false;
  let productToShow: string;

  onMount(async () => {
    const data = await refreshCategory(`${process.env.SERVER_URL}/category?id=${subCategory}`)
    categories.set(data);
  });
  $: refreshCategory(`${process.env.SERVER_URL}/category?id=${subCategory}`)
</script>

<h1>{JSON.stringify($params.subCategory)}</h1>
<h1>{subCategory}</h1>

<!-- <SearchJewellery /> -->

{#if $categories.hasOwnProperty('Id') || $categories.Id === ''}
  <h1>{$categories.Id}</h1>
  <h1>{$categories.Name}</h1>
  {#if $categories.Children.length > 0}
    {#each $categories.Children as cat}
      <button
        on:click={() => {
          showProduct = true;
          productToShow = cat.Id;
        }}>
        {cat.Name}
      </button>
    {/each}
  {:else}
    <ProductView categoryId={subCategory} />
  {/if}

  {#if showProduct}
    <ProductView categoryId={productToShow} />
  {/if}
{/if}
