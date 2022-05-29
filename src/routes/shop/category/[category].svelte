<script context="module" lang="ts">
  import {
    refreshCategoryFromServer,
    refreshProductsFromServer,
  } from "$lib/utils/requests";
  import { isWhitelistedUserAgent } from "$lib/utils/consts";
  import type { Category } from "$lib/types/category";

  const traverseCategoryObj = (
    id: number,
    returnedCaptegoryObj: Category
  ): Category => {
    if (returnedCaptegoryObj?.Id === id) {
      return returnedCaptegoryObj;
    } else if (returnedCaptegoryObj?.Children) {
      // serach each category/children branch recursively
      for (const cat of returnedCaptegoryObj.Children) {
        if (cat.Id === id) {
          return cat;
        } else if (cat.Children) {
          const result = traverseCategoryObj(id, cat);
          if (result) {
            return result;
          }
        }
      }
    } else {
      // category id doesn't match and is the end of the branch in the tree
      return undefined;
    }
  };

  export async function load({ fetch, params, session }) {
    // pull the category data from api

    const categoryResults = await refreshCategoryFromServer(
      `${import.meta.env.VITE_SERVER_URL}/category?id=${params.category}`,
      fetch
    );

    const productResults = await refreshProductsFromServer(
      `${import.meta.env.VITE_SERVER_URL}/products-by-category?id=${
        params.category
      }`,
      fetch
    );

    const category = traverseCategoryObj(
      parseInt(params.category, 10),
      categoryResults[0]
    );

    return {
      props: {
        categoryToShow: category,
        productArr: productResults,
        whitelistedUserAgent: isWhitelistedUserAgent(session.userAgent),
      },
    };
  }
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import CategoryView from "$lib/components/CategoryView/CategoryView.svelte";

  import type { Product } from "$lib/types/product";
  import type { Base } from "$lib/types/base";

  export let categoryToShow: Category = { Id: 0, Name: "" } as Category;
  export let productArr: readonly Product[];
  export let whitelistedUserAgent: boolean;

  const selectCategory = (category: Base) => `/shop/category/${category.Id}`;
</script>

<svelte:head>
  <title>{`Enki - ${categoryToShow.Name}`}</title>
  <meta property="og:title" content={`Enki - ${categoryToShow.Name}`} />
  <meta property="og:url" content={$page.url.toString()} />
  <meta
    property="og:image"
    content={`https://enki.imgix.net/${categoryToShow.Id}?auto=format,compress&w250`}
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content={`Shop at Enki for gifts in the ${categoryToShow.Name} category`}
  />
  <meta property="og:locale" content="en_GB" />
</svelte:head>

<CategoryView
  categoryFn={selectCategory}
  {categoryToShow}
  {whitelistedUserAgent}
  {productArr}
/>
