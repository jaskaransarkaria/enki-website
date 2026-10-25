<script lang="ts">
  import Breadcrumbs from "#lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import ProductView from "#lib/components/ProductView/ProductView.svelte";
  import HexGrid from "#lib/components/HexGrid/HexGrid.svelte";
  import { products } from "#lib/stores/products.js";

  import type { SquareCategory } from "#lib/types/category.js";
  import type { SquareProduct } from "#lib/types/product.js";

  interface Props {
    showBreadcrumbs?: boolean;
    categoryToShow: SquareCategory | undefined;
    productArr: readonly SquareProduct[];
  }

  let { showBreadcrumbs = true, categoryToShow, productArr }: Props = $props();

  $effect(() => {
    products.set(productArr);
  });
</script>

{#if showBreadcrumbs}
  <Breadcrumbs selectedCategoryId={categoryToShow?.id} />
{/if}
{#if categoryToShow?.children?.length}
  <HexGrid data={categoryToShow.children} />
{:else}
  <ProductView {productArr} />
{/if}
