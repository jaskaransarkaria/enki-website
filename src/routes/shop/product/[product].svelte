<script context="module" lang="ts">
  import { refreshProductsFromServer } from "$lib/utils/requests";
  import type { Product } from "$lib/types/product";

  export async function load({ fetch, params }) {
    // pull the category data from api
    const result = await refreshProductsFromServer(
      `${import.meta.env.VITE_SERVER_URL}/product?id=${params.product}`,
      fetch
    );

    return {
      props: {
        productToShow: result,
      },
    };
  }
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import Banner from "$lib/components/Banner/Banner.svelte";
  import SingleProduct from "$lib/components/SingleProduct/SingleProduct.svelte";
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";

  export let productToShow: readonly Product[] = [];
</script>

<svelte:head>
  <title>{`Enki - ${productToShow[0].Name}`}</title>
  <meta property="og:title" content={`Enki - ${productToShow[0].Name}`} />
  <meta property="og:url" content={$page.url.toString()} />
  <meta
    property="og:image"
    content={`https://enki.imgix.net/${productToShow[0].Id}-0?auto=format,compress`}
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content={`Shop at Enki for ${productToShow[0].Name}`}
  />
  <meta property="og:locale" content="en_GB" />
</svelte:head>

{#if productToShow.length}
  <Banner hasProducts />
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
