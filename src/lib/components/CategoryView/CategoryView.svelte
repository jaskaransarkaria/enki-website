<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import JewelleryView from "$lib/components/JewelleryView/JewelleryView.svelte";
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import Banner from "$lib/components/Banner/Banner.svelte";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import TagView from "$lib/components/TagView/TagView.svelte";

  import type { Category } from "$lib/types/category";
  import type { Product } from "$lib/types/product";
  import type { BaseFn } from "$lib/types/base";

  export let categoryFn: BaseFn;
  export let showBreadcrumbs = true;
  export let categoryToShow: Category | undefined;
  export let hasProducts = false;
  export let productArr: readonly Product[];
  export let whitelistedUserAgent: boolean;

  const removeVariantCategories = (categories: Category[]) =>
    categories?.filter((cat) => cat.NominalCode === "CATEGORY");

  $: variantCategories = categoryToShow?.Children.filter(
    (cat) => cat.NominalCode === null
  );
</script>

<Banner {hasProducts} />
{#if showBreadcrumbs}
  <Breadcrumbs selectedCategoryId={categoryToShow?.Id} />
{/if}
{#if removeVariantCategories(categoryToShow?.Children)?.length || categoryToShow?.Id === 1875997 || categoryToShow?.Id === 1875998}
  {#if categoryToShow.Id === 1875996}
    <JewelleryView
      data={removeVariantCategories(categoryToShow?.Children)}
      {categoryFn}
    />
  {:else if categoryToShow.Id === 1875997 || categoryToShow.Id === 1875998}
    <TagView
      data={removeVariantCategories(categoryToShow.Children)}
      {categoryFn}
      categoryId={categoryToShow?.Id}
      prefix={categoryToShow.Name.split(" ")[0].toUpperCase()}
    />
  {:else}
    {#if categoryToShow.Id === 1876089}
      <div class="gift-wrap-container">
        <p>
          Select which gifts you'd like wrapped on the basket page and we'll
          wrap them for you in recycled kraft paper and colourful raffia ribbon,
          for 95p per gift.
          <br />
          <br />
          To make your gift extra special just add one of our printed wraps below
          and we'll us it to wrap whichever gifts are selected in the basket. A sheet
          should do one large, two small or lots of little gifts.
          <br />
          <br />
          There's also a space for you to write a message for the recipient, if you
          have a card in your basket we'll write in that, if not we'll write on one
          of our enki gift tags.
        </p>
      </div>
      <div class="gift-wrap-img-container">
        <img
          src="/gift-wrap-1.jpeg"
          alt="the inside of a card with happy birthday written out"
        />
        <img
          src="/gift-wrap-2.jpeg"
          alt="some gifts wrapped with colourful wrapping paper and pink and green ribbon"
        />
        <img
          src="/gift-wrap-3.jpeg"
          alt="some gifts wrapped with brown paper wrapping paper and yellow and green ribbon"
        />
      </div>
    {/if}
    <HexGrid
      data={removeVariantCategories(categoryToShow.Children)}
      {categoryFn}
      {whitelistedUserAgent}
      showFullPage={categoryToShow.Id === 1876089 ? false : true}
    />
  {/if}
{/if}
<ProductView {productArr} {variantCategories} {whitelistedUserAgent} />

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
  }

  img {
    max-width: 50%;
    height: auto;
    margin: 1em;
  }

  p {
    font-family: "Caviar Dreams";
    width: 80%;
    text-align: center;
  }

  @media (min-width: 960px) {
    p {
      width: 60%;
    }

    .gift-wrap-img-container {
      flex-direction: row;
    }

    img {
      max-width: 20vw;
    }
  }
</style>
