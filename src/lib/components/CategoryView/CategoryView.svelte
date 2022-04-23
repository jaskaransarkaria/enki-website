<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import JewelleryView from "$lib/components/JewelleryView/JewelleryView.svelte";
  import ProductsInCategory from "$lib/components/ProductsInCategory/ProductsInCategory.svelte";
  import Banner from "$lib/components/Banner/Banner.svelte";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import TagView from "$lib/components/TagView/TagView.svelte";

  import type { Category } from "$lib/types/category";
  import type { BaseFn } from "$lib/types/base";

  export let categoryFn: BaseFn;
  export let showBreadcrumbs = true;
  export let categoryToShow: Category | undefined;
  export let hasProducts = false;
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
    <HexGrid
      data={removeVariantCategories(categoryToShow.Children)}
      {categoryFn}
      {whitelistedUserAgent}
    />
  {/if}
{/if}
<ProductsInCategory
  categoryId={categoryToShow?.Id}
  {variantCategories}
  bind:hasProducts
/>
