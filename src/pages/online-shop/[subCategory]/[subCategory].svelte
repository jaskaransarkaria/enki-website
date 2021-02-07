<script lang="ts">
  import { params } from '@roxi/routify';
  import CategoryView from '#/components/CategoryView/CategoryView.svelte';
  import ProductView from '#/components/ProductView/ProductView.svelte';
  import type { Category } from '#/types/category';

  export let subCategory: string;
  let showProduct = false;
  let productToShow: string;

  const showCategoryProducts = (cat: Category) => {
    showProduct = true;
    productToShow = cat.Id;
  };
</script>

<h1>{JSON.stringify($params.subCategory)}</h1>
<h1>{subCategory}</h1>

<CategoryView
  categoryFn={showCategoryProducts}
  categoryId={$params.subCategory} />

{#if showProduct}
  <ProductView categoryId={productToShow} />
{/if}
