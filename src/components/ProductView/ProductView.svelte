<script lang="ts">
  import { onMount } from 'svelte';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import VariantProducts from '@/components/VariantProducts/VariantProducts.svelte';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  export let categoryId: string;

  let productArr: readonly Product[] = [];

  let variantArr: readonly Product[] = [];
  $: variantArr = productArr.filter((product) => !!product.VariantGroupId);
  let nonVariantArr: readonly Product[] = [];
  $: nonVariantArr = productArr.filter((product) => !!!product.VariantGroupId);

  const refreshProductView = async (id: string) =>
    (productArr = await refreshProducts(
      `${process.env.SERVER_URL}/products-by-category?id=${id}`
    ));

  onMount(async () => await refreshProductView(categoryId));

  $: refreshProductView(categoryId);
</script>

<style>
  .products-container {
    display: grid;
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 1fr 1fr 1fr;
  }

  button {
    width: 22.5vw;
    height: 25px;
  }

  button,
  button:active {
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
  }
</style>

<div class="products-container">
  {#each nonVariantArr as product}
    <SingleProduct {product} />
  {/each}
  {#if variantArr.length}
    <VariantProducts variantProducts={variantArr} />
  {/if}
</div>
