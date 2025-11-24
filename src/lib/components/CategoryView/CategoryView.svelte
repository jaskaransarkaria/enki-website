<script lang="ts">
  import { run } from 'svelte/legacy';

  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import { products } from "$lib/stores/products";

  import type { SquareCategory } from "$lib/types/category";
  import type { SquareProduct } from "$lib/types/product";

  interface Props {
    showBreadcrumbs?: boolean;
    categoryToShow: SquareCategory | undefined;
    productArr: readonly SquareProduct[];
    whitelistedUserAgent: boolean;
    loadingFromStore?: boolean;
  }

  let {
    showBreadcrumbs = true,
    categoryToShow,
    productArr,
    whitelistedUserAgent,
    loadingFromStore = false
  }: Props = $props();

  run(() => {
    products.set(productArr);
  });
</script>

{#if showBreadcrumbs}
  <Breadcrumbs selectedCategoryId={categoryToShow?.id} />
{/if}
{#if categoryToShow?.children?.length || (loadingFromStore && !productArr?.length)}
  <HexGrid data={categoryToShow.children} {whitelistedUserAgent} />
{:else}
  <ProductView {productArr} {whitelistedUserAgent} />
{/if}
