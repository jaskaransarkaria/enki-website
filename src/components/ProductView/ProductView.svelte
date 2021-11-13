<script lang="typescript">
  import { fade } from 'svelte/transition';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import VariantProducts from '@/components/VariantProducts/VariantProducts.svelte';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  export let categoryId: number;
  export let productArr: readonly Product[] = [];
  export let showDetailedView = false;

  const productObj: { [key: string]: { isEmpty: boolean } } = {};
  let variantArr: readonly Product[] = [];
  let nonVariantArr: readonly Product[] = [];

  const refreshProductsArr = async (
    id: number
  ): Promise<readonly Product[]> => {
    if (id) {
      const data = await refreshProducts(
        `${process.env.SERVER_URL}/products-by-category?id=${id.toString()}`
      );
      productArr = data;
      return data;
    }
    return [];
  };

  const refreshProductView = async (arr: readonly Product[], catId: number) => {
    // this guards against repeatedly calling refresh when the response is an empty array of products
    if (productObj?.[catId]?.isEmpty) {
      return;
    }

    // if the category already is in the product array then we don't need to make another api call
    if (arr.find((prod) => prod.CategoryId === categoryId)) {
      return;
    }

    arr = await refreshProductsArr(catId);

    // if the response is an empty array of products let's remember that so we don't make unnecessary refreshes
    if (!arr.length) {
      productObj[catId] = { isEmpty: true };
      return;
    }
  };

  // make sure that we have the right category to show BUG: if there is no products then it keeps refreshing
  $: refreshProductView(productArr, categoryId);
  $: if (productArr.length) {
    variantArr = productArr.filter(({ VariantGroupId }) => !!VariantGroupId);
    nonVariantArr = productArr.filter(({ VariantGroupId }) => !VariantGroupId);
  }
</script>

{#if categoryId && productArr.length && !productObj?.[categoryId]?.isEmpty}
  <div
    in:fade={{ delay: 750 }}
    class={showDetailedView
      ? 'detailed-products-container'
      : 'products-container'}
  >
    {#if nonVariantArr.length}
      {#each nonVariantArr as product}
        <SingleProduct {product} {showDetailedView} />
      {/each}
    {/if}
    {#if variantArr.length}
      <VariantProducts variantProducts={variantArr} {showDetailedView} />
    {/if}
  </div>
{/if}

<style>
  .products-container {
    display: grid;
    grid-auto-rows: 28em;
    grid-template-columns: 1fr;
    align-items: center;
  }

  .detailed-products-container {
    display: flex;
  }

  @media (min-width: 360px) {
    .products-container {
      grid-auto-rows: 30em;
    }
  }

  @media (min-width: 700px) {
    .products-container {
      grid-auto-rows: 38em;
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 960px) {
    .products-container {
      grid-auto-rows: 34em;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 1280px) {
    .products-container {
      grid-auto-rows: 30em;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (min-width: 1600px) {
    .products-container {
      grid-auto-rows: 28em;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media (min-width: 2000px) {
    .products-container {
      grid-auto-rows: 30em;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media (min-width: 2400px) {
    .products-container {
      grid-auto-rows: 32em;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
</style>
