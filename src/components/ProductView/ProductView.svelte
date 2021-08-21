<script lang="ts">
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import VariantProducts from '@/components/VariantProducts/VariantProducts.svelte';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  export let categoryId: number;
  export let productArr: readonly Product[] = [];
  export let showDetailedView: boolean = false;

  let variantArr: readonly Product[] = [];
  let nonVariantArr: readonly Product[] = [];

  const refreshProductView = async (id: number) =>
    await refreshProducts(
      `${process.env.SERVER_URL}/products-by-category?id=${id.toString()}`
    );

  $: categoryId === 0
    ? null
    : refreshProductView(categoryId).then((data) => (productArr = data));
  $: if (productArr.length) {
    variantArr = productArr.filter(({ VariantGroupId }) => !!VariantGroupId);
    nonVariantArr = productArr.filter(
      ({ VariantGroupId }) => !!!VariantGroupId
    );
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
