<script lang="typescript">
  import { groupBy } from 'lodash-es';
  import { fade } from 'svelte/transition';
  import { calcShowGrid } from '@/libs/gridCalc';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import type { Category } from '@/types/category';
  import type { Product } from '@/types/product';

  export let productArr: readonly Product[] = [];
  export let variantCategories: readonly Category[] = [];
  export let showDetailedView = false;

  let variantArr: readonly Product[] = [];
  let nonVariantArr: readonly Product[] = [];
  let groupedVariantProducts: Array<readonly Product[]>;

  $: groupedVariantProducts = Object.values(
    groupBy(variantArr, 'VariantGroupId')
  );

  $: variantCategoryIds = variantCategories.map((cat) => cat.Id);

  $: if (productArr.length) {
    variantArr = productArr.filter(({ VariantGroupId }) => !!VariantGroupId);
    nonVariantArr = productArr.filter(({ VariantGroupId }) => !VariantGroupId);
  }
</script>

{#if productArr}
  <div
    in:fade={{ delay: 500 }}
    class={showDetailedView ||
    !calcShowGrid(window.innerWidth, productArr.length)
      ? 'detailed-products-container'
      : 'products-container'}
  >
    {#if variantCategories.length}
      {#each variantCategories as variantCategory (variantCategory.Id)}
        <SingleProduct {variantCategory} product={null} />
      {/each}
    {/if}
    {#if variantArr.length}
      {#each groupedVariantProducts as variants (variants)}
        {#each variants as variant (variant)}
          {#if !variantCategoryIds.includes(variant.CategoryId)}
            <SingleProduct product={variant} />
          {/if}
        {/each}
      {/each}
    {/if}
    {#if nonVariantArr.length}
      {#each nonVariantArr as product}
        <SingleProduct {product} {showDetailedView} />
      {/each}
    {/if}
  </div>
{/if}

<style>
  .products-container {
    display: grid;
    grid-auto-rows: 18em;
    grid-template-columns: 1fr;
    align-items: center;
  }

  .detailed-products-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 360px) {
    .products-container {
      grid-auto-rows: 12em;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 550px) {
    .products-container {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 700px) {
    .products-container {
      grid-auto-rows: 20em;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 960px) {
    .products-container {
      grid-auto-rows: 32em;
    }
  }
  @media (min-width: 1280px) {
    .products-container {
      grid-auto-rows: 28em;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (min-width: 1600px) {
    .products-container {
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
