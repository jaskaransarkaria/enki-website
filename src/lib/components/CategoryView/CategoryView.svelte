<script lang="ts">
  import { fade } from "svelte/transition";
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import JewelleryView from "$lib/components/JewelleryView/JewelleryView.svelte";
  import ProductsInCategory from "$lib/components/ProductsInCategory/ProductsInCategory.svelte";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import TagView from "$lib/components/TagView/TagView.svelte";

  import type { Category } from "$lib/types/category";
  import type { BaseFn } from "$lib/types/base";

  export let categoryFn: BaseFn;
  export let showBreadcrumbs = true;

  export let categoryToShow: Category | undefined;

  let hasProducts = false;

  const removeVariantCategories = (categories: Category[]) =>
    categories?.filter((cat) => cat.NominalCode === "CATEGORY");

  $: variantCategories = categoryToShow?.Children.filter(
    (cat) => cat.NominalCode === null
  );
</script>

{#if hasProducts}
  <div in:fade={{ duration: 600 }}>
    <p class="pulse">
      Gift wrapping service click <a
        sveltekit:prefetch
        href="/shop/category/1876089">here!</a
      >
    </p>
    <p>Free UK shipping over £40</p>
  </div>
{/if}

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
    <HexGrid
      data={removeVariantCategories(categoryToShow.Children)}
      {categoryFn}
    />
  {/if}
{/if}
<ProductsInCategory
  categoryId={categoryToShow?.Id}
  {variantCategories}
  bind:hasProducts
/>

<style>
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    background-color: darkgray;
    margin-bottom: 1.5em;
    box-shadow: 1px 1.5px 4px #888888;
  }

  div p {
    font-family: "Caviar Dreams";
    font-weight: bold;
    line-height: 0;
    font-size: 1em;
    margin: 1em;
    color: white;
  }

  a {
    color: white;
    cursor: pointer;
  }

  .pulse {
    animation-name: pulse_animation;
    animation-duration: 5000ms;
    transform-origin: 70% 70%;
    animation-iteration-count: 1;
    animation-timing-function: linear;
  }

  @keyframes pulse_animation {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1);
    }
    40% {
      transform: scale(1.08);
    }
    50% {
      transform: scale(1);
    }
    60% {
      transform: scale(1);
    }
    70% {
      transform: scale(1.05);
    }
    80% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
