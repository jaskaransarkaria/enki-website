<script lang="ts">
  import { beforeUpdate, onMount } from "svelte";
  import { browser } from "$app/env";
  import { groupBy } from "lodash-es";
  import { fade } from "svelte/transition";
  import Banner from "$lib/components/Banner/Banner.svelte";
  import SingleProduct from "$lib/components/SingleProduct/SingleProduct.svelte";
  import type { Category } from "$lib/types/category";
  import type { Product } from "$lib/types/product";

  export let productArr: readonly Product[] = [];
  export let variantCategories: readonly Category[] = [];
  export let showDetailedView = false;
  export let whitelistedUserAgent = false;

  let sortBy: string = browser
    ? window.sessionStorage.getItem("filter")
    : "in-stock";
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
      ?.filter((variant) => !variantCategoryIds.includes(variant.CategoryId))
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

  const sortByStock = (collatedArray: readonly CollatedItem[]) => {
    return collatedArray.slice().sort((a, b) => {
      if (a.Type === ItemType.VARIANT_CATEGORY) {
        return -1;
      }
      if (b.Type === ItemType.VARIANT_CATEGORY) {
        return 1;
      }
      return "CurrentStock" in a
        ? a.CurrentStock > ("CurrentStock" in b ? b.CurrentStock : -1)
          ? -1
          : 1
        : -1;
    });
  };

  const sortArray = (
    sortBy: string,
    collatedArray: readonly CollatedItem[]
  ) => {
    switch (sortBy) {
      case "price-high-low":
        browser && window.sessionStorage.setItem("filter", "price-high-low");
        return collatedArray
          .slice()
          .sort((a, b) =>
            "SalePrice" in a
              ? a.SalePrice > ("SalePrice" in b ? b.SalePrice : -1)
                ? -1
                : 1
              : -1
          );
      case "price-low-high":
        browser && window.sessionStorage.setItem("filter", "price-low-high");
        return collatedArray
          .slice()
          .sort((a, b) =>
            "SalePrice" in a
              ? a.SalePrice > ("SalePrice" in b ? b.SalePrice : -1)
                ? 1
                : -1
              : -1
          );
      case "alphabetically":
        browser && window.sessionStorage.setItem("filter", "alphabetically");
        return collatedArray.slice().sort((a, b) => (a.Name < b.Name ? -1 : 1));
      default:
        browser && window.sessionStorage.setItem("filter", "in-stock");
        return sortByStock(collatedArray);
    }
  };

  $: variantCategoryIds = variantCategories.map((cat) => cat.Id);

  $: if (productArr.length) {
    variantArr = productArr
      ?.filter(({ VariantGroupId }) => !!VariantGroupId)
      ?.filter((prod: Product) => prod.SellOnWeb && !prod.IsArchived);

    nonVariantArr = productArr
      ?.filter(({ VariantGroupId }) => !VariantGroupId)
      ?.filter((prod: Product) => prod.SellOnWeb && !prod.IsArchived);
  } else {
    variantArr = [];
    nonVariantArr = [];
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

  beforeUpdate(() => (sortBy = window.sessionStorage.getItem("filter")));

  $: sortedCollatedArray = sortArray(sortBy, collatedArray);

  $: outerWidth = 0;
  $: isMobile = outerWidth < 960;
</script>

<svelte:window bind:outerWidth />
{#if sortedCollatedArray.length}
  <div class="container">
    <Banner hasProducts />
    <div class="sort-container">
      <select name="products" id="products" bind:value={sortBy}>
        <option value="alphabetically">A - Z</option>
        <option value="price-high-low">price (high to low)</option>
        <option value="price-low-high">price (low to high)</option>
        <option value="in-stock">in stock</option>
      </select>
    </div>
    {#key sortBy}
      {#if (productArr && browser) || whitelistedUserAgent}
        {#if browser && window.location.pathname.includes("1876089")}
          <div class="gift-wrap-container">
            <div class="gift-wrap-img-container">
              <div class="img-container">
                <img
                  src="https://enki.imgix.net/gift-wrap-1.jpeg?format=auto,compress"
                  alt="the inside of a card with happy birthday written out"
                />
                <p>
                  Select which gifts you'd like wrapped on the basket page and
                  we'll wrap them for you in recycled kraft paper and colourful
                  raffia ribbon, for 95p per gift.
                </p>
              </div>
              <div class="img-container">
                <img
                  src="https://enki.imgix.net/gift-wrap-2.jpeg?format=auto,compress"
                  alt="some gifts wrapped with colourful wrapping paper and pink and green ribbon"
                />
                <p>
                  To make your gift extra special just add one of our printed
                  wraps below and we'll us it to wrap whichever gifts are
                  selected in the basket. A sheet should do one large, two small
                  or lots of little gifts.
                </p>
              </div>
              <div class="img-container">
                <img
                  src="https://enki.imgix.net/gift-wrap-3.jpeg?format=auto,compress"
                  alt="some gifts wrapped with brown paper wrapping paper and yellow and green ribbon"
                />
                <p>
                  There's also a space for you to write a message for the
                  recipient, if you have a card in your basket we'll write in
                  that, if not we'll write on one of our enki gift tags.
                </p>
              </div>
            </div>
          </div>
        {/if}
        <div
          in:fade|local={{ delay: 500 }}
          class={showDetailedView ||
          (variantCategories.length +
            nonVariantArr.length +
            variantArr?.filter(
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
{/if}

<style>
  .gift-wrap-container {
    display: flex;
    justify-content: center;
  }

  .gift-wrap-img-container {
    margin: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
  }

  .img-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1em;
  }

  .img-container > img {
    max-width: 80%;
    margin: 1em;
  }

  p {
    font-family: "Caviar Dreams";
    text-align: center;
    width: 80%;
    height: 5em;
  }

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
      grid-gap: 10px;
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

    .gift-wrap-img-container {
      flex-direction: row;
    }

    .img-container > img {
      max-width: 20vw;
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
