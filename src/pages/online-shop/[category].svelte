<script lang="ts">
  import { onMount } from 'svelte';
  import { categories } from '../../stores/categories'

  export let category: any;

  onMount(() => {
    // const fetchCategoryById = async (id: string) => {
    //   const response = await fetch(`${process.env.SERVER_URL}/categories/${id}`)
    //   category = JSON.parse(await response.json());
    // }

    // if (!$categories.hasOwnProperty("Id")) {
    //   fetchCategoryById(category)
    // }
  })

  // if there are children in the category then show them
  // if there are no children in the catgory then display products
</script>

<h1>{category}</h1>
<h1>{$categories.Id}</h1>
<h1>{$categories.Name}</h1>
{#if $categories.Children}
  <span>
    There are sub categories here
  </span>
  <h1>{JSON.stringify($categories.Children)}</h1>
{:else}
  SHOW THE PRODUCTS HERE
{/if}