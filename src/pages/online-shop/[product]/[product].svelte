<script lang="ts">
  import { onMount } from 'svelte';
  import { params } from '@roxi/routify';
  import { products } from '@/stores/products';
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';

  let productToShow: readonly Product[];

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

<h1>{'product' + JSON.stringify($params.product)}</h1>
<ProductView categoryId={0} productArr={productToShow} showDetailedView />
