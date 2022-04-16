<script lang="ts">
  import { browser } from "$app/env";
  import { groupBy } from "lodash-es";
  import { fade } from "svelte/transition";
  import SingleProduct from "$lib/components/SingleProduct/SingleProduct.svelte";
  import type { Category } from "$lib/types/category";
  import type { Product } from "$lib/types/product";

  export let productArr: readonly Product[] = [];
  export let variantCategories: readonly Category[] = [];
  export let showDetailedView = false;

  let sortBy: string;
  let variantArr: readonly Product[] = [];
  let nonVariantArr: readonly Product[] = [];
  let groupedVariantProducts: Array<readonly Product[]>;

  enum ItemType {
    VARIANT_PRODUCT = "VARIANT_PRODUCT",
    NONVARIANT_PRODUCT = "NONVARIANT_PRODUCT",
    VARIANT_CATEGORY = "VARIANT_CATEGORY",
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

  const sortArray = (
    sortBy: string,
    collatedArray: readonly CollatedItem[]
  ) => {
    switch (sortBy) {
      case "in-stock":
        return collatedArray
          .slice()
          .sort((a, b) =>
            "CurrentStock" in a
              ? a.CurrentStock > ("CurrentStock" in b ? b.CurrentStock : -1)
                ? -1
                : 1
              : -1
          );
      case "price-high-low":
        return collatedArray
          .slice()
          .sort((a, b) =>
            "SalePrice" in a
              ? a.SalePrice > ("SalePrice" in b ? b.SalePrice : -1)
                ? -1
                : 1
              : -1
          );
      case "alphabetically":
        return collatedArray.slice().sort((a, b) => (a.Name < b.Name ? -1 : 1));
      case "price-low-high":
        return collatedArray
          .slice()
          .sort((a, b) =>
            "SalePrice" in a
              ? a.SalePrice > ("SalePrice" in b ? b.SalePrice : -1)
                ? 1
                : -1
              : -1
          );
      default:
        return collatedArray.slice().sort((a, b) => (a.Name < b.Name ? -1 : 1));
    }
  };

  $: variantCategoryIds = variantCategories.map((cat) => cat.Id);

  $: if (productArr.length) {
    variantArr = productArr
      .filter(({ VariantGroupId }) => !!VariantGroupId)
      .filter((prod: Product) => prod.SellOnWeb && !prod.IsArchived);

    nonVariantArr = productArr
      .filter(({ VariantGroupId }) => !VariantGroupId)
      .filter((prod: Product) => prod.SellOnWeb && !prod.IsArchived);
  }

  $: variantCategories.map(
    (category: Category): CollatedItem => ({
      ...category,
      Type: ItemType.VARIANT_CATEGORY,
    })
  );

  $: groupedVariantProducts = Object.values(
    groupBy(variantArr, "VariantGroupId")
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

  $: sortedCollatedArray = sortArray(sortBy, collatedArray);

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:window bind:outerWidth />
<div class="container">
  <div class="sort-container">
    <select name="products" id="products" bind:value={sortBy}>
      <option selected value="alphabetically">A - Z</option>
      <option value="price-high-low">price (high to low)</option>
      <option value="price-low-high">price (low to high)</option>
      <option value="in-stock">in stock</option>
    </select>
  </div>
  {#key sortBy}
    {#if productArr && browser}
      <div
        in:fade={{ delay: 500 }}
        class={showDetailedView ||
        (variantCategories.length +
          nonVariantArr.length +
          variantArr.filter(
            (vars) => !variantCategoryIds.includes(vars.CategoryId)
          ).length <=
          3 &&
          !isMobile) // if there are only 3 products then center them
          ? "detailed-products-container"
          : "products-container"}
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
  .sort-container {
    display: flex;
    justify-content: flex-end;
    margin-right: 2.5%;
  }

  select,
  option {
    font-family: "Caviar Dreams";
    text-align: center;
    background-color: white;
    border-radius: 5px;
    color: none;
    outline: none;
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
      grid-auto-rows: 11.5em;
      grid-template-columns: 1fr 1fr;
      margin: 5px;
    }
  }

  @media (min-width: 550px) {
    .products-container {
      grid-template-columns: 1fr 1fr;
      margin: 25px;
    }
  }

  @media (min-width: 700px) {
    .products-container {
      grid-auto-rows: 20em;
      grid-template-columns: 1fr 1fr;
      margin: 35px;
    }
  }
  @media (min-width: 960px) {
    .products-container {
      grid-auto-rows: 28em;
    }
  }
  @media (min-width: 1280px) {
    .products-container {
      grid-auto-rows: 25.5em;
      grid-template-columns: 1fr 1fr 1fr;
      margin: 0;
      grid-gap: 20px;
    }
  }
  @media (min-width: 1600px) {
    .products-container {
      grid-auto-rows: 24em;
      margin: 35px;
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
      grid-auto-rows: 30em;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 25px;
    }
  }
</style>
