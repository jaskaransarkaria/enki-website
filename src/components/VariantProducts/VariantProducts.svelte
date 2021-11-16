<script lang="typescript">
  import { groupBy } from 'lodash-es';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import type { Product } from '@/types/product';

  export let variantProducts: readonly Product[] = [];
  export let showDetailedView = false;

  let selectedProduct: Product = variantProducts[0];
  let groupedVariantProducts: Array<readonly Product[]>;

  $: groupedVariantProducts = Object.values(
    groupBy(variantProducts, 'VariantGroupId')
  );
</script>

{#if groupedVariantProducts.length}
  <div class="container">
    {#each groupedVariantProducts as variants (variants)}
      <select
        bind:value={selectedProduct}
        id="variants"
        name="variant-drop-down"
      >
        {#each variants as variant (variant)}
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
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

  select {
    font-size: 0.7em;
    text-align: center;
    background: none;
    border: none;
    margin: auto;
    border-bottom: 1px solid #fa6603;
  }

  @media (min-width: 360px) {
    select {
      font-size: 0.8em;
    }
  }

  @media (min-width: 700px) {
    select {
      font-size: 0.8em;
    }
  }

  @media (min-width: 960px) {
    select {
      font-size: 0.9em;
    }
  }

  @media (min-width: 2000px) {
    select {
      font-size: 1em;
    }

    .container {
      margin: auto;
    }
  }
</style>
