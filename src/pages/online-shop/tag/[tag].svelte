<script lang="typescript">
  import { params } from '@roxi/routify';
  import { onMount } from 'svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import { products } from '@/stores/products';
  import { refreshProducts } from '@/libs/requests';
  import type { Product } from '@/types/product';

  let data: readonly Product[] = [];

  onMount(async () => {
    if ($products && $products.length === 0) {
      data = await refreshProducts(
        `${process.env.SERVER_URL}/get-all-products`
      );
      products.set(data);
    }
  });

  $: data = $products.filter((obj) =>
    obj.ProductTags.filter((tag) => tag.Name === $params.tag).length
      ? true
      : false
  );
</script>

<div class="container">
  {#if data.length}
    {#each data as prod}
      <ProductView productArr={[prod]} categoryId={prod.CategoryId} />
    {/each}
  {/if}
</div>

<style>
  .container {
    display: flex;
    justify-content: end;
    align-items: center;
  }
</style>
