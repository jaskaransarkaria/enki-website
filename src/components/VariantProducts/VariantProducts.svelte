<script lang="ts">
  import groupBy from 'lodash/groupBy';

  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';

  import type { Product } from '@/types/product';

  export let variantProducts: readonly Product[];
  let selectedProduct: Product;
  let groupedVariantProducts: Array<readonly Product[]>;

  $: selectedProduct = variantProducts[0];
  $: groupedVariantProducts = Object.values(
    groupBy(variantProducts, 'VariantGroupId')
  );
</script>

<style>
  .container {
    border: 2px solid seagreen;
  }
</style>

<div class="container">
  {#each groupedVariantProducts as variants}
    <select bind:value={selectedProduct}>
      {#each variants as variant}
        <option value={variant}>{variant.Name}</option>
      {/each}
    </select>
  {/each}
  {#if selectedProduct}
    <SingleProduct product={selectedProduct} />
  {/if}
</div>
