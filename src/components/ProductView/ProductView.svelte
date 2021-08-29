<script lang="typescript">
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import VariantProducts from '@/components/VariantProducts/VariantProducts.svelte';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  export let categoryId: number;
  export let productArr: readonly Product[] = [];
  export let showDetailedView = false;

  let variantArr: readonly Product[] = [];
  let nonVariantArr: readonly Product[] = [];

  const refreshProductView = async (id: number) => {
    if (id) {
      const data = await refreshProducts(
        `${process.env.SERVER_URL}/products-by-category?id=${id.toString()}`
      );
      productArr = data;
    }
  };

  const hasCategoryId = (
    productArr: readonly Product[],
    catId: number
  ): boolean => !!productArr.find((prod) => prod.CategoryId === catId);

  // make sure that we have the right category to show BUG: if there is no products then it keeps refreshing
  $: !hasCategoryId(productArr, categoryId) && refreshProductView(categoryId);
  // this prevents getting the data if we already have it (productArray.length)
  // or if we haven't got an id to look up
  //$: productArr.length
  //  ? null
  //  : refreshProductView(categoryId);
  $: if (productArr.length) {
    variantArr = productArr.filter(({ VariantGroupId }) => !!VariantGroupId);
    nonVariantArr = productArr.filter(({ VariantGroupId }) => !VariantGroupId);
  }
</script>

{#if categoryId && productArr.length}
  <div class="products-container">
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
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
