<script lang="ts">
  import { params } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { categories } from '../../stores/categories';
  import ProductView from '../../components/ProductView/ProductView.svelte'

  export let category: string;

  onMount(async () => {
    const fetchCategoryById = async (id: string) => {
      const response = await fetch(
        `${process.env.SERVER_URL}/category?id=${id}`
      );
      const parsedResult = JSON.parse(await response.json());
      return parsedResult;
    };
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
{#if $categories.hasOwnProperty('Id')}
  <h1>{$categories.Id}</h1>
  <h1>{$categories.Name}</h1>
  {#if $categories.Children.length > 0}
    <span> There are sub categories here </span>
    <h1>{JSON.stringify($categories.Children)}</h1>
  {:else}
    <ProductView categoryId={category}/>
  {/if}
{/if}
