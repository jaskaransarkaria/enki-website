<script lang="typescript">
  import ProductView from '@/components/ProductView/ProductView.svelte';
  import { refreshProducts } from '@/libs/requests';

  import type { Product } from '@/types/product';
  import type { Category } from '@/types/category';

  export let categoryId: number;
  export let variantCategories: readonly Category[] = [];
  export let showDetailedView = false;
  export let showSwitch = true;

  let productArr: readonly Product[] = [];
  const productObj: { [key: string]: { isEmpty: boolean } } = {};

  const refreshProductsArr = async (
    id: number
  ): Promise<readonly Product[]> => {
    if (id) {
      const data = await refreshProducts(
        `${process.env.SERVER_URL}/products-by-category?id=${id.toString()}`
      );
      productArr = data;
      return data;
    }
    return [];
  };

  const refreshProductView = async (arr: readonly Product[], catId: number) => {
    // this guards against repeatedly calling refresh when the response is an empty array of products
    if (productObj?.[catId]?.isEmpty) {
      return;
    }

    // if the category already is in the product array then we don't need to make another api call
    if (arr.find((prod) => prod.CategoryId === categoryId)) {
      return;
    }

    arr = await refreshProductsArr(catId);

    // if the response is an empty array of products let's remember that so we don't make unnecessary refreshes
    if (!arr.length) {
      productObj[catId] = { isEmpty: true };
      return;
    }
  };

  $: refreshProductView(productArr, categoryId);
</script>

{#if categoryId && ((productArr.length && !productObj?.[categoryId]?.isEmpty) || variantCategories.length)}
  <ProductView
    {productArr}
    {showDetailedView}
    {variantCategories}
    {showSwitch}
  />
{/if}
