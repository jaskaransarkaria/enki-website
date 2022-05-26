<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import JewelleryView from "$lib/components/JewelleryView/JewelleryView.svelte";
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import TagView from "$lib/components/TagView/TagView.svelte";

  import type { Category } from "$lib/types/category";
  import type { Product } from "$lib/types/product";
  import type { BaseFn } from "$lib/types/base";

  export let categoryFn: BaseFn;
  export let showBreadcrumbs = true;
  export let categoryToShow: Category | undefined;
  export let productArr: readonly Product[];
  export let whitelistedUserAgent: boolean;

  const removeVariantCategories = (categories: Category[]) =>
    categories?.filter((cat) => cat.NominalCode === "CATEGORY");

  $: variantCategories = categoryToShow?.Children.filter(
    (cat) => cat.NominalCode === null
  );
</script>

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
{:else}
  <ProductView {productArr} {variantCategories} {whitelistedUserAgent} />
{/if}
