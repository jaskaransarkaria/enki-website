<script lang="ts">
  import { onMount } from 'svelte';
  import { categories } from '../../stores/categories';

  export let category: any;

  onMount(async () => {
    const fetchCategoryById = async (id: string) => {
      // TODO: set up the route to grab the relevant name
      const response = await fetch(`${process.env.SERVER_URL}/category/${id}`);
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

  // if there are children in the category then show them
  // if there are no children in the catgory then display products
</script>

<h1>{category}</h1>
<h1>{$categories.Id}</h1>
<h1>{$categories.Name}</h1>
{#if $categories.Children.length > 0}
  <span> There are sub categories here </span>
  <h1>{JSON.stringify($categories.Children)}</h1>
{:else}SHOW THE PRODUCTS HERE{/if}
