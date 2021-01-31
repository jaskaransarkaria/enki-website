<script lang="ts">
  import { params } from '@roxi/routify';
  import { onMount } from 'svelte';
  import ProductView from '../../../components/ProductView/ProductView.svelte';
  import { categories } from '../../../stores/categories';
  import { retrieveStateFn, getCategoryId } from '../../../libs/requests';
  import type { Category } from '../../../stores/categories';

  export let subCategory: string;
  let showProduct = false;
  let productToShow: string;

  onMount(async () => {
    // This prevents the app for fetching the categories if it has already pulled them
    // but will pull them if visiting the link directly
    // if (!$categories.hasOwnProperty('Id') || $categories.Id === '') {
    //   const result = await retrieveStateFn(
    //     `${process.env.SERVER_URL}/category?id=${subCategory}`,
    //     getCategoryId
    //   )()();
    //   const data: Category =
    //     result['_tag'] === 'Right'
    //       ? JSON.parse(result.right as string)
    //       : { Id: '', Name: '', Children: [] };

    //   categories.set(data);
    // } else {
    //   // show category children OR show productview
    //   const matchedCat = [...$categories.Children];
    //   categories.set(matchedCat.find(obj => obj.Id.toString() === subCategory)!)
    // }

    const result = await retrieveStateFn(
      `${process.env.SERVER_URL}/category?id=${subCategory}`,
      getCategoryId
    )()();
    const data: Category =
      result['_tag'] === 'Right'
        ? JSON.parse(result.right as string)
        : { Id: '', Name: '', Children: [] };
    categories.set(data);
  });
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
          console.log(cat.Id);
          productToShow = cat.Id;
          console.log(productToShow);
        }}>
        {cat.Name}
      </button>
    {/each}
  {:else}
    <ProductView categoryId={subCategory} />
  {/if}

  {#if showProduct}
    {console.log('product to show:', productToShow)}
    <ProductView categoryId={productToShow} />
  {/if}
{/if}
