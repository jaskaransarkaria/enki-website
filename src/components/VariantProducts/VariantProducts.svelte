<script lang="typescript">
  import { groupBy } from 'lodash-es';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import type { Product } from '@/types/product';

  export let variantProducts: readonly Product[] = [];
  export let showDetailedView = false;

  let selectedProduct: Product = variantProducts[0] || 'none selected';
  let groupedVariantProducts: Array<readonly Product[]>;

  $: groupedVariantProducts = Object.values(
    groupBy(variantProducts, 'VariantGroupId')
  );
</script>

{#if groupedVariantProducts.length}
  <div class="container">
    {#each groupedVariantProducts as variants}
      <select
        bind:value={selectedProduct}
        id="variants"
        name="variant-drop-down"
      >
        {#each variants as variant}
          <option value={variant}>{variant.Name}</option>
        {/each}
      </select>
    {/each}
    {#if selectedProduct}
      <SingleProduct product={selectedProduct} {showDetailedView} />
    {/if}
  </div>
{/if}

<style>
  .container {
    border: 2px solid seagreen;
  }
</style>
