<script lang="ts">
  import groupBy from 'lodash/groupBy';

  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';

  import type { Product } from '@/types/product';

  export let variantProducts: readonly Product[];
  export let showDetailedView: boolean = false;

  let selectedProduct: Product = variantProducts[0];
  let groupedVariantProducts: Array<readonly Product[]>;

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
  {#if showDetailedView}
    {#each groupedVariantProducts as variants}
      <select bind:value={selectedProduct}>
        {#each variants as variant}
          <option value={variant}>{variant.Name}</option>
        {/each}
      </select>
    {/each}
  {/if}
  {#if selectedProduct}
    <SingleProduct product={selectedProduct} {showDetailedView} />
  {/if}
</div>
