<script lang="ts">
  import { PUBLIC_BUCKET_URL } from "$env/static/public";
  import { page } from "$app/stores";
  import comingSoon from "$lib/assets/coming_soon.png";
  import Banner from "$lib/components/Banner/Banner.svelte";
  import SingleProduct from "$lib/components/SingleProduct/SingleProduct.svelte";
  import Breadcrumbs from "$lib/components/Breadcrumbs/Breadcrumbs.svelte";
  import { getImageFilename } from "$lib/utils/getImageFilename";

  import type { Product } from "$lib/types/product";

  const productToShow: readonly Product[] = $page.data.productToShow;
</script>

<svelte:head>
  <title>{`Enki - ${productToShow[0]?.Name}`}</title>
  <meta property="og:title" content={`Enki - ${productToShow[0]?.Name}`} />
  <meta property="og:url" content={$page.url.toString()} />
  <meta
    property="og:image"
    content={`${PUBLIC_BUCKET_URL}/${
      productToShow[0]?.ProductImages[0]?.ImageUrl
        ? getImageFilename(productToShow[0].ProductImages[0].ImageUrl)
        : comingSoon
    }`}
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:description"
    content={`Shop at Enki for ${productToShow[0]?.Name}`}
  />
  <meta property="og:locale" content="en_GB" />
</svelte:head>

{#if productToShow.length || $page.data.whitelistedUserAgent}
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
