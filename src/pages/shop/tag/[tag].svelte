<script lang="typescript">
  import { params, url } from '@roxi/routify';
  import { onMount } from 'svelte';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.svelte';
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

<Breadcrumbs
  selectedCategoryId={parseInt($params.catId, 10)}
  extraCrumbs={[
    {
      Name: $params.tag,
      Id: $params.tagId,
      tagUrl: $url(),
      params: `?catId=${$params.catId}&tagId=${$params.tagId}`,
    },
  ]}
/>
{#if data.length}
  <ProductView productArr={data} />
{/if}
