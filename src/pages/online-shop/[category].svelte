<script lang="ts">
  import { params, goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { categories } from '../../stores/categories';
  import ProductView from '../../components/ProductView/ProductView.svelte';
  import SearchJewellery from '../../components/SearchJewellery/SearchJewellery.svelte';

  export let category: string;

  const fetchCategoryById = async (id: string) => {
    const response = await fetch(`${process.env.SERVER_URL}/category?id=${id}`);
    const parsedResult = JSON.parse(await response.json());
    return parsedResult;
  };

  onMount(async () => {
    if (!$categories.hasOwnProperty('Id')) {
      try {
        const data = await fetchCategoryById(category);
        categories.set(data);
      } catch (err) {
        console.error('fetching category failed', err);
      }
    }
  });
</script>

<h1>PARAMS {$params.category}</h1>
<h1>{category}</h1>

{#if category === '1821413'}
  <SearchJewellery />
{/if}

{#if $categories.hasOwnProperty('Id')}
  <h1>{$categories.Id}</h1>
  <h1>{$categories.Name}</h1>
  {#if $categories.Children.length > 0}
    {#each $categories.Children as category}
      <button
        on:click={() => {
          categories.set(category);
          $goto(`./${$params.category}/${category.Id}`);
        }}>
        {category.Name}
      </button>
    {/each}
  {:else}
    <ProductView categoryId={category} />
  {/if}
{/if}
