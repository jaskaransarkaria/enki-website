<script lang="typescript">
  import { groupBy } from 'lodash-es';
  import { fade } from 'svelte/transition';
  import { calcShowGrid } from '@/libs/gridCalc';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import Switch from '@/components/Switch/Switch.svelte';
  import type { Category } from '@/types/category';
  import type { Product } from '@/types/product';

  export let productArr: readonly Product[] = [];
  export let variantCategories: readonly Category[] = [];
  export let showDetailedView = false;

  let sortBy = false;
  let variantArr: readonly Product[] = [];
  let nonVariantArr: readonly Product[] = [];
  let groupedVariantProducts: Array<readonly Product[]>;

  enum ItemType {
    VARIANT_PRODUCT = 'VARIANT_PRODUCT',
    NONVARIANT_PRODUCT = 'NONVARIANT_PRODUCT',
    VARIANT_CATEGORY = 'VARIANT_CATEGORY',
  }

  type CollatedItem = (Product | Category) & { Type: ItemType };

  const showGroupedVariant = (group: Array<readonly Product[]>) =>
    group
      .flat(1)
      .filter((variant) => !variantCategoryIds.includes(variant.CategoryId))
      .map(
        (variant: Product): CollatedItem => ({
          ...variant,
          Type: ItemType.VARIANT_PRODUCT,
        })
      );

  const collateArray = (
    varCatsArr: readonly CollatedItem[],
    nonVarArr: readonly CollatedItem[],
    groupedVariantProducts: Array<readonly Product[]>
  ): readonly CollatedItem[] => [
    ...varCatsArr,
    ...nonVarArr,
    ...showGroupedVariant(groupedVariantProducts),
  ];

  $: variantCategoryIds = variantCategories.map((cat) => cat.Id);

  $: if (productArr.length) {
    variantArr = productArr.filter(({ VariantGroupId }) => !!VariantGroupId);

    nonVariantArr = productArr.filter(({ VariantGroupId }) => !VariantGroupId);
  }

  $: variantCategories.map(
    (category: Category): CollatedItem => ({
      ...category,
      Type: ItemType.VARIANT_CATEGORY,
    })
  );

  $: groupedVariantProducts = Object.values(
    groupBy(variantArr, 'VariantGroupId')
  );

  $: typedVariantCategories = variantCategories.map(
    (variant: Category): CollatedItem => ({
      ...variant,
      Type: ItemType.VARIANT_CATEGORY,
    })
  );

  $: typedNonVariantProductArr = nonVariantArr.map(
    (nonVariant: Product): CollatedItem => ({
      ...nonVariant,
      Type: ItemType.NONVARIANT_PRODUCT,
    })
  );

  $: collatedArray = collateArray(
    typedVariantCategories,
    typedNonVariantProductArr,
    groupedVariantProducts
  );

  $: sortedCollatedArray = sortBy
    ? collatedArray
        .slice()
        .sort((a, b) =>
          'SalePrice' in a
            ? a.SalePrice > ('SalePrice' in b ? b.SalePrice : -1)
              ? -1
              : 1
            : -1
        )
    : collatedArray.slice().sort((a, b) => (a.Name < b.Name ? -1 : 1));
</script>

<div class="container">
  <div class="switch-container">
    <Switch
      bind:active={sortBy}
      msg={sortBy ? 'price (highest to lowest)' : 'alphabetically'}
    />
  </div>
  {#key sortBy}
    {#if productArr}
      <div
        in:fade={{ delay: 500 }}
        class={showDetailedView ||
        !calcShowGrid(
          window.innerWidth,
          variantCategories.length
            ? variantCategories.length +
                nonVariantArr.length +
                variantArr.filter(
                  (vars) => !variantCategoryIds.includes(vars.CategoryId)
                ).length
            : productArr.length
        )
          ? 'detailed-products-container'
          : 'products-container'}
      >
        {#each sortedCollatedArray as item (item.Id)}
          <SingleProduct
            variantCategory={item.Type === ItemType.VARIANT_CATEGORY
              ? item
              : null}
            product={item.Type === ItemType.VARIANT_CATEGORY ? null : item}
            {showDetailedView}
          />
        {/each}
      </div>
    {/if}
  {/key}
</div>

<style>
  .switch-container {
    display: flex;
    justify-content: flex-end;
  }

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
      grid-gap: 25px;
      grid-auto-rows: 12em;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 550px) {
    .products-container {
      grid-template-columns: 1fr 1fr;
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
