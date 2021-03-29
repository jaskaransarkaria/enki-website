<script lang="ts">
  import { onMount } from 'svelte';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import VariantProducts from '@/components/VariantProducts/VariantProducts.svelte';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  export let categoryId: string;
  export let productArr: readonly Product[] = [];

  let variantArr: readonly Product[] = [];
  let nonVariantArr: readonly Product[] = [];

  const refreshProductView = async (id: string) =>
    (productArr = await refreshProducts(
      `${process.env.SERVER_URL}/products-by-category?id=${id}`
    ));

  onMount(async () => categoryId && (await refreshProductView(categoryId)));

  $: refreshProductView(categoryId);
  $: if (productArr.length) {
    variantArr = productArr.filter((product) => !!product.VariantGroupId);
    nonVariantArr = productArr.filter((product) => !!!product.VariantGroupId);
  }
</script>

<style>
  .products-container {
    display: grid;
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>

<div class="products-container">
  {#if nonVariantArr.length}
    {#each nonVariantArr as product}
      <SingleProduct {product} />
    {/each}
  {/if}
  {#if variantArr.length}
    <VariantProducts variantProducts={variantArr} />
  {/if}
</div>
