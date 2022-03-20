<script lang="ts">
  import { onMount } from 'svelte';
  import { params, metatags } from '@roxi/routify';
  import { products } from '@/stores/products';
  import SingleProduct from '@/components/SingleProduct/SingleProduct.svelte';
  import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.svelte';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  let productToShow: readonly Product[] = [];

  metatags.title =
    'Enki - Gifts, Cards and Jewellery Repairs, Kings Heath, Birmingham';
  metatags.url = window.location.href;
  metatags.image = `https://enki.imgix.net/${productToShow[0]?.Id}-0?auto=format,compress`;
  metatags.type = 'website';
  metatags.description = productToShow[0]?.Name;
  metatags.locale = 'en_GB';

  onMount(async () => {
    // check to see if we have a products store
    // if we do then search and display the correct product
    if ($products.length) {
      // will return the falsy value of 0 if product is not a variant
      const variantId = $products.find(
        (obj) => obj.Id === parseInt($params.product, 10)
      )?.VariantGroupId;

      if (variantId) {
        productToShow = $products.filter(
          (obj) => obj.VariantGroupId === variantId
        );
      } else {
        productToShow = $products.filter(
          (obj) => obj.Id === parseInt($params.product, 10)
        );
      }
    } else {
      // if we don't pull the correct product by idToDisplay
      productToShow = await refreshProducts(
        `${process.env.SERVER_URL}/product?id=${$params.product}`
      );
    }
  });
</script>

{#if productToShow.length}
  <Breadcrumbs selectedCategoryId={productToShow[0].CategoryId} />
  <div>
    <SingleProduct product={productToShow[0]} showDetailedView />
  </div>
{/if}

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3em;
  }
</style>
