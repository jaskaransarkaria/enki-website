<script lang="ts">
  import { params, goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { categories } from '../../stores/categories';
  import ProductView from '../../components/ProductView/ProductView.svelte';
  import SearchJewellery from '../../components/SearchJewellery/SearchJewellery.svelte';
  import { refreshCategory } from '../../libs/requests';

  export let category: string;

  const JEWELLERY_CATEGORY = process.env.JEWELLERY_CATEGORY_ID;

  onMount(async () => {
    const data = await refreshCategory(`${process.env.SERVER_URL}/category?id=${category}`)
    categories.set(data);
  });
  $: refreshCategory(`${process.env.SERVER_URL}/category?id=${category}`)
</script>

<h1>PARAMS {$params.category}</h1>
<h1>{category}</h1>

{#if category === JEWELLERY_CATEGORY}
  <SearchJewellery />
{/if}

{#if $categories.Id !== JEWELLERY_CATEGORY}
  <h1>{$categories.Id}</h1>
  <h1>{$categories.Name}</h1>
  {#if $categories.Children.length > 0}
    {#each $categories.Children as cat}
      <button
        on:click={() => {
          // categories.set(cat);
          $goto(`./${$params.category}/${cat.Id}`);
        }}>
        {cat.Name}
      </button>
    {/each}
  {:else}
    <ProductView categoryId={category} />
  {/if}
{/if}
