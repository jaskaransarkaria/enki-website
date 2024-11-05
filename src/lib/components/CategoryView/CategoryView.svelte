<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";

  import type { SquareCategory } from "$lib/types/category";
  import type { SquareProduct } from "$lib/types/product";

  export let showBreadcrumbs = true;
  export let categoryToShow: SquareCategory | undefined;
  export let productArr: readonly SquareProduct[];
  export let whitelistedUserAgent: boolean;

  const removeVariantCategories = (categories: SquareCategory[]) =>
    categories?.filter(
      (cat) =>
        cat.custom_attribute_values.epos_now_nominal_code.string_value ===
          "CATEGORY" ||
        (!cat.custom_attribute_values.epos_now_nominal_code.string_value &&
          !cat.custom_attribute_values.epos_now_id.string_value)
    );

  $: nonVariantCategories =
    removeVariantCategories(categoryToShow?.children) || [];
</script>

{#if showBreadcrumbs}
  <Breadcrumbs selectedCategoryId={categoryToShow?.id} />
{/if}
{#if nonVariantCategories.length}
  <HexGrid data={nonVariantCategories} {whitelistedUserAgent} />
{:else}
  <ProductView {productArr} {whitelistedUserAgent} />
{/if}
