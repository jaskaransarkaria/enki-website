<script lang="ts">
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import ProductView from "$lib/components/ProductView/ProductView.svelte";
  import HexGrid from "$lib/components/HexGrid/HexGrid.svelte";
  import { products } from "$lib/stores/products";

  import type { SquareCategory } from "$lib/types/category";
  import type { SquareProduct } from "$lib/types/product";

  export let showBreadcrumbs = true;
  export let categoryToShow: SquareCategory | undefined;
  export let productArr: readonly SquareProduct[];
  export let whitelistedUserAgent: boolean;
  export let loadingFromStore: boolean = false;

  $: products.set(productArr);
</script>

{#if showBreadcrumbs}
  <Breadcrumbs selectedCategoryId={categoryToShow?.id} />
{/if}
{#if categoryToShow?.children?.length || (loadingFromStore && !productArr?.length)}
  <HexGrid data={categoryToShow.children} {whitelistedUserAgent} />
{:else}
  <ProductView {productArr} {whitelistedUserAgent} />
{/if}
